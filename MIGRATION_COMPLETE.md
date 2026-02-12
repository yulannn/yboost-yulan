# ✅ Migration vers PostgreSQL - Terminée

## 🎉 Ce qui a été fait

### 1. Configuration Docker
- ✅ Créé `docker-compose.yml` avec PostgreSQL 16 et pgAdmin
- ✅ PostgreSQL accessible sur le port **5434** (au lieu de 5432 qui était occupé)
- ✅ pgAdmin accessible sur http://localhost:5051 (au lieu de 5050 qui était occupé)

### 2. Configuration du Backend
- ✅ Créé le fichier `.env` avec les variables d'environnement
- ✅ Créé `.env.example` pour la documentation
- ✅ Mis à jour `schema.prisma` : `mysql` → `postgresql`
- ✅ Généré le client Prisma pour PostgreSQL
- ✅ Créé et exécuté la migration initiale

### 3. Données de Test
- ✅ Créé le script de seed (`prisma/seed.ts`)
- ✅ Ajouté la configuration Prisma dans `package.json`
- ✅ Rempli la base de données avec :
  - 3 rôles (Admin, Bartender, Waiter)
  - 3 employés
  - 10 tables
  - 12 ingrédients
  - 7 cocktails
  - 18 relations cocktail-ingrédient

## 🔧 Informations de Connexion

### Base de Données PostgreSQL
```
Host: localhost
Port: 5434
Database: yboost_db
User: yboost_user
Password: yboost_password
```

### Interface pgAdmin
```
URL: http://localhost:5051
Email: admin@yboost.com
Password: admin
```

### Comptes Employés (pour tester l'authentification)
```
Admin:
  Email: admin@yboost.com
  Password: password123

Bartender:
  Email: bartender@yboost.com
  Password: password123

Waiter:
  Email: waiter@yboost.com
  Password: password123
```

## 📝 Commandes Utiles

### Démarrer/Arrêter Docker
```bash
# Démarrer PostgreSQL et pgAdmin
docker-compose up -d

# Arrêter les conteneurs
docker-compose down

# Arrêter et supprimer toutes les données
docker-compose down -v
```

### Gestion de la Base de Données
```bash
# Réinitialiser et re-seed la base de données
npx prisma migrate reset

# Ajouter des données de test (seed)
npx prisma db seed

# Ouvrir Prisma Studio (interface graphique)
npx prisma studio

# Créer une nouvelle migration
npx prisma migrate dev --name nom_de_la_migration
```

### Démarrer l'Application
```bash
# Backend
cd backend
npm run start:dev

# Frontend
cd frontend
npm run dev
```

## 🎯 Prochaines Étapes Recommandées

1. **Tester toutes les fonctionnalités** de l'application avec la nouvelle base PostgreSQL
2. **Vérifier l'authentification** avec les comptes de test
3. **Tester la création/modification/suppression** de cocktails, commandes, etc
4. **Configurer pgAdmin** pour visualiser et gérer la base de données graphiquement
5. **Mettre à jour le README principal** avec les nouvelles instructions

## 🐛 Troubleshooting

### Erreur "port already in use"
Les ports par défaut ont été modifiés car ils étaient déjà utilisés :
- PostgreSQL : 5434 (au lieu de 5432)
- pgAdmin : 5051 (au lieu de 5050)

### Réinitialiser complètement la base de données
```bash
docker-compose down -v
docker-compose up -d
cd backend
npx prisma migrate dev
npx prisma db seed
```

### Voir les logs de PostgreSQL
```bash
docker-compose logs -f postgres
```

## 📚 Documentation Complète
Consultez `DOCKER_SETUP.md` pour une documentation détaillée.
