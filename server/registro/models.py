from django.db import models
from autos.models import Auto
from django.utils import timezone

class Registro(models.Model):
    # Tus campos
    auto = models.ForeignKey(Auto, on_delete=models.CASCADE)
    fechaEntrada = models.DateTimeField(auto_now_add=True)
    fechaSalida = models.DateTimeField(null=True, blank=True)
    costoTotal = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    # Calcula el costo basado en la duración (puedes ajustar el costo por hora)
    def calcularCosto(self):
        if not self.fechaSalida:
            return 0
        duracion = self.fechaSalida - self.fechaEntrada
        horas = duracion.total_seconds() / 3600
        costo_por_hora = 10  # Ejemplo de tarifa
        return round(horas * costo_por_hora, 2)

    # Método para registrar la salida
    def registrarSalida(self):
        self.fechaSalida = timezone.now()
        self.costoTotal = self.calcularCosto()
        self.save()
