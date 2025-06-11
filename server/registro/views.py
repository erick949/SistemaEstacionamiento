from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Registro, Auto
import json
from datetime import datetime

@csrf_exempt
def crear_registro(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            auto_id = data.get('auto')

            if not auto_id:
                return JsonResponse({'error': 'Falta el ID del auto'}, status=400)

            try:
                auto = Auto.objects.get(id=auto_id)
            except Auto.DoesNotExist:
                return JsonResponse({'error': 'Auto no encontrado'}, status=404)

            registro = Registro.objects.create(auto=auto)
            return JsonResponse({'id': registro.id, 'mensaje': 'Entrada registrada con éxito'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'JSON inválido'}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)

@csrf_exempt
def registrar_salida(request, registro_id):
    if request.method == 'PUT':
        try:
            registro = Registro.objects.get(id=registro_id)

            if registro.fechaSalida:
                return JsonResponse({'error': 'El auto ya ha salido'}, status=400)

            registro.registrarSalida()
            return JsonResponse({
                'id': registro.id,
                'mensaje': 'Salida registrada con éxito',
                'costoTotal': float(registro.costoTotal)
            })
        except Registro.DoesNotExist:
            return JsonResponse({'error': 'Registro no encontrado'}, status=404)

    return JsonResponse({'error': 'Método no permitido'}, status=405)

@csrf_exempt
def obtener_registros(request):
    if request.method == 'GET':
        registros = Registro.objects.select_related('auto').all()
        data = [
            {
                'id': reg.id,
                'auto_id': reg.auto.id,
                'placa': reg.auto.placa,
                'fechaEntrada': reg.fechaEntrada.strftime('%Y-%m-%d %H:%M:%S'),
                'fechaSalida': reg.fechaSalida.strftime('%Y-%m-%d %H:%M:%S') if reg.fechaSalida else None,
                'costoTotal': float(reg.costoTotal) if reg.costoTotal else None
            }
            for reg in registros
        ]
        return JsonResponse(data, safe=False)

    return JsonResponse({'error': 'Método no permitido'}, status=405)

@csrf_exempt
def eliminar_registro(request, registro_id):
    if request.method == 'DELETE':
        try:
            registro = Registro.objects.get(id=registro_id)
            registro.delete()
            return JsonResponse({'mensaje': 'Registro eliminado correctamente'})
        except Registro.DoesNotExist:
            return JsonResponse({'error': 'Registro no encontrado'}, status=404)

    return JsonResponse({'error': 'Método no permitido'}, status=405)
