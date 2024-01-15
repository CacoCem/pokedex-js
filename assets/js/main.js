// Referenciando elementos HTML
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton');

//Definindo constantes e variáveis de paginação
const maxRecords = 151;
const limit = 9
let offset = 0

// Função para carregar itens Pokémon
function loadPokemonItens(offset, limit) {
    // Requisição para a API
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        // Criando o elemento em HTML para cada Pokémon
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
        `).join('')

        // Adição do elemento gerado
        pokemonList.innerHTML += newHtml
    })
}

// Carregamento dos primeiros Pokémon
loadPokemonItens(offset, limit)

// Ouvinte do botão "Carregar Mais"
loadMoreButton.addEventListener('click', () => {
    offset += limit // Incremento da posição da lista
    const qtdRecordNextPage = offset + limit

    // Verificação se passou do número máximo de Pokémon
    if(qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        // Remove o botão "Carregar Mais" quando atinge o limite máximo
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        // Carrega os Pokémon normalmente, até chegar no número máximo de registros
        loadPokemonItens(offset, limit)
    }
})

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