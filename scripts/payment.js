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



//save the payment method

document.addEventListener('DOMContentLoaded', function() {
    const paymentMethods = document.querySelectorAll('.mainPayment img');
    const savedSelection = localStorage.getItem('selectedPaymentMethod');

    // Apply border to saved selection on page load
    if (savedSelection) {
    document.getElementById(savedSelection).style.border = '2px solid #605545';
    }

    paymentMethods.forEach(img => {
        img.addEventListener('click', function() {
          // Remove border from all images
        paymentMethods.forEach(img => img.style.border = '');
        if (img.id === 'Paypal' || img.id === 'visa') {
            alert("This option is coming soon. Only cash is accepted for now");
        } else {
            img.style.border = '2px solid #605545';
            
            // Save the user's selection to localStorage
            localStorage.setItem('selectedPaymentMethod', img.id);
        }
    });
    });
});