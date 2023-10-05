// variables globales

var cantidadMaterias;
var materias = [];
var viajesTotales;
var precioSube;
var precioSemanal;

var cantidadViajesTotales;
var cantidadViajesIda;
var cantidadViajesVuelta;
var cantidadViajesIdaVuelta;
var cantidadViajesNulos;

window.onload = function () {
    var input = document.querySelector('.placeholder-blanco');
    var placeholder = input.placeholder;

    input.onfocus = function () {
        this.placeholder = '';
    };

    input.onblur = function () {
        this.placeholder = placeholder;
    };
};



document.addEventListener('DOMContentLoaded', function () {
    // Obtén todas las tarjetas y los botones
    var tarjetas = document.getElementsByClassName('cartaMostrada');
    var botonSiguiente = document.getElementById('btnSiguiente');
    var botonAtras = document.getElementById('btnAtras');
    var btnAgregar = document.getElementById('btnAgregar'); // nuevo

    // Inicialmente, muestra la primera tarjeta y oculta las demás
    for (var i = 0; i < tarjetas.length; i++) {
        tarjetas[i].classList.add('transition');
        if (i != 0) {
            tarjetas[i].classList.remove('show');
            tarjetas[i].style.display = 'none';
        } else {
            tarjetas[i].classList.add('show');
            tarjetas[i].style.display = 'block';
        }
    }

    // Deshabilita el botón Atras al inicio
    botonAtras.disabled = true;

    // Variable para llevar un registro de la tarjeta actual
    var tarjetaActual = 0;

    // Agrega un evento de clic al botón Siguiente
    botonSiguiente.addEventListener('click', function () {
        // excepciones
        // si esta vacio el arreglo, no arranca, si tiene algo, dale
        if (materias == "") {
            alert("Porfavor ingresar alguna materia y clases por semana para poder continuar");
        } else {
            // Oculta la tarjeta actual
            tarjetas[tarjetaActual].classList.remove('show');
            tarjetas[tarjetaActual].style.display = 'none';

            // Incrementa la tarjetaActual
            tarjetaActual++;

            // Si la tarjetaActual es mayor que el número de tarjetas, vuelve a la primera
            if (tarjetaActual >= tarjetas.length) {
                tarjetaActual = 0;
                // Deshabilita el botón Siguiente en la última tarjeta
                botonSiguiente.disabled = true;
            } else {
                // Habilita el botón Atras después de la primera tarjeta
                botonAtras.disabled = false;
            }

            // toma de valores
            if (tarjetaActual === 1) {
                // Actualizo mensajes
                document.getElementById('textoInformativo').innerText = "Para cada una de tus materias,\n ¿tu viaje es de ida, vuelta o ida y vuelta?";
                document.getElementById('textoInformativoExtra').innerText = "Ej.: Para física, tengo clases los lunes y miercoles. Los lunes, tengo que ir y volver en colectivo a clases (ida y vuelta). Y los miercoles, puedo volver caminando (viaje solo de ida)";

                // Bucle pidiendo informacion por cada materia y cada dia que tenes la materia
                // Inicializa el contador
                let contador = 0;
                let checkboxIda = document.getElementById('flexCheckChecked');
                let checkboxVuelta = document.getElementById('flexCheckDefault');

                // Obtén el botón por su ID
                let btnSiguienteViaje = document.getElementById('btnSiguienteViaje');

                // Inicializa un array de contadores
                let contadores = new Array(materias.length).fill(0);

                // Calcula el índice i basándote en el contador
                let i = contador % materias.length;

                // Actualiza primer mensaje
                document.getElementById('mensajeViajes').innerText = "Para " + materias[i][0] + " en la clase n°" + (contadores[i] + 1) + " semanal";

                // Agrega un evento de clic al botón
                btnSiguienteViaje.addEventListener('click', function () {

                    if (document.getElementById("btnSiguienteViaje").disabled == false) {



                        // Recalcula i dentro del evento de clic del botón
                        i = contador % materias.length;

                        // Pide la info en los inputs checkbox
                        let checkboxIda = document.getElementById('flexCheckChecked');
                        let checkboxVuelta = document.getElementById('flexCheckDefault');

                        // Verifica si los checkboxes están activados y actualiza el array 'materias' en consecuencia
                        if (checkboxIda.checked && checkboxVuelta.checked) {
                            materias[i].push("ida y vuelta");
                        } else if (checkboxIda.checked) {
                            materias[i].push("ida");
                        } else if (checkboxVuelta.checked) {
                            materias[i].push("vuelta");
                        } else {
                            materias[i].push("nada");
                        }

                        // Incrementa el contador para esta materia
                        contadores[i]++;

                        // Si has terminado de recoger todas las instancias de esta materia, pasa a la siguiente materia
                        if (contadores[i] >= parseInt(materias[i][1])) {
                            contador++;
                            contadores[i] = 0;  // Reinicia el contador para esta materia
                            i = contador % materias.length;  // Recalcula i después de incrementar el contador
                        }

                        // Si has terminado de recoger información para todas las materias, imprime un mensaje
                        if (contador >= materias.length) {
                            console.log("Se ha recogido información para todas las materias.");
                            document.getElementById('btnAgregar').disabled = true;
                            document.getElementById('btnSiguienteViaje').disabled = true;

                            document.getElementById('mensajeViajes').innerText = "Se ha recogido información para todas las materias.";

                            checkboxIda.disabled = true;
                            checkboxVuelta.disabled = true;

                        } else {
                            // Actualiza el mensaje en la página con la materia y el número de clase actual
                            document.getElementById('mensajeViajes').innerText = "Para " + materias[i][0] + " en la clase n°" + (contadores[i] + 1) + " semanal";
                        }

                        checkboxIda.checked = false;
                        checkboxVuelta.checked = false;
                        console.log(materias);
                    } else {
                        // algo si el usuario toca el botón al terminar
                        document.getElementById('mensajeViajes').innerText = "Ya puede pasar a la siguiente etapa";
                    }
                });
            }




            if (tarjetaActual === 2) {
                document.getElementById('textoInformativo').innerHTML = "¿Precio de la sube?" + '<hr>';
                document.getElementById('textoInformativoExtra').innerHTML = "Sin comas ni nada, y en el debido caso, redondear (preferentemente para arriba, asi presupuestás de más y no de menos";

            }

            if (tarjetaActual === 3) {
                // Cambio mensajes
                document.getElementById('textoInformativo').innerHTML = "¿Precio de la sube?" + '<hr>';
                document.getElementById('textoInformativoExtra').innerHTML = "Sin comas ni nada, y en el debido caso, redondear (preferentemente para arriba, asi presupuestás de más y no de menos";
                // leer y almacenar precio de coso
                precioSube = document.getElementById('precioSube').value;

                // calculo de precio semanal
                console.log(materias);
                // Inicializa el acumulador
                let totalPuntaje = 0;

                // Recorre el vector de materias
                for (let i = 0; i < materias.length; i++) {
                    // Recorre los viajes de la materia actual
                    for (let j = 2; j < materias[i].length; j++) {
                        // Asigna un puntaje numérico en base al tipo de viaje
                        let puntajeViaje;
                        switch (materias[i][j]) {
                            case "ida y vuelta":
                                puntajeViaje = 2;
                                break;
                            case "ida":
                            case "vuelta":
                                puntajeViaje = 1;
                                break;
                            default:
                                puntajeViaje = 0;
                        }

                        // Añade el puntaje al acumulador
                        totalPuntaje += puntajeViaje;
                    }
                }

                // Imprime el total del puntaje
                console.log(totalPuntaje);
                console.log(precioSube);
                console.log(totalPuntaje * precioSube);

                precioSemanal = totalPuntaje * precioSube;



            }

            if (tarjetaActual === 3) {
                // Cambio mensajes
                document.getElementById('textoInformativo').innerHTML = "Resultado final " + '<br>' + '<hr>';

                document.getElementById('textoInformativoExtra').innerHTML = "Breve resumen";

                // Actualizo tarjeta de precio mensual y semanal
                document.getElementById('precioFinalMensual').innerHTML = precioSemanal * 4;
                document.getElementById('precioFinalSemanal').innerHTML = precioSemanal;

                // Cargo la tabla
                // Obtén una referencia al cuerpo de la tabla
                var tbody = document.getElementById('cuerpoTabla');

                // Inicializa los contadores para los totales
                var totalIda = 0;
                var totalVuelta = 0;
                var totalTotal = 0;

                // Recorre las materias y crea una nueva fila para cada una
                for (var i = 0; i < materias.length; i++) {
                    var tr = document.createElement("tr");

                    // Crea las celdas para la materia, los viajes de ida, los viajes de vuelta y el total
                    var th = document.createElement("th");
                    th.scope = "row";
                    th.textContent = materias[i][0];  // nombre de la materia

                    var tdIda = document.createElement("td");
                    var viajesIda = materias[i].slice(2).filter(viaje => viaje === 'ida' || viaje === 'ida y vuelta').length;  // cuenta los viajes de ida
                    tdIda.textContent = viajesIda;
                    totalIda += viajesIda;

                    var tdVuelta = document.createElement("td");
                    var viajesVuelta = materias[i].slice(2).filter(viaje => viaje === 'vuelta' || viaje === 'ida y vuelta').length;  // cuenta los viajes de vuelta
                    tdVuelta.textContent = viajesVuelta;
                    totalVuelta += viajesVuelta;

                    var tdTotal = document.createElement("td");
                    var totalViajes = materias[i].slice(2).length;  // cuenta todos los viajes
                    tdTotal.textContent = totalViajes;
                    totalTotal += totalViajes;

                    // Añade las celdas a la fila
                    tr.appendChild(th);
                    tr.appendChild(tdIda);
                    tr.appendChild(tdVuelta);
                    tr.appendChild(tdTotal);

                    // Añade la fila al cuerpo de la tabla
                    tbody.appendChild(tr);
                }

                // Crea la fila final con los totales
                var trFinal = document.createElement("tr");
                trFinal.className = "fila-final";

                var thFinal = document.createElement("th");
                thFinal.scope = "row";
                thFinal.textContent = "Final";

                var tdFinalIda = document.createElement("td");
                tdFinalIda.textContent = totalIda;

                var tdFinalVuelta = document.createElement("td");
                tdFinalVuelta.textContent = totalVuelta;

                var tdFinalTotal = document.createElement("td");
                tdFinalTotal.textContent = totalTotal;

                // Añade las celdas a la fila final
                trFinal.appendChild(thFinal);
                trFinal.appendChild(tdFinalIda);
                trFinal.appendChild(tdFinalVuelta);
                trFinal.appendChild(tdFinalTotal);

                // Añade la fila final al cuerpo de la tabla
                tbody.appendChild(trFinal);

            }

            if (tarjetaActual === 4) {

                document.getElementById('btnAtras').disabled = true;
                document.getElementById('btnSiguiente').disabled = true;
            }



            // Muestra la nueva tarjeta actual
            tarjetas[tarjetaActual].classList.add('show');
            tarjetas[tarjetaActual].style.display = 'block';

        }



    });

    // Agrega un evento de clic al botón Agregar
    btnAgregar.addEventListener('click', function () {
        var nombreMateria = document.getElementById('inputNomMat').value;
        var cantidadDeVecesMateria = document.getElementById('inputCantVecMat').value;
        materias.push([nombreMateria, cantidadDeVecesMateria]);

        // Limpia los inputs
        document.getElementById('inputNomMat').value = '';
        document.getElementById('inputCantVecMat').value = '';

        // Actualizo textos y muestro materias ingresadas
        let texto = "Se ha ingresado hasta ahora:\n";

        // Suponiendo que 'materias' es tu array bidimensional
        for (let i = 0; i < materias.length; i++) {
            // Asumiendo que el nombre de la materia está en el primer índice (0) y el número de clases en el segundo índice (1)
            texto += materias[i][0] + " - " + materias[i][1] + " clases/semana\n";
        }


        document.getElementById('textoCanVecMatMostrar').innerText = texto;

        // log para ver que onda
        console.log(materias);

    });

    // Agrega un evento de clic al botón Atras
    botonAtras.addEventListener('click', function () {
        // Oculta la tarjeta actual
        tarjetas[tarjetaActual].classList.remove('show');
        tarjetas[tarjetaActual].style.display = 'none';

        // Decrementa la tarjetaActual
        tarjetaActual--;

        // Si la tarjetaActual es menor que 0, va a la última
        if (tarjetaActual < 0) {
            tarjetaActual = tarjetas.length - 1;
            // Deshabilita el botón Atras en la primera tarjeta
            botonAtras.disabled = true;
        } else {
            // Habilita el botón Siguiente antes de la última tarjeta
            botonSiguiente.disabled = false;
        }

        // Muestra la nueva tarjeta actual
        tarjetas[tarjetaActual].classList.add('show');
        tarjetas[tarjetaActual].style.display = 'block';
    });
});
