
# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class Perfil(models.Model):
    ROL_CHOICES = [
        ('admin', 'Administrador'),
        ('cliente', 'Cliente'),
        ('empleado', 'Empleado'),
    ]

    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    rol = models.CharField(max_length=20, choices=ROL_CHOICES, default='cliente')

    def __str__(self):
        return f"{self.usuario.username} ({self.rol})"
