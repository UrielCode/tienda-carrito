// Varibles

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articuloCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
  // cuando agregas un curso, presionando agregcar al carrtio
  listaCursos.addEventListener('click', agregarCurso);

   // eliminar cursos del carrtio
   carrito.addEventListener('click', eliminaCurso);


  //  muestra los curso de Local Storage
  document.addEventListener('DOMContentLoaded', ()=>{
    articuloCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrtitoHTML();
  })

  //  vaciar carrito
  vaciarCarrito.addEventListener('click', () =>{
    articuloCarrito = []; //resetear el arreglo
    limpiarHTML();
  })
}

// funciones
function agregarCurso(e){
  e.preventDefault()
  if(e.target.classList.contains('agregar-carrito')){
    cursoSeleccionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSeleccionado);

   
  }
  
}

// Eliminar un curso del carrito
function eliminaCurso(e){
  console.log(e.target.classList);
  if(e.target.classList.contains('borrar-curso')){
    const cursoID = e.target.getAttribute('data-id');

    // Eliminar del arreglo 
    articuloCarrito = articuloCarrito.filter( curso => curso.id !== cursoID)

    carrtitoHTML(); //iterar sobre el carrito
  }
}

// Leer el contenido del HTML al que dimos click
function leerDatosCurso(curso){
  // console.log(curso);

  // crear un objeto con el contiendo actual
  const infoCurso ={
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }

  // revisa si un elemento ya existen en el carrito
  const existe = articuloCarrito.some(curso => curso.id === infoCurso.id);
  if(existe){
    // actualizamos la edad
    const cursos = articuloCarrito.map(curso =>{
      if(curso.id === infoCurso.id){
        curso.cantidad ++
        return curso
      }else{
        return curso
      }
    });
    articuloCarrito = [...cursos];
  }else{
    // agrega elementos al arreglo de carrito
    articuloCarrito = [...articuloCarrito, infoCurso];
  }

  console.log(articuloCarrito);
  carrtitoHTML();
}

// Muestra el carrtito de compras en el HTML
function carrtitoHTML(){

  // limpiar el html
  limpiarHTML();

  // recorre el carrito y genera el html
  articuloCarrito.forEach( (curso)=>{

    const {imagen, titulo, precio, cantidad, id} = curso

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${imagen}" width="100">
      </td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}">X</a>
      </td>
    `;

    // Agrega el HTML del carrito al tbody
    contenedorCarrito.appendChild(row);
  });
  
  // agregar el carrito del storage

  sincronizarStorage();
}


function sincronizarStorage(){
  localStorage.setItem('carrito', JSON.stringify(articuloCarrito));
}

// Elimina los curso del tbody
function limpiarHTML(){
  // forma lenta
  // contenedorCarrito.innerHTML = '';

  while(contenedorCarrito.firstChild){
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}