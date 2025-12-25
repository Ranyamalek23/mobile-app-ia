# **Planche API - Backend**

## **Description**
Le backend de l'application **Planche Parfaite** développé avec **NestJS**.  
Cette API permet de gérer les utilisateurs, les postures, les sessions et les feedbacks pour accompagner les utilisateurs dans leurs exercices de sport.

---

## **Technologies utilisées**
- **NestJS** : Framework Node.js pour la structure modulaire.
- **TypeORM** : ORM pour la gestion de la base de données MySQL.
- **MySQL** : Base de données relationnelle.
- **Swagger** : Documentation interactive de l'API.
- **TypeScript** : Langage principal pour le développement.

---

## **Prérequis**
- **Node.js** (v16+)
- **npm** ou **yarn**
- **MySQL** installé localement ou sur un serveur.

---

## **Installation**
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/<votre-utilisateur>/planche-api.git
   cd planche-api
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configurez la base de données dans le fichier **`src/app.module.ts`** :
   ```typescript
   TypeOrmModule.forRoot({
     type: 'mysql',
     host: 'localhost',
     port: 3306,
     username: 'votre-utilisateur',
     password: 'votre-motdepasse',
     database: 'PlancheParfaiteBd',
     autoLoadEntities: true,
     synchronize: true, // Désactiver en production
   })
   ```

4. Lancez le serveur en mode développement :
   ```bash
   npm run start:dev
   ```
   Par défaut, l'application sera accessible à **http://localhost:3000**.

---

## **Fonctionnalités principales**
- **Utilisateurs** :
  - Création d'un compte utilisateur.
  - Gestion des informations personnelles.
- **Postures** :
  - Gestion des exercices (planche, pompes, etc.).
- **Sessions** :
  - Suivi des sessions avec durée et résultats.
- **Feedbacks** :
  - Ajout de conseils ou alertes sur les performances.

---

## **Endpoints principaux**
### **Users**
- `POST /users` : Créer un nouvel utilisateur.
- `GET /users` : Récupérer tous les utilisateurs.

### **Postures**
- `POST /postures` : Ajouter une nouvelle posture.
- `GET /postures` : Récupérer toutes les postures.

### **Sessions**
- `POST /sessions` : Créer une nouvelle session.
- `GET /sessions` : Récupérer toutes les sessions.

### **Feedback**
- `POST /feedback` : Ajouter un feedback pour une session.
- `GET /feedback` : Récupérer tous les feedbacks.

---

## **Documentation API**
La documentation de l'API est disponible via **Swagger**.  
Accédez à **http://localhost:3000/api** pour consulter et tester les endpoints.

---

## **Scripts disponibles**
- **Démarrer en mode développement** :
  ```bash
  npm run start:dev
  ```
- **Démarrer en mode production** :
  ```bash
  npm run start
  ```
- **Exécuter les tests** :
  ```bash
  npm run test
  ```

---

## **Structure du projet**
```
src/
├── app.module.ts        # Module racine de l'application
├── users/               # Gestion des utilisateurs
├── postures/            # Gestion des postures
├── sessions/            # Gestion des sessions
├── feedback/            # Gestion des feedbacks
├── main.ts              # Point d'entrée principal
```

---

## **Contributions**
Les contributions sont les bienvenues !  
1. Forkez le projet.
2. Créez une branche pour votre fonctionnalité :
   ```bash
   git checkout -b feature/ma-fonctionnalite
   ```
3. Faites une Pull Request.

---

## **Auteur**
- **Nom** : Yacine Diabi  
- **Contact** : [votre-email@example.com]  

---

### **Notes**
- Désactivez `synchronize: true` en production pour éviter des modifications non contrôlées dans la base de données.
- Utilisez un fichier `.env` pour sécuriser les informations sensibles.
