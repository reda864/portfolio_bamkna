# 🚀 Guide de Déploiement : Neon PostgreSQL & Render

Ce guide vous explique étape par étape comment configurer votre base de données **Neon PostgreSQL** et déployer votre application **Baamakna 3X3** sur **Render**.

---

## 📋 Table des Matières
1. [Étape 1 : Créer la base de données Neon PostgreSQL](#étape-1--créer-la-base-de-données-neon-postgresql)
2. [Étape 2 : Mettre à jour votre dépôt GitHub](#étape-2--mettre-à-jour-votre-dépôt-github)
3. [Étape 3 : Déployer sur Render (Web Service)](#étape-3--déployer-sur-render-web-service)
4. [Étape 4 : Vérification et Test en Ligne](#étape-4--vérification-et-test-en-ligne)
5. [Variables d'Environnement](#variables-denvironnement)

---

## Étape 1 : Créer la base de données Neon PostgreSQL

1. Rendez-vous sur [neon.tech](https://neon.tech) et connectez-vous (ou créez un compte gratuit).
2. Cliquez sur **"New Project"** (Nouveau projet).
3. Nommez le projet (ex: `baamakna-db`), choisissez la région la plus proche (ex: **Europe (Frankfurt)**) et cliquez sur **"Create project"**.
4. Sur la page d'accueil de votre projet (**Dashboard**), dans la section **"Connection Details"** :
   - Assurez-vous que l'onglet **"Node.js"** ou **"Postgres"** est sélectionné.
   - Cochez **"Pooled connection"** (recommandé pour serverless).
   - Copiez l'URL de connexion qui ressemble à :
     ```text
     postgresql://neondb_owner:npg_xxxxxxxxxxxx@ep-cool-fog-123456-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require
     ```
   *(Gardez cette URL précieusement, nous allons la renseigner sur Render).*

---

## Étape 2 : Mettre à jour votre dépôt GitHub

Assurez-vous que votre code le plus récent est poussé sur votre dépôt GitHub :

```bash
git add .
git commit -m "feat: setup Express backend with Neon PostgreSQL and Render deployment"
git push origin main
```

---

## Étape 3 : Déployer sur Render (Web Service)

1. Rendez-vous sur [render.com](https://render.com) et connectez-vous.
2. Dans le Dashboard, cliquez sur **"New +"** en haut à droite, puis sélectionnez **"Web Service"**.
3. Choisissez **"Build and deploy from a Git repository"** et connectez votre dépôt GitHub `baamakna-portfolio` (ou `portfolio_bamkna`).
4. Configurez les champs suivants :
   - **Name** : `baamakna-portfolio` (ou le nom de votre choix)
   - **Region** : Frankfurt (ou celle la plus proche de votre base Neon)
   - **Branch** : `main`
   - **Runtime** : `Node`
   - **Build Command** : `npm install && npm run build`
   - **Start Command** : `npm start`
   - **Instance Type** : `Free` (0$/mois)

5. Descendez jusqu'à la section **"Environment Variables"** (Variables d'environnement) et ajoutez :
   | Key (Clé) | Value (Valeur) |
   |---|---|
   | `NODE_ENV` | `production` |
   | `DATABASE_URL` | *Collez votre URL de connexion Neon copiée à l'étape 1* |
   | `JWT_SECRET` | *Une chaîne de caractères aléatoire et sécurisée (ex: `super_secret_baamakna_key_99`)* |
   | `ADMIN_USERNAME` | `admin` *(ou votre identifiant préféré)* |
   | `ADMIN_PASSWORD` | `votre_mot_de_passe_admin` *(mot de passe pour accéder au CMS)* |

6. Cliquez sur **"Deploy Web Service"** (ou "Create Web Service").

Render va automatiquement :
- Installer les dépendances
- Compiler le frontend React (`dist/`)
- Démarrer le serveur Express
- Créer automatiquement les tables PostgreSQL (`portfolio_data`, `admin_users`, `contact_messages`) sur votre base Neon et initialiser les données de l'équipe !

---

## Étape 4 : Vérification et Test en Ligne

1. Une fois le déploiement terminé (statut **"Live"** sur Render), cliquez sur l'URL de votre site (ex: `https://baamakna-portfolio.onrender.com`).
2. **Tester l'API Healthcheck** : Accédez à `https://votre-app.onrender.com/api/health`
   - Vous devriez voir `"status": "ok"` et `"database": {"status": "connected", "provider": "Neon PostgreSQL"}`.
3. **Tester le CMS Admin** :
   - Cliquez sur "Administration" dans le footer ou ajoutez `#admin` à l'URL.
   - Connectez-vous avec `admin` et votre mot de passe.
   - Modifiez un joueur, une statistique ou une photo, puis sauvegardez.
   - Ouvrez le site sur un autre appareil / navigateur : vos modifications sont maintenant persistées dans le cloud Neon PostgreSQL !

---

## 🛠️ Test en Local (Optionnel)

Pour tester localement avec votre base Neon avant de déployer :
1. Créez un fichier `.env` à la racine :
   ```env
   DATABASE_URL=votre_url_neon
   JWT_SECRET=dev_jwt_secret
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin
   PORT=5000
   ```
2. Dans un terminal, lancez le serveur backend :
   ```bash
   npm run server
   ```
3. Dans un autre terminal, lancez le frontend Vite :
   ```bash
   npm run dev
   ```
