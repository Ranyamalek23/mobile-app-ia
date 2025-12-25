package com.example.formfit

import android.annotation.SuppressLint
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
import com.example.formfit.model.UserRegisterRequest
import com.example.formfit.repository.Repository

class SignUpActivity : AppCompatActivity() {

    private lateinit var viewModel: HomeViewModel
    private lateinit var progressBar: ProgressBar
    private lateinit var signUpButton: Button

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_sign_up)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        val repository = Repository()
        val viewModelFactory = HomeViewModelFactory(repository)
        this.viewModel = ViewModelProvider(this, viewModelFactory).get(HomeViewModel::class.java)

        val nomEditText = findViewById<EditText>(R.id.editTextText2)
        val emailEditText = findViewById<EditText>(R.id.editTextTextEmailAddress2)
        val telephoneEditText = findViewById<EditText>(R.id.editTextPhone)
        val passwordEditText = findViewById<EditText>(R.id.editTextTextPassword)
        signUpButton = findViewById(R.id.button_signUp)
        progressBar = findViewById(R.id.progressBar)

        signUpButton.setOnClickListener {
            val nom = nomEditText.text.toString().trim()
            val email = emailEditText.text.toString().trim()
            val telephone = telephoneEditText.text.toString().trim()
            val password = passwordEditText.text.toString().trim()
            val birthday = "2001-06-21" // Replace with actual user input
            val country = "France" // Replace with actual user input
            val gender = "Homme" // Replace with actual user input
            val weight = 75 // Replace with actual user input
            val height = 180 // Replace with actual user input
            val fitnessLevel = "Débutant"


            if (email.isEmpty() || password.isEmpty() || nom.isEmpty() || telephone.isEmpty()) {
                Toast.makeText(this, "Veuillez remplir tous les champs", Toast.LENGTH_SHORT).show()
            } else {
                toggleLoading(true)
                val user = UserRegisterRequest(
                    nom,
                    email,
                    telephone,
                    password,
                    birthday,
                    country,
                    gender,
                    weight,
                    height,
                    fitnessLevel
                )
                viewModel.register(user)
            }
        }

        viewModel.userRegister.observe(this, Observer { user ->
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
            toggleLoading(false)
            Toast.makeText(this, errorMessage, Toast.LENGTH_SHORT).show()
        })

        val signInTextView = findViewById<TextView>(R.id.textView17)
        signInTextView.setOnClickListener {
            val intent = Intent(this, SignInActivity::class.java)
            startActivity(intent)
        }
    }

    private fun toggleLoading(isLoading: Boolean) {
        if (isLoading) {
            signUpButton.visibility = View.INVISIBLE
            progressBar.visibility = View.VISIBLE
        } else {
            signUpButton.visibility = View.VISIBLE
            progressBar.visibility = View.GONE
        }
    }
}