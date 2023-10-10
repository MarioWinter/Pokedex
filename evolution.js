
let evolutionsChains = [];

async function fetchEvolution(name) {
    let d = 15; //chains 0 to 19
    let url = `https://pokeapi.co/api/v2/evolution-chain/${d}/`;
    let responseTrigger = await fetch(url);
    let evolutionData = await responseTrigger.json();
    //console.log(evolutionData);
    evolution1(evolutionData, name);
}




//CheckEvolution function must be create




function evolution1(evolutionData) {
    evolutionData['chain']['species']['name'];
    // let chain = evolutionData['chain'];
    let evo1 = evolutionData['chain']['species']['url'].replace('https://pokeapi.co/api/v2/pokemon-species/', '');
    PokeID = evo1.replace('/', '');
    let img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${PokeID}.svg`

    // console.log(chain);
    // console.log(img);
}





function infoContentEvolution() {

}