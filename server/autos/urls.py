from django.urls import path
from . import views

urlpatterns = [
    path('crear/', views.crear_auto, name='crear_auto'),
    path('', views.obtener_autos, name='listar_autos'),
    path('actualizar/<int:auto_id>/', views.actualizar_auto, name='actualizar_auto'),
    path('eliminar/<int:auto_id>/', views.eliminar_auto, name='eliminar_auto'),
]
