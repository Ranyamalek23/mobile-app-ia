//package com.example.formfit.model

package com.example.formfit.model

data class User(
    val id: Int,
    val name: String,
    val email: String,
    val telephone: String,
    val password: String,
    val birthday: String,
    val country: String,
    val gender: String,
    val weight: Int,
    val height: Int,
    val fitnessLevel: String
){
    companion object {
        fun fromEmailAndPassword(email: String, password: String): User {
            return User(0, "", email, "", password, "", "", "", 0, 0, "")
        }

        fun register(nom: String, email: String, telephone: String, password: String,
                     birthday: String, country: String, gender: String,
                     weight: Int, height: Int, fitnessLevel: String): User {
            return User(0, nom, email, telephone, password, birthday, country, gender, weight, height, fitnessLevel)
        }
    }

}

data class UserRegister(
    val id: Int,
    val name: String,
    val email: String,
    val telephone: String,
    val birthday: String,
    val country: String,
    val gender: String,
    val weight: Int,
    val height: Int,
    val fitnessLevel: String
)

data class UserRegisterRequest(
    val name: String,
    val email: String,
    val telephone: String,
    val password: String,
    val birthday: String,
    val country: String,
    val gender: String,
    val weight: Int,
    val height: Int,
    val fitnessLevel: String
)



//
//import com.google.gson.annotations.SerializedName
//
//data class User(
//    val id: Int,
//    val name: String,
//    val email: String,
//    val telephone: String,
//    val birthday: String,
//    val country: String,
//    val gender: String,
//    val weight: Int,
//    val height: Int,
//    val fitnessLevel: String
//) {
//    companion object {
//        fun fromEmailAndPassword(email: String, password: String): UserRequest {
//            return UserRequest(email = email, password = password)
//        }
//
//        fun register(
//            nom: String, email: String, telephone: String, password: String,
//            birthday: String, country: String, gender: String,
//            weight: Int, height: Int, fitnessLevel: String
//        ): UserRequest {
//            return UserRequest(email, password, nom, telephone, birthday, country, gender, weight, height, fitnessLevel)
//        }
//    }
//}
//
//data class UserRequest(
//    val email: String,
//    val password: String,
//    val name: String? = null,
//    val telephone: String? = null,
//    val birthday: String? = null,
//    val country: String? = null,
//    val gender: String? = null,
//    val weight: Int? = null,
//    val height: Int? = null,
//    val fitnessLevel: String? = null
//)
