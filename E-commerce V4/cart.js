document.addEventListener("DOMContentLoaded", () => {
  // const cartItemsContainer = document.querySelector(".cart-items");
  const cartItemsContainer = document.getElementById('cart-items');


  const checkoutButton = document.querySelector(".checkout");

  const updateTotalCartQty = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalCartQty = cartItems.reduce((total, item) => total + item.quantity, 0);
    return totalCartQty;
  };

  const renderCartItems = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    console.log("Cart Items from Local Storage:", cartItems); // Debugging
    cartItemsContainer.innerHTML = "";

    if (cartItems.length === 0) {
      cartItemsContainer.textContent = "Your cart is empty.";
      checkoutButton.classList.add("empty");
    } else {
      cartItems.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.dataset.quantity = item.quantity;
        cartItem.innerHTML = `
                  <img src="${item.imageSrc}" alt="${item.name}" />
                  <div class="item-details">
                      <div>${item.name}</div>
                      <div>
                          <p>
                              $${item.price.toFixed(2)} x ${item.quantity} 
                              <span class='total-price'>$${(item.price * item.quantity).toFixed(2)}</span>
                          </p>
                      </div>
                  </div>
                  <button class="delete-item"> 
                      <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                          <defs>
                              <path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/>
                          </defs>
                          <use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/>
                      </svg>
                  </button>
              `;

        cartItemsContainer.appendChild(cartItem);

        const deleteButton = cartItem.querySelector(".delete-item");
        deleteButton.addEventListener("click", (event) => {
          const cartItem = event.target.closest(".cart-item");
          removeItemFromCart(cartItem);
        });
      });

      checkoutButton.classList.remove("empty");
    }
  };

  const removeItemFromCart = (cartItem) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemName = cartItem.querySelector(".item-details div").textContent;
    const updatedCartItems = cartItems.filter(item => item.name !== itemName);

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    renderCartItems();
  };

  renderCartItems();
});
