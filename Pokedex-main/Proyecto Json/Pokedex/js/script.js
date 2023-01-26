

const getListaPokemon = async () =>{
  try{
    const respuesta = await fetch("https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json");
    const datosPokemon = await respuesta.json();
    const todosLosPokemon = datosPokemon;

    listaPokemon = todosLosPokemon.pokemon;
    recorrerPokemon();
    addToFavClicked(id);
    recorreFav(favoritos);

  }catch (error){
    console.log(error.message);
  }
}
getListaPokemon();

let listaPokemon = [];

let favoritos = [];

//json

const cardPokemon = document.getElementById('cardPokemon');

function recorrerPokemon(){

  cardPokemon.innerHTML="";

  listaPokemon.forEach(elemento => {

    const content = `<div class="card  mb-2 ml-2" style="width: 18rem;">
        <img class="card-img-top" style="width:150px; display:block;margin:auto;" src="${elemento.img}">
        <div class="card-body text-center">
          <h5 class="card-title">${elemento.name}</h5>
          <p class="card-text">Tipo: ${elemento.type}</p>
          <button type="button" class="btn btn-primary mb-3" data-toggle="modal" data-target="#exampleModal" onclick="detalles(${elemento.id})">Ver detalles</button>

          <a href="#" class="card-button btn btn-primary" onclick="addToFavClicked(${elemento.id})">Añadir a favoritos</a>

        </div>
      </div>`;
      cardPokemon.innerHTML += content;

  })
};

//Modal con los detalles de los pokemones

function detalles(id){

  let modalTitle = document.querySelector('.modal-title');
  let height = document.querySelector('.height');
  let weight = document.querySelector('.weight');
  let weaknesses = document.querySelector('.weaknesses');
 

  const object = listaPokemon.find(pokemon=>pokemon.id==id);

  modalTitle.innerHTML = object.name;
  height.innerHTML = (`altura: ${object.height}`);
  weight.innerHTML = (`peso: ${object.weight}`);
  weaknesses.innerHTML = (`debilidades: ${object.weaknesses}`);
  
}



//sección de FAVORITOS
function addToFavClicked(id){

  const encontrar= listaPokemon.find(listaPokemon=>listaPokemon.id==id);

  const boolean= favoritos.some(listaPokemon=>listaPokemon.id==id);
  
  if (boolean){
    encontrar.num += 1;

  }else{
      favoritos.push(encontrar);
  }
}

function recorreFav(){

  cardPokemon.innerHTML="";

  favoritos.forEach(elemento => {

    const content = `<div class="card mb-2 ml-2" style="width: 18rem;">
        <img class="card-img-top" style="width:150px; display:block;margin:auto;" src="${elemento.img}">
        <div class="card-body text-center">
          <h5 class="card-title">${elemento.name}</h5>
          <p class="card-text">Tipo: ${elemento.type}</p>
          <button type="button" class="btn btn-primary mb-3" data-toggle="modal" data-target="#exampleModal" onclick="detalles(${elemento.id})">Ver detalles</button>

          <a href="#" class="card-button btn btn-primary" onclick="addFavoritos(${elemento.id})">Añadir a favoritos</a>

        </div>
      </div>`;
      cardPokemon.innerHTML += content;

  })
}
//búsqueda

function buscarPokemones() {

  cardPokemon.innerHTML = ""

  const buscarPokemon= document.getElementById("busqueda").value;

  const nombrePokemon = buscarPokemon.toLowerCase();


  const filtrarPokemones = listaPokemon.filter(elemento => {
      const nuevoNombre = elemento.name
      const transformarNombre = nuevoNombre.toLowerCase();
      return transformarNombre == "" ?  lista(listaPokemon) : transformarNombre.includes(nombrePokemon);
  })


  filtrarPokemones.forEach(function(elemento) {

      const content = `<div class="card mb-2 ml-2" style="width: 18rem;">
      <img class="card-img-top" style="width:150px; display:block;margin:auto;" src="${elemento.img}"  alt="...">
      <div class="card-body text-center">
        <h5 class="card-title">${elemento.name}</h5>
        <p class="card-text">${elemento.type}</p>
        <button type="button" class="btn btn-primary mb-3" data-toggle="modal" data-target="#exampleModal" onclick="detalles(${elemento.id})">Ver detalles</button>
        <a href="#" class="card-button btn btn-primary" onclick="addToFavClicked(${elemento.id})">Añadir a favoritos</a>
      </div>
    </div>`;
    cardPokemon.innerHTML += content;

  })
}
//Funcion por tecla Enter

function Tecla(event){
  teclaPresionada = event.keyCode;
  if(teclaPresionada == 13){
    return buscarPokemones()
  }
}
window.onkeydown = Tecla;



//validación del input

function validacion() {
  const inputBusqueda = document.getElementById('busqueda').value;
  console.log(typeof(inputBusqueda))

  if(inputBusqueda==parseFloat(inputBusqueda)){
    alert('por favor, ingresa un nombre de pokémon válido');
    inputBusqueda ="";
  }
}

//loading pokebola

function myFunction() {
  var myVar;
  myVar = setTimeout(showPage, 2000);
}
myFunction()

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}
















