async function fetchStockTrends() {
    const apiKey = "67bd9ad045e436.21250899";
    const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const topGainers = data["top_gainers"];
        const topLosers = data["top_losers"];

        let gainersHtml = `<h3>📈 Top Gainers</h3><ul>`;
        topGainers.forEach(stock => {
            gainersHtml += `<li>${stock.ticker}: $${stock.price} (+${stock.change}%)</li>`;
        });
        gainersHtml += `</ul>`;

        let losersHtml = `<h3>📉 Top Losers</h3><ul>`;
        topLosers.forEach(stock => {
            losersHtml += `<li>${stock.ticker}: $${stock.price} (${stock.change}%)</li>`;
        });
        losersHtml += `</ul>`;

        document.getElementById("stock-trends").innerHTML = gainersHtml + losersHtml;
    } catch (error) {
        console.error("Error fetching stock trends:", error);
    }
}

// Auto-refresh every minute
setInterval(fetchStockTrends, 60000);
fetchStockTrends();
