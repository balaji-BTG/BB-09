document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "67bd9ad045e436.21250899"; // Your API key
    const stockSymbol = "TSLA"; // Change this to any stock symbol
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=5min&apikey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data["Time Series (5min)"]) {
                const latestTime = Object.keys(data["Time Series (5min)"])[0];
                const latestStock = data["Time Series (5min)"][latestTime];
                document.getElementById("stockData").innerHTML = `
                    <p>Stock: ${stockSymbol}</p>
                    <p>Time: ${latestTime}</p>
                    <p>Open: ${latestStock["1. open"]}</p>
                    <p>High: ${latestStock["2. high"]}</p>
                    <p>Low: ${latestStock["3. low"]}</p>
                    <p>Close: ${latestStock["4. close"]}</p>
                `;
            } else {
                document.getElementById("stockData").innerHTML = "<p>Error fetching stock data.</p>";
            }
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("stockData").innerHTML = "<p>Failed to load stock data.</p>";
        });
});
