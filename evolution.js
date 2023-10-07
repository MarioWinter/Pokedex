function evolution(responseAsJason, j) {
    for (let i = 0; i < responseAsJason['stats'].length; i++) {
        let evo = responseAsJason['stats'][i];
        document.getElementById(`infoContainerBest_Stats${j}`).innerHTML += infoContentEvolution(evo);
    }
}



function infoContentEvolution() {

}