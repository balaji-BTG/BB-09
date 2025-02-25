async function fetchCryptoData() {
    const apiKey = "67bd9ad045e436.21250899";
    const cryptoSymbol = "BTC";  // Change to ETH, XRP, etc.
    const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${cryptoSymbol}&to_currency=USD&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const price = data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];

        document.getElementById("crypto-price").innerHTML = `BTC Price: $${parseFloat(price).toFixed(2)}`;
    } catch (error) {
        console.error("Error fetching crypto data:", error);
    }
}

// Auto-refresh every 30 seconds
setInterval(fetchCryptoData, 30000);
fetchCryptoData();
