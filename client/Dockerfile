# Usa imagen node para build
FROM node:20-alpine as build-stage

WORKDIR /app

COPY client/package*.json ./
RUN npm install

COPY client/ ./
RUN npm run build

# Stage para servir estáticos con un servidor ligero (nginx)
FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copia configuración nginx personalizada si quieres (opcional)
# COPY client/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
