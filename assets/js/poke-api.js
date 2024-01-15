const pokeApi = {}

// Função para converter detalhes da PokeAPI em um objeto Pokemon
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other['official-artwork'].front_default
    return pokemon
}

// Função para obter detalhes de um Pokémon específico
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

// Função para obter uma lista de Pokémon
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    // Fazer a requisição da API PokeAPI
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())                            // Converte a resposta para JSON
        .then((jsonBody) => jsonBody.results)                           // Extrai a lista de Pokémon da resposta JSON
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))     // Mapeia cada Pokémon para obter detalhes
        .then((detailRequests) => Promise.all(detailRequests))          // Aguarda todas as solicitações de detalhes serem concluídas
        .then((pokemonsDetails) => pokemonsDetails)                     // Retorna os detalhes de cada Pokémon
}