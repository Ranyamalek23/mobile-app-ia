package com.example.formfit.ViewModel

import android.annotation.SuppressLint
import android.net.http.HttpException
import android.os.Build
import android.util.Log
import androidx.annotation.RequiresExtension
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.formfit.model.Session
import com.example.formfit.model.SessionCreate
import com.example.formfit.model.User
import com.example.formfit.model.UserRegister
import com.example.formfit.model.UserRegisterRequest
import com.example.formfit.repository.Repository
import kotlinx.coroutines.launch
import java.io.IOException

class HomeViewModel(private val repository: Repository): ViewModel() {
    private val _session = MutableLiveData<Session>()
    val session : LiveData<Session> = _session

    private val _user = MutableLiveData<User>()
    val user : LiveData<User> = _user

    private val _userRegister = MutableLiveData<UserRegister>()
    val userRegister : LiveData<UserRegister> = _userRegister

    private val _sessionCreated = MutableLiveData<Session>()
    val sessionCreated : LiveData<Session> = _sessionCreated

    private val _loginError = MutableLiveData<String>()
    val loginError: LiveData<String> = _loginError

    @RequiresExtension(extension = Build.VERSION_CODES.S, version = 7)
    fun getMaxDuration(userId: Int) {
        viewModelScope.launch {
            try {
                val response = repository.getMaxDuration(userId)
                if (response.isSuccessful) {
                    _session.value = response.body()

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

    fun login(user: User){
        viewModelScope.launch {
            try {
                val response = repository.login(user)
                if (response.isSuccessful && response.body() != null) {
                    _user.value = response.body()
                } else {
                    _loginError.value = "Identifiants incorrects, veuillez réessayer."
                    Log.e("LOGIN_ERROR", "API Error: ${response.errorBody()}")
                }
            } catch (e: IOException) {
                _loginError.value = "Problème de connexion. Vérifiez votre réseau."
            } catch (e: Exception) {
                _loginError.value = "Une erreur inattendue est survenue."
            }
        }
    }

    fun register(user: UserRegisterRequest) {
        viewModelScope.launch {
            try {
                Log.d("REGISTER", "Starting API Call")
                Log.d("REGISTER", "User: $user") // Debug Log
                val response = repository.register(user)

                if (response.isSuccessful) {
                    Log.d("REGISTER", "Success: ${response.body()}")  // Debugging
                    _userRegister.postValue(response.body())  // Update LiveData on success
                } else {
                    // Handle API errors
                    val errorBody = response.errorBody()?.string()
                    Log.e("REGISTER_ERROR", "API Error: $errorBody")  // Debugging

                    // Parse the error message from the response
                    val errorMessage = when {
                        errorBody?.contains("Unique constraint failed on the constraint: `email`", ignoreCase = true) == true -> {
                            "Email already exists. Please use a different email."
                        }
                        errorBody?.contains("Please enter valid email", ignoreCase = true) == true -> {
                            "Invalid email format. Please enter a valid email."
                        }
                        else -> {
                            "Registration failed. Please try again."
                        }
                    }

                    // Post the error message to LiveData
                    _loginError.postValue(errorMessage)
                }
            } catch (e: IOException) {
                // Handle network errors
                Log.e("REGISTER_EXCEPTION", "Network error: ${e.localizedMessage}", e)
                _loginError.postValue("Network error. Please check your connection.")
            } catch (e: Exception) {
                // Handle other exceptions
                Log.e("REGISTER_EXCEPTION", "Exception: ${e.localizedMessage}", e)
                _loginError.postValue("An unexpected error occurred. Please try again.")
            }
        }
    }

    fun createSession(session: SessionCreate){
        viewModelScope.launch {
            try{
                Log.d("SESSION", "Session: $session")
                val response = repository.createSession(session)
                if(response.isSuccessful){
                    _sessionCreated.value = response.body()
                    Log.d("Success", "session id: ${_session.value}")
                }else{
                    Log.e("API_ERROR", "Erreur API: ${response.errorBody()?.string()}")
                }
            } catch (e: IOException) {
                Log.e("NETWORK_ERROR", "Problème de connexion", e)
            } catch (@SuppressLint("NewApi") e: HttpException) {
                Log.e("HTTP_ERROR", "Réponse invalide:- ${e.message}")
            } catch (e: Exception) {
                Log.e("UNKNOWN_ERROR", "Erreur inconnue", e)
            }
        }
    }
}

