// details.js
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    let currentPokemonNumber = parseInt(urlParams.get('pokemon')) || 1;

    if (currentPokemonNumber) {
        // Obtém os detalhes do Pokémon com base no número e exibe na página
        pokeApi.getPokemonDetail({ url: `https://pokeapi.co/api/v2/pokemon/${currentPokemonNumber}/`})
            .then((pokemon) => displayPokemonDetails(pokemon));
    } else {
        // Lógica para tratar quando não há número de Pokémon fornecido na URL
        console.error("Número de Pokémon não especificado na URL.");
    }

    const btnAnterior = document.querySelector('.btn-prev');
    const btnProximo = document.querySelector('.btn-next');

    btnAnterior.addEventListener('click', () => {
        // Navega para o Pokémon anterior
        currentPokemonNumber = Math.max(1, currentPokemonNumber - 1);

        // Atualiza a URL sem recarregar a página
        history.pushState({}, '', `details.html?pokemon=${currentPokemonNumber}`);

        // Obtém os detalhes do Pokémon anterior e exibe na página
        pokeApi.getPokemonDetail({ url: `https://pokeapi.co/api/v2/pokemon/${currentPokemonNumber}/`})
            .then((pokemon) => {
                displayPokemonDetails(pokemon);
            });
    });

    btnProximo.addEventListener('click', () => {
        // Defina o número máximo do Pokémon disponível (por exemplo, 5 para o seu caso)
        const maxPokemonNumber = 1025;

        // Navega para o próximo Pokémon
        currentPokemonNumber = Math.min(maxPokemonNumber, currentPokemonNumber + 1);

        // Atualiza a URL sem recarregar a página
        history.pushState({}, '', `details.html?pokemon=${currentPokemonNumber}`);

        // Obtém os detalhes do próximo Pokémon e exibe na página
        pokeApi.getPokemonDetail({ url: `https://pokeapi.co/api/v2/pokemon/${currentPokemonNumber}/`})
            .then((pokemon) => {
                displayPokemonDetails(pokemon);
            });
    });
});

const getColorClass = (statValue) => {
    if (statValue < 50) {
        return 'red';
    } else if (statValue === 50) {
        return 'yellow';
    } else {
        return 'green';
    }
};

function displayPokemonDetails(pokemon) {
    // Seletor para o elemento onde os detalhes do Pokémon serão exibidos
    const pokemonDetailsContainer = document.getElementById('pokemonDetails'); 

    // Cria elementos HTML para exibir os detalhes do Pokémon
    const pokemonDetailsHtml = `
    <div class="pokemon-detail ${pokemon.type}">
        <div class="header-detail">
            <h2 class="name"> ${pokemon.name}</h2>
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
            <h2 class="sobre-pokemon">Sobre</h2>
            <ol>
                <li>Altura: ${pokemon.height/10} m</li>
                <li>Peso: ${pokemon.weight/10} kg</li>
                <br>
                <li>Stats:</li>
                <li>HP
                    <div class="stats-progresso">
                        <span>${pokemon.stats.hp}</span>
                        <div class="barra">
                            <div class="barra-progresso ${getColorClass(pokemon.stats.hp)}" style="width: ${pokemon.stats.hp}%; max-width: 100%"></div>
                        </div>  
                    </div>               
                </li>
                <li>Ataque
                    <div class="stats-progresso">
                        <span>${pokemon.stats.attack}</span>
                        <div class="barra">
                            <div class="barra-progresso ${getColorClass(pokemon.stats.attack)}" style="width: ${pokemon.stats.attack}%; max-width: 100%"></div>
                        </div> 
                    </div>
                </li>
                <li>Defesa
                    <div class="stats-progresso">
                        <span>${pokemon.stats.defense}</span>
                        <div class="barra">
                            <div class="barra-progresso ${getColorClass(pokemon.stats.defense)}" style="width: ${pokemon.stats.defense}%; max-width: 100%"></div>
                        </div> 
                        
                    </div>
                </li>
                <li>Ataque Especial
                    <div class="stats-progresso">
                        <span>${pokemon.stats['special-attack']}</span>
                        <div class="barra">
                            <div class="barra-progresso ${getColorClass(pokemon.stats['special-attack'])}" style="width: ${pokemon.stats['special-attack']}%; max-width: 100%"></div>
                        </div>
                    </div>
                </li>
                <li>Defesa Especial
                    <div class="stats-progresso">
                        <span>${pokemon.stats['special-defense']}</span>
                        <div class="barra">
                            <div class="barra-progresso ${getColorClass(pokemon.stats['special-defense'])}" style="width: ${pokemon.stats['special-defense']}%; max-width: 100%"></div>
                        </div>
                    </div>                    
                </li>
                <li>Velocidade
                    <div class="stats-progresso">
                        <span>${pokemon.stats.speed}</span>
                        <div class="barra">
                            <div class="barra-progresso ${getColorClass(pokemon.stats.speed)}" style="width: ${pokemon.stats.speed}%; max-width: 100%"></div>
                        </div>
                    </div>
                </li>
            </ol>
        </div>
    </div>
`;
    

    // Adiciona os detalhes do Pokémon ao container criado
    pokemonDetailsContainer.innerHTML = pokemonDetailsHtml;
    console.log(pokemon.stats)
}