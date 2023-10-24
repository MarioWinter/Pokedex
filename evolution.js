async function fetchEvolution(responseAsJason, j) {
    let name = responseAsJason['name'];

    for (let d = 1; d <= 209; d++) {

        let url = `https://pokeapi.co/api/v2/evolution-chain/${d}/`;
        let responseData = await fetch(url);
        let evolutionData = await responseData.json();

        if (evolutionData['chain']['evolves_to'].length === 0){
            continue;
        }
        let foundEvolution3 = checkEvolution3(evolutionData, name);
        let foundEvolution1 = checkEvolution1(evolutionData, name);
        let foundEvolution2 = checkEvolution2(evolutionData, name);
        if (foundEvolution1 || foundEvolution2 || foundEvolution3 !== false) {
            getEvolutionIDs(foundEvolution1, foundEvolution2, foundEvolution3, evolutionData, j);
        } else {
            continue;
        }
    }
}


function getEvolutionIDs(foundEvolution1, foundEvolution2, foundEvolution3, evolutionData, j) {

    if (foundEvolution1 == true && foundEvolution3 === "nothing" || foundEvolution2 == true && foundEvolution3 === "nothing") {
        let species1 = evolutionData['chain']['species']['url'].replace('https://pokeapi.co/api/v2/pokemon-species/', '');
        let species2 = evolutionData['chain']['evolves_to'][0]['species']['url'].replace('https://pokeapi.co/api/v2/pokemon-species/', '');
        let PokeID1 = species1.replace('/', '');
        let PokeID2 = species2.replace('/', '');
        AddTwoEvolutions(PokeID1, PokeID2, j);

    } else if (foundEvolution1 == true || foundEvolution2 == true || foundEvolution3 == true) {
        let species1 = evolutionData['chain']['species']['url'].replace('https://pokeapi.co/api/v2/pokemon-species/', '');
        let species2 = evolutionData['chain']['evolves_to'][0]['species']['url'].replace('https://pokeapi.co/api/v2/pokemon-species/', '');
        let species3 = evolutionData['chain']['evolves_to'][0]['evolves_to'][0]['species']['url'].replace('https://pokeapi.co/api/v2/pokemon-species/', '');

        let PokeID1 = species1.replace('/', '');
        let PokeID2 = species2.replace('/', '');
        let PokeID3 = species3.replace('/', '');
        AddThreeEvolutions(PokeID1, PokeID2, PokeID3, j);

    } 
}


function AddTwoEvolutions(PokeID1, PokeID2, j) {
    let img1 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${PokeID1}.png`;
    let img2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${PokeID2}.png`;
    let infoContainerEvolution = document.getElementById(`infoContainerEvolution${j}`);
    infoContainerEvolution.innerHTML = `
        
        <div class="pokeEvolutionContainer">
            <p>First</p>
            <p>evoloved To</p>
            <p>Full evolved</p>
        </div>
        <div class="pokeEvolutionContainer">
            <img class="pokemon-img-pocket" src="${img1}" alt="Pokemon Evolution1">

            <svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" transform="rotate(180)">
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" fill="black" stroke="black" stroke-width="2"/>
            </svg>

            <img class="pokemon-img-pocket" src="${img2}" alt="Pokemon Evolution1">
        </div>    
    `;
}


function AddThreeEvolutions(PokeID1, PokeID2, PokeID3, j) {
    let img1 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${PokeID1}.png`;
    let img2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${PokeID2}.png`;
    let img3 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${PokeID3}.png`;

    let infoContainerEvolution = document.getElementById(`infoContainerEvolution${j}`);
    infoContainerEvolution.innerHTML = `
        
        <div class="pokeEvolutionContainer">
            <p>First</p>
            <p></p>
            <p>Second</p>
            <p></p>
            <p>Full evolved</p>
        </div>
        <div class="pokeEvolutionContainer">
            <img class="pokemon-img-pocket2" src="${img1}" alt="Pokemon frist evolution">

            <svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" transform="rotate(180)">
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" fill="black" stroke="black" stroke-width="2"/>
            </svg>

            <img class="pokemon-img-pocket2" src="${img2}" alt="Pokemon second evolution">

            <svg class="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" transform="rotate(180)">
                    <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" fill="black" stroke="black" stroke-width="2"/>
            </svg>

            <img class="pokemon-img-pocket" src="${img3}" alt="Pokemon thrid evolution">
        </div>    
    `;
}


function checkEvolution1(evolutionData, name) {
    let evoName1 = evolutionData['chain']['species']['name'];
    if (evoName1 === name) {
        
        return true;
    } else {
        return false;
    }
}


function checkEvolution2(evolutionData, name) {
    let evoName2 = ""
    let evolvesTo = evolutionData['chain']['evolves_to'];

    if (evolvesTo.length > 0) {
        evoName2 = evolutionData['chain']['evolves_to'][0]['species']['name'];
    } else {
        return false;
    }
    
    if (evoName2 === name) {
        
        return true;
    } else {
        return false;
    }
}


function checkEvolution3(evolutionData, name) {
    let evolvesTo = "";
    let evoName3 = "";

    if (typeof evolutionData['chain']['evolves_to'][0] === "undefined") {
        return 'nothing';
    } else if (typeof evolutionData['chain']['evolves_to'][0]['evolves_to'] === "undefined") {
        return 'nothing';
    } else {
        evolvesTo = evolutionData['chain']['evolves_to'][0]['evolves_to'];
    }

    if (evolvesTo.length > 0) {
        evoName3 = evolutionData['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'];
    } else {
        return 'nothing';
    }

    if (typeof evoName3 === "undefined") {
        return 'nothing';
    }

    if (evoName3 === name) {
        
        return true;
    } else {
        return false;
    }
}
