document.addEventListener("DOMContentLoaded", () => {
  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const repeatPasswordInput = document.getElementById("repeatPassword");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const repeatPasswordError = document.getElementById("repeatPasswordError");
  const genderInput = document.getElementById("gender");
  const genderError = document.getElementById("genderError");
  const form = document.getElementById("registerButton");
  // fullNameInput.addEventListener('focus', () => {
  //     fullNameInput.style.border = 'solid 0.25px red';
  // });
  fullNameInput.addEventListener("blur", () => {
    fullNameInput.style.border = "";
    if (fullNameInput.value.length < 3) {
      nameError.textContent = "Invalid name";
      nameError.style.display = "block";
      nameError.style.marginTop = "0px";
      fullNameInput.select();
      fullNameInput.style.borderBottom = "solid 0.2px red";
    } else {
      nameError.textContent = "";
      nameError.style.display = "none";
      fullNameInput.style.borderBottom = "solid 0.2px green";
    }
  });
  emailInput.addEventListener("blur", () => {
    emailInput.style.borderBottom = "";
    const emailValue = emailInput.value;

    if (!emailValue.includes("@") || !emailValue.includes(".")) {
      emailError.textContent = "Invalid email";
      emailError.style.display = "block";
      emailError.style.color = "red";
      emailInput.style.borderBottom = "solid 0.2px red";
      emailInput.focus();
      emailInput.select();
    } else {
      emailError.textContent = "";
      emailInput.style.borderBottom = "solid 0.2px green";
    }
  });
  genderInput.addEventListener("blur", () => {
    if (genderInput.value === "") {
      genderError.textContent = "Please select a gender.";
      genderError.style.display = "block";
      genderInput.style.borderBottom = "solid 0.2px red";
      isValid = false;
    } else {
      genderError.textContent = "";
      genderError.style.display = "none";
      genderInput.style.borderBottom = "solid 0.2px green";
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
      passwordInput.style.borderBottom = "solid 0.2px red";
      passwordInput.focus();
      passwordInput.select();
    } else {
      passwordError.textContent = "";
      passwordError.style.display = "none";
      passwordInput.style.borderBottom = "solid 0.2px green";
    }
  });

  repeatPasswordInput.addEventListener("blur", () => {
    if (passwordInput.value !== repeatPasswordInput.value) {
      repeatPasswordError.textContent =
        "Password and repeat password should be the same";
      repeatPasswordError.style.display = "block";
      repeatPasswordInput.focus();
      repeatPasswordInput.style.backgroundColor = "transparent";
      repeatPasswordInput.style.borderBottom = "solid 0.2px red";
    } else {
      repeatPasswordError.style.display = "";
      repeatPasswordInput.style.backgroundColor = "transparent";
      repeatPasswordInput.style.borderBottom = "solid 0.2px green";
      passwordInput.style.borderBottom = "solid 0.2px green";
    }
  });
  form.addEventListener("submit", (event) => {
    if (fullNameInput.value.length < 3) {
      nameError.textContent = "Invalid name";
      nameError.style.display = "block";
      fullNameInput.focus();
      fullNameInput.select();
      fullNameInput.style.backgroundColor = "gray";
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
      nameError.style.display = "none";
      passwordError.style.display = "none";
      fullNameInput.style.backgroundColor = "white";
      repeatPasswordInput.style.backgroundColor = "white";
    }
  });
});
