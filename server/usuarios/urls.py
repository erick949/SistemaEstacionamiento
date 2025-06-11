from django.urls import path
from . import views
from .views import login

urlpatterns = [
    path('crear/', views.crear_usuario),
    path('', views.obtener_usuarios),
    path('<int:user_id>/', views.actualizar_usuario),
    path('eliminar/<int:user_id>/', views.eliminar_usuario),  
    path('login/', login, name='login'),
]
