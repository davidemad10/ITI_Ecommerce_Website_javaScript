const menuIcon = document.querySelector(".menu-icon");
const backdrop = document.querySelector(".backdrop");
const navLinks = document.querySelector(".nav-links");
const closeIcon = document.querySelector(".close-icon");

menuIcon.addEventListener("click", () => {
  backdrop.classList.add("active");
  navLinks.classList.add("active");
});

closeIcon.addEventListener("click", () => {
  backdrop.classList.remove("active");
  navLinks.classList.remove("active");
});

backdrop.addEventListener("click", () => {
  backdrop.classList.remove("active");
  navLinks.classList.remove("active");
});

///////////////////////////////// cart ///////////////////////////////////////

const countEl = document.querySelector(".count");
const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const cartIcon = document.querySelector(".cart-icon");
const cartContainer = document.querySelector(".cart-container");
const addToCartBtn = document.querySelector(".add-to-cart");
const cartItems = document.querySelector(".cart-items");
const checkout = document.querySelector(".checkout");
const cartCount = document.querySelector(".cart-count");

let count = 0;
let totalCartQty = 0;

const updateCount = (newCount) => {
  count = newCount;
  countEl.textContent = count;
};

minus.addEventListener("click", () => {
  if (count > 0) {
    updateCount(count - 1);
  }
});

plus.addEventListener("click", () => {
  updateCount(count + 1);
});

cartIcon.addEventListener("click", () => {
  location.href = "cart.html";
});



const updateTotalCartQty = () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const totalCartQty = cartItems.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalCartQty;
};

// add item to cart

const addItemToCart = (name, price, imageSrc) => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const existingItem = cartItems.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += count;
  } else {
    cartItems.push({ name, price, imageSrc, quantity: count });
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateTotalCartQty();
  updateCount(0);
};

addToCartBtn.addEventListener("click", () => {

  if (count === 0) return;
  const productName = document.querySelector(".main .product-name").textContent;
  const productPriceEl = document.querySelector(".main .current-price");
  const productPrice = parseFloat(productPriceEl.textContent.replace("$", ""));
  const productImg = document.querySelector(".default.gallery .main-img img").getAttribute("src");

  addItemToCart(productName, productPrice, productImg);
});
updateTotalCartQty();
