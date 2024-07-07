from django.urls import path
from .views import productos,flogin,registro,perfil,ListaUsuario,ListaProducto,flogout,eliminarUsuario,editarUsuario

urlpatterns = [
    path('productos', productos, name="productos"),
    path('login', flogin, name="login"),
    path('registro', registro, name="registro"),
    path('perfil', perfil, name="perfil"),
    path('ListaUsuario/', ListaUsuario, name="ListaUsuario"),
    path('ListaProducto', ListaProducto, name="ListaProducto"),
    path('logout/', flogout,name="logout"),
    path('eliminarUsuario/<str:username>/', eliminarUsuario, name="eliminarUsuario"),
    path('editarUsuario/<str:username>/', editarUsuario, name="editarUsuario"),

]
