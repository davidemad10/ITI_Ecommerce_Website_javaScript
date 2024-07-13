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

document.addEventListener("DOMContentLoaded", function () {
  fetchData("groceries");
});

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
    console.error("No category selected");
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
