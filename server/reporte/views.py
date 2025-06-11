from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import json
from .models import Reporte

@csrf_exempt
def generar_reporte(request):
    if request.method == 'POST':
        try:
            datos = json.loads(request.body)

            tipo = datos.get('tipoReporte')
            contenido = datos.get('contenido')

            if not tipo or not contenido:
                return JsonResponse({'error': 'Faltan campos requeridos (tipoReporte, contenido)'}, status=400)

            reporte = Reporte(tipoReporte=tipo)
            reporte.generarReporte(contenido)

            # Supongamos que exportarReporte devuelve el nombre relativo, ej: 'reportes/reporte_123.pdf'
            url_relativa = reporte.exportarReporte()

            # Construir URL absoluta para acceder desde el frontend
            url_completa = request.build_absolute_uri(settings.MEDIA_URL + url_relativa)

            return JsonResponse({
                'mensaje': 'Reporte generado correctamente',
                'reporteId': reporte.id,
                'fecha': reporte.fechaGeneracion,
                'url': url_completa
            })

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Método no permitido'}, status=405)
