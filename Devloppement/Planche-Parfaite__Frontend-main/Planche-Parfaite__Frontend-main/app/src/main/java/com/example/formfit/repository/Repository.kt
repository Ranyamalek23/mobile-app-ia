package com.example.formfit.repository

import com.example.formfit.api.retrofitInstance
import com.example.formfit.model.Session
import com.example.formfit.model.SessionCreate
import com.example.formfit.model.User
import com.example.formfit.model.UserRegister
import com.example.formfit.model.UserRegisterRequest
import retrofit2.Response

class Repository {

    suspend fun getSessions(userId: Int): Response<List<Session>> {
        return retrofitInstance.api.getSessions(userId)
    }

    suspend fun getMaxDuration(userId: Int): Response<Session> {
        return retrofitInstance.api.getMaxDuration(userId)
    }

    suspend fun login(user: User): Response<User> {
        return retrofitInstance.api.login(user)
    }

    suspend fun register(user: UserRegisterRequest): Response<UserRegister> {
        return retrofitInstance.api.register(user)
    }

    suspend fun createSession(session: SessionCreate): Response<Session> {
        return retrofitInstance.api.createSession(session)
    }
}