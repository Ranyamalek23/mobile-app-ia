import android.annotation.SuppressLint
import android.content.Context
import android.content.SharedPreferences
import android.graphics.Color
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.example.formfit.R
import com.example.formfit.ViewModel.HisotryViewModelFactory
import com.example.formfit.ViewModel.HistoryViewModel
import com.example.formfit.ViewModel.HomeViewModel
import com.example.formfit.ViewModel.HomeViewModelFactory
import com.example.formfit.model.Session
import com.example.formfit.repository.Repository
import com.github.mikephil.charting.charts.BarChart
import com.github.mikephil.charting.components.XAxis
import com.github.mikephil.charting.data.BarData
import com.github.mikephil.charting.data.BarDataSet
import com.github.mikephil.charting.data.BarEntry
import com.github.mikephil.charting.formatter.IndexAxisValueFormatter
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale
import java.util.TimeZone

class HomeFragment : Fragment() {

    private lateinit var barChart: BarChart
    private lateinit var viewModel : HomeViewModel
    private lateinit var maxPlank : TextView
    private lateinit var nbPlanks : TextView
    private lateinit var userName : TextView
    private lateinit var totalTimeTextView: TextView
    private lateinit var avgTimeTextView: TextView
    private lateinit var viewModel2 : HistoryViewModel
    private lateinit var sharedPreferences: SharedPreferences

    companion object {
        private const val STREAK_COUNT_KEY = "streak_count"
        private const val LAST_SESSION_TIME_KEY = "last_session_time"
    }

