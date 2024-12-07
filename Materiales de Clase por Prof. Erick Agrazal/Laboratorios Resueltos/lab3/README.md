# Documentación del Documento HTML

## Introducción

Este documento HTML representa una página web interactiva que demuestra conceptos básicos de HTML, CSS y JavaScript. La página contiene dos formularios que realizan diferentes operaciones sobre texto ingresado por el usuario.

## Estructura HTML

### Declaración del Documento

```html
<!DOCTYPE html>
<html lang="en">
```

- `<!DOCTYPE html>`: Declara que este es un documento HTML5.
- `<html lang="en">`: El elemento raíz del documento HTML, con el atributo `lang="en"` que especifica que el contenido está en inglés.

### Cabecera (Head)

```html
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
<style>
/ Estilos CSS aquí /
</style>
</head>
```

- `<meta charset="UTF-8">`: Especifica la codificación de caracteres del documento.
- `<meta name="viewport" ...>`: Configura la vista para dispositivos móviles.
- `<title>`: Define el título de la página que aparece en la pestaña del navegador.
- `<style>`: Contiene los estilos CSS internos.

### Cuerpo (Body)

```html
<body>
<main>
<!-- Contenido principal aquí -->
</main>
<script>
// Código JavaScript aquí
</script>
</body>
```

- `<main>`: Contiene el contenido principal de la página.
- `<script>`: Contiene el código JavaScript al final del body para mejor rendimiento.

#### Contenido Principal

```html
<main>
<section>
<fieldset>
<form>
<!-- Primer formulario -->
</form>
</fieldset>
</section>
<section>
<fieldset>
<form id="problema-2">
<!-- Segundo formulario -->
</form>
</fieldset>
</section>
<div id="response"></div>
</main>
```

- Dos `<section>` con `<fieldset>` y `<form>` para los formularios.
- Un `<div id="response">` para mostrar las respuestas.

## Estilos CSS

Los estilos CSS están definidos dentro de la etiqueta `<style>` en el `<head>`:

```css
body {
background-color: black;
color: white;
display: flex;
justify-content: center;
}
main {
width: 50vw;
height: 100vh;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
gap: 0.5rem;
}
```

- El `body` tiene fondo negro, texto blanco y usa flexbox para centrar el contenido.
- El `main` ocupa el 50% del ancho de la ventana y el 100% de la altura, usando flexbox para organizar su contenido verticalmente.

## Estructura JavaScript

El código JavaScript utiliza el patrón de módulo para organizar la funcionalidad.

### Módulo Utils

```javascript
const Utils = (() => {
// Funciones de utilidad aquí
})();
```

Este módulo contiene funciones de utilidad:

1. `isPalindrome(n)`: Verifica si un número es un palíndromo.
2. `isDoubleBasePalindrome(n)`: Comprueba si un número es palíndromo tanto en base 10 como en base 2.
3. `charactecCount(c)`: Cuenta la ocurrencia de cada carácter en una cadena.

### Módulo App

```javascript
const App = (({ charactecCount, isDoubleBasePalindrome }) => {
// Lógica de la aplicación aquí
})(Utils);
```


Este módulo maneja la interacción con el DOM y los eventos:

1. `htmlElements`: Objeto que almacena referencias a elementos del DOM.
2. `handlers`: Objeto con funciones manejadoras de eventos.
3. `bindEvents()`: Función para asociar eventos a elementos del DOM.
4. `init()`: Función de inicialización de la aplicación.

## Funcionalidad

### Primer Formulario
- Verifica si un número es un "doble palíndromo" (palíndromo en base 10 y base 2).
- Muestra el resultado en rojo en el área de respuesta.

### Segundo Formulario
- Cuenta la ocurrencia de cada carácter en una cadena ingresada.
- Muestra el resultado en verde en el área de respuesta.

## Patrón de Diseño

El código JavaScript utiliza el patrón de módulo, que ofrece varias ventajas:

1. **Encapsulación**: Las variables y funciones están encapsuladas dentro de los módulos, evitando la contaminación del espacio de nombres global.
2. **Organización**: Separa la lógica en módulos distintos (Utils para funciones de utilidad, App para la lógica de la aplicación).
3. **Reutilización**: Las funciones de utilidad pueden ser fácilmente reutilizadas en otras partes de la aplicación.

## Conclusión

Este documento HTML demuestra una estructura básica pero bien organizada para una aplicación web simple. Utiliza HTML semántico, CSS para el estilo y disposición, y JavaScript modular para la funcionalidad. Es un buen punto de partida para entender cómo se pueden construir aplicaciones web más complejas.
