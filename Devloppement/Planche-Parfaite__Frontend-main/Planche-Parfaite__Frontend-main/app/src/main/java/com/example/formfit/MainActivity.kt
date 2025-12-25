package com.example.formfit

import HomeFragment
import android.annotation.SuppressLint
import android.app.Fragment
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.widget.Button
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.google.android.material.bottomnavigation.BottomNavigationView

class MainActivity : AppCompatActivity() {

    lateinit var button: Button
    private lateinit var bottomNavigation: BottomNavigationView

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val sharedPreferences = getSharedPreferences("UserSession", MODE_PRIVATE)
        val isLoggedIn = sharedPreferences.getBoolean("isLoggedIn", false)
        //val isLoggedIn = false
        if (!isLoggedIn) {
            // Redirect to LoginActivity if not logged in
            startActivity(Intent(this, SignInActivity::class.java))
            finish() // Close MainActivity
            return
        }

        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }


        //button = findViewById(R.id.cameraButton)
        bottomNavigation = findViewById(R.id.bottom_navigation)

        //button.setOnClickListener{
            //val intent = Intent(this@MainActivity, CameraActivity::class.java)
            //startActivity(intent)
        //}

        bottomNavigation.setOnItemSelectedListener { item ->
            when(item.itemId){
                R.id.home ->{
                    replaceFragment(HomeFragment())
                    item.title = "Accueil"
                    true
                }
                R.id.camera ->{
                    replaceFragment(CameraFragment())
                    true
                }
                R.id.historique ->{
                    replaceFragment(historiqueFragment())
                    true
                }
                R.id.profile ->{
                    replaceFragment(profileFragment())
                    true
                }
                else -> false
        } }
        replaceFragment(HomeFragment())
    }

    private fun replaceFragment(fragment: androidx.fragment.app.Fragment){
        supportFragmentManager.beginTransaction().replace(R.id.fragment_container, fragment).commit()
    }


}