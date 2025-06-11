from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Tarifa
import json

@csrf_exempt
def crear_tarifa(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            descripcion = data.get('descripcion')
            precioPorHora = data.get('precioPorHora')
            precioPorDia = data.get('precioPorDia', None)

            if not descripcion or precioPorHora is None:
                return JsonResponse({'error': 'Faltan campos obligatorios'}, status=400)

            tarifa = Tarifa.objects.create(
                descripcion=descripcion,
                precioPorHora=precioPorHora,
                precioPorDia=precioPorDia
            )
            return JsonResponse({'id': tarifa.id, 'mensaje': 'Tarifa creada con éxito'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'JSON inválido'}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


def obtener_tarifas(request):
    if request.method == 'GET':
        tarifas = Tarifa.objects.all()
        data = [
            {
                'id': t.id,
                'descripcion': t.descripcion,
                'precioPorHora': float(t.precioPorHora),
                'precioPorDia': float(t.precioPorDia) if t.precioPorDia else None
            }
            for t in tarifas
        ]
        return JsonResponse(data, safe=False)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


def obtener_tarifa(request, tarifa_id):
    if request.method == 'GET':
        try:
            tarifa = Tarifa.objects.get(id=tarifa_id)
            data = {
                'id': tarifa.id,
                'descripcion': tarifa.descripcion,
                'precioPorHora': float(tarifa.precioPorHora),
                'precioPorDia': float(tarifa.precioPorDia) if tarifa.precioPorDia else None
            }
            return JsonResponse(data)
        except Tarifa.DoesNotExist:
            return JsonResponse({'error': 'Tarifa no encontrada'}, status=404)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


@csrf_exempt
def actualizar_tarifa(request, tarifa_id):
    if request.method == 'PUT':
        try:
            tarifa = Tarifa.objects.get(id=tarifa_id)
            data = json.loads(request.body)

            tarifa.descripcion = data.get('descripcion', tarifa.descripcion)
            tarifa.precioPorHora = data.get('precioPorHora', tarifa.precioPorHora)
            tarifa.precioPorDia = data.get('precioPorDia', tarifa.precioPorDia)
            tarifa.save()

            return JsonResponse({'mensaje': 'Tarifa actualizada correctamente'})
        except Tarifa.DoesNotExist:
            return JsonResponse({'error': 'Tarifa no encontrada'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'JSON inválido'}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


@csrf_exempt
def eliminar_tarifa(request, tarifa_id):
    if request.method == 'DELETE':
        try:
            tarifa = Tarifa.objects.get(id=tarifa_id)
            tarifa.delete()
            return JsonResponse({'mensaje': 'Tarifa eliminada correctamente'})
        except Tarifa.DoesNotExist:
            return JsonResponse({'error': 'Tarifa no encontrada'}, status=404)

    return JsonResponse({'error': 'Método no permitido'}, status=405)
