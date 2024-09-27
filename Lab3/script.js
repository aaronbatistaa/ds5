// script.js
import { esPalindromoDobleBase, contarCaracteres, esBisiesto, sumarPrimos } from './funciones.js';

// 1. Verificar si un número es palíndromo en base 10 y 2
window.checkPalindromo = function () {
    const input = document.getElementById('palindromoInput').value;
    const num = parseInt(input);
    const result = esPalindromoDobleBase(num) ? 'Es palíndromo de doble base' : 'No es palíndromo de doble base';
    document.getElementById('palindromoResult').innerText = result;
};

// 2. Contar caracteres en una cadena
window.countCharacters = function () {
    const input = document.getElementById('charCountInput').value;
    const result = contarCaracteres(input);
    let output = '';
    for (let char in result) {
        output += `${char}: ${result[char]} `;
    }
    document.getElementById('charCountResult').innerText = output;
};

// 3. Verificar si un año es bisiesto
window.checkLeapYear = function () {
    const input = document.getElementById('leapYearInput').value;
    const anio = parseInt(input);
    const result = esBisiesto(anio) ? 'Es un año bisiesto' : 'No es un año bisiesto';
    document.getElementById('leapYearResult').innerText = result;
};

// 4. Sumar todos los números primos debajo de un número dado
window.sumPrimes = function () {
    const input = document.getElementById('sumPrimesInput').value;
    const num = parseInt(input);
    const result = sumarPrimos(num);
    document.getElementById('sumPrimesResult').innerText = `La suma de primos es: ${result}`;
};