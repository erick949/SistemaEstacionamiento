from django.db import models
from django.utils import timezone
from reportlab.pdfgen import canvas
from io import BytesIO
from django.core.files.base import ContentFile


from django.conf import settings
import os




class Reporte(models.Model):
    TIPOS_REPORTE = [
        ('ingresos', 'Ingresos'),
        ('uso', 'Uso del sistema'),
        ('usuarios', 'Usuarios'),
        ('otros', 'Otros')
    ]

    tipoReporte = models.CharField(max_length=20, choices=TIPOS_REPORTE)
    fechaGeneracion = models.DateTimeField(auto_now_add=True)
    archivo = models.FileField(upload_to='reportes/', null=True, blank=True)

    def generarReporte(self, datos: str):
        """
        Genera un PDF con el contenido de `datos` y lo guarda en el campo `archivo`.
        """
        buffer = BytesIO()
        p = canvas.Canvas(buffer)
        p.setFont("Helvetica", 12)

        # Título del reporte
        p.drawString(100, 800, f"Reporte de tipo: {self.tipoReporte.capitalize()}")
        p.drawString(100, 780, f"Fecha: {timezone.now().strftime('%Y-%m-%d %H:%M:%S')}")

        # Cuerpo del contenido
        y = 750
        for linea in datos.split('\n'):
            if y < 50:
                p.showPage()
                y = 800
            p.drawString(100, y, linea)
            y -= 20

        p.showPage()
        p.save()

        buffer.seek(0)
        filename = f'reporte_{self.tipoReporte}_{timezone.now().strftime("%Y%m%d_%H%M%S")}.pdf'
        self.archivo.save(filename, ContentFile(buffer.read()))
        self.fechaGeneracion = timezone.now()
        self.save()


    def exportarReporte(self):
        nombre_archivo = f"reporte_{self.tipoReporte}_{self.fechaGeneracion.strftime('%Y%m%d_%H%M%S')}.pdf"
        return f"reportes/{nombre_archivo}"



    def __str__(self):
        return f"Reporte [{self.tipoReporte}] - {self.fechaGeneracion.strftime('%Y-%m-%d %H:%M:%S')}"
