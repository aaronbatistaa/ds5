const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';
const POKEAPI_ABILITY_URL = 'https://pokeapi.co/api/v2/ability';

const sanitizeName = (name) => {     //recibe el pokemonName ingresado en el input para antes de enviarlo al api
  return name                       //retorna el name curado
    .trim()                      //elimina los espacios entre 
    .toLowerCase()               //asegurar todos los caracteres en minúscula para que estableca la búsqueda
    .replace(/[^a-z,-]/g, '');    //elimina numeros para no alterar la búsqueda en el api, agregar guiones para pokemones especiales
}

const getPokemonData = async (name) => {
    const pokemonResponse = await fetch(`${POKEAPI_URL}/${name}`); //guarda los datos básicos del pokemon
    const pokemon = await pokemonResponse.json();       //lo convierte a un obj json

    const speciesResponse = await fetch(pokemon.species.url);     //dependiendo del pokemon busca los datos de la especie para el chain evolution
    const species = await speciesResponse.json();       

    const evolutionChainResponse = await fetch(species.evolution_chain.url);   //de los datos de el url de species saca el url del evolution chain con los datos de las evoluciones
    const evolutionChain = await evolutionChainResponse.json();
    const evolutionChainData = await getEvolutionChainNames(evolutionChain.chain);     //procesa la cadena de evolución y determina el is_baby


    return {
      pokemon,       //datos básicos
      species,       //datos de especie
      evolutionChain : evolutionChainData   //lista de evoluciones ya con los babys
    };
}

const getAbilityData = async (abilityName) => {
    const response = await fetch(`${POKEAPI_ABILITY_URL}/${abilityName}`);
    const abilityData = await response.json();
    return abilityData;
}

const getEvolutionChainNames = async (chain) => {
    let evolutionData = [];          //inicializa la lista vacía donde se guardará el name y el isbaby
  
    const traverseChain = async (node) => {            //funcion recursiva para recorrer la cadena de evolucion ya sea lineal o ramificada, donde node es el nodo actual
        const speciesName = node.species.name;          //extrae nombre y url
        const speciesUrl = node.species.url;
  
        const speciesResponse = await fetch(speciesUrl);
        const speciesData = await speciesResponse.json();
        const isBaby = speciesData.is_baby;           //comprueba si es bb
  
        evolutionData.push({ name: speciesName, is_baby: isBaby });        //lo añade a la lista
  
        if (node.evolves_to && node.evolves_to.length > 0) {      //si el nodo actual tiene evolves_to y tiene contenido
            for (const evolution of node.evolves_to) {       //iterar sobre cada evolucion posible desde el nodo actual, para que no se salga del nodo actual
            await traverseChain(evolution);
            }
        }
    }
  
    await traverseChain(chain);
  
    return evolutionData;
}

const renderPokemon = (template, pokemonData) => {
    const { name, sprites, id, weight, height } = pokemonData.pokemon;
    const abilities = pokemonData.pokemon.abilities.map(ability => ability.ability.name);       //crea una nueva lista apartir de la lista abilities en pokemonData
    const evolutionChainData = pokemonData.evolutionChain;        //agarra la lista de evolutionChain de pokemonData dada por getPokemon
  
    const abilitiesHtml = abilities.map(ability => `<li>${ability}</li>`).join('');   //crea una nueva lista de elementos apartir de la lista de abilities para mostrar
    
    
    const evolutionChainHtml = evolutionChainData.map(species => {   // crea la lista de elementos añadiendo la imagen del bb si le corresponde iterando por cada especie
      const speciesName = species.name;
      if (species.is_baby) {
        return `<li>${speciesName} <img src="https://uxwing.com/wp-content/themes/uxwing/download/toys-childhood/baby-boy-icon.png" alt="Bebé Pokémon" class="baby-icon" title="Bebé Pokémon" /></li>`;
      } else {
        return `<li>${speciesName}</li>`;
      }
    }).join('');
  
    const html = `
      <div class="pokemon-card">
        <div class="pokemon-card__header">
          <h4><b>${name} (${id})</b></h4>
        </div>
        <div class="pokemon-card__body">
          <div class="pokemon-card_sprites">
            <h3>Sprites</h3>
            <div class="pokemon-card_img">      
              <img src="${sprites.front_default}" alt="${name} frontal" />
              <img src="${sprites.back_default}" alt="${name} trasero" />
            </div>
          </div>
          <div class="pokemon-card_stats">
            <h3 id="stats_title">Weight / Height</h3>
            <span>${weight} / ${height}</span>
          </div>
        </div>
        <div class="pokemon-card__others">
          <div class="pokemon-card_evolution">
              <h3>Evolution Chain</h3>
              <ul>
                  ${evolutionChainHtml}
              </ul>
          </div>
          <div class="pokemon-card_abilities">
              <h3>Abilities</h3>
              <ul>
                  ${abilitiesHtml}
              </ul>
          </div>
        </div>
      </div>
    `;
    template.innerHTML += html;
}
  
const renderAbility = (template, abilityData) => {
    const { name, pokemon } = abilityData;
    const pokemonListHtml = pokemon.map(entry => {        //se mapea la entrada de ambas colocaciones name y el ishidden
        const pokemonName = entry.pokemon.name;
        const isHidden = entry.is_hidden;
        if (isHidden) {
            return `<li>${pokemonName} <img src="https://www.pngkey.com/png/detail/155-1554223_png-file-svg-crossed-eye-icon-png.png" alt="Habilidad Oculta" class="hidden-icon" title="Habilidad Oculta" /></li>`;
        } else {
            return `<li>${pokemonName}</li>`;
        }
    }).join('');
  
    const html = `
      <div class="pokemon-card">
        <div class="pokemon-card__header">
          <h4><b>${name}</b></h4>
        </div>
        <div class="pokemon-card__body">
          <div class="pokemon-card__who">
            <h3>Who can learn it?</h3>
            <ul>
              ${pokemonListHtml}
            </ul>
          </div>
        </div>
      </div>
    `;
    template.innerHTML += html;
}

export {
    getPokemonData,
    getAbilityData,
    renderPokemon,
    renderAbility,
    sanitizeName,
};