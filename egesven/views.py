from django.shortcuts import render

# Create your views here.
def productos(request):
    return render(request, 'index.html')

def login(request):
    return render(request, 'login.html')

def registro(request):
    return render(request, 'registro.html')

def perfil(request):
    return render(request, 'perfil.html')

def ListaProducto(request):
    return render(request, 'ListaProducto.html')

def ListaUsuario(request):
    return render(request, 'ListaUsuario.html')