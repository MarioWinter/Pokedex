
let evolutionsChains = [];

async function fetchEvolution(responseAsJason, j) {
    let name = responseAsJason['name'];
    for (let d = 1; d <= 19; d++) {
        let url = `https://pokeapi.co/api/v2/evolution-chain/${d}/`;
        let responseTrigger = await fetch(url);
        let evolutionData = await responseTrigger.json();

        let evo3 = evolution3(evolutionData, name);
        let evo1 = evolution1(evolutionData, name);
        let evo2 = evolution2(evolutionData, name);
        if (evo1 || evo2 || evo3 !== false) {
            getEvolutionIDs(evo1, evo2, evo3, evolutionData, j);
        } else {
            continue;
        }
    }
}




function getEvolutionIDs(evo1, evo2, evo3, evolutionData, j) {
    if (evo1 == true || evo2 == true && evo3 == false) {
        let species1 = evolutionData['chain']['species']['url'].replace('https://pokeapi.co/api/v2/pokemon-species/', '');
        let species2 = evolutionData['chain']['evolves_to'][0]['species']['url'].replace('https://pokeapi.co/api/v2/pokemon-species/', '');
        let PokeID1 = species1.replace('/', '');
        let PokeID2 = species2.replace('/', '');
        AddTwoEvolutions(PokeID1, PokeID2, j);
    }
}

function AddTwoEvolutions(PokeID1, PokeID2, j) {
    let img1 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${PokeID1}.svg`;
    let img2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${PokeID2}.svg`;
    let infoContainerEvolution = document.getElementById(`infoContainerEvolution${j}`);
    infoContainerEvolution.innerHTML = `
        <div class="pokeEvolutionContainer">
            <img class="pokemon-img-pocket" src="${img1}" alt="Pokemon Evolution1">
            <img class="pokemon-img-pocket" src="${img2}" alt="Pokemon Evolution1">
        </div>
    `;
}


//let evo1 = evolutionData['chain']['species']['url'].replace('https://pokeapi.co/api/v2/pokemon-species/', '');
//let evo2 = evolutionData['chain']['evolves_to'][0]['species']['url'].replace('https://pokeapi.co/api/v2/pokemon-species/', '');
//let evo3 = evolutionData['chain']['evolves_to'][0]['evolves_to'][0]['species']['url'].replace('https://pokeapi.co/api/v2/pokemon-species/', '');

//let PokeID = evo1.replace('/', '');
//let img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${PokeID}.svg`


function evolution1(evolutionData, name) {
    let evoName1 = evolutionData['chain']['species']['name'];
    if (evoName1 === name) {
        console.log('Evolution 1: ' + evoName1);
        return true;
    } else {
        return false;
    }
}


function evolution2(evolutionData, name) {

    let evoName2 = ""
    let evolvesTo = evolutionData['chain']['evolves_to'];
    if (evolvesTo.length > 0) {
        evoName2 = evolutionData['chain']['evolves_to'][0]['species']['name'];
    } else {
        return false;
    }
    
    if (evoName2 === name) {
        console.log('Evolution 2: ' + evoName2);
        return true;
    } else {
        return false;
    }
}


function evolution3(evolutionData, name) {

    let evoName3 = ""
    let evolvesTo = evolutionData['chain']['evolves_to'][0]['evolves_to'];
    if (evolvesTo.length > 0) {
        evoName3 = evolutionData['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'];
    } else {
        return false;
    }

    if (typeof evoName3 === "undefined") {
        return false;
    }

    if (evoName3 === name) {
        console.log('Evolution 3: ' + evoName3);
        return true;
    } else {
        return false;
    }
}
