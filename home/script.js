let allProducts = [];
let currentIndex = 0;

// Fetch all products and store them in allProducts array
async function fetchProducts() {
  let limit = 100;
  let skip = 0;

  while (true) {
    const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
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
  
  document.querySelector('.product-name').textContent = product.title || '';
  document.querySelector('.product-description').textContent = product.description || '';
  
  const imageElements = document.querySelectorAll('.product-photo');
  if (product.images && product.images.length > 0) {
    imageElements.forEach((imgElement, imgIndex) => {
      imgElement.src = product.images[imgIndex % product.images.length] || product.images[0];
      imgElement.alt = product.title || 'Product Image';
    });
  } else {
    imageElements.forEach((imgElement) => {
      imgElement.src = '';
      imgElement.alt = 'No image available';
    });
  }
}

// Event listeners for carousel controls
document.querySelector('.carousel-control-next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % allProducts.length;
  displayProduct(currentIndex);
});

document.querySelector('.carousel-control-prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + allProducts.length) % allProducts.length;
  displayProduct(currentIndex);
});

// Initialize fetching of products
fetchProducts();

document.addEventListener('DOMContentLoaded', function () {
  const catInfo = document.querySelector('.cat-info');
  const cats = Array.from(catInfo.children);
  const totalCats = cats.length;
  let startIndex = 0;
  const visibleCats = 6;

  function updateVisibleCats () {

    catInfo.innerHTML = '';
    for (let i = 0; i < visibleCats; i++) {
      const catIndex = (startIndex + i) % totalCats;
      // console.log("CatIndex is : " + catIndex)
      catInfo.appendChild(cats[catIndex]);
      // console.log(catInfo)
    }
  }

  document.querySelector('.left').addEventListener('click', function () {
    startIndex = (startIndex - 1 + totalCats) % totalCats;
    // console.log("StartIndex from left is :" + startIndex);
    updateVisibleCats ();
  });

  document.querySelector('.right').addEventListener('click', function () {
    startIndex = (startIndex + 1) % totalCats;
    // console.log("StartIndex from right is :" + startIndex);
    updateVisibleCats();
  });

  updateVisibleCats()
});


// Fetching the products in a certain Category when selected from the homepgae

document.querySelectorAll('.category a, .category').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior
    const category = event.target.getAttribute('data-category');
    window.open('category.html'); // Open the category page
    localStorage.removeItem('category', category)
    localStorage.setItem('category', category); // Store the category in local storage
  });
});

// Fetching products to list on the Explore Products Section

function exploreProducts() {
  fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then((data) => {
      const productContainer = document.querySelector('.product-info');
      productContainer.innerHTML = '';
      const cartCountSpan = document.querySelector('.cart-count');
      let totalCartCount = 0;

      data.products.forEach((product) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h6 class="card-title">${product.title}</h6>
            <div class="rating">
              <span class="price">$${product.price}</span>
              ${generateStars(product.rating)}
              <span class="rates">(${product.rating})</span>
            </div>
            <div class="count-div">
              <button class="subtract">-</button>
              <span class="count">0</span>
              <button class="add">+</button>
              <a href="#" class="btn btn-light add-to-cart">Add to Cart</a>
            </div>
          </div>
        `;
        productContainer.appendChild(card);

        // Adding the count and add to cart methods
        const addButton = card.querySelector('.add');
        const subButton = card.querySelector('.subtract');
        const addToCartButton = card.querySelector('.add-to-cart');
        const countSpan = card.querySelector('.count');
        let count = 0;

        addButton.addEventListener('click', () => {
          count++;
          countSpan.textContent = count;
        });

        subButton.addEventListener('click', () => {
          if (count > 0) {
            count--;
            countSpan.textContent = count;
          }
        });

        addToCartButton.addEventListener('click', (event) => {
          event.preventDefault();
          if (count > 0) {
            addToCart(product, count);
            totalCartCount += count;
            cartCountSpan.textContent = totalCartCount;
            count = 0;
            countSpan.textContent = count;
          }
        });
      });
    });
}

function generateStars(rating) {
  const maxStars = 5;
  let stars = '';
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

function addToCart(product, count) {
  // Implement the logic to add the product and count to the cart
  console.log(`Added ${count} of ${product.title} to cart`);
}

// Call the function to explore products when the page loads
document.addEventListener('DOMContentLoaded', exploreProducts);


