let isLiked = false;
let j = 74;

async function loadAllPokemonData() {

    for (let i = 1; i <= 20; i++) { // Hier habe ich 151 Pokémon als Beispiel genommen
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        let response = await fetch(url);
        let PokeData = await response.json();
        
    }
}


async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/${j}/`;
    let response = await fetch(url);
    let responseAsJason = await response.json();

    document.getElementById('pokedex-container').innerHTML = pokemonBigContainer(responseAsJason, j);
    firstPokeArrow(j);
    lastPokeArrow(j);
    document.getElementById(`infoHeader${j}`).innerHTML = pokemonBigInfoHeader(j);
    document.getElementById('pokedex').innerHTML = pokemonSmallContainer(responseAsJason, j);
    document.getElementById(`pokeNumber${j}`).innerHTML = convertPokeNumer(responseAsJason);
    pokemonTypes(responseAsJason, j);
    cardColor(responseAsJason, j);
    pokeMenuSelection(responseAsJason, j);
    pokemonAbilities(responseAsJason, j);

}


function nextCountUp(index) {
    j = ++index;
    loadPokemon();
}


function nextCountDown(index) {
    j = --index;
    loadPokemon();
}

function firstPokeArrow(index) {
    if (index == 1) {
        document.getElementById(`leftNextButton${index}`).classList.add('d-none');
    }
}

function lastPokeArrow(index) {
    if (index == 151) {
        document.getElementById(`rightNextButton${index}`).classList.add('d-none');
    }
}


function pokemonTypes(responseAsJason, index) {
    let types = responseAsJason['types'];
    for (let i = 0; i < types.length; i++) {
        let type = types[i];
        let pokemonType = type.type.name;
        if (pokemonType !== "") {
            document.getElementById(`pokeType${index}`).innerHTML += `<span class="pokemon-type">${pokemonType}</span>`;

        }
    }
}


function pokemonAbilities(responseAsJason, index) {
    let abilities = responseAsJason['abilities'];
    for (let i = 0; i < abilities.length; i++) {
        let ability = abilities[i];
        let pokemonAbility = ability.ability.name;
        if (pokemonAbility !== "") {
            document.getElementById(`abilities${index}`).innerHTML += `<span class="card-info-value">${capitalizeFirstLetter(pokemonAbility)}</span>`;

        }
    }
}


function likeHandleClick() {
    let likeButton = document.getElementById("likeButton");
    if (isLiked) {
        likeButton.classList.remove("clicked");
        isLiked = false;
    } else {
        likeButton.classList.add("clicked");
        isLiked = true;
    }
}


function addHeaderMenuSelection(ID, index) {
    document.getElementById(`about${index}`).classList.remove('info-header-selected');
    document.getElementById(`baseStats${index}`).classList.remove('info-header-selected');
    document.getElementById(`moves${index}`).classList.remove('info-header-selected');

    document.getElementById(ID).classList.add('info-header-selected');
}


function showInfoAbout(index) {
    removeInfoContainer(index);
    document.getElementById(`infoContainerAbout${index}`).classList.remove('d-none');
}


function showInfoBest_Stats(index) {
    removeInfoContainer(index);
    document.getElementById(`infoContainerBest_Stats${index}`).classList.remove('d-none');
}


function showInfoMoves(index) {
    removeInfoContainer(index);
    document.getElementById(`infoContainerMoves${index}`).classList.remove('d-none');
}


function removeInfoContainer(index) {
    document.getElementById(`infoContainerAbout${index}`).classList.add('d-none');
    document.getElementById(`infoContainerBest_Stats${index}`).classList.add('d-none');
    document.getElementById(`infoContainerMoves${index}`).classList.add('d-none');

}


function pokeMenuSelection(responseAsJason, j) {
    document.getElementById(`infoContainerAbout${j}`).innerHTML += infoContentAbout(responseAsJason, j);
    bestStats(responseAsJason, j);
    moves(responseAsJason, j);
    
}

function bestStats(responseAsJason, j) {
    for (let i = 0; i < responseAsJason['stats'].length; i++) {
        let stats = responseAsJason['stats'][i];
        document.getElementById(`infoContainerBest_Stats${j}`).innerHTML += infoContentBestStats(stats);
    }
}

function moves(responseAsJason, j) {
    for (let i = 0; i < responseAsJason['moves'].length; i++) {
        let moves = responseAsJason['moves'][i];
        document.getElementById(`infoContainerMoves${j}`).innerHTML += infoContentMoves(moves);
    }
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);

}


function convertPokeNumer(responseAsJason) {
    let id = responseAsJason['id'];

    if (id <= 9) {
        let num = `#00${id}`;
        return num;
    } else if (id <=100) {
        let num = `#0${id}`;
        return num;
    } else if (id > 100) {
        let num = `#${id}`;
        return num;
    }
}


function cardColor(responseAsJason, index) {
    let pokemonType = responseAsJason['types'][0].type.name;
    if (pokemonType == "grass") {
        document.getElementById(`pokeContent${index}`).classList.add('card-grass');
    } else if (pokemonType == "fire") {
        document.getElementById(`pokeContent${index}`).classList.add('card-fire');
    } else if (pokemonType == "psychic") {
        document.getElementById(`pokeContent${index}`).classList.add('card-psychic');
    } else if (pokemonType == "electric") {
        document.getElementById(`pokeContent${index}`).classList.add('card-electric');
    } else if (pokemonType == "dragon") {
        document.getElementById(`pokeContent${index}`).classList.add('card-dragon');
    } else if (pokemonType == "ice") {
        document.getElementById(`pokeContent${index}`).classList.add('card-ice');
    } else if (pokemonType == "normal") {
        document.getElementById(`pokeContent${index}`).classList.add('card-normal');
    } else if (pokemonType == "water") {
        document.getElementById(`pokeContent${index}`).classList.add('card-water');
    } else if (pokemonType == "bug") {
        document.getElementById(`pokeContent${index}`).classList.add('card-bug');
    } else if (pokemonType == "poison") {
        document.getElementById(`pokeContent${index}`).classList.add('card-poison');
    } else if (pokemonType == "ground") {
        document.getElementById(`pokeContent${index}`).classList.add('card-ground');
    } else if (pokemonType == "fairy") {
        document.getElementById(`pokeContent${index}`).classList.add('card-fairy');
    } else if (pokemonType == "fighting") {
        document.getElementById(`pokeContent${index}`).classList.add('card-fighting');
    } else if (pokemonType == "rock") {
        document.getElementById(`pokeContent${index}`).classList.add('card-rock');
    } else if (pokemonType == "ghost") {
        document.getElementById(`pokeContent${index}`).classList.add('card-ghost');
    }
}

function fixWidth(width) {
    let newWidth = width / 10;
    return newWidth;
}

