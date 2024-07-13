'use strict';
/* fetch the data */
const singleProductApiUrl = 'https://dummyjson.com/products/3';
var productData = {};
var productTitle;
var productPrice;
var productDescription;
var productImage;
var productBrand;
var productDiscountPercentage;
var productStock;
var productImages;
var productThumbnails;


var category
var price
var discountPercentage
var rating
var stock


document.addEventListener('DOMContentLoaded', () => {
    // function fetchData(productId) {
    //     const singleProductApiUrl = `https://dummyjson.com/products/${productId}`;
    // }
    fetch(singleProductApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Save the parsed data into the productData object
            productData = data;
            productTitle = productData.title
            productDescription = productData.description
            productPrice = productData.price
            productBrand = productData.brand;
            productDiscountPercentage = productData.discountPercentage
            productStock = productData.stock;

            productImages = productData.images;
            productThumbnails = productData.thumbnail;


            // Update the HTML elements with the fetched data
            updateProductDetails();

            // Process the retrieved user data
            // console.log(productData);
            console.log(productImages)
            // console.log(productThumbnails)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    function updateProductDetails() {
        document.getElementById('product-title').innerText = productTitle;
        document.getElementById('product-brand').innerText = productBrand;
        document.getElementById('product-description').innerText = productDescription;
        document.getElementById('product-price').innerText = productPrice;
        document.getElementById('discount-percentage').innerText = `${productDiscountPercentage}%`;
        document.getElementById('product-after-discount').innerText = getPrice()
        document.getElementById('product-stock').innerText = `Left in Stock ${productStock}`
        document.getElementById('product-img').src = productImages;
        document.getElementById('product-img2').src = productImages;
        const imageUrls = [
            productImages,
            // productImages,
            // productImages
            'https://images.pexels.com/photos/355508/pexels-photo-355508.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            'https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg'
        ];
        const imageContainer = document.getElementById('main-img');
        const imageContainer2 = document.getElementById('main-img2');
        imageUrls.forEach((url, index) => {
            const div = document.createElement('div');
            const img = document.createElement('img');
            img.src = url;
            img.id = `product-thumbnail${index}`;
            img.alt = 'product-img';
            img.width = 150;
            img.height = 150;


            img.addEventListener('click', () => {
                const allDivs = document.querySelectorAll('#main-img > div');
                allDivs.forEach(d => d.classList.remove('active'));
                div.classList.add('active');
                document.getElementById('product-img').src = url;
                document.getElementById('product-img2').src = url;
            });

            div.appendChild(img);
            imageContainer.appendChild(div);
        });
        imageUrls.forEach((url, index) => {
            const div = document.createElement('div');
            const img = document.createElement('img');
            img.src = url;
            img.id = 'product-thumbnail${index}';
            img.alt = 'product-img';
            img.width = 150;
            img.height = 150;


            img.addEventListener('click', () => {
                const allDivs = document.querySelectorAll('#main-img > div');
                allDivs.forEach(d => d.classList.remove('active'));
                div.classList.add('active');
                document.getElementById('product-img').src = url;
                document.getElementById('product-img2').src = url;
            });

            div.appendChild(img);
            imageContainer2.appendChild(div);
        });
        // document.getElementsByClassName("productImg").src = productImages;
        // document.querySelectorAll(".product-img").src = productImages;
        // document.getElementById('product-thumbnail').src = productThumbnails;
        // document.getElementById('product-thumbnail2').src = productThumbnails;
    }

})

function getPrice() {
    if (productDiscountPercentage != 0) {
        var priceAfterDiscount = productPrice - (productPrice * productDiscountPercentage / 100)
        priceAfterDiscount = priceAfterDiscount.toFixed(2)
        return priceAfterDiscount
    }
    else
        return productPrice
}
