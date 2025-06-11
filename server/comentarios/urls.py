from django.urls import path
from . import views

urlpatterns = [
    path('registrar/', views.registrar_comentario, name='registrar_comentario'),
    path('obtener/', views.obtener_comentarios, name='obtener_comentarios'),
    path('eliminar/<int:comentario_id>/', views.eliminar_comentario, name='eliminar_comentario'),
]
