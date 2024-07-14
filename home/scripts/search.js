document.addEventListener('DOMContentLoaded', () => {
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
    }
  
    function displaySearchResults(products) {
      searchResults.innerHTML = '';
  
      products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = product.title;
        li.addEventListener('click', () => {
          localStorage.setItem('productID', product.id);
          window.location.href = 'productDetails.html';
        });
        searchResults.appendChild(li);
      });
    }
  });
  