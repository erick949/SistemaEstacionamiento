# Usa imagen node para build
FROM node:20-alpine as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY .env.production .env.production

# ✅ Copia el archivo de variables de entorno ANTES del build
COPY .env.production .env.production

# Copia todo lo demás
COPY . ./

# 🔧 Build con Vite usando .env.production
RUN npm run build

# Etapa de producción con nginx
FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
