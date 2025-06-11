from django.urls import path
from .views import generar_reporte

urlpatterns = [
    path('generar/', generar_reporte, name='generar_reporte'),
]
