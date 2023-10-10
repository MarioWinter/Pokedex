let isLiked = false;
let j = "";
let PokeData = "";
let m = "";
let maxPoke = 47;
let PokeSmallInnerHTML = [];

async function loadAllPokemonData() {
    PokeSmallInnerHTML = [];
    
    for (m = 1; m <= maxPoke; m++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${m}/`;
        let response = await fetch(url);
        PokeData = await response.json();
        loadPokemon(PokeData, m);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Code, der die Event Listener registriert

    let toggle = document.getElementById('toggle'); //click on body

    document.addEventListener('click', function (event) {
        let isClickInside = toggle.contains(event.currentTarget);

        if (!isClickInside) {
            closePokeBigCard();
        }
    });
});

document.getElementById("search").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        filterNames();
    }
  });

async function loadMore() {
    if (maxPoke <= 497) {
        maxPoke = maxPoke + 50;
    
        for (;m <= maxPoke; m++) {
            let url = `https://pokeapi.co/api/v2/pokemon/${m}/`;
            let responseMore = await fetch(url);
            PokeData = await responseMore.json();
            loadPokemon(PokeData, m);
        }
    }
}


function doNotClose(event) {
    event.stopPropagation();
}

function hideAllpokeContent() {
    for (let i = 1; i <= maxPoke; i++) {
        document.getElementById(`pokeContent${i}`).classList.add('d-none');  
    }
}


function loadPokemon(responseAsJason, j) {
    document.getElementById('pokedex-container').innerHTML += pokemonBigContainer(responseAsJason, j);
    firstPokeArrow(j);
    lastPokeArrow(j);
    document.getElementById(`infoHeader${j}`).innerHTML = pokemonBigInfoHeader(j);
    document.getElementById('pokedex').innerHTML += pokemonSmallContainer(responseAsJason, j);
    document.getElementById(`pokeNumber${j}`).innerHTML = convertPokeNumer(responseAsJason);
    document.getElementById(`pokeNumberSmall${j}`).innerHTML = convertPokeNumer(responseAsJason);
    pokemonTypes(responseAsJason, j);
    pokeMenuSelection(responseAsJason, j);
    pokemonAbilities(responseAsJason, j);
    //fetchEvolution(j);
    cardColor(j);
    pushPokeSmallInnerHTML(j);
}

function pushPokeSmallInnerHTML(index) {
    let pokemon = document.getElementById(`pokeContentSmall${index}`).innerHTML;
    PokeSmallInnerHTML.push(pokemon);
}

function filterClose() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();

    let pokedex = document.getElementById('pokedex');
    
    if (search.length == 1) {
        pokedex.innerHTML = '';
        for (let index = 1; index <= PokeSmallInnerHTML.length; index++) {
            --index;
            let pokemon = PokeSmallInnerHTML[index];
            ++index;
            pokedex.innerHTML += 
                `<div id="pokeContentSmall${index}" class="pokedex-content-small" onclick="doNotClose(event), showPokeBigCard(${index})">${pokemon}<div>`;
            cardColor(index);
        } 
    }
}


function filterNames() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();

    let pokedex = document.getElementById('pokedex');
    if(search.length >= 3) {
        pokedex.innerHTML = '';
        for (let index = 1; index <= PokeSmallInnerHTML.length; index++) {
            --index;
            let pokemon = PokeSmallInnerHTML[index];
            ++index;
            if(pokemon.toLowerCase().includes(search)) {

                pokedex.innerHTML += 
                `<div id="pokeContentSmall${index}" class="pokedex-content-small" onclick="doNotClose(event), showPokeBigCard(${index})">${pokemon}<div>`;
                cardColor(index);
            }
        }
    }
}


function showPokeBigCard(index) {
    document.getElementById('pokedex').classList.add('d-none');
    document.getElementById('pokedex-container').classList.remove('d-none');
    document.getElementById(`pokeContent${index}`).classList.remove('d-none');
}

function closePokeBigCard() {
    hideAllpokeContent();
    document.getElementById('pokedex').classList.remove('d-none');
    document.getElementById('pokedex-container').classList.add('d-none');
}


function nextCountUp(index) {
    document.getElementById(`pokeContent${index}`).classList.add('d-none');
    ++index
    document.getElementById(`pokeContent${index}`).classList.remove('d-none');
}


