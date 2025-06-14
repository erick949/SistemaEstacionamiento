from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from datetime import datetime
import json
from .models import Reporte
from pago.models import Pago


@csrf_exempt
def generar_reporte(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Método no permitido'}, status=405)

    try:
        datos = json.loads(request.body)

        tipo = datos.get('tipoReporte')
        fecha_inicio = datos.get('fechaInicio')
        fecha_fin = datos.get('fechaFin')
        usuario = datos.get('usuario')
        resumen = datos.get('resumen')
        observaciones = datos.get('observaciones')

        faltantes = [campo for campo in ['tipoReporte', 'fechaInicio', 'fechaFin', 'usuario', 'resumen', 'observaciones'] if not datos.get(campo)]

        if faltantes:
            return JsonResponse({'error': f'Faltan campos requeridos: {", ".join(faltantes)}'}, status=400)

        # resto del código...


        # Crear contenido del reporte según el tipo
        contenido = f"""
--- REPORTE GENERADO AUTOMÁTICAMENTE ---

Tipo de Reporte: {tipo}
Fecha de Inicio: {fecha_inicio}
Fecha de Fin: {fecha_fin}
Usuario: {usuario}

Resumen:
{resumen}

Observaciones:
{observaciones}
""".strip()

        if tipo == 'Financiero':
            pagos = Pago.objects.filter(fechaPago__range=[fecha_inicio, fecha_fin]).order_by('fechaPago')
            contenido += "\n\n--- Detalle de Pagos ---\n"
            contenido += f"{'ID':<5} {'Cliente':<20} {'Monto':<10} {'Método':<15} {'Fecha de Pago':<20}\n"
            contenido += "-" * 75 + "\n"
            for p in pagos:
                cliente_str = str(p.cliente)  # Ajusta si es ForeignKey
                fecha_pago = p.fechaPago.strftime('%Y-%m-%d %H:%M') if p.fechaPago else 'Sin fecha'
                contenido += f"{p.id:<5} {cliente_str:<20} ${p.monto:<10.2f} {p.metodoPago:<15} {fecha_pago:<20}\n"

        # Crear y exportar el reporte
        reporte = Reporte(tipoReporte=tipo)
        reporte.generarReporte(contenido)
        url_relativa = reporte.exportarReporte()
        url_completa = request.build_absolute_uri(settings.MEDIA_URL + url_relativa)

        return JsonResponse({
            'mensaje': 'Reporte generado correctamente',
            'reporteId': reporte.id,
            'fecha': reporte.fechaGeneracion,
            'url': url_completa
        })

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)