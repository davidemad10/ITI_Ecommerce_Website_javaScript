document.addEventListener("DOMContentLoaded", () => {
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const repeatPasswordInput = document.getElementById("repeatPassword");
  const firstNameError = document.getElementById("firstNameError");
  const lastNameError = document.getElementById("lastNameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const repeatPasswordError = document.getElementById("repeatPasswordError");
  const genderInput = document.getElementById("gender");
  const genderError = document.getElementById("genderError");
  const birthdayInput = document.getElementById("birthday");
  const birthdayError = document.getElementById("birthdayError");
  const cityInput = document.getElementById("city");
  const cityError = document.getElementById("cityError");

  const registerButton = document.getElementById("registerButton");

  const signupForm = document.querySelector(".signupForm");

  // firstNameInput.addEventListener('focus', () => {
  //     firstNameInput.style.border = 'solid 0.25px red';
  // });
  firstNameInput.addEventListener("blur", () => {
    firstNameInput.style.border = "";
    if (firstNameInput.value.length < 3) {
      firstNameError.textContent = "Invalid name";
      firstNameError.style.display = "block";
      firstNameError.style.marginTop = "0px";
      firstNameInput.select();
      firstNameInput.style.borderBottom = "solid 0.3px red";
    } else {
      firstNameError.textContent = "";
      firstNameError.style.display = "none";
      firstNameInput.style.borderBottom = "solid 0.3px green";
    }
  });

  lastNameInput.addEventListener("blur", () => {
    lastNameInput.style.border = "";
    if (lastNameInput.value.length < 3) {
      lastNameError.textContent = "Invalid name";
      lastNameError.style.display = "block";
      lastNameError.style.marginTop = "0px";
      lastNameInput.select();
      lastNameInput.style.borderBottom = "solid 0.3px red";
    } else {
      lastNameError.textContent = "";
      lastNameError.style.display = "none";
      lastNameInput.style.borderBottom = "solid 0.3px green";
    }
  });

  emailInput.addEventListener("blur", () => {
    emailInput.style.borderBottom = "";
    const emailValue = emailInput.value;

    if (!emailValue.includes("@") || !emailValue.includes(".")) {
      emailError.textContent = "Invalid email";
      emailError.style.display = "block";
      emailError.style.color = "red";
      emailInput.style.borderBottom = "solid 0.3px red";
      emailInput.focus();
      emailInput.select();
    } else {
      emailError.textContent = "";
      emailInput.style.borderBottom = "solid 0.3px green";
    }
  });

  genderInput.addEventListener("blur", () => {
    if (genderInput.value === "") {
      genderError.textContent = "Please select a gender.";
      genderError.style.display = "block";
      genderInput.style.borderBottom = "solid 0.3px red";
      isValid = false;
    } else {
      genderError.textContent = "";
      genderError.style.display = "none";
      genderInput.style.borderBottom = "solid 0.3px green";
    }
  });

  birthdayInput.addEventListener("blur", () => {
    const birthdayValue = new Date(birthdayInput.value);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (birthdayValue >= today || isNaN(birthdayValue.getTime())) {
      birthdayError.textContent =
        "Please enter a valid date of birth in the past.";
      birthdayError.style.display = "block";
      birthdayInput.style.borderBottom = "solid 0.3px red";
    } else {
      birthdayError.textContent = "";
      birthdayError.style.display = "none";
      birthdayInput.style.borderBottom = "solid 0.3px green";
    }
  });

  cityInput.addEventListener("blur", () => {
    if (cityInput.value === "") {
      cityError.textContent = "Please select a gender.";
      cityError.style.display = "block";
      cityInput.style.borderBottom = "solid 0.3px red";
      isValid = false;
    } else {
      cityError.textContent = "";
      cityError.style.display = "none";
      cityInput.style.borderBottom = "solid 0.3px green";
    }
  });

  passwordInput.addEventListener("blur", () => {
    passwordInput.style.border = "";
    const passwordValue = passwordInput.value;
    const numbers = "0123456789";
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let hasNumber = false;
    let hasLetter = false;
    for (let i = 0; i < passwordValue.length; i++) {
      if (numbers.includes(passwordValue[i])) {
        hasNumber = true;
      } else if (letters.includes(passwordValue[i])) {
        hasLetter = true;
      }
      if (hasNumber && hasLetter) {
        break;
      }
    }
    if (!hasNumber || !hasLetter) {
      passwordError.textContent =
        "Password should contain both numbers and letters";
      passwordError.style.display = "block";
      passwordError.style.color = "red";
      passwordInput.style.borderBottom = "solid 0.3px red";
      passwordInput.focus();
      passwordInput.select();
    } else {
      passwordError.textContent = "";
      passwordError.style.display = "none";
      passwordInput.style.borderBottom = "solid 0.3px green";
    }
  });

  repeatPasswordInput.addEventListener("blur", () => {
    if (passwordInput.value !== repeatPasswordInput.value) {
      repeatPasswordError.textContent =
        "Password and repeat password should be the same";
      repeatPasswordError.style.display = "block";
      // repeatPasswordInput.select();
      repeatPasswordInput.style.backgroundColor = "transparent";
      repeatPasswordInput.style.borderBottom = "solid 0.3px red";
    } else {
      repeatPasswordError.style.display = "";
      repeatPasswordInput.style.backgroundColor = "transparent";
      repeatPasswordInput.style.borderBottom = "solid 0.3px green";
      passwordInput.style.borderBottom = "solid 0.3px green";
    }
  });
  registerButton.addEventListener("submit", (event) => {
    document.preventDefault();
    if (firstNameInput.value.length < 3) {
      firstNameError.textContent = "Invalid name";
      firstNameError.style.display = "block";
      firstNameInput.focus();
      firstNameInput.select();
      firstNameInput.style.backgroundColor = "gray";
      event.preventDefault();
    } else if (passwordInput.value !== repeatPasswordInput.value) {
      passwordError.textContent =
        "Password and repeat password should be the same";
      passwordError.style.display = "block";
      repeatPasswordInput.focus();
      repeatPasswordInput.select();
      repeatPasswordInput.style.backgroundColor = "gray";
      event.preventDefault();
    } else {
      firstNameError.style.display = "none";
      passwordError.style.display = "none";
      firstNameInput.style.backgroundColor = "white";
      repeatPasswordInput.style.backgroundColor = "white";
      alert();
    }
  });
});

//#############saving the data in the local storage#####################

// document.getElementById("signupForm").addEventListener("submit", submitFun);

// function submitFun(event) {
//   event.preventDefault();

//   const firstName = document.getElementById("firstName").value;
//   const lastName = document.getElementById("lastName").value;
//   const email = document.getElementById("email").value;
//   const gender = document.getElementById("gender").value;
//   const birthday = document.getElementById("birthday").value;
//   const city = document.getElementById("city").value;
//   const password = document.getElementById("password").value;

//   localStorage.setItem("firstName", firstName);
//   localStorage.setItem("lastName", lastName);
//   localStorage.setItem("email", email);
//   localStorage.setItem("gender", gender);
//   localStorage.setItem("birthday", birthday);
//   localStorage.setItem("city", city);
//   localStorage.setItem("password", password);

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

// Function to update data using POST
async function updateData(newData) {
  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": masterKey,
      },
      body: JSON.stringify(newData),
    });
    const data = await response.json();
    console.log("Updated data:", data);
  } catch (error) {
    console.error("Error updating data:", error);
  }
}

