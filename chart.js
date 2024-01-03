let allStatsValues = ["placeholder"];

function renderChart(pokemonStatsValues, j) {
	const canvas = document.getElementById(`myChart${j}`);
	const ctx = canvas.getContext("2d");

	const colors = pokemonStatsValues.map((value, index) =>
		index % 2 === 0 ? "rgba(255, 0, 0, 0.6)" : "rgba(0, 255, 0, 0.6"
	);

	new Chart(ctx, {
		type: "bar",
		data: {
			labels: [
				"Hp",
				"Attack",
				"Defense",
				"Special-Attack",
				"Special-Defense",
				"Speed",
			],
			datasets: [
				{
					data: pokemonStatsValues,
					backgroundColor: colors,
					borderColor: colors,
				},
			],
		},
		options: {
			indexAxis: "y",
			scales: {
				x: {
					display: false,
				},
			},
			plugins: {
				legend: {
					display: false,
				},
			},
			layout: {
				padding: {
					left: 30,
				},
			},
			elements: {
				bar: {
					borderWidth: 0.3,
				},
			},
		},
	});
}
