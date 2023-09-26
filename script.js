

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
    pokemonTypes(responseAsJason);


    document.getElementById('pokedex-container').innerHTML = pokemonBigContainer(responseAsJason);
    document.getElementById('pokedex').innerHTML = pokemonSmallContainer(responseAsJason);
}

function pokemonTypes(responseAsJason) {
    let types = responseAsJason['types'];
    for (let i = 0; i < types.length; i++) {
        let type = types[i];
        console.log(type.type.name);
    }
}

function pokemonBigContainer(responseAsJason) {
    return `
    <div class="pokedex-content">
        <div class="pokedex-header">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25">
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" fill="white" stroke="white" stroke-width="2"/>
                </svg>
            </div>
            <div>
                <b>${responseAsJason['name']}</b>
            </div>
            <img class="pokemon-img-big" src="${responseAsJason['sprites']['other']['dream_world']['front_default']}" alt="Pokemon Image">
        </div>
        <div id="pokemon-info"></div>
    </div>
    `;
}


function pokemonSmallContainer(responseAsJason) {
    return ``;
}

