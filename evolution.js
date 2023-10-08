
let evolutionsChains = [];
async function fetchEvolution(j) {
    let url = `https://pokeapi.co/api/v2/evolution-trigger/${j}/`;
    let response = await fetch(url);
    let evolution1 = await response.json();
    checkEvolution(evolution1); // hier muss weiter programmiert werden
}

function loadEvolution(evolution1) {
    evolution1(evolutionData, name);
}


function evolution1(evolutionData, name) {
    for (let i = 0; i < evolutionData['stats'].length; i++) {
        let evo = evolutionData['stats'][i];
        document.getElementById(`infoContainerBest_Stats${j}`).innerHTML += infoContentEvolution(evo);
    }
}



function infoContentEvolution() {

}