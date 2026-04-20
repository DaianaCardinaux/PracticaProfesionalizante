let emojis = [
    "🚀","🐸","🍩","🎮","🐧","🚂","🍕","🦖","🎧","🚁",
    "🐶","🍓","🎲","🦋","🚗","🐢","🎸","🍔","🛸","🐱",
    "🍉","🏎️","🐙","🎯","🍟","🦊","🚢","🍇","🐼","🎤",
    "🦄","🛴","🍪","🐨","🎾","🐵","⚽","🦁","🚲","🍿",
    "🦕","🐮","🐔","🐳","🦓","🐘","🦒","🐎","🐖","🐇"
];

let tablero = document.getElementById('tablero');
let mensajeFinal = document.getElementById('mensajeFinal');

let primera = null;
let segunda = null;
let bloqueo = false;
let aciertos = 0;


class Carta{
    constructor(emoji, estados){
        this.emoji = emoji;
        this.estados = estados;
    }
}

class Juego{
    constructor(){
        this.cartas = [];
    }

    iniciar(){
        let duplicados = emojis.flatMap(e => [e, e]);
        duplicados.sort(() => Math.random() - 0.5);

        for(let i = 0; i < duplicados.length; i++){
            this.cartas.push(new Carta(duplicados[i], 'oculto'));
        }
        console.log(duplicados);
        this.crearTablero();
    }

    crearTablero(){
        this.cartas.forEach((carta, estadoCarta) => {

            let div = document.createElement('div');
            div.className = 'carta';

            div.onclick = () => clickCarta(div, estadoCarta);

            tablero.appendChild(div);
        });
    }
}

function clickCarta(elemento, estado){

    if(bloqueo) 
        return;

    let carta = juego.cartas[estado];

    if(carta.estados !== 'oculto') 
        return;

    elemento.textContent = carta.emoji;
    elemento.classList.add('mostrar');

    carta.estados = 'mostrado';

    if(!primera){
        primera = {elemento, carta};
    } else {
        segunda = {elemento, carta};
        comparar();
    }
}

function comparar(){

    bloqueo = true;

    if(primera.carta.emoji === segunda.carta.emoji){

        primera.carta.estados = 'resuelto';
        segunda.carta.estados = 'resuelto';

        aciertos += 2;

        reset();
        bloqueo = false;

        if(aciertos === 100){
            mensajeFinal.textContent = 'JUEGO TERMINADO';
        }

    } else {

        setTimeout(() => {

            primera.elemento.textContent = '';
            segunda.elemento.textContent = '';

            primera.elemento.classList.remove('mostrar');
            segunda.elemento.classList.remove('mostrar');

            primera.carta.estados = 'oculto';
            segunda.carta.estados = 'oculto';

            reset();
            bloqueo = false;

        }, 1000);
    }
}

function reset(){
    primera = null;
    segunda = null;
}

let juego = new Juego();
juego.iniciar();