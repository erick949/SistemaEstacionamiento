from django.urls import path
from . import views

urlpatterns = [
    path('crear/', views.crear_persona),
    path('', views.obtener_personas),
    path('<int:persona_id>/actualizar/', views.actualizar_persona),
    path('<int:persona_id>/eliminar/', views.eliminar_persona),
]
