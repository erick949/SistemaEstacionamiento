from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Persona
from django.contrib.auth.models import User
import json
from datetime import datetime

@csrf_exempt
def crear_persona(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user_id = data.get('user')  # ID del usuario ya creado
            telefono = data.get('telefono', '')
            direccion = data.get('direccion', '')
            fecha_nacimiento = data.get('fecha_nacimiento')  # formato: 'YYYY-MM-DD'

            if not user_id:
                return JsonResponse({'error': 'Falta el ID del usuario'}, status=400)

            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                return JsonResponse({'error': 'Usuario no encontrado'}, status=404)

            persona = Persona.objects.create(
                user=user,
                telefono=telefono,
                direccion=direccion,
                fecha_nacimiento=fecha_nacimiento if fecha_nacimiento else None
            )

            return JsonResponse({'id': persona.id, 'mensaje': 'Persona creada con éxito'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'JSON inválido'}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)

@csrf_exempt
def obtener_personas(request):
    if request.method == 'GET':
        personas = Persona.objects.select_related('user').all()
        data = [
            {
                'id': persona.id,
                'user_id': persona.user.id,
                'username': persona.user.username,
                'nombre_completo': persona.user.get_full_name(),
                'telefono': persona.telefono,
                'direccion': persona.direccion,
                'fecha_nacimiento': persona.fecha_nacimiento.strftime('%Y-%m-%d') if persona.fecha_nacimiento else None
            }
            for persona in personas
        ]
        return JsonResponse(data, safe=False)

    return JsonResponse({'error': 'Método no permitido'}, status=405)

@csrf_exempt
def actualizar_persona(request, persona_id):
    if request.method == 'PUT':
        try:
            persona = Persona.objects.get(id=persona_id)
            data = json.loads(request.body)

            telefono = data.get('telefono', persona.telefono)
            direccion = data.get('direccion', persona.direccion)
            fecha_nacimiento = data.get('fecha_nacimiento', persona.fecha_nacimiento)

            if fecha_nacimiento:
                try:
                    fecha_nacimiento = datetime.strptime(fecha_nacimiento, '%Y-%m-%d').date()
                except ValueError:
                    return JsonResponse({'error': 'Formato de fecha inválido. Use YYYY-MM-DD'}, status=400)

            persona.telefono = telefono
            persona.direccion = direccion
            persona.fecha_nacimiento = fecha_nacimiento
            persona.save()

            return JsonResponse({'mensaje': 'Persona actualizada con éxito'})
        except Persona.DoesNotExist:
            return JsonResponse({'error': 'Persona no encontrada'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'JSON inválido'}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)

@csrf_exempt
def eliminar_persona(request, persona_id):
    if request.method == 'DELETE':
        try:
            persona = Persona.objects.get(id=persona_id)
            persona.delete()
            return JsonResponse({'mensaje': 'Persona eliminada correctamente'})
        except Persona.DoesNotExist:
            return JsonResponse({'error': 'Persona no encontrada'}, status=404)

    return JsonResponse({'error': 'Método no permitido'}, status=405)
