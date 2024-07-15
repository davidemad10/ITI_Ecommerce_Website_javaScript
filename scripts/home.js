// Fetching the Header, Nav Bar, and Footer

document.addEventListener("DOMContentLoaded", () => {
  const headerPH = document.getElementById("headerPH");
  const logoPH = document.getElementById("logoPH");
  const navPH = document.getElementById("navPH");
  const footerPH = document.getElementById("footerPH");

  fetch("./html/HNF.html")
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");

      const header = doc.querySelector("header");
      const logo = doc.querySelector(".logo");
      const nav = doc.querySelector("nav");
      const footer = doc.querySelector("footer");

      if (header) headerPH.innerHTML = header.innerHTML;
      if (logo) logoPH.innerHTML = logo.innerHTML;
      if (nav) navPH.innerHTML = nav.innerHTML;
      if (footer) footerPH.innerHTML = footer.innerHTML;


    })
    .catch((error) => console.error("Error fetching HNF.html:", error));
});

function initializeLoginState() {
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");
  const logoutButton = document.getElementById("logoutButton");

  function updateUI(isLoggedIn) {
    if (isLoggedIn) {
      loginButton.style.display = "none";
      registerButton.style.display = "none";
      logoutButton.style.display = "block";
    } else {
      loginButton.style.display = "block";
      registerButton.style.display = "block";
      logoutButton.style.display = "none";
    }
  }

  // Logout function
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    updateUI(false);
  });

  // Check login on page load
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    updateUI(true);
  } else {
    updateUI(false);
  }
}

initializeLoginState();

function initializeSearch() {
  const search = document.getElementById("search");
  const searchResults = document.getElementById("search-results");

  if (search) {
    search.addEventListener("input", () => {
      const query = search.value.trim();
      console.log(`Searching for: ${query}`); // Debugging line

      if (query.length > 0) {
        fetch(`https://dummyjson.com/products/search?q=${query}`)
          .then((res) => {
            console.log("Received response:", res); // Debugging line
            return res.json();
          })
          .then((data) => {
            console.log("Received data:", data); // Debugging line
            const products = data.products || [];
            displaySearchResults(products);
          })
          .catch((error) =>
            console.error("Error fetching search results:", error)
          );
      } else {
        searchResults.innerHTML = "";
      }
    });
  } else {
    console.error("Search input field not found.");
  }

  function handlRoute(id) {
    window.open(`./html/productDetails.html?productId=${id}`);
  }

  function displaySearchResults(products) {
    searchResults.innerHTML = "";

    products.forEach((product) => {
      const li = document.createElement("li");
      li.textContent = product.title;
      li.addEventListener("click", () => {
        localStorage.setItem("productID", product.id);
        handlRoute(product.id);
      });
      searchResults.appendChild(li);
    });
  }
}

      initializeSearch();

// TAKE ALL THE CODE BEFORE THE FOLLOWING LINES

// Fetch all products and store them in allProducts array

let allProducts = [];
let currentIndex = 0;

async function fetchProducts() {
  let limit = 100;
  let skip = 0;

  while (true) {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    const data = await response.json();

    if (data.products.length === 0) {
      break;
    }

    allProducts = allProducts.concat(data.products);
    skip += limit;
  }

  // Display the first product
  displayProduct(currentIndex);
}

function displayProduct(index) {
  if (allProducts.length === 0) return;

  const product = allProducts[index];

  document.querySelector(".product-name").textContent = product.title || "";
  document.querySelector(".product-description").textContent =
    product.description || "";

  const imageElements = document.querySelectorAll(".product-photo");
  if (product.images && product.images.length > 0) {
    imageElements.forEach((imgElement, imgIndex) => {
      imgElement.src =
        product.images[imgIndex % product.images.length] || product.images[0];
      imgElement.alt = product.title || "Product Image";
    });
  } else {
    imageElements.forEach((imgElement) => {
      imgElement.src = "";
      imgElement.alt = "No image available";
    });
  }
}

// Event listeners for carousel controls
document
  .querySelector(".carousel-control-next")
  .addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % allProducts.length;
    displayProduct(currentIndex);
  });

document
  .querySelector(".carousel-control-prev")
  .addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + allProducts.length) % allProducts.length;
    displayProduct(currentIndex);
  });

// Initialize fetching of products
fetchProducts();

document.addEventListener("DOMContentLoaded", function () {
  const catInfo = document.querySelector(".cat-info");
  const cats = Array.from(catInfo.children);
  const totalCats = cats.length;
  let startIndex = 0;
  const visibleCats = 6;

  function updateVisibleCats() {
    catInfo.innerHTML = "";
    for (let i = 0; i < visibleCats; i++) {
      const catIndex = (startIndex + i) % totalCats;
      catInfo.appendChild(cats[catIndex]);
    }
  }

  document.querySelector(".left").addEventListener("click", function () {
    startIndex = (startIndex - 1 + totalCats) % totalCats;
    updateVisibleCats();
  });

  document.querySelector(".right").addEventListener("click", function () {
    startIndex = (startIndex + 1) % totalCats;
    updateVisibleCats();
  });

  updateVisibleCats();
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Fetching the products in a certain Category when selected from the homepgae

document.querySelectorAll(".cat, .category").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    const category = event.target.getAttribute("data-category");
    window.location.href = "./html/cat.html"; // Open the category page
    localStorage.removeItem("selectedCategory", category);
    localStorage.setItem("selectedCategory", category); // Store the category in local storage
  });
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Fetching products to list on the Explore Products Section

let currentPage = 1;
const itemsPerPage = 8;
let productsData = [];

function exploreProducts() {
  fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      productsData = data.products;
      ShowProductsPerPage();
    });
}

function ShowProductsPerPage() {
  const productContainer = document.querySelector(".product-info");
  productContainer.innerHTML = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToShow = productsData.slice(startIndex, endIndex);

  productsToShow.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${product.thumbnail}" class="card-img-top" alt="${
      product.title
    }">
      <div class="card-body">
        <h6 class="card-title">${product.title}</h6>
        <div class="rating">
          <span class="price">$${product.price}</span>
          ${generateStars(product.rating)}
          <span class="rates">(${product.rating})</span>
        </div>
        <div class="count-div">
          <a href="./html/productDetails.html"  class="btn btn-light view-product" onclick="handlRoute(${
            product.id
          })">View Product</a>
        </div>
      </div>
    `;
    productContainer.appendChild(card);

    function handlRoute(id) {
      window.open(`./html/productDetails.html?productId=${id}`);
    }

    const viewProductButton = card.querySelector(".view-product");

    viewProductButton.addEventListener("click", () => {
      localStorage.setItem("productID", product.id);
      handlRoute(product.id);
    });
  });
}

function generateStars(rating) {
  const maxStars = 5;
  let stars = "";
  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      stars += '<i class="fas fa-star"></i>';
    } else if (i - rating < 1) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    } else {
      stars += '<i class="far fa-star"></i>';
    }
  }
  return stars;
}

document.querySelector(".left1").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    ShowProductsPerPage();
  }
});

document.querySelector(".right1").addEventListener("click", () => {
  if (currentPage * itemsPerPage < productsData.length) {
    currentPage++;
    ShowProductsPerPage();
  }
});

document.addEventListener("DOMContentLoaded", exploreProducts);
