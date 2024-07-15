// Retrieve user data from local storage

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

// Redirect to login page if no user data found
document.addEventListener("DOMContentLoaded", function () {
  if (!loggedInUser) {
    window.location.href = "signIn.html";
    return;
  }

  // Set welcome message
  const userName = loggedInUser.firstName;
  const welcomeMessage = document.getElementById("welcome-message");
  welcomeMessage.textContent = ` ${userName}`;

  // Populate form fields with user data
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const address = document.getElementById("address");
  const birthday = document.getElementById("birthday");
  const genderMale = document.getElementById("male");
  const genderFemale = document.getElementById("female");

  loggedInUser.gender === "male"
    ? (genderMale.checked = true)
    : (genderFemale.checked = true);

  firstName.value = loggedInUser.firstName;
  lastName.value = loggedInUser.lastName;
  email.value = loggedInUser.email;
  address.value = loggedInUser.city;
  birthday.value = loggedInUser.birthday;
});

// Function to allow editing
function allowEdit(id) {
  const element = document.getElementById(id);
  element.disabled = !element.disabled;
  if (!element.disabled) {
    element.style.border = "1px solid #605545"; // Add border when enabled
  } else {
    element.style.border = ""; // Remove border when disabled
  }
}

// Save changes function
function saveChanges() {
  loggedInUser.firstName = document.getElementById("firstName").value;
  loggedInUser.lastName = document.getElementById("lastName").value;
  loggedInUser.email = document.getElementById("email").value;
  loggedInUser.address = document.getElementById("address").value;
  loggedInUser.birthday = document.getElementById("birthday").value;
  loggedInUser.gender = document.getElementById("male").checked
    ? "male"
    : "female";

  // Save updated user data to local storage
  localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

  // Disable all input fields
  document.querySelectorAll("input").forEach((input) => {
    input.disabled = true;
    input.style.border = "";
  });

  // Update the welcome message with the new name
  const welcomeMessage = document.getElementById("welcome-message");
  welcomeMessage.textContent = ` ${loggedInUser.firstName}`;

  setActive();
}

// Display success message
function setActive() {
  const saveAlert = document.getElementById("saveAlert");
  const alertHtml = `<p>Successfully saved!</p>`;
  saveAlert.innerHTML = alertHtml;
  setTimeout(() => {
    saveAlert.innerHTML = "";
    saveAlert.style.fontSize = "1vw";
  }, 2000);
}