document
  .getElementById("signupForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const gender = document.getElementById("gender").value;
    const birthday = document.getElementById("birthday").value;
    const city = document.getElementById("city").value;
    const password = document.getElementById("password").value;

    const newData = {
      firstName,
      lastName,
      email,
      gender,
      birthday,
      city,
      password,
    };

    // Fetch existing data
    let existingData = await fetchData();

    // Ensure existingData is an array
    if (!Array.isArray(existingData)) {
      existingData = [];
    }

    // Check if user with the same email already exists
    const userExists = existingData.some((user) => user.email === email);

    const messageElement = document.getElementById("message");

    if (userExists) {
      messageElement.textContent = "This Email address already exists.";
      messageElement.style.color = "red";
    } else {
      // Add new data to existing data
      existingData.push(newData);

      // Update the data on jsonbin.io using PUT
      await updateData(existingData);

      // Convert the newData object to a JSON string
      const newDataJSON = JSON.stringify(newData);

      // Save the JSON string to localStorage
      localStorage.setItem("userData", newDataJSON);

      messageElement.textContent = "User added successfully.";
      messageElement.style.color = "green";
      messageElement.style.display = "block";
    }
  });
//########################github hosted api logic#####################################3

// const signupForm = document.getElementById("signupForm");
// const loginForm = document.getElementById("loginForm");
// const message = document.getElementById("message");

// // GitHub repository information
// const owner = "Michael-Emad-Ramzy";
// const repo = "eCommerce-api";
// const path = "users.json";
// const branch = "main"; // Assuming the file is on the main branch
// const token =
//   "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"; // Replace with your GitHub token

// // Fetch the JSON file from GitHub
// async function fetchUsers() {
//   const signupForm = document.getElementById("signupForm");
//   const loginForm = document.getElementById("loginForm");
//   const message = document.getElementById("message");

//   // GitHub repository information
//   const owner = "Michael-Emad-Ramzy";
//   const repo = "eCommerce-api";
//   const path = "users.json";
//   const branch = "main"; // Assuming the file is on the main branch
//   const token =
//     "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"; // Replace with your GitHub token

//   const response = await fetch(
//     `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`
//   );

//   // Fetch the JSON file from GitHub
//   async function fetchUsers() {
//     const response = await fetch(
//       `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`
//     );
//     const users = await response.json();
//     return users;
//   }

