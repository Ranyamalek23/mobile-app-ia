package com.example.formfit

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.fragment.app.Fragment

class CameraFragment : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_camera, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // Initialize button
        val button = view.findViewById<Button>(R.id.cameraButton)

        // Set click listener
        button.setOnClickListener {
            // Launch CameraActivity
            val intent = Intent(requireContext(), CameraActivity::class.java)
            startActivity(intent)
        }
    }
}
