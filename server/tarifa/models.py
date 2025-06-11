from django.db import models
from datetime import timedelta

class Tarifa(models.Model):
    descripcion = models.CharField(max_length=100)
    precioPorHora = models.DecimalField(max_digits=6, decimal_places=2)
    precioPorDia = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)

    def calcularCosto(self, tiempoEstacionado: timedelta):
        """
        Calcula el costo basado en el tiempo estacionado.

        Parámetros:
        - tiempoEstacionado: timedelta que representa la duración del estacionamiento.

        Regla:
        Si hay precioPorDia y el tiempo es mayor o igual a 24 horas, cobra precioPorDia por cada día completo,
        y cobra precioPorHora para las horas restantes.

        Retorna el costo total como Decimal redondeado a 2 decimales.
        """
        total_segundos = tiempoEstacionado.total_seconds()
        total_horas = total_segundos / 3600

        if self.precioPorDia and total_horas >= 24:
            dias_completos = int(total_horas // 24)
            horas_restantes = total_horas % 24
            costo = (dias_completos * float(self.precioPorDia)) + (horas_restantes * float(self.precioPorHora))
        else:
            costo = total_horas * float(self.precioPorHora)

        return round(costo, 2)

    def __str__(self):
        tarifa_dia = f", ${self.precioPorDia}/día" if self.precioPorDia else ""
        return f"{self.descripcion} - ${self.precioPorHora}/hora{tarifa_dia}"
