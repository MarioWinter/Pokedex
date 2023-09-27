let isLiked = false;

async function loadAllPokemonData() {

    for (let i = 1; i <= 151; i++) { // Hier habe ich 151 Pokémon als Beispiel genommen
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let PokeData = await response.json();
        
    }
}


async function loadPokemon() {
    let j = 2;
    let url = `https://pokeapi.co/api/v2/pokemon/${j}/`;
    let response = await fetch(url);
    let responseAsJason = await response.json();

    document.getElementById('pokedex-container').innerHTML = pokemonBigContainer(responseAsJason, j);
    document.getElementById('pokedex').innerHTML = pokemonSmallContainer(responseAsJason, j);
    document.getElementById(`pokeNumber${j}`).innerHTML = convertPokeNumer(responseAsJason);
    pokemonTypes(responseAsJason, j);

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




function likeHandleClick() {
    let likeButton = document.getElementById("likeButton");
    // Wenn der Button bereits "geliked" wurde, entferne die Klasse und setze den Status auf "nicht geliked"
    if (isLiked) {
        likeButton.classList.remove("clicked");
        isLiked = false;
    }
    // Andernfalls füge die Klasse hinzu und setze den Status auf "geliked"
    else {
        likeButton.classList.add("clicked");
        isLiked = true;
    }
}


function pokemonBigContainer(responseAsJason, index) {
    let name = capitalizeFirstLetter(responseAsJason['name']);
    return `
    <div class="pokedex-content">
        <div class="pokedex-header">
            <div class="next-like-button-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" fill="white" stroke="white" stroke-width="2"/>
                </svg>
                <svg onclick="likeHandleClick()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" stroke-width="2" id="likeButton">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>

            </div>
            <div class="d-flex-between">
                <div>
                    <h2 class="mt-10">${name}</h2>
                    <div class="type-container" id="pokeType${index}"></div>
                </div>
                <div id="pokeNumber${index}"></div>
            </div>
            <div class="poke-img-container">
                <img class="pokemon-img-big" src="${responseAsJason['sprites']['other']['dream_world']['front_default']}" alt="Pokemon Image">
            </div>
            <svg class="pokedex-content-bkrlogo" xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 435 536">
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color: rgba(0,0,0,0.1); stop-opacity: 1" />
                    <stop offset="100%" style="stop-color: rgba(0,0,0,0.1); stop-opacity: 1" />
                    </linearGradient>
                </defs>
                <path d="M2.671,255.336l101.066,0c1.336,0 2.226,-0.89 2.449,-2.226c8.459,-55.43 55.208,-95.501 111.306,-95.501c55.208,0 103.07,41.184 111.529,95.501c0.222,1.336 1.335,2.226 2.449,2.226l101.065,0c1.336,0 2.449,-1.113 2.449,-2.449c0,-0.222 0,-0.667 -0.222,-0.89c-9.35,-111.974 -104.628,-199.683 -217.27,-199.683c-112.864,-0 -208.365,87.932 -217.492,200.351c-0,0.668 0.223,1.336 0.668,2.003c0.668,0.446 1.336,0.668 2.003,0.668Z" fill="url(#grad)" />
                <path d="M434.984,288.06c0,-0.668 -0.222,-1.335 -0.668,-2.003c-0.445,-0.446 -1.113,-0.891 -1.781,-0.891l-101.065,0c-1.336,0 -2.227,0.891 -2.449,2.226c-8.459,54.54 -56.321,95.501 -111.306,95.501c-55.876,-0 -102.847,-40.293 -111.306,-95.501c-0.223,-1.335 -1.336,-2.226 -2.449,-2.226l-101.066,0c-0.668,0 -1.336,0.223 -1.781,0.891c-0.445,0.445 -0.668,1.113 -0.668,2.003c9.127,112.419 104.628,200.351 217.27,200.351c112.641,0 208.142,-87.932 217.269,-200.351Z" fill="url(#grad)" />
                <path d="M217.492,188.33c-40.738,-0 -74.798,29.162 -81.031,69.455c-0.668,4.452 -1.113,8.459 -1.113,12.466c0,4.007 0.445,8.014 1.113,12.466c6.011,39.625 40.961,69.455 81.031,69.455c40.738,0 74.798,-29.162 81.031,-69.455c0.668,-4.674 1.113,-8.681 1.113,-12.466c0,-3.784 -0.445,-7.791 -1.113,-12.466c-6.011,-40.07 -40.07,-69.455 -81.031,-69.455Z" fill="url(#grad)" />
                <path d="M374.211,451.68c-0.89,-0.89 -2.449,-0.89 -3.339,0c-30.721,26.046 -67.674,43.855 -106.854,51.646c-1.336,0.223 -2.226,1.558 -2.003,2.894l5.12,27.159c0.222,0.668 0.445,1.335 1.113,1.558c0.445,0.223 0.89,0.445 1.335,0.445l0.446,0c45.858,-9.127 88.822,-30.052 124.217,-60.773c0.445,-0.445 0.891,-1.113 0.891,-1.781c-0,-0.668 -0.223,-1.335 -0.891,-1.781l-20.035,-19.367Z" fill="url(#grad)" />
                <path d="M33.392,116.649c0.445,0.445 1.113,0.668 1.781,0.668c0.668,-0 1.335,-0.446 1.781,-0.891c45.19,-52.982 110.86,-83.479 180.538,-83.479c43.632,-0 86.151,12.021 123.327,34.504c1.113,0.668 2.449,0.446 3.339,-0.667l16.696,-22.262c0.446,-0.667 0.668,-1.335 0.446,-2.003c-0.223,-0.668 -0.446,-1.336 -1.113,-1.781c-42.742,-26.713 -92.162,-40.738 -142.695,-40.738c-78.359,0 -152.712,34.06 -204.135,93.497c-0.891,1.113 -0.891,2.449 0.222,3.339l19.813,19.813Z" fill="url(#grad)" />
            </svg>
        </div>
        <div id="pokemon-info"></div>
    </div>
    `;
}


function pokemonSmallContainer(responseAsJason) {
    return ``;
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

