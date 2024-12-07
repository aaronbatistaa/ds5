import { getPokemon, renderPokemon, sanitizeName } from './pokemon.js';

const htmlElements = {
  form: document.querySelector('#pokemon-form'),
  details: document.querySelector('#pokemon-details'),
  clearButton: document.querySelector('#clear'),
  submitButton: document.querySelector('#submit'),
}

const handlers = {
  submit: async (event) => {
    event.preventDefault();       //evita que se ejecute infinitamente
    const formData = new FormData(event.target);
    const pokemonName = formData.get('pokemon-name');
    const sanitizedName = sanitizeName(pokemonName);  //
    if (!sanitizedName) {
      alert('Por favor, ingrese un nombre válido');
      return;
    };
    const pokemon = await getPokemon(sanitizedName);
    renderPokemon(htmlElements.details, pokemon);

    htmlElements.clearButton.classList.remove('hidden');
    htmlElements.submitButton.classList.add('action');
  },

  clear: (event) => {
    event.preventDefault();
    htmlElements.details.replaceChildren();
    htmlElements.clearButton.classList.add('hidden');  //fidelity
    htmlElements.submitButton.classList.remove('action')  //fidelity
  }
}

const bindEvents = () => {
  htmlElements.form.addEventListener('submit', handlers.submit);
  htmlElements.clearButton.addEventListener('click', handlers.clear); 
}

const init = () => {
  bindEvents();
}

init();