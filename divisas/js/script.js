const ingresoNumero = document.getElementById('ingresoNumero');
const tablaVision = document.getElementById('tablaVision');
const conversion = document.getElementById('conversionId');
const ingresoValor = document.getElementById('ingresoValor');      

datosJson = [];


fetch('https://dolarapi.com/v1/dolares')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        datosJson = data.slice(0,3);
        mostrarValores(datosJson);
    })

function mostrarValores(datos){
    cuerpoTabla.innerHTML = "";

    datos.forEach(element => {
        let fila = `<tr>
                        <td>${element.nombre}</td>
                        <td>${element.compra}</td>
                        <td>${element.venta}</td>
                    </tr>`; 

        cuerpoTabla.innerHTML += fila;
    });
}


function convertirValor(){

    let valorIngresado = ingresoValor.value;

    if (valorIngresado === '') {
        alert('ingresa un valor');
        return;
    }

    valorIngresado = valorIngresado.replace(/\./g, '');

    let numero = parseFloat(valorIngresado);

    cuerpoTabla.innerHTML = '';

    datosJson.forEach(element => {

        let usdCompra = numero / element.compra;
        let usdVenta = numero / element.venta;

        let fila = `<tr>
                        <td>${element.nombre}</td>
                        <td>${element.compra}</td>
                        <td>${element.venta}</td>
                        <td>${usdCompra.toFixed(2)}</td>
                        <td>${usdVenta.toFixed(2)}</td>
                    </tr>`;

        cuerpoTabla.innerHTML += fila;
    });
}