function nextCountDown(index) {
    document.getElementById(`pokeContent${index}`).classList.add('d-none');
    --index
    document.getElementById(`pokeContent${index}`).classList.remove('d-none');  
}

function firstPokeArrow(index) {
    if (index == 1) {
        document.getElementById(`leftNextButton${index}`).classList.add('d-none');
    }
}

function lastPokeArrow(index) {
    if (index === maxPoke) {
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
            document.getElementById(`pokeTypeSmall${index}`).innerHTML += `<div id="mainType${index}" class="pokemon-type">${pokemonType}</div>`;
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


function likeHandleClick(index) {
    let likeButton = document.getElementById(`likeButton${index}`);
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
    // evolution();
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


function cardColor(index) {
    let mainType = document.getElementById(`mainType${index}`).innerHTML;
    // let pokemonType = responseAsJason['types'][0].type.name;
    if (mainType == "grass") {
        document.getElementById(`pokeContent${index}`).classList.add('card-grass');
        document.getElementById(`pokeContentSmall${index}`).classList.add('card-grass');
    } else if (mainType == "fire") {
        document.getElementById(`pokeContent${index}`).classList.add('card-fire');
        document.getElementById(`pokeContentSmall${index}`).classList.add('card-fire');
    } else if (mainType == "psychic") {
        document.getElementById(`pokeContent${index}`).classList.add('card-psychic');
        document.getElementById(`pokeContentSmall${index}`).classList.add('card-psychic');
    } else if (mainType == "electric") {
        document.getElementById(`pokeContent${index}`).classList.add('card-electric');
        document.getElementById(`pokeContentSmall${index}`).classList.add('card-electric');
    } else if (mainType == "dragon") {
        document.getElementById(`pokeContent${index}`).classList.add('card-dragon');
        document.getElementById(`pokeContentSmall${index}`).classList.add('card-dragon');
    } else if (mainType == "ice") {
        document.getElementById(`pokeContent${index}`).classList.add('card-ice');
        document.getElementById(`pokeContentSmall${index}`).classList.add('card-ice');
    } else if (mainType == "normal") {
        document.getElementById(`pokeContent${index}`).classList.add('card-normal');
        document.getElementById(`pokeContentSmall${index}`).classList.add('card-normal');
    } else if (mainType == "water") {
        document.getElementById(`pokeContent${index}`).classList.add('card-water');
        document.getElementById(`pokeContentSmall${index}`).classList.add('card-water');
    } else if (mainType == "bug") {
       document.getElementById(`pokeContent${index}`).classList.add('card-bug');
       document.getElementById(`pokeContentSmall${index}`).classList.add('card-bug');
    } else if (mainType == "poison") {
        document.getElementById(`pokeContent${index}`).classList.add('card-poison');
        document.getElementById(`pokeContentSmall${index}`).classList.add('card-poison');
    } else if (mainType == "ground") {
        document.getElementById(`pokeContent${index}`).classList.add('card-ground');
        document.getElementById(`pokeContentSmall${index}`).classList.add('card-ground');
    } else if (mainType == "fairy") {
        document.getElementById(`pokeContent${index}`).classList.add('card-fairy');
        document.getElementById(`pokeContentSmall${index}`).classList.add('card-fairy');
    } else if (mainType == "fighting") {
        document.getElementById(`pokeContent${index}`).classList.add('card-fighting');
        document.getElementById(`pokeContentSmall${index}`).classList.add('card-fighting');
    } else if (mainType == "rock") {
        document.getElementById(`pokeContent${index}`).classList.add('card-rock');
        document.getElementById(`pokeContentSmall${index}`).classList.add('card-rock');
    } else if (mainType == "ghost") {
        document.getElementById(`pokeContent${index}`).classList.add('card-ghost');
        document.getElementById(`pokeContentSmall${index}`).classList.add('card-ghost');
    }
}


function fixWidth(width) {
    let newWidth = width / 10;
    return newWidth;
}


function pokeImgSizeUp(index) {
    let pokemonImage = `pokemonImage${index}`;
    document.getElementById(pokemonImage).style.height = "120px";
}

function pokeImgSizeDown(index) {
    let pokemonImage = `pokemonImage${index}`;
    document.getElementById(pokemonImage).style.height = "100px";
}

