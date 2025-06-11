from django.urls import path
from . import views

urlpatterns = [
    path('crear/', views.crear_reserva, name='crear_reserva'),
    path('', views.obtener_reservas, name='listar_reservas'),
    path('actualizar/<int:reserva_id>/', views.actualizar_reserva, name='actualizar_reserva'),
    path('eliminar/<int:reserva_id>/', views.eliminar_reserva, name='eliminar_reserva'),
]
