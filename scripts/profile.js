const loggedInUser = {
    firstName: "David",
    lastName: "Emad",
    email: "david@gmail.com",
    password: "123456789",
    address: "5st emadhamdy",
    gender:"Male",
    birthday:"2001-01-01"
};
//making dynamic wlecome
const userName=loggedInUser.firstName;
const welcomeMessage=document.getElementById('welcome-message');
welcomeMessage.textContent=` ${userName}`

// const newUser = { ...loggedInUser, firstName: "newDavid" };
// console.log(newUser);

//Edit button
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email=document.getElementById("email");
const address=document.getElementById("address");
const birthday=document.getElementById("birthday");
const genderMale = document.getElementById("male");
const genderFemale = document.getElementById("female");

if (loggedInUser.gender === "Male") {
    genderMale.checked = true;
} else if (loggedInUser.gender === "Female") {
    genderFemale.checked = true;
}
firstName.value = loggedInUser.firstName;
lastName.value = loggedInUser.lastName;
email.value=loggedInUser.email;
address.value=loggedInUser.address;
birthday.value=loggedInUser.birthday;


function allowEdit(id) {
    const element = document.getElementById(id);
    element.disabled = !element.disabled;
    if(id==='firstName'){
        console.log(firstName.value);
    }
    else if(id==='lastName'){
        console.log(lastName.value);
    }
    else if(id==='email'){
        console.log(email.value);
    }
    else if(id==='address'){
        console.log(address.value);
    }
    else if(id==='birthday'){
        console.log(birthday.value);
    }
    else  if (id === 'male' || id === 'female') { 
        console.log(document.querySelector(`input[name="gender"]:checked`).value);
    } else {
        console.log(element.value);
    }

}