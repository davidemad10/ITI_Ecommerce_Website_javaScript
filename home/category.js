document.addEventListener('DOMContentLoaded', () => {
    const category = localStorage.getItem('category');
    if (category) {
      getData(category);
    }
  });
  
  function getData(category) {
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((response) => response.json())
      .then((data) => {
        const dataDiv = document.getElementById("data");
        dataDiv.innerHTML = ""; 
        data.products.forEach((product) => {
          const productDiv = document.createElement("div");
          productDiv.classList.add("product");
          productDiv.innerHTML = `
            <div>
              <div class="product-details">
                <h2>${product.title}</h2>
                <img src="${product.thumbnail}" alt="${product.title}" />
                <div class="product-content">
                  <p class="product-description">${product.description}</p>
                  <p>Price: $${product.price}</p>
                  <p>Category: ${product.category}</p>
                  <p>Stock: ${product.stock}</p>
                </div>
              </div>
              <div class="addToCard">
                <button><img src="/html/icons/download.png"/><span>Add To Card</span></button>
              </div>
            </div>
          `;
          dataDiv.appendChild(productDiv);
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }