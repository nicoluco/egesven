from django.shortcuts import render
from django.contrib.auth import authenticate,logout,login
from django.shortcuts import redirect 

# Create your views here.
def productos(request):
    return render(request, 'index.html')

def oldlogin(request):
    return render(request, 'login.html')

def registro(request):
    return render(request, 'registro.html')

def perfil(request):
    return render(request, 'perfil.html')

def ListaProducto(request):
    return render(request, 'ListaProducto.html')

def ListaUsuario(request):
    return render(request, 'ListaUsuario.html')




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
