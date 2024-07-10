let getRandomProducts = async () => {
    let allProducts = [];
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
  
    let randomProducts = [];
    let usedIndices = new Set();
  
    while (randomProducts.length < 4) {
      let randomIndex = Math.floor(Math.random() * allProducts.length);
      if (!usedIndices.has(randomIndex)) {
        randomProducts.push(allProducts[randomIndex]);
        usedIndices.add(randomIndex);
      }
    }
  
    randomProducts.forEach((product, index) => {
      let productCard = document.getElementById(`product${index + 1}`);
      if (productCard) {
        productCard.querySelector('.product-logo').src = product.thumbnail || '';
        productCard.querySelector('.product-name').textContent = product.title || '';
        productCard.querySelector('.product-description').textContent = product.description || '';
        productCard.querySelector('.product-photo').src = product.images ? product.images[0] : '';
      }
    });
  };
  
  getRandomProducts();
  