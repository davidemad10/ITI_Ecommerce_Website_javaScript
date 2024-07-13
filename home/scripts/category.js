// Fetching the Header, Nav Bar and Footer

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
      })
      .catch((error) => console.error('Error fetching HNF.html:', error));
  });

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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