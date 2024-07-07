// Variables
const carrito = document.querySelector('#carrito');
const listaLibros = document.querySelector('#lista-libros');
const contenedorCarrito = document.querySelector('#lista-carrito tbody'); //tbody es donde se va a ir agregando el HTML de forma dinamica una vez que vamos agregando cosas al carrito
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
const totalLibros = document.querySelector('.total-libros'); 
let articulosCarrito = [];

// Listeners
cargarEventListeners();
function cargarEventListeners() {
    //cuando agregas contenido al carrito
    listaLibros.addEventListener('click', agregarLibro);

    //Eliminar libro del carrito
    carrito.addEventListener('click', eliminarLibro);

    //muestra los cursos del local storage
    document.addEventListener('DOMContentLoaded', () =>{
        articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || []; // o en caso de que no haya nada que sea un arrego vacio-- el parse trae el String del local y lo pasa a objeto o arreglo dependiendo de la forma adecuada
        carritoHTML();
    })

    //Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //reseteamos el arreglo
        localStorage.clear('carrito');
        while (totalLibros.firstChild) {
        totalLibros.removeChild(totalLibros.firstChild)
        }
        limpiarHTML(); //Luego Eliminar el HTML del carrito

        
    })

}


//Funciones
function agregarLibro(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const libroSeleccionado = e.target.parentElement.parentElement;
        // console.log(e.target.parentElement.parentElement)  para no pasar todo esto, crea la variable de arriba

        leerDatoCard(libroSeleccionado); //y lo pasa a esta otra función que va a buscar un libro

    }
    
}

//funcion eliminar del carrito

function eliminarLibro(e) {
    // console.log(e.target.classList) VEO LAS CLASES Q TIENE EL BOTON X
    if (e.target.classList.contains('borrar-libro')) {
        // console.log(e.target.getAttribute('data-id')); acá se puede visualizar que cada uno tiene correctamente su id unico y corta ese codigo transformandolo en una variable
        const libroId = e.target.getAttribute('data-id')
        //elimina del arreglo por el data-id
        articulosCarrito = articulosCarrito.filter(libro => libro.id !== libroId); //acá dice que traiga todo lo del carrito excepto ese, y no pone === porque sino se crea otro arreglo
        
        carritoHTML();// para que itere sobre el y muestre su HTML
    }    
}

  console.log(articulosCarrito);

// console.log(e.target.classList) //se peuden ver las clases apretando encima
// console.log(e.target.parentElement.parentElement) //busca el elemento padre

//LEE LA INFORMACIÓN del HTML al que le dimos click y le extrae la información

function leerDatoCard(libro) {
    //console.log(libro); // sirve para ver donde se localizan los contenidos de la card
    //Crear un objeto con el contenido del libro actual
    const infoLibro = {
        imagen: libro.querySelector('img').src, //extrae la foto del src
        titulo: libro.querySelector('h5').textContent, //para extraer el texto
        precio: libro.querySelector('p').textContent,
        id: libro.querySelector('a').getAttribute('data-id'),  //asi se selecciona un atributo
        cantidad: 1
    }

    
    // console.log(articulosCarrito);

    
    //console.log(infoLibro); //se visualiza como va quedando la informacion

    //revisa si un elemneto ya existe en el carrito
    const existe = articulosCarrito.some(libro => libro.id === infoLibro.id);//some permite iterar sobre una lista de objetos y ver si el articulo ya esta
    if (existe) {
        //actualizamos cantidad
        const libros = articulosCarrito.map(libro => { //map itera y crea un nuevo arreglo que se le asigana a la variable libros
            if (libro.id === infoLibro.id) {
                libro.cantidad++;
                let precio = parseInt(infoLibro.precio.replace(/[$.,]/gi, '')) * libro.cantidad;
                libro.precio = '$' + precio;
                return libro; //retorna objetos acuatizados
            }
            else {
                return libro; //retorna los objetos que no son duplicados
            }

        });
        articulosCarrito = [...libros];
    }else {
        //arreglo para ir agregando cosas al carrito
        articulosCarrito = [...articulosCarrito, infoLibro]; //se incluye adentro el mismo carrrito para que no se vayan borrando los articulos agregados

    }
   
    carritoHTML(); 

}

//muestra el Carrrito de compras en el HTML
function carritoHTML() {

    //limpiar el HTML
    limpiarHTML();
    //recorre el carrito y genera el HTML
    let total = 0;
    articulosCarrito.forEach(libro => {  //forEach es una iteracion en las listas
        const { imagen, titulo, precio, cantidad, id } = libro;
        let precio2 = parseInt(precio.replace(/[$.,]/gi, ''));
        total = total+precio2
        console.log('total '+total)
        const row = document.createElement('tr'); // crea un tr ya que esto va a ir en el tbody
        
        row.innerHTML = ` 
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class ="borrar-libro fa-solid fa-trash custom-color" data-id="${id}"></a>
            </td>
            
        `;//crea un temple de string o de litera

        //agregar el HTML del cerrito al tbody
        contenedorCarrito.appendChild(row);
    }); 
    while (totalLibros.firstChild) {
        totalLibros.removeChild(totalLibros.firstChild)
    }
    const totalLibros2= document.createElement('span');
    totalLibros2.innerHTML = ` $${total}`;
    totalLibros.appendChild(totalLibros2);
    

    // Agregar el carrito al storage
    sincronizarStorage();

}

//funcion del localstorage
function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}


//elimina los libros del tbody
function limpiarHTML() {
    //contenedorCarrito.innerHTML = ''; para vaciar el HTML del carrito y no hayan duplicados

    //una forma mejor de eliminar sin usar el HTML es con el while
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}




