const valorCategoria = document.getElementById('divCategoria');
const valorNivel = document.getElementById('divNivel');
const mensajeError = document.getElementById('mensajeError');
const contenedorInicial = document.getElementById('containerInicial');
const contenedorPregunta = document.getElementById('contenedorPregunta');
const contenedorFinal = document.getElementById('contenedorFinal');

let datosJson; 

fetch('trivia_realista_240.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        
        datosJson = data;
        console.log(datosJson)

        let categoriasArray = [];
        let nivelesArray = [];

            data.categorias.forEach(function(option) {
                if(!categoriasArray.includes(option.nombre)){
                    categoriasArray.push(option.nombre);
                }

                option.preguntas.forEach(function(pregunta){
                    if(!nivelesArray.includes(pregunta.nivel)){
                        nivelesArray.push(pregunta.nivel);
                    }    
                })
            });   
            crearRadios(categoriasArray, nivelesArray);
    });

function crearRadios(categoria, nivel) {
    valorCategoria.innerHTML = '';
    valorNivel.innerHTML = '';

    for (let i = 0; i < categoria.length; i++) {
        let div = document.createElement('div');

        let input = document.createElement('input');
        input.type = 'radio';
        input.name = 'categoria';
        input.value = categoria[i];
        input.className = 'radio';

        let label = document.createElement('label');
        label.textContent = categoria[i];
        label.className = 'textoRadio';

        div.appendChild(input);
        div.appendChild(label);
        valorCategoria.appendChild(div);   
    }

    for (let i = 0; i < nivel.length; i++) {
        let div = document.createElement('div');

        let input = document.createElement('input');
        input.type = 'radio';
        input.name = 'nivel';
        input.value = nivel[i];
        input.className = 'radio';

        let label = document.createElement('label');
        label.textContent = nivel[i];
        label.className = 'textoRadio'; 

        div.appendChild(input);
        div.appendChild(label);
        valorNivel.appendChild(div);     
    }
    console.log(categoria,nivel)
}

function chequearRadios(tipo){
    let radios = document.getElementsByName(tipo);

        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
            }
        }
        return null;
}

function obtenerValores(){
    let valorCategoria = chequearRadios('categoria');
    let valorNivel = chequearRadios('nivel');

        if(valorCategoria == null || valorNivel == null){
            mensajeError.textContent = 'selecciona categoria o nivel';
        } else {
            obtenerPreguntas(valorCategoria, valorNivel);
        }

    console.log(valorCategoria, valorNivel);
}

let preguntas = [];
let indice = 0; //por cual pregunta va
let correctas = 0;
let incorrectas = 0;
let noRespondidas = 0;
let intervalo;

function obtenerPreguntas(filtroCategoria, filtroNivel){
    let preguntasFiltradas = [];
    let datos = datosJson.categorias;

    for (let i = 0; i < datos.length; i++) {   
        if(datos[i].nombre === filtroCategoria){  
            for (let j = 0; j < datos[i].preguntas.length; j++) {
                if(datos[i].preguntas[j].nivel === filtroNivel){
                    preguntasFiltradas.push(datos[i].preguntas[j]);
                }
            }
        }  
    }

    preguntasFiltradas.sort(() => Math.random() - 0.5);
    preguntas = preguntasFiltradas.slice(0, 5);

    if (preguntasFiltradas.length === 0) {
        mensajeError.textContent = 'no hay preguntas disponibles';
        return;
    }

    mostrarPregunta();
}

function mostrarPregunta(){
    contenedorInicial.style.display = 'none';
    contenedorPregunta.innerHTML = '';

    if (indice >= preguntas.length){
        mostrarResultado();
    }

    let preguntaActual = preguntas[indice];

    let contadorPregunta = document.createElement('h3');
        contadorPregunta.textContent = 'pregunta nro°: ' + (indice + 1) + ' de 5';
        contadorPregunta.className = 'contadorPregunta';
        contenedorPregunta.appendChild(contadorPregunta);

    let preguntaTexto = document.createElement('h1');
        preguntaTexto.textContent = preguntaActual.pregunta;
        preguntaTexto.className = 'preguntaTexto';
        contenedorPregunta.appendChild(preguntaTexto);

    let respuestas = [];
        respuestas.push(preguntaActual.correcta);

    for (let i = 0; i < preguntaActual.incorrectas.length; i++) {
        respuestas.push(preguntaActual.incorrectas[i]);
    }

    respuestas.sort(() => Math.random() - 0.5);

    let tiempo = 5;
    let contador = document.createElement('h3');
        contador.textContent = 'tiempo: ' + tiempo;
        contador.className = 'contador';
        contenedorPregunta.appendChild(contador);

    intervalo = setInterval(function(){
        tiempo--;
        contador.textContent = 'tiempo: ' + tiempo;

        if(tiempo === 0){
            clearInterval(intervalo);
            noRespondidas++;
            indice++;
            mostrarPregunta();
        }
    }, 1000);

    for (let i = 0; i < respuestas.length; i++) {
        let boton = document.createElement('button');
            boton.textContent = respuestas[i];

            boton.onclick = function(){
                clearInterval(intervalo);

                if(respuestas[i] === preguntaActual.correcta){
                    correctas++;
                } else {
                    incorrectas++;
                }

                indice++;
                mostrarPregunta();
            }

        contenedorPregunta.appendChild(boton);
    }
}

function mostrarResultado(){

    contenedorPregunta.style.display = 'none';
    contenedorFinal.style.display = 'block';

    contenedorFinal.innerHTML = '';

    let resultado = document.createElement('h1');
    resultado.textContent = 'resultados';
    contenedorFinal.appendChild(resultado);

    let total = document.createElement('h3');
    total.textContent = 'total preguntas: 5';
    contenedorFinal.appendChild(total);

    let bien = document.createElement('h3');
    bien.textContent = 'correctas: ' + correctas;
    bien.className = 'correcta';
    contenedorFinal.appendChild(bien);

    let mal = document.createElement('h3');
    mal.textContent = 'incorrectas: ' + incorrectas;
    mal.className = 'incorrecta';
    contenedorFinal.appendChild(mal);

    let no = document.createElement('h3');
    no.textContent = 'sin responder: ' + noRespondidas;
    no.className = 'noRespondida';
    contenedorFinal.appendChild(no);
}