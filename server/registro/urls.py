from django.urls import path
from . import views

urlpatterns = [
    path('crear/', views.crear_registro),
    path('<int:registro_id>/salida/', views.registrar_salida),
    path('', views.obtener_registros),
    path('<int:registro_id>/eliminar/', views.eliminar_registro),
]
