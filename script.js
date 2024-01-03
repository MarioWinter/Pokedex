let isLiked = false;
let isLoading = false;
let j = "";
let PokeData = "";
let maxPoke = 47;
let PokeSmallInnerHTML = [];
let ID = "";

document.addEventListener("DOMContentLoaded", function () {
	let toggle = document.getElementById("toggle");

	document.addEventListener("click", function (event) {
		let isClickInside = toggle.contains(event.currentTarget);

		if (!isClickInside) {
			closePokeBigCard();
		}
	});

	document
		.getElementById("search")
		.addEventListener("keyup", function (event) {
			if (event.key === "Enter") {
				filterPokemon();
			}
		});
});

function doNotClose(event) {
	event.stopPropagation();
}

//Load Data Sectioin
async function loadAllPokemonData() {
	PokeSmallInnerHTML = [];
	showSpinner();
	for (j = 1; j <= maxPoke; j++) {
		let url = `https://pokeapi.co/api/v2/pokemon/${j}/`;
		let response = await fetch(url);
		PokeData = await response.json();
		loadPokemonTemplates(PokeData, j);
	}
	hideSpinner();
}

async function loadMorePokemon() {
	showSpinner();
	if (maxPoke <= 497) {
		maxPoke = maxPoke + 50;

		for (; j <= maxPoke; j++) {
			let url = `https://pokeapi.co/api/v2/pokemon/${j}/`;
			let responseMore = await fetch(url);
			PokeData = await responseMore.json();
			loadPokemonTemplates(PokeData, j);
		}
		removeAllNextPreviousArrows();
	}
	hideSpinner();
}

function loadPokemonTemplates(responseAsJason, j) {
	document.getElementById("pokedex-container").innerHTML +=
		pokemonBigContainer(responseAsJason, j);
	document.getElementById(`infoHeader${j}`).innerHTML =
		pokemonBigInfoHeader(j);
	document.getElementById("pokedex").innerHTML += pokemonSmallContainer(
		responseAsJason,
		j
	);
	document.getElementById(`pokeNumber${j}`).innerHTML =
		convertPokeNumer(responseAsJason);
	document.getElementById(`pokeNumberSmall${j}`).innerHTML =
		convertPokeNumer(responseAsJason);
	loadPokemonCardInnerContent(responseAsJason, j);
	document.getElementById(`pokeContentSmall${j}`).style.opacity = "1";
}

function loadPokemonCardInnerContent(responseAsJason, j) {
	renderPokemonTypes(responseAsJason, j);
	renderPokemonAbout(responseAsJason, j);
	renderPokemonMoves(responseAsJason, j);
	renderPokemonAbilities(responseAsJason, j);
	saveBestStats(responseAsJason);
	fetchEvolution(responseAsJason, j);
	addCardColors(j);
	pushPokeSmallInnerHTML(j);
	hideFirstArrowOnCard(j);
	hideLastArrowOnCard(j);
}

//Pokemon Search Section
function filterClose() {
	let search = document.getElementById("search").value;
	search = search.toLowerCase();

	let pokedex = document.getElementById("pokedex");

	if (search.length == 0) {
		pokedex.innerHTML = "";
		for (let index = 1; index <= PokeSmallInnerHTML.length; index++) {
			--index;
			let pokemon = PokeSmallInnerHTML[index];
			++index;
			pokedex.innerHTML += `<div id="pokeContentSmall${index}" class="pokedex-content-small" onclick="doNotClose(event), showPokeBigCard(${index})">${pokemon}<div>`;
			addCardColors(index);
		}
	}
}

function filterPokemon() {
	let search = document.getElementById("search").value;
	search = search.toLowerCase();

	let pokedex = document.getElementById("pokedex");
	if (search.length >= 1) {
		pokedex.innerHTML = "";
		for (let index = 1; index <= PokeSmallInnerHTML.length; index++) {
			--index;
			let pokemon = PokeSmallInnerHTML[index];
			++index;
			if (pokemon.toLowerCase().includes(search)) {
				pokedex.innerHTML += `<div id="pokeContentSmall${index}" class="pokedex-content-small" onclick="doNotClose(event), showPokeBigCard(${index})">${pokemon}<div>`;
				addCardColors(index);
			}
		}
	}
}

function pushPokeSmallInnerHTML(j) {
	let pokemon = document.getElementById(`pokeContentSmall${j}`).innerHTML;
	PokeSmallInnerHTML.push(pokemon);
}

//Pokemon Card Movemend Section
function showPokeBigCard(index) {
	ID = index;
	document.getElementById("pokedex").classList.add("d-none");
	document.getElementById("footer-load-more").classList.add("d-none");
	document.getElementById("pokedex-container").classList.remove("d-none");
	document.getElementById(`pokeContent${index}`).classList.remove("d-none");
}

function closePokeBigCard() {
	hideContentOnBigCard(ID);
	document.getElementById("pokedex").classList.remove("d-none");
	document.getElementById("footer-load-more").classList.remove("d-none");
	document.getElementById("pokedex-container").classList.add("d-none");
}

function hideContentOnBigCard(ID) {
	document.getElementById(`pokeContent${ID}`).classList.add("d-none");
}

function nextPokemon(index) {
	document.getElementById(`pokeContent${index}`).classList.add("d-none");
	++index;
	document.getElementById(`pokeContent${index}`).classList.remove("d-none");
	ID = index;
}

function previousPokemon(index) {
	document.getElementById(`pokeContent${index}`).classList.add("d-none");
	--index;
	document.getElementById(`pokeContent${index}`).classList.remove("d-none");
	ID = index;
}

