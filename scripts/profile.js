const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) ||{
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

//function to allow the user to use the pen to edit
function allowEdit(id) {
    const element = document.getElementById(id);
    element.disabled = !element.disabled;
    if (!element.disabled) {
        element.style.border = "1px solid #605545"; // Add border when enabled 
    } else {
        element.style.border = ""; // Remove border when disabled
    }
}

//savechanges button
function saveChanges(id){
    loggedInUser.firstName = document.getElementById('firstName').value;
    loggedInUser.lastName = document.getElementById('lastName').value;
    loggedInUser.email = document.getElementById('email').value;
    loggedInUser.address = document.getElementById('address').value;
    loggedInUser.birthday = document.getElementById('birthday').value;
    loggedInUser.gender = document.getElementById('male').checked ? "Male" : "Female";
    //save new data in local storage 
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    document.querySelectorAll('input').forEach(input => {
        input.disabled = true;
        input.style.border = "";
    });
    //change the welcome message to new name 
    welcomeMessage.textContent=document.getElementById('firstName').value;
    setActive();
}
//successfully saved 
function setActive(){
    const saveAlert=document.getElementById('saveAlert');
    const alertHtml=`<p>Successfuly saved!</p>`
    saveAlert.innerHTML=alertHtml;
    setTimeout(() => {
        saveAlert.innerHTML = ''; 
        saveAlert.style.fontSize='1vw'
    }, 2000);
}
