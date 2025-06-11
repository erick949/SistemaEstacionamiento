
# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Reserva

@csrf_exempt
def crear_reserva(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            id_auto = data.get('id_auto')
            fecha_reserva = data.get('fecha_reserva')
            hora_reserva = data.get('hora_reserva')
            duracion = data.get('duracion')

            if not all([id_auto, fecha_reserva, hora_reserva, duracion]):
                return JsonResponse({'error': 'Faltan datos'}, status=400)

            reserva = Reserva.objects.create(
                id_auto=id_auto,
                fecha_reserva=fecha_reserva,
                hora_reserva=hora_reserva,
                duracion=duracion
            )

            return JsonResponse({
                'id': reserva.id,
                'id_auto': reserva.id_auto,
                'fecha_reserva': str(reserva.fecha_reserva),
                'hora_reserva': str(reserva.hora_reserva),
                'duracion': reserva.duracion
            })
        except json.JSONDecodeError:
            return JsonResponse({'error': 'JSON inválido'}, status=400)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)


@csrf_exempt
def obtener_reservas(request):
    if request.method == 'GET':
        reservas = Reserva.objects.all()
        data = [
            {
                'id': r.id,
                'id_auto': r.id_auto,
                'fecha_reserva': str(r.fecha_reserva),
                'hora_reserva': str(r.hora_reserva),
                'duracion': r.duracion,
            }
            for r in reservas
        ]
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)


@csrf_exempt
def actualizar_reserva(request, reserva_id):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            reserva = Reserva.objects.get(id=reserva_id)

            id_auto = data.get('id_auto')
            fecha_reserva = data.get('fecha_reserva')
            hora_reserva = data.get('hora_reserva')
            duracion = data.get('duracion')

            if id_auto:
                reserva.id_auto = id_auto
            if fecha_reserva:
                reserva.fecha_reserva = fecha_reserva
            if hora_reserva:
                reserva.hora_reserva = hora_reserva
            if duracion:
                reserva.duracion = duracion

            reserva.save()

            return JsonResponse({'mensaje': 'Reserva actualizada'})
        except Reserva.DoesNotExist:
            return JsonResponse({'error': 'Reserva no encontrada'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'JSON inválido'}, status=400)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)


@csrf_exempt
def eliminar_reserva(request, reserva_id):
    if request.method == 'DELETE':
        try:
            reserva = Reserva.objects.get(id=reserva_id)
            reserva.delete()
            return JsonResponse({'mensaje': 'Reserva eliminada correctamente'})
        except Reserva.DoesNotExist:
            return JsonResponse({'error': 'Reserva no encontrada'}, status=404)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)
