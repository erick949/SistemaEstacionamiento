from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Pago
from registro.models import Registro
from django.contrib.auth.models import User
import json
from decimal import Decimal
from django.utils import timezone
from datetime import timedelta
from django.db.models import Sum
from django.utils.timezone import localtime


@csrf_exempt
def suma_pagos_por_rango(request):
    if request.method == 'GET':
        rango = request.GET.get('rango', '').lower()  # Puede ser 'dia', 'semana', 'mes', 'año'

        if rango not in ['dia', 'semana', 'mes', 'año']:
            return JsonResponse({'error': 'Parámetro rango inválido. Usa dia, semana, mes o año.'}, status=400)

        ahora = timezone.now()

        if rango == 'dia':
            fecha_inicio = ahora - timedelta(days=1)
        elif rango == 'semana':
            fecha_inicio = ahora - timedelta(weeks=1)
        elif rango == 'mes':
            fecha_inicio = ahora - timedelta(days=30)
        elif rango == 'año':
            fecha_inicio = ahora - timedelta(days=365)

        # Filtrar pagos en el rango de tiempo
        pagos = Pago.objects.filter(fechaPago__gte=fecha_inicio)

        # Agrupar por día
        pagos_agrupados = pagos.extra({'fecha': "date(fechaPago)"}).values('fecha').annotate(total=Sum('monto')).order_by('fecha')

        # ✅ Aquí se elimina el uso de strftime
        data = [
            {'name': pago['fecha'], 'ingresos': float(pago['total'])}
            for pago in pagos_agrupados
        ]

        return JsonResponse(data, safe=False)

    return JsonResponse({'error': 'Método no permitido'}, status=405)

@csrf_exempt
def registrar_pago(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            registro_id = data.get('registro')
            cliente_id = data.get('cliente')
            monto = data.get('monto')
            metodo_pago = data.get('metodoPago')

            if not all([registro_id, cliente_id, monto, metodo_pago]):
                return JsonResponse({'error': 'Datos incompletos'}, status=400)

            try:
                registro = Registro.objects.get(id=registro_id)
            except Registro.DoesNotExist:
                return JsonResponse({'error': 'Registro no encontrado'}, status=404)

            try:
                cliente = User.objects.get(id=cliente_id)
            except User.DoesNotExist:
                return JsonResponse({'error': 'Cliente no encontrado'}, status=404)

            pago = Pago.objects.create(
                registro=registro,
                cliente=cliente,
                monto=Decimal(monto),
                metodoPago=metodo_pago
            )

            return JsonResponse({'id': pago.id, 'mensaje': 'Pago registrado con éxito'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'JSON inválido'}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


@csrf_exempt
def obtener_pagos(request):
    if request.method == 'GET':
        pagos = Pago.objects.select_related('cliente', 'registro').all()
        data = [
            {
                'id': p.id,
                'registro_id': p.registro.id,
                'cliente': p.cliente.username,
                'fechaPago': localtime(p.fechaPago).strftime('%Y-%m-%d %H:%M:%S'),  # 👈 Este es el cambio importante
                'monto': float(p.monto),
                'metodoPago': p.metodoPago
            }
            for p in pagos
        ]
        return JsonResponse(data, safe=False)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


@csrf_exempt
def eliminar_pago(request, pago_id):
    if request.method == 'DELETE':
        try:
            pago = Pago.objects.get(id=pago_id)
            pago.delete()
            return JsonResponse({'mensaje': 'Pago eliminado correctamente'})
        except Pago.DoesNotExist:
            return JsonResponse({'error': 'Pago no encontrado'}, status=404)
    
    return JsonResponse({'error': 'Método no permitido'}, status=405)
