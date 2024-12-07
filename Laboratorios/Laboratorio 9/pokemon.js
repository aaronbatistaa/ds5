const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';

const sanitizeName = (name) => {   //recibe el pokemonName ingresado en el input
  return name    //retorna el name curado
    .trim()                         //elimina los espacios entre 
    .toLowerCase()              //asegurar todos los caracteres en minúscula para que estableca la búsqueda
    .replace(/[^a-z]/g, '');        //elimina numeros para no alterar la búsqueda en el api
}

const getPokemon = async (name) => {
  const response = await fetch(`${POKEAPI_URL}/${name}`);
  return response.json();
}

const renderPokemon = (template, pokemon) => {   //recibe como parámetros el htmlElements.details
  const { name, sprites, id, weight, height } = pokemon;
  const html = `
    <div class="pokemon-card">
      <div class="pokemon-card__header">
        <span>${name} (${id})</span>
      </div>
      <div class="pokemon-card__body">
        <div class="pokemon-card_sprites">
            <h3>Sprites</h3>
            <div class="pokemon-card_img">      
                <img src="${sprites.front_default}" alt="${name}" />
                <img src="${sprites.back_default}" alt="${name}" />
            </div>
        </div>
        <div class="pokemon-card_stats">
            <h3 id="stats_title">Weight / Height</h3>
            <span>${weight} / ${height}</span>
        </div>
      </div>
    </div>
  `;
  template.innerHTML += html;
}

export {
  getPokemon,
  renderPokemon,
  sanitizeName,
};