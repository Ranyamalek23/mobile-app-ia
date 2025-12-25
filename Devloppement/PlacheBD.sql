CREATE TABLE "users" (
  "id" INT GENERATED AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "telephone" VARCHAR(14) NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "birthday" DATE NOT NULL,
  "country" VARCHAR(30) NOT NULL,
  "gender" ENUM(Homme,Femme) NOT NULL,
  "weight" DECIMAL(5,2) NOT NULL,
  "height" DECIMAL(5,2) NOT NULL,
  "fitness_level" ENUM(Débutant,Intermédiaire,Avancé) DEFAULT 'Débutant',
  "created_at" TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP'
);

CREATE TABLE "postures" (
  "id" INT GENERATED AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(50) UNIQUE NOT NULL,
  "description" TEXT,
  "min_angle" DECIMAL(5,2) NOT NULL,
  "max_angle" DECIMAL(5,2) NOT NULL,
  "difficulty" ENUM(Facile,Moyen,Difficile) DEFAULT 'Moyen',
  "created_at" TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP'
);

CREATE TABLE "sessions" (
  "id" INT GENERATED AS IDENTITY PRIMARY KEY,
  "user_id" INT NOT NULL,
  "posture_id" INT NOT NULL,
  "duration" INT NOT NULL,
  "status" ENUM(En cours,Terminée) DEFAULT 'En cours',
  "posture_valid" BOOLEAN DEFAULT false,
  "correct_duration" INT DEFAULT 0,
  "posture_score" FLOAT DEFAULT 0,
  "start_time" TIMESTAMP NOT NULL,
  "end_time" TIMESTAMP,
  "created_at" TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP'
);

CREATE TABLE "feedback" (
  "id" INT GENERATED AS IDENTITY PRIMARY KEY,
  "session_id" INT NOT NULL,
  "message" TEXT NOT NULL,
  "feedback_type" ENUM(Conseil,Alerte) DEFAULT 'Conseil',
  "severity" ENUM(Mineur,Majeur) DEFAULT 'mineur',
  "created_at" TIMESTAMP DEFAULT 'CURRENT_TIMESTAMP'
);

ALTER TABLE "sessions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "sessions" ADD FOREIGN KEY ("posture_id") REFERENCES "postures" ("id");

ALTER TABLE "feedback" ADD FOREIGN KEY ("session_id") REFERENCES "sessions" ("id");
