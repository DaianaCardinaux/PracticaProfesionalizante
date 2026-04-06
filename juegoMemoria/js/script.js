//suchmanspablo@gmail.com

const formulario = document.getElementById('formularioInicial');
const cantidadNumero = document.getElementById('cantidad');
const intervaloNumero = document.getElementById('intervalo');
const checkNegativo = document.getElementById('permitirNegativo');
const containerMostrar = document.getElementById('muestraPantalla');
const containerResultado = document.getElementById('containerNumeros');
const resultadoUsuario = document.getElementById('resultado');
const textoResultado = document.getElementById('textoMensaje');
const volverIntento = document.getElementById('botonVolver');
const puntajeUsuario = document.getElementById('puntaje');

let numeroAleatorio = [];
let sumaArray = 0;
let arrayUnico = [];
let puntaje = 0;

    function generarNumeros() {
        numeroAleatorio = [];
        sumaArray = 0;

        for (let i = 0; i < cantidadNumero.value; i++) {
            if (checkNegativo.checked){
                numeroAleatorio[i] = Math.floor(Math.random() * 20) - 10;    
            } else {
                numeroAleatorio[i] = Math.floor(Math.random() * 10); 
            }
            sumaArray += numeroAleatorio[i];

            arrayUnico[i] = numeroAleatorio[i];
                console.log(numeroAleatorio);

        }

        if(sumaArray < 0 && !numeroAleatorio.includes(arrayUnico) && numeroAleatorio.includes(0)){
            generarNumeros();
        }
    }
    console.log(arrayUnico);
    console.log(numeroAleatorio);

    function mostrarNumeros(){
        let contador = 0;
            const tiempo = setInterval(function(){ 
                if(contador === numeroAleatorio.length){
                    clearInterval(tiempo); 
                    containerMostrar.textContent = ''; 
                }

                containerMostrar.textContent = numeroAleatorio[contador];
                containerMostrar.className = 'numeroEstilo';
                contador++;
            }, intervaloNumero.value * 1000);
        }

    function comienzoJuego(){
        if(cantidadNumero.value == '' || intervaloNumero.value == ''){
            const muestraError = document.getElementById('error');
            muestraError.textContent = '- ingresa valores -';
        } else {
            formulario.style.display = 'none'
            generarNumeros();

            containerMostrar.textContent = 'COMIENZA EL JUEGO';
            containerMostrar.className = 'tituloComienzo';

            setTimeout(function(){
                mostrarNumeros();
                containerResultado.style.display = 'block';
            }, 1000);
        }
        console.log(sumaArray);
    }

    function validarResultado(){
        if(resultadoUsuario.value === ''){
            textoResultado.textContent = 'Ingresa Respuesta';
            textoResultado.className = 'vacio';
        } else if (resultadoUsuario.value == sumaArray){
            textoResultado.textContent = 'CORRECTO, felicidades!!';
            textoResultado.className = 'correcto';
            puntaje += 10;
        } else {
            textoResultado.textContent = 'INCORRECTO Resultado: ' + sumaArray;
            textoResultado.className = 'incorrecto';
            puntaje -= 10;
        }
        volverIntento.style.display = 'block';
        puntajeUsuario.textContent = 'Puntaje: ' + puntaje + ' puntos';
    }

    function volver(){
        formulario.style.display = 'block';
        textoResultado.style.display = 'none';
        volverIntento.style.display = 'none';
        containerResultado.style.display = 'none';
    }