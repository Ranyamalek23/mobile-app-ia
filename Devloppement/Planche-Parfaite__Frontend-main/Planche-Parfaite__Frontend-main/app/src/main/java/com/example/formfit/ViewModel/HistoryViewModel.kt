package com.example.formfit.ViewModel

import android.net.http.HttpException
import android.os.Build
import android.util.Log
import androidx.annotation.RequiresExtension
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.formfit.model.Session
import com.example.formfit.repository.Repository
import kotlinx.coroutines.launch
import retrofit2.Response
import java.io.IOException

class HistoryViewModel(private val repository: Repository) : ViewModel() {

    private val _sessions = MutableLiveData<List<Session>>()
    val sessions: LiveData<List<Session>> = _sessions

    @RequiresExtension(extension = Build.VERSION_CODES.S, version = 7)
    fun getSessions(userId: Int) {
        viewModelScope.launch {
            try {
                val response = repository.getSessions(userId)
                if (response.isSuccessful) {
                    _sessions.value = response.body() ?: emptyList() // ✅ Évite les valeurs nulles

                } else {
                    Log.e("API_ERROR", "Erreur API: ${response.errorBody()?.string()}")
                }
            } catch (e: IOException) {
                Log.e("NETWORK_ERROR", "Problème de connexion", e)
            } catch (e: HttpException) {
                Log.e("HTTP_ERROR", "Réponse invalide:- ${e.message}")
            } catch (e: Exception) {
                Log.e("UNKNOWN_ERROR", "Erreur inconnue", e)
            }
        }
    }


}