from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

class ComentarioCliente(models.Model):
    CALIFICACIONES = [
        (1, '1 - Muy malo'),
        (2, '2 - Malo'),
        (3, '3 - Regular'),
        (4, '4 - Bueno'),
        (5, '5 - Excelente'),
    ]

    cliente = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comentarios_cliente')
    calificacion = models.IntegerField(choices=CALIFICACIONES)
    comentario = models.TextField()
    fechaComentario = models.DateTimeField(auto_now_add=True)

    def registrarComentario(self):
        self.fechaComentario = datetime.now()
        self.save()

    def esComentarioValido(self):
        return self.calificacion in dict(self.CALIFICACIONES) and len(self.comentario.strip()) > 0

    def __str__(self):
        return f"Comentario de {self.cliente.username} - {self.calificacion}⭐ en {self.fechaComentario.strftime('%Y-%m-%d %H:%M')}"
