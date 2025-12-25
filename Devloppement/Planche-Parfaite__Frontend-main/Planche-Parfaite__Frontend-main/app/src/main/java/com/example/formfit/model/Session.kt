package com.example.formfit.model

import com.google.gson.annotations.SerializedName

data class Session(
    val id: Int,

    val duration: Int,

    val status: Status,

    val postureValid: Boolean,

    val correctDuration: Int,

    val postureScore: Float,

    val startTime: String,

    val endTime: String,

    val userId: Int,

    val postureId: Int?,

    val user: User?
){
    companion object{
        fun createSession(duration: Int, userId: Int, startTime: String, endTime: String): Session {
            return Session(0,duration,Status.En_cours, false, 0,
                0.0F, startTime, endTime, userId, 0, null)
        }
    }
}

data class SessionCreate(
    val userId: Int,
    val duration: Int,
    val status: Status,
    val postureValid: Boolean,
    val correctDuration: Int,
    val postureScore: Float,
    val startTime: String,
    val endTime: String
)

data class SessionResponse(
    val id: Int,
    val duration: Int,
    val status: Status,
    val postureValid: Boolean,
    val correctDuration: Int,
    val postureScore: Float,
    val startTime: String,
    val endTime: String,
    val userId: Int,
    val postureId: Int?,
    val user: User?
)

enum class Status {
    @SerializedName("En_cours") En_cours,
    @SerializedName("Terminée") Terminée
}