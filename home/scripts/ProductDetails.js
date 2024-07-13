'use strict';
const singleProductApiUrl = 'https://dummyjson.com/products/22';
let productData = {};
let productTitle;
let productPrice;
let productDescription;
let productImage;
let productBrand;
let productDiscountPercentage;
let productStock;
let productImages;
let productThumbnails;

document.addEventListener('DOMContentLoaded', () => {
    // function fetchData(productId) {
    //     const singleProductApiUrl = `https://dummyjson.com/products/${productId}`;
    // }
    fetch(singleProductApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            productData = data;
            productTitle = productData.title
            productDescription = productData.description
            productPrice = productData.price
            productBrand = productData.brand;
            productDiscountPercentage = productData.discountPercentage
            productStock = productData.stock;

            productImages = productData.images;
            productThumbnails = productData.thumbnail;


            // Update the HTML elements with the fetched data
            updateProductDetails();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    function updateProductDetails() {
        document.getElementById('product-title').innerText = productTitle;
        document.getElementById('product-brand').innerText = productBrand;
        document.getElementById('product-description').innerText = productDescription;
        document.getElementById('product-price').innerText = productPrice;
        document.getElementById('discount-percentage').innerText = `${productDiscountPercentage}%`;
        document.getElementById('product-after-discount').innerText = getPrice()
        document.getElementById('product-stock').innerText = `Left in Stock ${productStock}`
        document.getElementById('product-img').src = productImages;
        document.getElementById('product-img2').src = productImages;
        const imageUrls = [
            productImages,
            productImages,
            productImages
            // 'https://images.pexels.com/photos/355508/pexels-photo-355508.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            // 'https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg'
        ];
        const imageContainer = document.getElementById('main-img');
        const imageContainer2 = document.getElementById('main-img2');
        imageUrls.forEach((url, index) => {
            const div = document.createElement('div');
            const img = document.createElement('img');
            img.src = url;
            img.id = `product-thumbnail${index}`;
            img.alt = 'product-img';
            img.width = 150;
            img.height = 150;


            img.addEventListener('click', () => {
                const allDivs = document.querySelectorAll('#main-img > div');
                allDivs.forEach(d => d.classList.remove('active'));
                div.classList.add('active');
                document.getElementById('product-img').src = url;
                document.getElementById('product-img2').src = url;
            });

            div.appendChild(img);
            imageContainer.appendChild(div);
        });
        imageUrls.forEach((url, index) => {
            const div = document.createElement('div');
            const img = document.createElement('img');
            img.src = url;
            img.id = 'product-thumbnail${index}';
            img.alt = 'product-img';
            img.width = 150;
            img.height = 150;


            img.addEventListener('click', () => {
                const allDivs = document.querySelectorAll('#main-img > div');
                allDivs.forEach(d => d.classList.remove('active'));
                div.classList.add('active');
                document.getElementById('product-img').src = url;
                document.getElementById('product-img2').src = url;
            });

            div.appendChild(img);
            imageContainer2.appendChild(div);
        });
    }

})

function getPrice() {
    if (productDiscountPercentage != 0) {
        var priceAfterDiscount = productPrice - (productPrice * productDiscountPercentage / 100)
        priceAfterDiscount = priceAfterDiscount.toFixed(2)
        return priceAfterDiscount
    }
    else
        return productPrice
}

/////////////////////main//////////////////////////////////////////////////
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

