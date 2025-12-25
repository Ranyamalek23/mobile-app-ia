package com.example.formfit

import android.Manifest
import android.annotation.SuppressLint
import android.content.Context
import android.content.SharedPreferences
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.SurfaceTexture
import android.hardware.camera2.CameraAccessException
import android.hardware.camera2.CameraCaptureSession
import android.hardware.camera2.CameraCharacteristics
import android.hardware.camera2.CameraDevice
import android.hardware.camera2.CameraManager
import android.media.MediaPlayer
import android.os.Bundle
import android.os.Handler
import android.os.HandlerThread
import android.util.Log
import android.view.Surface
import android.view.TextureView
import android.widget.Button
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.example.formfit.ViewModel.HomeViewModel
import com.example.formfit.ViewModel.HomeViewModelFactory
import com.example.formfit.ml.AutoModel4
import com.example.formfit.model.Session
import com.example.formfit.model.SessionCreate
import com.example.formfit.model.Status
import com.example.formfit.repository.Repository
import org.tensorflow.lite.DataType
import org.tensorflow.lite.support.image.ImageProcessor
import org.tensorflow.lite.support.image.TensorImage
import org.tensorflow.lite.support.image.ops.ResizeOp
import org.tensorflow.lite.support.tensorbuffer.TensorBuffer
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.TimeZone
import kotlin.math.PI
import kotlin.math.abs
import kotlin.math.acos
import kotlin.math.pow
import kotlin.math.sqrt

class CameraActivity : AppCompatActivity() {

    val paint = Paint()
    lateinit var cameraManager: CameraManager
    lateinit var handler: Handler
    lateinit var handlerThread: HandlerThread
    lateinit var textureView: TextureView
    lateinit var imageView: ImageView
    lateinit var bitmap: Bitmap
    lateinit var imageProcessor: ImageProcessor
    lateinit var model: AutoModel4

    var totalPlankTime: Long = 0
    var isPlanking = false
    var plankStartTime: Long = 0
    var plankCount = 0
    var plankTimes = mutableListOf<Long>()
    var isCalculating = true
    val calculationDelay = 2500L
    var isDetectionPaused = false

    lateinit var timerTextView: TextView
    lateinit var timerLinearLayout: LinearLayout

    private lateinit var tickSound: MediaPlayer
    private val tickHandler = Handler()
    private var isPlayingSound = false

    private lateinit var viewModel : HomeViewModel

    private lateinit var sharedPreferences: SharedPreferences

