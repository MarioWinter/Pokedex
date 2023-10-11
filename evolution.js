
let evolutionsChains = [];

async function fetchEvolution(name) {
    let d = 1; //chains 0 to 19
    let url = `https://pokeapi.co/api/v2/evolution-chain/${d}/`;
    let responseTrigger = await fetch(url);
    let evolutionData = await responseTrigger.json();
    //console.log(evolutionData);
    evolution1(evolutionData, name);
    evolution2(evolutionData, name);
    evolution3(evolutionData, name);
    console.log(evolutionData['chain']);
}




//CheckEvolution function must be create

let evo1 = evolutionData['chain']['species']['url'].replace('https://pokeapi.co/api/v2/pokemon-species/', '');
let PokeID = evo1.replace('/', '');
let img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${PokeID}.svg`


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
    
    if (evoName3 === name) {
        console.log('Evolution 3: ' + evoName3);
        return true
    }
}





function infoContentEvolution() {

}