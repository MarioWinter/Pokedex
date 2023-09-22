

async function loadAllPokemonData() {

    for (let i = 1; i <= 151; i++) { // Hier habe ich 151 Pokémon als Beispiel genommen
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let PokeData = await response.json();
        
    }
  }


async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/bulbasaur`;
    let response = await fetch(url);
    let responseAsJason = await response.json();

    document.getElementById('pokedex').innerHTML = `<b>${responseAsJason['name']}</b>`;
}