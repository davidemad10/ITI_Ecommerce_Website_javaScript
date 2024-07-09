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
  const form = document.getElementById("registerButton");
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
      repeatPasswordInput.focus();
      repeatPasswordInput.style.backgroundColor = "transparent";
      repeatPasswordInput.style.borderBottom = "solid 0.3px red";
    } else {
      repeatPasswordError.style.display = "";
      repeatPasswordInput.style.backgroundColor = "transparent";
      repeatPasswordInput.style.borderBottom = "solid 0.3px green";
      passwordInput.style.borderBottom = "solid 0.3px green";
    }
  });
  form.addEventListener("submit", (event) => {
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
    }
  });
});
