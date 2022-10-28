"use strict";
const listacursos = document.querySelector('#lista-cursos');
const carrito = document.querySelector('#carrito');
const carritoList = document.querySelector('#carrito-list tbody');
const carritotable = document.querySelector('#table-carrito');
const btncard = document.querySelector('.card-btn')

console.log(btncard);
let carritocargado=[];




cargarEvenLiteners();
function cargarEvenLiteners(){
    listacursos.addEventListener('click', agregarCursos);
    listacursos.addEventListener('click', ()=>{
        Toastify({
            text: "Se agregó con exito",
            className: "info",
            style: {
              background: "linear-gradient(to right, green, green)",
            }
          }).showToast();
    });

    //elimnar cursos del carrito del
    carritotable.addEventListener('click', elimnarCarrito);
    document.addEventListener('DOMContentLoaded', () => {
        carritocargado = JSON.parse( localStorage.getItem('carrito') ) || []  ;
        // console.log(articulosCarrito);
        carritoHtml();
   });

}

function elimnarCarrito(e){

    if (e.target.classList.contains('borrar')){
        const modeloID = e.target.getAttribute('data-id');
        carritocargado = carritocargado.filter( deteCarrito => deteCarrito.id !== modeloID );
        carritoHtml();
    }
}

function agregarCursos(e){
    e.preventDefault();
if (e.target.classList.contains ('agregar-carrito')){
    const cursosseleccionado=  e.target.parentElement.parentElement.parentElement;
    leerDatos(cursosseleccionado);
   
    
};
}


//leee el contenido html al quie le dimos click y extrae la informacion
function leerDatos(detalle){

    //Creamos un objeto desde los datos de html 
    const inforcard = {
        imagen: detalle.querySelector('img').src,
        nombre: detalle.querySelector('h5').textContent,
        precio: detalle.querySelector('p').textContent,
        id: detalle.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }

//reviszar si ya existe el articulo seleccionado 
    const existe = carritocargado.some(detalle => detalle.id === inforcard.id );
     if(existe){
         const listfinal = carritocargado.map(detalle =>{
             if(detalle.id === inforcard.id){
                 detalle.cantidad++
                 return detalle;
             }else{
                 return detalle;
             }
         }) 
         carritocargado = [...listfinal]
     }else{
        carritocargado = [ ...carritocargado, inforcard]
        console.log(carritocargado);
     }

    //mostramos en el dropdow el elemento selecionado del carrito
    carritoHtml();
}

//mutres en carrito
function carritoHtml(){
    limpiarhtml()
    carritocargado.forEach(deteCarrito =>{
    const { imagen, nombre, precio, cantidad,id} = deteCarrito;
        const row =  document.createElement('tr');
        row.innerHTML=`<td>
            <img src="${imagen}" width="100" >
        </td>
        <td>
        ${nombre}
        </td>
        <td>
        ${precio}
        </td>
        <td>
        ${cantidad}
        </td>
        <td>
        <a href="#" data-id="${id}" class="borrar m-3"> x </a>
        </td>
        `;
        carritoList.appendChild(row);
    })
    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(carritocargado));
}
function limpiarhtml(){
    while(carritoList.firstChild){
        carritoList.removeChild(carritoList.firstChild);
    }
}



