from django.shortcuts import render
from django.contrib.auth import authenticate,logout,login
from django.shortcuts import redirect
from django.contrib.auth.models import User

# Create your views here.


def index(request):
    return render(request, "index.html")


def productos(request):
    return render(request, 'index.html')

def oldlogin(request):
    return render(request, 'login.html')

def registro(request):
    if(request.method=='POST'):
        Djuser = User.objects.create_user(request.POST.get('nombre-usuario'), request.POST.get('email'),request.POST.get('pass'))
        Djuser.save()
        print('registrado')
        redirect('login.html')
    return render(request, 'registro.html')

def perfil(request):
    context={}
    context['user']= request.user
    return render(request, 'perfil.html',context)

def ListaProducto(request):
    return render(request, 'ListaProducto.html')

def ListaUsuario(request):
    context={}
    context['usuarios']= User.objects.all()
    return render(request, 'ListaUsuario.html',context)


def flogin(request):
    context={}

    if request.user.is_authenticated:
        return redirect('perfil')
    data={}


    if(request.method=='POST'):
        print(request.POST)
        user = authenticate(username=request.POST.get('correo-inicio'), password=request.POST.get('passinicio'))
        if user is not None:
            login(request,user)
            data['title']='Logueado'
            return redirect('perfil')
            print('logueado')
        
        else:
            data['title']='No logueado :('

    return render (request,'login.html',context)


def flogout(request):
    logout(request)

    return redirect('login')


def eliminarUsuario(request,username):
    Usuario = User.objects.get(username=username)
    Usuario.delete()

    return redirect ('ListaUsuario')


def editarUsuario(request,username):
    Usuario = User.objects.get(username=username)
    if(request.method=='POST'):
        Usuario.username = request.POST.get('new-nombre-usuario')
        Usuario.save()
        return redirect('ListaUsuario')
        
    
    context={}
    context['user']= Usuario

    return render(request,'edicionUsuario.html', context)
