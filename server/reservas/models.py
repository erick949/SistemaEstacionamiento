from django.db import models

# Create your models here.

class Reserva(models.Model):
    id_auto = models.IntegerField()
    fecha_reserva = models.DateField()
    hora_reserva = models.TimeField()
    duracion = models.IntegerField()  # minutos

    def __str__(self):
        return f"Reserva Auto {self.id_auto} el {self.fecha_reserva} a las {self.hora_reserva}"
