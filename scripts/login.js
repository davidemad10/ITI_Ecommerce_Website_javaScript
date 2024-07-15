const binId = "66913e9cad19ca34f8869592";
const masterKey =
  "$2a$10$vGIHMbGClbNICsJWVDBw3.s26K378S9pFA9v1dj7cSC1ZdG6SFkFW";
const apiUrl = `https://api.jsonbin.io/v3/b/${binId}`;

// Function to fetch data
async function fetchData() {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Master-Key": masterKey,
      },
    });
    const data = await response.json();
    return data.record || []; // Ensure it returns an array
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Fetch existing data
    let existingData = await fetchData();

    // Ensure existingData is an array
    if (!Array.isArray(existingData)) {
      existingData = [];
    }

    // Find user with the same email and password
    const loggedInUser = existingData.find(
      (user) => user.email === email && user.password === password
    );

    const messageElement = document.getElementById("message");

    if (loggedInUser) {
      messageElement.textContent = "Login successful.";
      messageElement.style.color = "green";

      // Save the logged-in user's data to localStorage
      const loggedInUserJSON = JSON.stringify(loggedInUser);
      localStorage.setItem("loggedInUser", loggedInUserJSON);

      // Redirect to home page after 2 seconds
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 2000); // 2000 milliseconds = 2 seconds
    } else {
      messageElement.textContent = "Email or password is incorrect.";
      messageElement.style.color = "red";
    }
  });
