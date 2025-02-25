// Alpha Vantage API Key
const API_KEY = "67bd9ad045e436.21250899";  // Your API Token
const STOCK_SYMBOLS = ["RELIANCE.BSE", "TCS.BSE", "INFY.BSE"]; // Example stock symbols

async function fetchStockData(symbol) {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!data["Global Quote"]) {
            throw new Error("Invalid response from API");
        }
        return {
            name: symbol,
            price: data["Global Quote"]["05. price"] || "N/A",
            change: data["Global Quote"]["10. change percent"] || "N/A",
        };
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return { name: symbol, price: "N/A", change: "N/A" };
    }
}

async function displayLiveStocks() {
    const stockDiv = document.getElementById("stocks");
    stockDiv.innerHTML = "<p>Loading stock data...</p>";

    let stockDataArray = await Promise.all(STOCK_SYMBOLS.map(fetchStockData));

    stockDiv.innerHTML = ""; // Clear loading message
    stockDataArray.forEach(stock => {
        const stockItem = document.createElement("p");
        stockItem.innerHTML = `<strong>${stock.name}</strong>: ₹${stock.price} (${stock.change})`;
        stockDiv.appendChild(stockItem);
    });
}

// Fetch live data when the page loads
displayLiveStocks();

// Refresh stock data every 60 seconds
setInterval(displayLiveStocks, 60000);
