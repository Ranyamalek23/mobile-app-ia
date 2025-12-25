package com.example.formfit

import SessionAdapter
import android.content.Context
import android.content.SharedPreferences
import android.os.Build
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.annotation.RequiresExtension
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.formfit.ViewModel.HisotryViewModelFactory
import com.example.formfit.ViewModel.HistoryViewModel
import com.example.formfit.model.Session
import com.example.formfit.repository.Repository

class historiqueFragment : Fragment() {

    private lateinit var viewModel: HistoryViewModel
    private lateinit var sharedPreferences: SharedPreferences

    @RequiresExtension(extension = Build.VERSION_CODES.S, version = 7)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        sharedPreferences = requireActivity().getSharedPreferences("UserSession", Context.MODE_PRIVATE)
        val repository = Repository()
        val viewModelFactory = HisotryViewModelFactory(repository)
        this.viewModel = ViewModelProvider(this, viewModelFactory).get(HistoryViewModel::class.java)
        viewModel.getSessions(sharedPreferences.getInt("id",0))
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_historique, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val recyclerView = view.findViewById<RecyclerView>(R.id.recyclerView)
        val noDataTextView = view.findViewById<TextView>(R.id.noDataTextView)

        recyclerView.layoutManager = LinearLayoutManager(context)

        viewModel.sessions.observe(viewLifecycleOwner, Observer { response ->
            Log.d("response", response.size.toString())
            if (response.isNullOrEmpty()) {
                recyclerView.visibility = View.GONE
                noDataTextView.visibility = View.VISIBLE
            } else {
                recyclerView.visibility = View.VISIBLE
                noDataTextView.visibility = View.GONE
                recyclerView.adapter = SessionAdapter(response)
            }

        })
    }
}
