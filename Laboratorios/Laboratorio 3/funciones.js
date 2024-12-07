// utils.js

// 1. Verificar si un número es palíndromo de doble base
export function esPalindromoDobleBase(num) {
    const decimalStr = num.toString();
    const binarioStr = num.toString(2);

    return esPalindromo(decimalStr) && esPalindromo(binarioStr);
}

function esPalindromo(cadena) {
    return cadena === cadena.split('').reverse().join('');
}

// 2. Contar caracteres en una cadena
export function contarCaracteres(cadena) {
    const conteo = {};
    for (let char of cadena) {
        conteo[char] = (conteo[char] || 0) + 1;
    }
    return conteo;
}

// 3. Verificar si un año es bisiesto
export function esBisiesto(anio) {
    return (anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0);
}

// 4. Sumar todos los números primos debajo de un número dado
export function sumarPrimos(n) {
    const primos = [];
    for (let i = 2; i <= n; i++) {
        if (esPrimo(i)) {
            primos.push(i);
        }
    }
    return primos.reduce((acc, curr) => acc + curr, 0);
}

function esPrimo(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}
