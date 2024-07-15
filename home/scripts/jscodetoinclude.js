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