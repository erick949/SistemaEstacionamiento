from django.urls import path
from . import views

urlpatterns = [
    path('registrar/', views.registrar_pago, name='registrar_pago'),
    path('listar/', views.obtener_pagos, name='obtener_pagos'),
    path('eliminar/<int:pago_id>/', views.eliminar_pago, name='eliminar_pago'),
    path('suma/', views.suma_pagos_por_rango, name='suma_pagos_por_rango'),
]
