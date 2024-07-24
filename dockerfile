# Utiliser l'image officielle Node.js comme image de base
FROM node:latest

# Définir le répertoire de travail dans le container
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances du frontend
RUN npm install

# Copier tous les fichiers du frontend dans le répertoire de travail
COPY . .

# Construire l'application React
RUN npm run build

# Utiliser une image légère pour le serveur web Nginx
FROM nginx:alpine

# Copier les fichiers de build dans le répertoire du serveur Nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Exposer le port sur lequel Nginx écoute
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
