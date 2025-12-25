package com.example.formfit.api

import com.example.formfit.model.Session
import com.example.formfit.model.SessionCreate
import com.example.formfit.model.User
import com.example.formfit.model.UserRegister
import com.example.formfit.model.UserRegisterRequest
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST


interface MyApi {
    @GET("sessions/user/{userId}/")
    suspend fun getSessions(@retrofit2.http.Path("userId") userId: Int): Response<List<Session>>

    @GET("sessions/max-duration/{userId}")
    suspend fun getMaxDuration(@retrofit2.http.Path("userId") userId: Int): Response<Session>

    @POST("auth/login")
    suspend fun login(
        @Body user: User
    ): Response<User>

    @POST("auth/register")
    suspend fun register(
        @Body user: UserRegisterRequest
    ): Response<UserRegister>

    @POST("sessions")
    suspend fun createSession(
        @Body session: SessionCreate
    ): Response<Session>
}