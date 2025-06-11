from django.db import models
from django.contrib.auth.models import User  # O tu modelo personalizado de usuario
from registro.models import Registro
from datetime import datetime
from decimal import Decimal

class Pago(models.Model):
    METODOS_PAGO = [
        ('efectivo', 'Efectivo'),
        ('tarjeta', 'Tarjeta'),
        ('transferencia', 'Transferencia'),
    ]

    registro = models.ForeignKey(Registro, on_delete=models.CASCADE, related_name='pagos')
    cliente = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pagos')
    fechaPago = models.DateTimeField(auto_now_add=True)
    monto = models.DecimalField(max_digits=8, decimal_places=2)
    metodoPago = models.CharField(max_length=20, choices=METODOS_PAGO)

    def registrarPago(self):
        self.fechaPago = datetime.now()
        self.save()

    def validarPago(self):
        return self.monto >= Decimal('0.00') and self.metodoPago in dict(self.METODOS_PAGO)

    def __str__(self):
        return f"Pago de {self.monto} por {self.cliente.username} en {self.fechaPago.strftime('%Y-%m-%d %H:%M')}"
