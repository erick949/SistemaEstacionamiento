from django.db import models
from django.contrib.auth.models import User  # Importa el modelo de usuario de Django

class Auto(models.Model):
    placa = models.CharField(max_length=10, unique=True)
    modelo = models.CharField(max_length=50)
    color = models.CharField(max_length=30)
    cliente = models.ForeignKey(User, on_delete=models.CASCADE, related_name='autos')
    

    def __str__(self):
        return f"{self.placa} - {self.modelo}"
