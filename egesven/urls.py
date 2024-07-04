from django.urls import path
from .views import productos,login,registro,perfil,ListaUsuario,ListaProducto

urlpatterns = [
    path('productos', productos, name="productos"),
    path('login', login, name="login"),
    path('registro', registro, name="registro"),
    path('perfil', perfil, name="perfil"),
    path('ListaUsuario', ListaUsuario, name="ListaUsuario"),
    path('ListaProducto', ListaProducto, name="ListaProducto"),

]
