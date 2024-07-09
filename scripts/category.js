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
    dataDiv.innerHTML = ""; // Clear previous content
    data.products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <p>Category: ${product.category}</p>
                    <p>Rating: ${product.rating}</p>
                    <p>Stock: ${product.stock}</p>
                    <img src="${product.thumbnail}" alt="${product.title}" />
                `;
    dataDiv.appendChild(productDiv);
    });
})
.catch((error) => console.error("Error fetching data:", error));
}