
# Create your views here.
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Perfil
import json
from django.contrib.auth import authenticate

@csrf_exempt
def crear_usuario(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('usuario')
        password = data.get('contraseña')
        rol = data.get('rol', 'cliente')

        if not username or not password:
            return JsonResponse({'error': 'Faltan datos'}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'El usuario ya existe'}, status=400)

        user = User.objects.create(
            username=username,
            password=make_password(password)
        )

        Perfil.objects.create(usuario=user, rol=rol)

        return JsonResponse({'id': user.id, 'usuario': user.username, 'rol': rol})



@csrf_exempt
def obtener_usuarios(request):
    if request.method == 'GET':
        perfiles = Perfil.objects.select_related('usuario').all()
        data = [
            {
                'id': perfil.usuario.id,
                'usuario': perfil.usuario.username,
                'rol': perfil.rol
            }
            for perfil in perfiles
        ]
        return JsonResponse(data, safe=False)



@csrf_exempt
def actualizar_usuario(request, user_id):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            user = User.objects.get(id=user_id)
            perfil = Perfil.objects.get(usuario=user)

            username = data.get('usuario')
            rol = data.get('rol')
            password = data.get('contraseña')  # Aquí capturamos la contraseña

            if username:
                user.username = username

            if password:
                user.password = make_password(password)  # Hashea la contraseña

            user.save()

            if rol:
                perfil.rol = rol
                perfil.save()

            return JsonResponse({'mensaje': 'Usuario actualizado'})
        except User.DoesNotExist:
            return JsonResponse({'error': 'Usuario no encontrado'}, status=404)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)

    
@csrf_exempt
def eliminar_usuario(request, user_id):
    if request.method == 'DELETE':
        try:
            user = User.objects.get(id=user_id)
            user.delete()
            return JsonResponse({'mensaje': 'Usuario eliminado correctamente'})
        except User.DoesNotExist:
            return JsonResponse({'error': 'Usuario no encontrado'}, status=404)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)
    


@csrf_exempt
def login(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("usuario")
            password = data.get("contraseña")

            user = authenticate(username=username, password=password)
            if user is not None:
                try:
                    perfil = Perfil.objects.get(usuario=user)
                    return JsonResponse({
                        "mensaje": "Login exitoso",
                        "usuario_id": user.id,
                        "usuario": user.username,
                        "rol": perfil.rol,
                    })
                except Perfil.DoesNotExist:
                    return JsonResponse({"error": "Perfil no encontrado"}, status=404)
            else:
                return JsonResponse({"error": "Credenciales inválidas"}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({"error": "JSON inválido"}, status=400)
    else:
        return JsonResponse({"error": "Método no permitido"}, status=405)
