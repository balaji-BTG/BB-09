document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent traditional form submission
  
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let errorMessage = document.getElementById("error-message");
  
    if (username === "" || password === "") {
        errorMessage.textContent = "Please enter both username and password.";
    } else if (password.length < 6) {
        errorMessage.textContent = "Password must be at least 6 characters long.";
    } else {
        errorMessage.textContent = ""; // Clear any previous error message
        window.location.href = "stocks.html"; // Redirect to your next page
    }
  });
