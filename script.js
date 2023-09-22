const API_KEY = '';

async function loadPokemon() {
    let url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=USD&apikey=${API_KEY}`;
    let response = await fetch(url);
    let responseAsJason = await response.json();
    
    


    document.getElementById('current_course').innerHTML = `<b>${responseAsJason['name']} $</b>`;
}