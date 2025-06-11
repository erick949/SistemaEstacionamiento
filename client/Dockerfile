# Usa imagen node para build
FROM node:20-alpine as build-stage

WORKDIR /app

# Copia los archivos de dependencias desde el contexto actual (ya estamos en client/)
COPY package*.json ./
RUN npm install

# Copia todo el contenido del proyecto client
COPY . ./
RUN npm run build

# Stage para servir estáticos con un servidor ligero (nginx)
FROM nginx:stable-alpine AS production-stage

# Copia el resultado del build al servidor nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copia configuración nginx personalizada si quieres (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