function hideFirstArrowOnCard(index) {
	if (index == 1) {
		document
			.getElementById(`leftNextButton${index}`)
			.classList.add("d-none");
	}
}

function hideLastArrowOnCard(index) {
	if (index === maxPoke) {
		document
			.getElementById(`rightNextButton${index}`)
			.classList.add("d-none");
	}
}

function removeAllNextPreviousArrows() {
	for (let index = 1; index < maxPoke; index++) {
		let rightNextButton = document.getElementById(
			`rightNextButton${index}`
		);
		if (rightNextButton.classList.contains("d-none")) {
			rightNextButton.classList.remove("d-none");
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
	document
		.getElementById(`about${index}`)
		.classList.remove("info-header-selected");
	document
		.getElementById(`baseStats${index}`)
		.classList.remove("info-header-selected");
	document
		.getElementById(`evolution${index}`)
		.classList.remove("info-header-selected");
	document
		.getElementById(`moves${index}`)
		.classList.remove("info-header-selected");

	document.getElementById(ID).classList.add("info-header-selected");
}

//render Content for Pokemon big Card
function renderPokemonTypes(responseAsJason, index) {
	let types = responseAsJason["types"];
	for (let i = 0; i < types.length; i++) {
		let type = types[i];
		let pokemonType = type.type.name;
		if (pokemonType !== "") {
			document.getElementById(
				`pokeType${index}`
			).innerHTML += `<span class="pokemon-type">${pokemonType}</span>`;
			document.getElementById(
				`pokeTypeSmall${index}`
			).innerHTML += `<div id="mainType${index}" class="pokemon-type">${pokemonType}</div>`;
		}
	}
}

function renderPokemonAbout(responseAsJason, j) {
	document.getElementById(`infoContainerAbout${j}`).innerHTML +=
		infoContentAbout(responseAsJason, j);
}

function renderPokemonAbilities(responseAsJason, index) {
	let abilities = responseAsJason["abilities"];
	for (let i = 0; i < abilities.length; i++) {
		let ability = abilities[i];
		let pokemonAbility = ability.ability.name;
		if (pokemonAbility !== "") {
			document.getElementById(
				`abilities${index}`
			).innerHTML += `<span class="card-info-value">${capitalizeFirstLetter(
				pokemonAbility
			)}</span>`;
		}
	}
}

function saveBestStats(responseAsJason) {
	let pokemonStatsValues = [];
	for (let i = 0; i < responseAsJason["stats"].length; i++) {
		let stats = responseAsJason["stats"][i];
		let statsValue = stats["base_stat"];
		pokemonStatsValues.push(statsValue);
	}
	allStatsValues.push(pokemonStatsValues);
}

function renderPokemonMoves(responseAsJason, j) {
	for (let i = 0; i < responseAsJason["moves"].length; i++) {
		let move = responseAsJason["moves"][i]["move"]["name"];
		document.getElementById(`infoContainerMoves${j}`).innerHTML +=
			infoContentMoves(move);
	}
}

//show Pokemon content on big Card
function showInfoAbout(index) {
	removeInfoContainer(index);
	document
		.getElementById(`infoContainerAbout${index}`)
		.classList.remove("d-none");
}

function showInfoBest_Stats(index) {
	removeInfoContainer(index);
	document
		.getElementById(`infoContainerBest_Stats${index}`)
		.classList.remove("d-none");
	document.getElementById(`infoContainerBest_Stats${index}`).innerHTML =
		addCanversChart(index);
	let StatsValues = allStatsValues[index];
	renderChart(StatsValues, index);
}

function showInfoEvo(index) {
	removeInfoContainer(index);
	document
		.getElementById(`infoContainerEvolution${index}`)
		.classList.remove("d-none");
}

function showInfoMoves(index) {
	removeInfoContainer(index);
	document
		.getElementById(`infoContainerMoves${index}`)
		.classList.remove("d-none");
}

function removeInfoContainer(index) {
	document
		.getElementById(`infoContainerAbout${index}`)
		.classList.add("d-none");
	document
		.getElementById(`infoContainerBest_Stats${index}`)
		.classList.add("d-none");
	document
		.getElementById(`infoContainerEvolution${index}`)
		.classList.add("d-none");
	document
		.getElementById(`infoContainerMoves${index}`)
		.classList.add("d-none");
}

//Fixes and Changes for Card content and style
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertPokeNumer(responseAsJason) {
	let id = responseAsJason["id"];

	if (id <= 9) {
		let num = `#00${id}`;
		return num;
	} else if (id <= 100) {
		let num = `#0${id}`;
		return num;
	} else if (id > 100) {
		let num = `#${id}`;
		return num;
	}
}

function addCardColors(index) {
	let mainType = document.getElementById(`mainType${index}`).innerHTML;
	for (let i = 0; i < types.length; i++) {
		if (mainType == types[i]) {
			document
				.getElementById(`pokeContent${index}`)
				.classList.add(cardBackgroundColors[i]);
			document
				.getElementById(`pokeContentSmall${index}`)
				.classList.add(cardBackgroundColors[i]);
		}
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

// SPINNER
let spinner = document.getElementById("spinner");
let loadMoreBtn = document.getElementById("footer-load-more");

function showSpinner() {
	isLoading = true;
	loadMoreBtn.classList.add("d-none");
	spinner.classList.remove("d-none");
	document.body.style.overflow = "hidden";
}

function hideSpinner() {
	isLoading = false;
	loadMoreBtn.classList.remove("d-none");
	spinner.classList.add("d-none");
	document.body.style.overflow = "";
}
