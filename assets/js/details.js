// details.js
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonNumber = urlParams.get('pokemon');

    if (pokemonNumber) {
        // Obtém os detalhes do Pokémon com base no número e exibe na página
        pokeApi.getPokemonDetail({ url: `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`})
            .then((pokemon) => displayPokemonDetails(pokemon));
    } else {
        // Lógica para tratar quando não há número de Pokémon fornecido na URL
        console.error("Número de Pokémon não especificado na URL.");
    }
});

function displayPokemonDetails(pokemon) {
    // Seletor para o elemento onde os detalhes do Pokémon serão exibidos
    const pokemonDetailsContainer = document.getElementById('pokemonDetails');

    // Cria elementos HTML para exibir os detalhes do Pokémon
    const pokemonDetailsHtml = `
        <div class="pokemon-detail ${pokemon.type}">
            <div class="header-detail">
                <h2>${pokemon.name}</h2>
                <span class="number">#${pokemon.number.toString().padStart(3, '0')}</span>
            </div>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <div class="img-detail">
                    <img src=${pokemon.photo} alt="${pokemon.name}">
                </div>
            </div>
            <div class="stats-pokemon">
                <h2 class="manteiga">Sobre</h2>
                <ol>
                    <li>Altura: ${pokemon.height/10} cm</li>
                    <li>Peso: ${pokemon.weight/10} kg</li>
                    <li>Stats:</li>
                    <li>HP: ${pokemon.stats.hp}</li>
                    <li>Ataque: ${pokemon.stats.attack}</li>
                    <li>Defesa: ${pokemon.stats.defense}</li>
                    <li>Ataque especial: ${pokemon.stats['special-attack']}</li>
                    <li>Defesa especial: ${pokemon.stats['special-defense']}</li>
                    <li>Velocidade: ${pokemon.stats.speed}</li>
                </ol>
            </div>
        </div>
    `;

    // Adiciona os detalhes do Pokémon ao container criado
    pokemonDetailsContainer.innerHTML = pokemonDetailsHtml;
    console.log(pokemon.stats)
}
