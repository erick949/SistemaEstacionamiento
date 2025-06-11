from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Auto
from django.contrib.auth.models import User
import json

@csrf_exempt
def crear_auto(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            placa = data.get('placa')
            modelo = data.get('modelo')
            color = data.get('color')
            cliente = data.get('cliente')

            if not all([placa, modelo, color, cliente]):
                return JsonResponse({'error': 'Faltan datos'}, status=400)

            try:
                cliente = User.objects.get(id=cliente)
            except User.DoesNotExist:
                return JsonResponse({'error': 'Cliente no encontrado'}, status=404)

            auto = Auto.objects.create(
                placa=placa,
                modelo=modelo,
                color=color,
                cliente=cliente
            )

            return JsonResponse({'id': auto.id, 'mensaje': 'Auto creado con éxito'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'JSON inválido'}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


@csrf_exempt
def obtener_autos(request):
    if request.method == 'GET':
        autos = Auto.objects.select_related('cliente').all()
        
        data = [
            {
                'id': auto.id,
                'placa': auto.placa,
                'modelo': auto.modelo,
                'color': auto.color,
                'cliente_id': auto.cliente.id,
                'cliente_usuario': auto.cliente.username
            }
            for auto in autos
        ]
        return JsonResponse(data, safe=False)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


@csrf_exempt
def actualizar_auto(request, auto_id):
    if request.method == 'PUT':
        try:
            auto = Auto.objects.get(id=auto_id)
            data = json.loads(request.body)

            auto.placa = data.get('placa', auto.placa)
            auto.modelo = data.get('modelo', auto.modelo)
            auto.color = data.get('color', auto.color)

            cliente = data.get('cliente')
            if cliente:
                try:
                    cliente = User.objects.get(id=cliente)
                    auto.cliente = cliente
                except User.DoesNotExist:
                    return JsonResponse({'error': 'Cliente no encontrado'}, status=404)

            auto.save()
            return JsonResponse({'mensaje': 'Auto actualizado con éxito'})
        except Auto.DoesNotExist:
            return JsonResponse({'error': 'Auto no encontrado'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'JSON inválido'}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


@csrf_exempt
def eliminar_auto(request, auto_id):
    if request.method == 'DELETE':
        try:
            auto = Auto.objects.get(id=auto_id)
            auto.delete()
            return JsonResponse({'mensaje': 'Auto eliminado correctamente'})
        except Auto.DoesNotExist:
            return JsonResponse({'error': 'Auto no encontrado'}, status=404)

    return JsonResponse({'error': 'Método no permitido'}, status=405)