    lateinit var switchCameraButton: Button
    private var isRearCameraActive = true
    private lateinit var rearCameraId: String
    private lateinit var frontCameraId: String

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_camera)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        getPermission()

        imageProcessor = ImageProcessor.Builder().add(ResizeOp(256,256, ResizeOp.ResizeMethod.BILINEAR)).build()
        model = AutoModel4.newInstance(this)
        textureView = findViewById(R.id.textureView)
        imageView = findViewById(R.id.imageView)
        timerTextView = findViewById<TextView>(R.id.timerTextView)
        timerLinearLayout = findViewById<LinearLayout>(R.id.timerLinearLayout)
        cameraManager = getSystemService(Context.CAMERA_SERVICE) as CameraManager
        handlerThread = HandlerThread("videoThread")
        handlerThread.start()
        handler = Handler(handlerThread.looper)

        tickSound = MediaPlayer.create(this, R.raw.tick_sound)

        sharedPreferences = getSharedPreferences("UserSession", MODE_PRIVATE)

        setupCameraIds()
        switchCameraButton = findViewById(R.id.switch_camera)
        switchCameraButton.setOnClickListener {
            switchCamera()
        }

        val endExerciseButton = findViewById<Button>(R.id.end)
        endExerciseButton.setOnClickListener {
            endExercise()
        }

        val repository = Repository()
        val viewModelFactory = HomeViewModelFactory(repository)
        this.viewModel = ViewModelProvider(this, viewModelFactory).get(HomeViewModel::class.java)

        paint.setColor(Color.BLUE)

        textureView.surfaceTextureListener = object:TextureView.SurfaceTextureListener{
            override fun onSurfaceTextureAvailable(p0: SurfaceTexture, p1: Int, p2: Int) {
                openCamera(rearCameraId)
            }

            override fun onSurfaceTextureSizeChanged(p0: SurfaceTexture, p1: Int, p2: Int) {

            }

            override fun onSurfaceTextureDestroyed(p0: SurfaceTexture): Boolean {
                return false
            }

            override fun onSurfaceTextureUpdated(p0: SurfaceTexture) {
                bitmap = textureView.bitmap!!
                var mutable = bitmap.copy(Bitmap.Config.ARGB_8888, true)
                var canvas = Canvas(mutable)
                var h = bitmap.height
                var w = bitmap.width
                var x = 0

                // Update the timer continuously
                if (isPlanking) {
                    totalPlankTime += System.currentTimeMillis() - plankStartTime
                    plankStartTime = System.currentTimeMillis()
                }
                updateUI(totalPlankTime)


                // Only run detection logic if not paused
                if (!isDetectionPaused) {
                    var tensorImage = TensorImage(DataType.UINT8)
                    tensorImage.load(bitmap)
                    tensorImage = imageProcessor.process(tensorImage)

                    val inputFeature = TensorBuffer.createFixedSize(intArrayOf(1, 256, 256, 3), DataType.UINT8)
                    inputFeature.loadBuffer(tensorImage.buffer)

                    val output = model.process(inputFeature)
                    val outputFeature = output.outputFeature0AsTensorBuffer.floatArray
                    // Check plank posture
                    val isPlank = detectPlank(outputFeature, bitmap.height, bitmap.width)

                    val color = if (isPlanking) Color.GREEN else Color.RED
                    paint.color = color

                    while (x <= 49) {
                        if (outputFeature[x + 2] > 0.40) {
                            canvas.drawCircle(outputFeature[x + 1] * w, outputFeature[x] * h, 10f, paint)
                        }
                        x += 3
                    }
                    // Update plank state and timers
                    if (isPlank && !isPlanking) {
                        plankStartTime = System.currentTimeMillis()
                        plankCount++
                        isPlanking = true
                        Log.d("Plank", "Plank $plankCount: Started")
                        startCalculationPause()
                        startTickSound()
                        updateUITimerStyle(true)
                    } else if (!isPlank && isPlanking) {
                        val elapsedTime = System.currentTimeMillis() - plankStartTime
                        totalPlankTime += elapsedTime
                        isPlanking = false
                        Log.d("Plank", "Plank $plankCount: Ended. Duration: $elapsedTime ms")
                        updateUITimerStyle(false)
                    }
                }

                // Draw keypoints and display plank status

                val text = if (isPlanking) "Plank $plankCount: ${totalPlankTime} ms" else "No Plank"
                val color = if (isPlanking) Color.GREEN else Color.RED
                paint.color = color
                paint.textSize = 50f
                // canvas.drawText(text, 50f, 100f, paint)

                imageView.setImageBitmap(mutable)
            }
        }
    }

    private fun startCalculationPause() {
        isDetectionPaused = true // Pause detection
        handler.postDelayed({
            isDetectionPaused = false // Resume detection after delay
        }, calculationDelay)
    }

    private fun updateUITimerStyle(isPlankCorrect: Boolean) {
        if (isPlankCorrect) {
            timerTextView.setTextColor(ContextCompat.getColor(this, android.R.color.holo_green_dark))
            timerLinearLayout.background = ContextCompat.getDrawable(this, R.drawable.timer_green)
        } else {
            timerTextView.setTextColor(ContextCompat.getColor(this, android.R.color.black))
            timerLinearLayout.background = ContextCompat.getDrawable(this, R.drawable.timer)
        }
    }

    private fun updateUI(totalTime: Long) {
        // Format the total time as minutes and seconds
        val minutes = (totalTime / 1000) / 60
        val seconds = (totalTime / 1000) % 60
        val timeString = String.format("%02d:%02d", minutes, seconds)

        // Update the timer TextView
        timerTextView.text = timeString
    }

    private fun setupCameraIds() {
        try {
            val cameraIds = cameraManager.cameraIdList
            for (id in cameraIds) {
                val characteristics = cameraManager.getCameraCharacteristics(id)
                val facing = characteristics.get(CameraCharacteristics.LENS_FACING)
                when (facing) {
                    CameraCharacteristics.LENS_FACING_BACK -> rearCameraId = id
                    CameraCharacteristics.LENS_FACING_FRONT -> frontCameraId = id
                }
            }
        } catch (e: CameraAccessException) {
            Log.e("Camera", "Error setting up camera IDs", e)
        }
    }

    private fun switchCamera() {
        if (isRearCameraActive) {
            openCamera(frontCameraId)
        } else {
            openCamera(rearCameraId)
        }
        isRearCameraActive = !isRearCameraActive
    }

    fun openCamera(cameraId: String) {
        if (checkSelfPermission(Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(arrayOf(Manifest.permission.CAMERA), 101)
            return
        }

        try {
            //val cameraId = cameraManager.cameraIdList[0]
            val characteristics = cameraManager.getCameraCharacteristics(cameraId)
            val map = characteristics.get(CameraCharacteristics.SCALER_STREAM_CONFIGURATION_MAP)
            val outputSizes = map?.getOutputSizes(SurfaceTexture::class.java)
            val size = outputSizes?.get(0)

            // Configure the surface to display the camera output
            val textureView = findViewById<TextureView>(R.id.textureView)
            val surfaceTexture = textureView.surfaceTexture
            if (surfaceTexture != null) {
                surfaceTexture.setDefaultBufferSize(size!!.width, size.height)
            }
            val surface = Surface(surfaceTexture)

            cameraManager.openCamera(cameraId, object : CameraDevice.StateCallback() {
                override fun onOpened(camera: CameraDevice) {
                    val captureRequestBuilder = camera.createCaptureRequest(CameraDevice.TEMPLATE_PREVIEW)
                    captureRequestBuilder.addTarget(surface)

                    camera.createCaptureSession(listOf(surface), object : CameraCaptureSession.StateCallback() {
                        override fun onConfigured(session: CameraCaptureSession) {
                            // Start preview
                            val captureRequest = captureRequestBuilder.build()
                            session.setRepeatingRequest(captureRequest, null, handler)
                        }

                        override fun onConfigureFailed(session: CameraCaptureSession) {
                            println("Failed to configure the camera")
                        }
                    }, handler)
                }

                override fun onDisconnected(camera: CameraDevice) {
                    camera.close()
                }

                override fun onError(camera: CameraDevice, error: Int) {
                    camera.close()
                }
            }, handler)
        } catch (e: CameraAccessException) {
            e.printStackTrace()
        }
    }

    fun getPermission(){
        if(checkSelfPermission(android.Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED){
            requestPermissions(arrayOf(android.Manifest.permission.CAMERA),101)
        }
    }

    override fun onRequestPermissionsResult(  requestCode: Int, permissions: Array<out String>, grantResults: IntArray  ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == 101) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                openCamera(rearCameraId)
            } else {
                // Afficher un message ou gérer l'absence de permission
                println("Permission de la caméra refusée")
            }
        }
    }

    private fun detectPlank(features: FloatArray, height: Int, width: Int): Boolean {
        // Keypoints indices (adjust based on your model's output)
        val leftShoulder = getKeypoint(features, 5, height, width)
        val leftHip = getKeypoint(features, 11, height, width)
        val leftAnkle = getKeypoint(features, 15, height, width)
        val leftElbow = getKeypoint(features, 7, height, width)

        val rightShoulder = getKeypoint(features, 6, height, width)
        val rightHip = getKeypoint(features, 12, height, width)
        val rightAnkle = getKeypoint(features, 16, height, width)
        val rightElbow = getKeypoint(features, 8, height, width)

        // Calculate angles
        val leftAngle = calculateAngle(leftShoulder, leftHip, leftAnkle)
        val rightAngle = calculateAngle(rightShoulder, rightHip, rightAnkle)

        // Check hip alignment
        val hipHeightDiff = abs(leftHip[1] - rightHip[1])

        // Check elbow position (should be below shoulders)
        val elbowHeight = (leftElbow[1] + rightElbow[1]) / 2

        // Plank criteria
        return (170 <= leftAngle && leftAngle <= 190 &&
                170 <= rightAngle && rightAngle <= 190 &&
                hipHeightDiff < 20 &&
                elbowHeight > leftHip[1])
    }


    private fun getKeypoint(features: FloatArray, index: Int, height: Int, width: Int): FloatArray {
        return floatArrayOf(features[index * 3 + 1] * width, features[index * 3] * height)
    }

    // Function to calculate the angle between three points
    private fun calculateAngle(A: FloatArray, B: FloatArray, C: FloatArray): Double {
        val ba = floatArrayOf(A[0] - B[0], A[1] - B[1])
        val bc = floatArrayOf(C[0] - B[0], C[1] - B[1])
        val dotProduct = ba[0] * bc[0] + ba[1] * bc[1]
        val magnitudeBA = sqrt(ba[0].pow(2) + ba[1].pow(2))
        val magnitudeBC = sqrt(bc[0].pow(2) + bc[1].pow(2))
        val angle = acos(dotProduct / (magnitudeBA * magnitudeBC))
        return Math.toDegrees(angle.toDouble())
    }


    fun checkPlanche(features: FloatArray,h: Int, w: Int):Double {
        var y = (features.get(15)*h + features.get(18)*h)/2
        var x = (features.get(16)*w + features.get(19)*w)/2
        var shoulder = floatArrayOf(y,x)

        y = (features.get(33)*h + features.get(36)*h)/2
        x = (features.get(34)*w + features.get(37)*w)/2
        var hip = floatArrayOf(y,x)

        y = (features.get(45)*h + features.get(48)*h)/2
        x = (features.get(46)*w + features.get(49)*w)/2
        var ankle = floatArrayOf(y,x)

        //var bool = ( features.get(17) > 40 || features.get(17) > 40 ) && ( features.get(35) > 40 || features.get(38) > 40 ) && ( features.get(47) > 40 || features.get(50) > 40 )
        var angle = 0.0
        angle = calculateAngle(shoulder,hip,ankle)
        return angle


        //if ( 120 < angle && angle < 250){
          //  return true
        //}else{
          //  return false
        //}

    }

    private fun startTickSound() {
        if (!isPlayingSound) {
            isPlayingSound = true
            tickHandler.post(object : Runnable {
                override fun run() {
                    if (isPlanking) { // Jouer le son seulement si la planche est correcte
                        tickSound.start()
                        tickHandler.postDelayed(this, 1000) // Rejouer après 1 seconde
                    } else {
                        isPlayingSound = false
                    }
                }
            })
        }
    }

    fun getFormattedDate(): String {
        val sdf = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.getDefault())
        sdf.timeZone = TimeZone.getTimeZone("UTC") // Ensure the time is in UTC
        return sdf.format(Date(System.currentTimeMillis()))
    }

    private fun endExercise() {
        val userId = sharedPreferences.getInt("id", 0) // Retrieve user ID
        val startTime = getFormattedDate() // Get the start time
        val endTime = getFormattedDate()   // Get the end time
        val duration = (totalPlankTime / 1000).toInt() // Convert milliseconds to seconds
        val status = Status.En_cours
        val postureValid = false
        val correctDuration = 0
        val postureScore = 0.0f

        val session = SessionCreate(userId,duration,status, postureValid, correctDuration, postureScore, startTime, endTime)

        viewModel.createSession(session)

        viewModel.sessionCreated.observe(this, Observer { response ->
            Log.d("sessionCreated", "session id :${response.id}")
        })

        Toast.makeText(this, "Exercise session saved!", Toast.LENGTH_SHORT).show()

        // Navigate back to the previous activity
        finish()
    }


    override fun onDestroy() {
        super.onDestroy()

        totalPlankTime = 0
        isPlanking = false
        plankStartTime = 0
        plankCount = 0
        plankTimes.clear()
        tickSound.release()
    }




}


