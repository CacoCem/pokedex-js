// Fazer a requisição da API PokeAPI
const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

const pokemonList = document.getElementById('pokemonList')


function convertPokemonToList(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number.toString().padStart(3, '0')}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src=${pokemon.photo} alt="${pokemon.name}">
                </div>
            </li> 
    `
}


// Iniciar a requisição usando fetch (promise)
pokeApi.getPokemons().then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToList).join('')
})

console.log(pokemon);
