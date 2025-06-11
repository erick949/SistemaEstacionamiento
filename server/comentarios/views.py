from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import ComentarioCliente
from django.contrib.auth.models import User
import json
from django.utils.timezone import localtime


@csrf_exempt
def registrar_comentario(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            cliente_id = data.get('cliente')
            calificacion = data.get('calificacion')
            comentario = data.get('comentario')

            if not all([cliente_id, calificacion, comentario]):
                return JsonResponse({'error': 'Datos incompletos'}, status=400)

            try:
                cliente = User.objects.get(id=cliente_id)
            except User.DoesNotExist:
                return JsonResponse({'error': 'Cliente no encontrado'}, status=404)

            comentario_obj = ComentarioCliente.objects.create(
                cliente=cliente,
                calificacion=calificacion,
                comentario=comentario
            )

            return JsonResponse({
                'id': comentario_obj.id,
                'mensaje': 'Comentario registrado con éxito'
            })

        except json.JSONDecodeError:
            return JsonResponse({'error': 'JSON inválido'}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


@csrf_exempt
def obtener_comentarios(request):
    if request.method == 'GET':
        comentarios = ComentarioCliente.objects.select_related('cliente').all().order_by('-fechaComentario')
        data = [
            {
                'id': c.id,
                'cliente': c.cliente.username,
                'calificacion': c.calificacion,
                'comentario': c.comentario,
                'fechaComentario': localtime(c.fechaComentario).strftime('%Y-%m-%d %H:%M:%S'),
            }
            for c in comentarios
        ]
        return JsonResponse(data, safe=False)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


@csrf_exempt
def eliminar_comentario(request, comentario_id):
    if request.method == 'DELETE':
        try:
            comentario = ComentarioCliente.objects.get(id=comentario_id)
            comentario.delete()
            return JsonResponse({'mensaje': 'Comentario eliminado correctamente'})
        except ComentarioCliente.DoesNotExist:
            return JsonResponse({'error': 'Comentario no encontrado'}, status=404)

    return JsonResponse({'error': 'Método no permitido'}, status=405)
