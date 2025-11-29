# Project presented by :
Sandra Abbes tp6 && Malek Setti tp8
# RentEase
## Description
RentEase est une application web fullstack de location immobilière moderne et intuitive. Elle permet aux utilisateurs de parcourir des annonces immobilières, de filtrer les résultats selon leurs critères et de contacter les propriétaires directement. Une interface d'administration complète permet de gérer les biens et les messages.

## Fonctionnalités Clés

### 🏠 Pour les Utilisateurs
-   **Catalogue de Biens**: Visualisation des propriétés avec images, prix et détails.
-   **Recherche Avancée**: Filtrage par ville, prix minimum/maximum et nombre de chambres.
-   **Détails du Bien**: Vue détaillée avec une mise en page optimisée (image à gauche, infos à droite).
-   **Contact**: Formulaire intégré pour envoyer des messages aux propriétaires.
-   **Responsive Design**: Interface adaptée aux mobiles et desktops.

### 🛡️ Pour les Administrateurs
-   **Dashboard**: Vue d'ensemble des propriétés et des messages reçus.
-   **Gestion des Propriétés**: Ajouter, modifier et supprimer des annonces immobilières.
-   **Gestion des Messages**: Consulter et supprimer les demandes de contact.
-   **Sécurité**: Routes protégées par authentification JWT.

## Technologies Utilisées

### Frontend
-   **React**: Bibliothèque UI principale.
-   **Vite**: Build tool rapide pour le développement.
-   **CSS Moderne**: Système de design personnalisé avec variables CSS (Couleurs Indigo/Emerald, Glassmorphism).
-   **React Router**: Gestion de la navigation.
-   **Axios**: Requêtes HTTP.

### Backend
-   **Node.js & Express**: Serveur API RESTful.
-   **MongoDB & Mongoose**: Base de données NoSQL et modélisation des données.
-   **JWT (JSON Web Tokens)**: Authentification sécurisée.
-   **Multer**: Gestion de l'upload d'images.

## Installation et Démarrage

### Prérequis
-   Node.js (v14+ recommandé)
-   MongoDB (local ou Atlas)

### 1. Configuration du Backend
Accédez au dossier backend, installez les dépendances et lancez le serveur.

```bash
cd backend
npm install
```

Assurez-vous d'avoir un fichier `.env` à la racine du dossier `backend` avec les variables suivantes :
```env
MONGO_URI=mongodb://localhost:27017/rentease
JWT_SECRET=votre_secret_super_securise
PORT=5000
```

Lancer le serveur :
```bash
npm run dev
# ou
node server.js
```
Le serveur démarrera sur `http://localhost:5000`.

### 2. Configuration du Frontend
Accédez au dossier frontend, installez les dépendances et lancez l'application.

```bash
cd frontend
npm install
npm run dev
```
L'application sera accessible sur `http://localhost:5173` (ou le port indiqué par Vite).

## Structure du Projet

```
fullstack project/
├── backend/            # API Node.js/Express
│   ├── config/         # Configuration DB
│   ├── middleware/     # Auth middleware
│   ├── models/         # Modèles Mongoose (User, Property, Message)
│   ├── routes/         # Routes API
│   └── server.js       # Point d'entrée
│
├── frontend/           # Application React
│   ├── src/
│   │   ├── components/ # Composants réutilisables (Navbar, PropertyCard...)
│   │   ├── context/    # Context API (AuthContext)
│   │   ├── pages/      # Pages principales (Home, AdminDashboard...)
│   │   └── index.css   # Styles globaux et variables
│   └── ...
└── README.md           # Documentation du projet
```
