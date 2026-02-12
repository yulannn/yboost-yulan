# 🐳 Guide Docker - Yboost Backend

Ce guide explique comment dockeriser et lancer votre backend NestJS avec Docker.

## � Prérequis

- Docker Desktop installé
- Docker Compose installé (inclus avec Docker Desktop)

## 📁 Fichiers créés

### 1. `backend/Dockerfile`
Image Docker multi-étapes optimisée pour NestJS avec Prisma :
- **Stage 1 (Builder)** : Compile l'application TypeScript
- **Stage 2 (Production)** : Image légère avec seulement les fichiers nécessaires

### 2. `backend/.dockerignore`
Exclut les fichiers inutiles du contexte Docker (node_modules, dist, etc.)

### 3. `docker-compose.yml` (mis à jour)
Configuration complète avec :
- **postgres** : Base de données PostgreSQL
- **backend** : API NestJS
- **pgadmin** : Interface web pour gérer PostgreSQL (optionnel)

## 🚀 Démarrage rapide

### Première utilisation

1. **Créer le fichier `.env` à la racine du projet** :
   ```bash
   cp .env.example .env
   ```
   
2. **Modifier les variables dans `.env`** (notamment `JWT_SECRET`)

3. **Construire et démarrer tous les services** :
   ```bash
   docker-compose up --build
   ```

### Utilisations suivantes

```bash
# Démarrer tous les services
docker-compose up

# Démarrer en arrière-plan
docker-compose up -d

# Arrêter tous les services
docker-compose down

# Arrêter et supprimer les volumes (⚠️ supprime les données)
docker-compose down -v
```

## 🔧 Commandes utiles

### Voir les logs

```bash
# Logs de tous les services
docker-compose logs -f

# Logs du backend uniquement
docker-compose logs -f backend

# Logs de PostgreSQL
docker-compose logs -f postgres
```

### Reconstruire une image

```bash
# Reconstruire le backend après des changements
docker-compose build backend

# Reconstruire et redémarrer
docker-compose up --build backend
```

### Exécuter des commandes Prisma

```bash
# Générer le client Prisma
docker-compose exec backend npx prisma generate

# Créer une nouvelle migration
docker-compose exec backend npx prisma migrate dev --name nom_migration

# Appliquer les migrations
docker-compose exec backend npx prisma migrate deploy

# Seed la base de données
docker-compose exec backend npx prisma db seed

# Ouvrir Prisma Studio
docker-compose exec backend npx prisma studio
```

### Accéder au shell du conteneur

```bash
docker-compose exec backend sh
```

## 🌐 Accès aux services

- **Backend API** : http://localhost:3000
- **PostgreSQL** : localhost:5434 (port mappé depuis 5432)
- **pgAdmin** : http://localhost:5051
  - Email : admin@yboost.com
  - Mot de passe : admin

## 📊 Architecture

```
┌─────────────────┐
│     Frontend    │
│   (port 5173)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     Backend     │
│   (port 3000)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │
│   (port 5434)   │
└─────────────────┘
```

## 🔄 Workflow de développement

### Développement local (sans Docker)
```bash
cd backend
npm run start:dev
```

### Production avec Docker
```bash
docker-compose up --build
```

### Développement hybride
- Base de données en Docker : `docker-compose up postgres`
- Backend en local : `npm run start:dev`

## 🛠️ Résolution de problèmes

### Le backend ne démarre pas

1. Vérifier que PostgreSQL est prêt :
   ```bash
   docker-compose logs postgres
   ```

2. Vérifier les migrations Prisma :
   ```bash
   docker-compose exec backend npx prisma migrate status
   ```

### Réinitialiser complètement

```bash
# Arrêter et supprimer tout
docker-compose down -v

# Nettoyer les images
docker-compose build --no-cache

# Redémarrer
docker-compose up
```

### Port déjà utilisé

Si le port 3000 ou 5434 est déjà utilisé, modifiez dans `docker-compose.yml` :
```yaml
ports:
  - "3001:3000"  # Changez 3001 par le port souhaité
```

## 📦 Variables d'environnement

Le fichier `.env` à la racine du projet contient :

- `JWT_SECRET` : Clé secrète pour les tokens JWT (⚠️ à changer en production)
- `JWT_EXPIRES_IN` : Durée de validité des tokens (par défaut : 7 jours)

Les autres variables sont définies dans `docker-compose.yml` :

- `DATABASE_URL` : Connexion à PostgreSQL
- `NODE_ENV` : Environment (production)
- `PORT` : Port d'écoute du backend

## 🔐 Sécurité

⚠️ **Avant de déployer en production** :

1. Changez `JWT_SECRET` dans `.env`
2. Changez les mots de passe PostgreSQL
3. Changez les credentials pgAdmin
4. Ne commitez JAMAIS le fichier `.env`

## 📝 Notes

- Le dossier `backend/uploads` est monté comme volume pour persister les fichiers uploadés
- Les migrations Prisma sont appliquées automatiquement au démarrage
- Le seed est exécuté automatiquement au premier démarrage
- L'image utilise Node.js 20 Alpine (légère et sécurisée)
