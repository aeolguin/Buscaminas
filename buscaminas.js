//Funcion de Inicio del Juego
function iniciarJuego () {
    crearTablero(n);
    agregaEventos();
}


//variables globales
var n = 10;
var ganador = 0
var arreglo = new Array(n);
var grillaConMinas = iniciarGrillaConMinas(n);
function iniciarGrillaConMinas(n){
       let resultado = new Array(n);
       for(let i=0;i<n;i++){
       resultado[i]= new Array(n);
               for(let j=0;j<n;j++){
               resultado[i][j]=0;
       }
}
return resultado;
}

//Funcion de generacion de la grilla del tablero
function crearTablero (n) {
    var tablero = document.getElementById('tablero');
    var minas = document.getElementById('minas')
    let cantidadMinas = 0;

    for (i=0; i<n ; i++) {
        for (j=0; j<n; j++){
            var divGrilla = document.createElement('div');
            divGrilla.setAttribute('fila', i);
			divGrilla.setAttribute('columna', j);
            divGrilla.classList.add('grilla')
            tablero.appendChild(divGrilla)
            minas.innerText=cantidadMinas;

            if(cantidadMinas<= 10 && determinarAgregarMina(divGrilla)){
                cantidadMinas++;
                divGrilla.setAttribute("mina",true);
                grillaConMinas[i][j]=1;
        }
           
        }
    }
}

//Funcion que genera en forma random las minas que se agregaran al tablero
function determinarAgregarMina(casilla){
    if(!casilla.hasAttribute("mina")){}
    let random = Math.floor(Math.random()*100)+1;
    return random % 10 == 0;
}

//Funcion que agraga los eventos a la grilla
function agregaEventos () {
    let divGrilla = document.getElementById('tablero')
    let imagen = document.getElementById('imagen')
    divGrilla.addEventListener('click', revisaboton);
    imagen.addEventListener('click', function (){
        location.reload();
    })
    
}

//Funcion que controla las minas ante el evento
function revisaboton (e) {
    console.log(e)
    if(e.target.hasAttribute("mina")){
        e.target.innerText="x";
        e.target.style.color = "red";
        alert("Perdiste!!");
        location.reload();
    }
    else{
        e.target.innerText = cantidadMinas(e,grillaConMinas);
        e.target.style.backgroundColor = "black";
        e.target.style.color = "blue";
        ganador++
    }
}

//Funcion que revisa y devuleve la cantidad de minas que hay alrededor del cuadro
function cantidadMinas(e,g){ //g es grillaParaComparar
    var cantidad = 0;
    let fila=parseInt(e.target.getAttribute("fila"));
    let columna=parseInt(e.target.getAttribute("columna"));
    for (let i = fila -1; i<= fila +1; i++){
        for (let j = columna -1; j<= columna + 1; j++){
            if (i>=0 && i<n && j>=0 && j<n){
                if (g[i][j] == 1){
                    cantidad++
                }
            }
        }
    }
    return cantidad;
}



iniciarJuego();