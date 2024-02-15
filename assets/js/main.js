// Referenciando elementos HTML
const pokemonList = document.getElementById('pokemonList');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Definindo constantes e variáveis de paginação
const limit = 151;
let offset = 0;
let pokemons = []; // Mantenha uma variável para armazenar todos os Pokémon

function loadInitialPokemon() {
    pokeApi.getPokemons(offset, limit).then((pokemonData) => {
        pokemons = pokemonData; // Armazena os Pokémon na variável global
        loadPokemonItems(); // Carrega os Pokémon na lista
    });
}

loadInitialPokemon();

// Função para carregar itens Pokémon
function loadPokemonItems() {
    // Limpa a lista de Pokémon atual
    pokemonList.innerHTML = '';

    // Carrega todos os itens da lista
    const newHtml = pokemons.map((pokemon) => `
        <a href="details.html?pokemon=${pokemon.number}" class="pokemon-link">
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
        </a>
    `).join('');

    // Adiciona os itens à lista de Pokémon
    pokemonList.innerHTML = newHtml;
}

// Função para filtrar os Pokémon de acordo com o texto de busca
function filterPokemonByName(searchText) {
    // Verifica se o texto de busca está vazio
    if (!searchText.trim()) {
        loadInitialPokemon(); // Se estiver vazio, recarrega os primeiros 9 Pokémon
        return;
    }

    // Filtra os Pokémon cujo nome inclui o texto de busca
    const filteredPokemons = pokemons.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(searchText.toLowerCase());
    });

    // Carrega os Pokémon filtrados na lista
    const newHtml = filteredPokemons.map((pokemon) => `
        <a href="details.html?pokemon=${pokemon.number}" class="pokemon-link">
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
        </a>
    `).join('');

    // Adiciona os Pokémon filtrados à lista de Pokémon
    pokemonList.innerHTML = newHtml;
}

// Ouvinte de evento para o input de busca
searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.trim(); // Obtém o texto de busca
    filterPokemonByName(searchText); // Filtra os Pokémon de acordo com o texto de busca
});

// Ouvinte de evento para o botão de busca
searchButton.addEventListener('click', () => {
    const searchText = searchInput.value.trim(); // Obtém o texto de busca
    filterPokemonByName(searchText); // Filtra os Pokémon de acordo com o texto de busca
});

// Ouvinte do clique nos Pokémon
pokemonList.addEventListener('click', (event) => {
    const pokemonLink = event.target.closest('.pokemon-link');
    if (pokemonLink) {
        event.preventDefault(); // Evita o comportamento padrão do link
        const pokemonNumber = pokemonLink.getAttribute('href').split('=')[1];
        // Redireciona para a página de detalhes com base no número do Pokémon
        window.location.href = `details.html?pokemon=${pokemonNumber}`;
    }
});
