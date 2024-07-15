// Fetching the Header, Nav Bar, and Footer

document.addEventListener('DOMContentLoaded', () => {
  const headerPH = document.getElementById('headerPH');
  const logoPH = document.getElementById('logoPH');
  const navPH = document.getElementById('navPH');
  const footerPH = document.getElementById('footerPH');

  fetch('HNF.html')
    .then((response) => response.text())
    .then((data) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');

      const header = doc.querySelector('header');
      const logo = doc.querySelector('.logo');
      const nav = doc.querySelector('nav');
      const footer = doc.querySelector('footer');

      if (header) headerPH.innerHTML = header.innerHTML;
      if (logo) logoPH.innerHTML = logo.innerHTML;
      if (nav) navPH.innerHTML = nav.innerHTML;
      if (footer) footerPH.innerHTML = footer.innerHTML;

      initializeLoginState();
      initializeSearch();
    })
    .catch((error) => console.error('Error fetching HNF.html:', error));
});

function initializeLoginState() {
  
  const loginButton = document.getElementById('loginButton');
  const registerButton = document.getElementById('registerButton');
  const logoutButton = document.getElementById('logoutButton');


  function updateUI(isLoggedIn) {
    if (isLoggedIn) {
      loginButton.style.display = 'none';
      registerButton.style.display = 'none';
      logoutButton.style.display = 'block';
    } else {
      loginButton.style.display = 'block';
      registerButton.style.display = 'block';
      logoutButton.style.display = 'none';
    }
  }

  // Logout function
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    updateUI(false);
  });

  // Check login on page load
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    updateUI(true);
  } else {
    updateUI(false);
  }
}

function initializeSearch() {
  const search = document.getElementById('search');
  const searchResults = document.getElementById('search-results');

  if (search) {
    search.addEventListener('input', () => {
      const query = search.value.trim();
      console.log(`Searching for: ${query}`); // Debugging line

      if (query.length > 0) {
        fetch(`https://dummyjson.com/products/search?q=${query}`)
          .then(res => {
            console.log('Received response:', res); // Debugging line
            return res.json();
          })
          .then((data) => {
            console.log('Received data:', data); // Debugging line
            const products = data.products || [];
            displaySearchResults(products);
          })
          .catch(error => console.error('Error fetching search results:', error));
      } else {
        searchResults.innerHTML = '';
      }
    });
  } else {
    console.error('Search input field not found.');
  }

  function handlRoute(id) {
    window.open(`productDetails.html?productId=${id}`);
  }

  function displaySearchResults(products) {
    searchResults.innerHTML = '';

    products.forEach(product => {
      const li = document.createElement('li');
      li.textContent = product.title;
      li.addEventListener('click', () => {
        localStorage.setItem('productID', product.id);
        handlRoute(product.id);
      });
      searchResults.appendChild(li);
    });
  }
}

// David's Code:

fetch("https://dummyjson.com/products/category-list")
  .then((response) => response.json())
  .then((categories) => {
    const linkList = document.getElementById("link-List");
    // Dynamically create links
    categories.forEach((category) => {
      const link = document.createElement("a");
      link.href = "#";
      link.setAttribute("id", category);
      link.textContent = `${category.replace("-", " ")}`;
      linkList.appendChild(link);
    });

    // Add event listeners to the dynamically created links
    document.querySelectorAll(".link-list a").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const categoryId = event.target.getAttribute("id");
        fetchData(categoryId);
      });
    });
  })
  .catch((error) => console.error("Error fetching categories:", error));


function fetchData(category) {
  fetch(`https://dummyjson.com/products/category/${category}`)
    .then((response) => response.json())
    .then((data) => {
      const dataDiv = document.getElementById("data");
      dataDiv.innerHTML = "";
      data.products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
        
                    <div onclick="handlRoute(${product.id})">
                      <div class="product-details" onclick="saveLocalStorge()">
                        <h2>${product.title}</h2>
                        <img src="${product.thumbnail}" alt="${
          product.title
        }" />
                        <div class="product-content">
                          <p class="product-description">${
                            product.description
                          }</p>
                          <p>Price: $${product.price}</p>
                          <p>Category: ${product.category}</p>
                          <div class="rating">${generateStars(
                            product.rating
                          )}</div>
                          <p>Stock: ${product.stock}</p>
                        </div>
                      </div>
                    </div>
                `;
        dataDiv.appendChild(productDiv);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function handlRoute(id) {
  window.location.href = `productDetails.html?productId=${id}`;
}
// On page load, fetch the selected category and display its data
document.addEventListener("DOMContentLoaded", () => {
  const selectedCategory = localStorage.getItem("selectedCategory");
  if (selectedCategory) {
    fetchData(selectedCategory);
  } else {
    fetchData("groceries")
  }
});

//function to generate stars
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