    @SuppressLint("NewApi", "FragmentLiveDataObserve")
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_home, container, false)

        sharedPreferences = requireActivity().getSharedPreferences("UserSession", Context.MODE_PRIVATE)

        updateStreak()
        displayStreak()

        val repository = Repository()
        val viewModelFactory = HomeViewModelFactory(repository)
        this.viewModel = ViewModelProvider(this, viewModelFactory).get(HomeViewModel::class.java)
        viewModel.getMaxDuration(sharedPreferences.getInt("id",0))

        val viewModelFactory2 = HisotryViewModelFactory(repository)
        this.viewModel2 = ViewModelProvider(this, viewModelFactory2).get(HistoryViewModel::class.java)
        viewModel2.getSessions(sharedPreferences.getInt("id",0))


        // Initialize the BarChart
        barChart = view.findViewById(R.id.chartContainer)

        maxPlank = view.findViewById(R.id.max_plank)
        nbPlanks = view.findViewById(R.id.textView13)
        totalTimeTextView = view.findViewById(R.id.total_time)
        avgTimeTextView = view.findViewById(R.id.avg_time)

        userName = view.findViewById(R.id.title1)

        userName.text = this.sharedPreferences.getString("name", "")

        viewModel.session.observe(this, Observer { response ->
            Log.d("response", response.id.toString())
            maxPlank.text = response.duration.toString() + " s"
        })

        // Configure the BarChart
        setupBarChart()

        viewModel2.sessions.observe(viewLifecycleOwner, Observer { sessions ->
            nbPlanks.text = sessions.size.toString()
            val totalDuration = sessions.sumOf { it.duration }
            val averageDuration = totalDuration / sessions.size
            totalTimeTextView.text = "$totalDuration s"
            avgTimeTextView.text = "$averageDuration s"
            updateBarChart(sessions)
        })
        // Set data to the BarChart
        //setDataToBarChart()

        return view
    }

    private fun updateStreak() {
        val currentTime = System.currentTimeMillis()
        val lastSessionTime = sharedPreferences.getLong(LAST_SESSION_TIME_KEY, 0)
        val streakCount = sharedPreferences.getInt(STREAK_COUNT_KEY, 0)

        val calendar = Calendar.getInstance()
        calendar.timeInMillis = lastSessionTime
        calendar.add(Calendar.HOUR_OF_DAY, 24) // Add 24 hours to the last session time

        if (currentTime > calendar.timeInMillis) {
            // Reset streak if 24 hours have passed
            sharedPreferences.edit().putInt(STREAK_COUNT_KEY, 0).apply()
        } else {
            // Increment streak if the user logs in within 24 hours
            sharedPreferences.edit().putInt(STREAK_COUNT_KEY, streakCount + 1).apply()
        }

        // Update the last session time
        sharedPreferences.edit().putLong(LAST_SESSION_TIME_KEY, currentTime).apply()
    }

    private fun displayStreak() {
        val streakCount = sharedPreferences.getInt(STREAK_COUNT_KEY, 0)
        val streakTextView = view?.findViewById<TextView>(R.id.textView9)
        streakTextView?.text = "$streakCount jours"
    }

    private fun setupBarChart() {
        barChart.description.isEnabled = false
        barChart.setDrawGridBackground(false)
        barChart.setDrawBarShadow(false)
        barChart.isDragEnabled = true
        barChart.setScaleEnabled(true)

        // Configure X-axis
        val xAxis = barChart.xAxis
        xAxis.position = XAxis.XAxisPosition.BOTTOM
        xAxis.setDrawGridLines(false)
        xAxis.granularity = 1f
        xAxis.labelCount = 7
        xAxis.valueFormatter = IndexAxisValueFormatter(arrayOf("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"))

        // Configure Y-axis
        val leftAxis = barChart.axisLeft
        leftAxis.setDrawGridLines(true)
        leftAxis.axisMinimum = 0f

        val rightAxis = barChart.axisRight
        rightAxis.isEnabled = false

        // Configure legend
        val legend = barChart.legend
        legend.isEnabled = false
    }

    private fun updateBarChart(sessions: List<Session>) {
        val entries = ArrayList<BarEntry>()
        val daysOfWeek = listOf("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun")
        val dayDurations = FloatArray(7) { 0f }

        for (session in sessions) {
            val dayIndex = getDayIndex(session.startTime) // Convertit la date en index (0 = Lundi)
            if (dayIndex in 0..6) {
                dayDurations[dayIndex] += session.duration / 60f // Convertit en minutes
            }
        }

        for (i in dayDurations.indices) {
            entries.add(BarEntry(i.toFloat(), dayDurations[i]))
        }

        val dataSet = BarDataSet(entries, "Durée des Planks (min)")
        dataSet.color = Color.parseColor("#FFBBF246")
        dataSet.valueTextColor = Color.BLACK
        dataSet.valueTextSize = 12f

        val data = BarData(dataSet)
        barChart.data = data
        barChart.barData.barWidth = 0.5f
        barChart.invalidate() // Rafraîchir le graphique
    }

    private fun getDayIndex(dateString: String): Int {
        val format = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault())
        format.timeZone = TimeZone.getTimeZone("UTC")
        val date = format.parse(dateString) ?: return -1

        val calendar = Calendar.getInstance()
        calendar.time = date
        return (calendar.get(Calendar.DAY_OF_WEEK) + 5) % 7 // Convertit Dimanche (1) en 6, Lundi (2) en 0, etc.
    }

    private fun setDataToBarChart() {
        val entries = ArrayList<BarEntry>()
        entries.add(BarEntry(0f, 4f))
        entries.add(BarEntry(1f, 8f))
        entries.add(BarEntry(2f, 6f))
        entries.add(BarEntry(3f, 12f))
        entries.add(BarEntry(4f, 18f))
        entries.add(BarEntry(5f, 9f))
        entries.add(BarEntry(6f, 16f))

        val dataSet = BarDataSet(entries, "Plank Duration")
        dataSet.color = Color.parseColor("#FFBBF246")
        dataSet.valueTextColor = Color.BLACK
        dataSet.valueTextSize = 12f

        val data = BarData(dataSet)
        barChart.data = data
        barChart.barData.barWidth = 0.5f
        barChart.invalidate() // Refresh the chart
    }
}