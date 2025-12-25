package com.example.formfit

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.EditText
import android.widget.ProgressBar
import android.widget.TextView
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.example.formfit.ViewModel.HomeViewModel
import com.example.formfit.ViewModel.HomeViewModelFactory
import com.example.formfit.model.User
import com.example.formfit.repository.Repository

class SignInActivity : AppCompatActivity() {

    private lateinit var viewModel : HomeViewModel
    private lateinit var progressBar: ProgressBar
    private lateinit var signInButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_sign_in)

        // Handle window insets safely
        findViewById<android.view.View>(R.id.main)?.let { mainView ->
            ViewCompat.setOnApplyWindowInsetsListener(mainView) { v, insets ->
                val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
                v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
                insets
            }
        }

        val repository = Repository()
        val viewModelFactory = HomeViewModelFactory(repository)
        this.viewModel = ViewModelProvider(this, viewModelFactory).get(HomeViewModel::class.java)

        // Find the TextView and set click listener
        val emailEditText = findViewById<EditText>(R.id.editTextTextEmailAddress2)
        val passwordEditText = findViewById<EditText>(R.id.editTextTextPassword)
        signInButton = findViewById(R.id.button_signIn)
        progressBar = findViewById(R.id.progressBar)

        signInButton.setOnClickListener{
            val email = emailEditText.text.toString().trim()
            val password = passwordEditText.text.toString().trim()
            if (email.isEmpty() || password.isEmpty()) {
                Toast.makeText(this, "Veuillez remplir tous les champs", Toast.LENGTH_SHORT).show()
            }else{
                toggleLoading(true)
                val user = User.fromEmailAndPassword(email, password)
                viewModel.login(user)
            }
        }

        val signUpTextView = findViewById<TextView>(R.id.textView17)

        viewModel.user.observe(this, Observer { user ->
            toggleLoading(false)
            val sharedPreferences = getSharedPreferences("UserSession", MODE_PRIVATE)
            val editor = sharedPreferences.edit()
            editor.putInt("id", user.id)
            editor.putString("name", user.name)
            editor.putString("email", user.email)
            editor.putString("telephone", user.telephone)
            editor.putString("birthday", user.birthday)
            editor.putBoolean("isLoggedIn", true)
            editor.apply()
            val intent = Intent(this, MainActivity::class.java)
            startActivity(intent)
        })

        viewModel.loginError.observe(this, Observer { errorMessage ->
            toggleLoading(false) // Hide ProgressBar on error
            Toast.makeText(this, errorMessage, Toast.LENGTH_SHORT).show()
        })

        signUpTextView.setOnClickListener {
            val intent = Intent(this, SignUpActivity::class.java)
            startActivity(intent)
        }
    }

    private fun toggleLoading(isLoading: Boolean) {
        if (isLoading) {
            signInButton.visibility = View.INVISIBLE
            progressBar.visibility = View.VISIBLE
        } else {
            signInButton.visibility = View.VISIBLE
            progressBar.visibility = View.GONE
        }
    }
}