//   // Get the current file SHA for updating
//   async function getFileSha() {
//     const response = await fetch(
//       `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
//       {
//         headers: {
//           Authorization: `token ${token}`,
//         },
//       }
//     );
//     const data = await response.json();
//     return data.sha;
//   }

//   // Update the JSON file on GitHub
//   async function updateUserFile(updatedUsers) {
//     const sha = await getFileSha();
//     const content = btoa(JSON.stringify(updatedUsers, null, 2));

//     const response = await fetch(
//       `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
//       {
//         method: "PUT",
//         headers: {
//           Authorization: `token ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           message: "Update users.json",
//           content,
//           sha,
//           branch,
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to update file on GitHub");
//     }
//   }

//   // Signup event
//   signupForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const username = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     const users = await fetchUsers();
//     const userExists = users.some((user) => user.username === username);

//     if (userExists) {
//       message.textContent = "User already exists.";
//     } else {
//       users.push({ username, password });
//       try {
//         await updateUserFile(users);
//         message.textContent = "Signup successful!";
//       } catch (error) {
//         message.textContent = `Error: ${error.message}`;
//       }
//     }
//   });

// Login event
// loginForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const username = document.getElementById("loginUsername").value;
//   const password = document.getElementById("loginPassword").value;

//   const users = await fetchUsers();
//   const user = users.find(
//     (user) => user.username === username && user.password === password
//   );

//   if (user) {
//     message.textContent = "Login successful!";
//   } else {
//     message.textContent = "Invalid username or password.";
//   }
// });

//   const users = await response.json();
//   return users;
// }

// // Get the current file SHA for updating
// async function getFileSha() {
//   const response = await fetch(
//     `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`,
//     {
//       headers: {
//         Authorization: `token ${token}`,
//       },
//     }
//   );
//   const data = await response.json();
//   return data.sha;
// }

// // Update the JSON file on GitHub
// async function updateUserFile(updatedUsers) {
//   const sha = await getFileSha();
//   const content = btoa(JSON.stringify(updatedUsers, null, 2));

//   const response = await fetch(
//     `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
//     {
//       method: "PUT",
//       headers: {
//         Authorization: `token ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         message: "Update users.json",
//         content: content,
//         sha: sha,
//         branch: branch,
//       }),
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to update file on GitHub");
//   }
// }

// // Signup event
// signupForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const username = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   const users = await fetchUsers();
//   const userExists = users.some((user) => user.username === username);

//   if (userExists) {
//     message.textContent = "User already exists.";
//   } else {
//     users.push({ username, password });
//     try {
//       await updateUserFile(users);
//       message.textContent = "Signup successful!";
//     } catch (error) {
//       message.textContent = `Error: ${error.message}`;
//     }
//   }
// });

// Login event
// loginForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const username = document.getElementById("loginUsername").value;
//   const password = document.getElementById("loginPassword").value;

//   const users = await fetchUsers();
//   const user = users.find(
//     (user) => user.username === username && user.password === password
//   );

//   if (user) {
//     message.textContent = "Login successful!";
//   } else {
//     message.textContent = "Invalid username or password.";
//   }
// });
// }

//############saving the data in JSON file###################

// document
//   .getElementById("registerButton")
//   .addEventListener("click", saveFormData);

// function saveFormData() {
//   const firstName = document.getElementById("firstName").value;
//   const lastName = document.getElementById("lastName").value;
//   const email = document.getElementById("email").value;
//   const gender = document.getElementById("gender").value;
//   const birthday = document.getElementById("birthday").value;
//   const city = document.getElementById("city").value;
//   const password = document.getElementById("password").value;

//   const formData = {
//     firstName: firstName,
//     lastName: lastName,
//     email: email,
//     gender: gender,
//     birthday: birthday,
//     city: city,
//     password: password,
//   };

//   const formDataArray = [formData]; // Save it in an array if needed

//   const jsonString = JSON.stringify(formDataArray, null, 2);

//   // For browsers supporting the File System Access API
//   if (window.showSaveFilePicker) {
//     saveToFileSystem(jsonString);
//   } else {
//     // Fallback for older browsers
//     saveToFile(jsonString);
//   }
// }

// async function saveToFileSystem(jsonString) {
//   const options = {
//     types: [
//       {
//         description: "JSON Files",
//         accept: {
//           "application/json": [".json"],
//         },
//       },
//     ],
//   };

//   try {
//     const fileHandle = await window.showSaveFilePicker(options);
//     const writable = await fileHandle.createWritable();
//     await writable.write(jsonString);
//     await writable.close();
//     alert("File saved successfully!");
//   } catch (err) {
//     console.error("Error saving file:", err);
//   }
// }

// function saveToFile(jsonString) {
//   const blob = new Blob([jsonString], { type: "application/json" });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement("a");
//   a.href = url;
//   a.download = "formData.json";
//   a.click();
//   URL.revokeObjectURL(url);
//   alert("File saved successfully!");
// }
