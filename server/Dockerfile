# Usa la imagen oficial de Python
FROM python:3.11-slim

# Variables de entorno para evitar buffers en output
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Instala dependencias del sistema necesarias (si usas psycopg2, etc.)
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copia requirements y instala dependencias
# COPY server/requirements.txt /app/requirements.txt
COPY requirements.txt /app/requirements.txt

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copia el código
# COPY server /app
COPY server/. /app


# Expone puerto 8000 para Django
EXPOSE 8000

# Comando para correr el servidor (puedes cambiarlo para producción)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
