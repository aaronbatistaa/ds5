var GeneradorNumeros = (function () {                                   //función anónima y con funciones privadas iife

    var numeros = [];                                                   //donde se almacenaran los numero generados

    // Cachear elementos del DOM
    var botonGenerar = document.getElementById('botonGenerar');
    var botonAscendente = document.getElementById('botonAscendente');
    var botonDescendente = document.getElementById('botonDescendente');
    var listaNumeros = document.getElementById('listaNumeros');

    // Enlazar eventos
    botonGenerar.addEventListener('click', generarNumero);
    botonAscendente.addEventListener('click', ordenarAscendente);
    botonDescendente.addEventListener('click', ordenarDescendente);

    function generarNumero() {
        if (numeros.length >= 97) {
            alert('Todos los números posibles han sido generados.');
            return;                                                     //sale de la función y no ejecuta lo de abao
        }

        var numeroAleatorio;                                            //donde se almacenará el número aleatorio
        do {
            numeroAleatorio = Math.floor(Math.random() * (98 - 2 + 1)) + 2;
        } while (numeros.includes(numeroAleatorio));                    //ciclo que asegura que en caso tal ese número ya se haya generado, se genere otro distinto

        numeros.push(numeroAleatorio);                                  //Agrega el nuevo número aleatorio al final del array y devuelve la nueva longitud del mismo
        mostrarNumeros(numeros);                                        // Mostrar los números sin alterar el orden existente

        /*mathrandom genera un número decimal aleatorio entre 0.1, se multiplica por el rango establecido (max - min + 1 (para incluir el 98)) 
        Luego el mathfloor redondea hacia abajo a un entero al resultado de la multiplicacion realizada convierte el rango 0,96
        Luego se suma el valor mínimo +2 al resultado para desplazar el rango de números enteros de 0,96 a 2,98 incluyendolos */

        /*en caso que quiera mantener un orden ya aplicado al momento de generar más números        
        if (ordenActual === 'asc') {
            mostrarNumeros(numeros);
        } else if (ordenActual === 'desc') {
            mostrarNumeros(numeros);
        } else {
            mostrarNumeros(numeros);
        }
        Adicional crear la variable  var ordenActual = null; // 'asc' para ascendente, 'desc' para descendente, null para sin orden
        Actualizar ese orden añadiendo ordenActual = 'asc'; y ordenActual = 'desc'; en sus respectivas funciones
        */
    }

    function ordenarAscendente(mostrarAlerta = true) {
        if (numeros.length === 0) {
            if (mostrarAlerta) alert('No hay números para ordenar.');
            return;                                                     //sale de la función no ejecuta lo de abao
        }
        numeros.sort(function(a, b){ return a - b; });
        mostrarNumeros(numeros);

        /*uso del método para arrays sort, que ordena alfabéticamente
          uso de una funcion de comparación para manipular números y no cadenas que resta a - b
          si el resultado es negativo a se coloca antes que b
          si es positivo b se coloca antes que a*/
    }

    function ordenarDescendente(mostrarAlerta = true) {
        if (numeros.length === 0) {
            if (mostrarAlerta) alert('No hay números para ordenar.');
            return;  //sale de la función no ejecuta lo de abao
        }
        numeros.sort(function(a, b){ return b - a; });                  
        mostrarNumeros(numeros);

        /*uso del método para arrays sort, que ordena alfabéticamente
         uso de una funcion de comparación para manipular números y no cadenas que resta b - a
         si el resultado es negativo, b se coloca antes que a
          si es positivo a se coloca antes que b*/
    }

    function mostrarNumeros(arrayNumeros) {                             //recibe como parámetros el array modificado según la acción
         //limpia la lista pa asegurar que se reflejen los numeros actuales del array
        listaNumeros.innerHTML = '';                                    //elemento dom donde se muestran los numeros

        //recorrer el array y crear elementos para cada uno
        arrayNumeros.forEach(function(num) {                            //recibe como parámetro una función anónima en la que sucede la generación
            var elementoNumero = document.createElement('div');         //crea el div y almacena la referencia
            elementoNumero.className = 'number-item';                   //asigna la clase pal css
            elementoNumero.textContent = ('0' + num).slice(-2);         //convierte el número en cadena y llamo el método de un string, slice, que le quita todos los caracteres exceptuando los dos últimos
            listaNumeros.appendChild(elementoNumero);                   //agrega el nuevo elemento div como hijo del contenedor listanumeros
        });
    }

    return {
        generarNumero: generarNumero,
        ordenarAscendente: ordenarAscendente,
        ordenarDescendente: ordenarDescendente                          //exponer funciones afuera del módulo, para que puedan ser usadas mediante el objeto GeneradorNumeros con las propiedades tal que se le asigna tal
    };

})();
