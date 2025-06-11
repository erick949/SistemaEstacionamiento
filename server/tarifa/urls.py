from django.urls import path
from . import views
urlpatterns = [
    path('', views.obtener_tarifas, name='obtener_tarifas'),           # GET lista
    path('crear/', views.crear_tarifa, name='crear_tarifa'),            # POST crear
    path('<int:tarifa_id>/', views.obtener_tarifa, name='obtener_tarifa'),  # GET detalle
    path('<int:tarifa_id>/actualizar/', views.actualizar_tarifa, name='actualizar_tarifa'),  # PUT actualizar
    path('<int:tarifa_id>/eliminar/', views.eliminar_tarifa, name='eliminar_tarifa'),        # DELETE eliminar
]
