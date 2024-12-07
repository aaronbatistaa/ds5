import { getPokemonData, getAbilityData, renderPokemon, renderAbility, sanitizeName } from './pokemon.js';

const htmlElements = {
  form: document.querySelector('#pokemon-form'),
  details: document.querySelector('#pokemon-details'),
  clearButton: document.querySelector('#clear'),
  submitButton: document.querySelector('#submit'),
  githubButton: document.querySelector('#button-github'),
}

const handlers = {
    submit: async (event) => {
      event.preventDefault();          //evita que se ejecute infinitamente
      const formData = new FormData(event.target);
      const searchInput = formData.get('pokemon-name');
      const sanitizedInput = sanitizeName(searchInput);
  
      if (!sanitizedInput) {
        alert('Por favor, ingrese un nombre válido');
        return;
      }
  
      const searchType = formData.get('search-election');
      if (searchType === 'by-pokemon') {
        const pokemonData = await getPokemonData(sanitizedInput);
        if (pokemonData) {
          renderPokemon(htmlElements.details, pokemonData);
  
          htmlElements.clearButton.classList.remove('hidden');      //fidelity
          htmlElements.submitButton.classList.add('action');           //fidelity
        }
      } else if (searchType === 'by-ability') {
        const abilityData = await getAbilityData(sanitizedInput);
        if (abilityData) {
          renderAbility(htmlElements.details, abilityData);
  
          htmlElements.clearButton.classList.remove('hidden');         //fidelity
          htmlElements.submitButton.classList.add('action');         //fidelity
        }
      } else {
        alert('Por favor, seleccione un tipo de búsqueda válido');
      }
    },
  
    clear: (event) => {
      event.preventDefault();
      htmlElements.details.replaceChildren();
      htmlElements.clearButton.classList.add('hidden');
      htmlElements.submitButton.classList.remove('action');
      htmlElements.form.reset();  //resetea los valores de input y select option
    },

    github: (event) => {
      event.preventDefault();
      window.open('https://github.com/2024-SEMII-DESV-1GS222/batista-aaron/tree/main/ParcialIII', '_blank');
    } 
  }

const bindEvents = () => {
  htmlElements.form.addEventListener('submit', handlers.submit);
  htmlElements.clearButton.addEventListener('click', handlers.clear); 
  htmlElements.githubButton.addEventListener('click', handlers.github);
}

const init = () => {
  bindEvents();
}

init();

