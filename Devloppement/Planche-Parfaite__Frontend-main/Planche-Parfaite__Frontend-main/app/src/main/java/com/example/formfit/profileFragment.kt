package com.example.formfit

import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.Toast

class profileFragment : Fragment() {

    private lateinit var sharedPreferences: SharedPreferences
    private lateinit var nameEditText: EditText
    private lateinit var emailEditText: EditText
    private lateinit var phoneEditText: EditText
    private lateinit var birthdayEditText: EditText
    private lateinit var saveButton: Button
    private lateinit var logOutButton: ImageView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_profile, container, false)

        // Initialize SharedPreferences
        sharedPreferences = requireActivity().getSharedPreferences("UserSession", Context.MODE_PRIVATE)

        // Find UI elements
        nameEditText = view.findViewById(R.id.editTextText)
        emailEditText = view.findViewById(R.id.editTextTextEmailAddress)
        phoneEditText = view.findViewById(R.id.editTextPhone)


        logOutButton = view.findViewById(R.id.logout)

        // Load existing user data
        loadUserData()

        // Set up save button click listener
        //saveButton.setOnClickListener {
            //saveUserData()
        //}

        logOutButton.setOnClickListener {
            val editor = sharedPreferences.edit()
            editor.clear() // Clears all saved data
            editor.apply()

            val intent = Intent(requireActivity(), SignInActivity::class.java)
            startActivity(intent)
            requireActivity().finish() // Ensures the user cannot navigate back
        }

        return view
    }

    private fun loadUserData() {
        nameEditText.setText(sharedPreferences.getString("name", ""))
        emailEditText.setText(sharedPreferences.getString("email", ""))
        phoneEditText.setText(sharedPreferences.getString("telephone", ""))
    }

    private fun saveUserData() {
        val name = nameEditText.text.toString().trim()
        val email = emailEditText.text.toString().trim()
        val phone = phoneEditText.text.toString().trim()

        if (name.isEmpty() || email.isEmpty() || phone.isEmpty()) {
            Toast.makeText(requireContext(), "Veuillez remplir tous les champs", Toast.LENGTH_SHORT).show()
            return
        }

        // Save updated data in SharedPreferences
        val editor = sharedPreferences.edit()
        editor.putString("name", name)
        editor.putString("email", email)
        editor.putString("telephone", phone)
        editor.apply()

        Toast.makeText(requireContext(), "Profil mis à jour avec succès!", Toast.LENGTH_SHORT).show()
    }

}