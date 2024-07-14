document.addEventListener('DOMContentLoaded', () => {
    const reviewsContainer = document.getElementById('reviews-container');
    const reviewForm = document.getElementById('review-form');
    const reviewerName = document.getElementById('reviewer-name');
    const reviewerEmail = document.getElementById('reviewer-email');
    const reviewRating = document.getElementById('review-rating');
    const reviewText = document.getElementById('review-text');


    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }


    function createReviewElement(review) {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `
        <p class="reviewer-name"><strong>${review.reviewerName}</strong> (${formatDate(review.date)})</p>
        <p class="review-rating">Rating: ${review.rating} / 5</p>
        <p class="review-text">${review.comment}</p>
      `;
        return reviewElement;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    function fetchData(productId) {
        const singleProductApiUrl = `https://dummyjson.com/products/${productId}`;
        fetch(singleProductApiUrl)
            .then(response => response.json())
            .then(data => {
                data.reviews.forEach(review => {
                    const reviewElement = createReviewElement(review);
                    reviewsContainer.appendChild(reviewElement);
                });
            });
    }

    reviewForm.addEventListener('submit', event => {
        event.preventDefault();

        const newReview = {
            rating: parseInt(reviewRating.value),
            comment: reviewText.value.trim(),
            date: new Date().toISOString(),
            reviewerName: reviewerName.value.trim(),
            reviewerEmail: reviewerEmail.value.trim()
        };

        if (newReview.comment === '' || newReview.reviewerName === '' || newReview.reviewerEmail === '' || isNaN(newReview.rating)) {
            return;
        }

        const newReviewElement = createReviewElement(newReview);
        reviewsContainer.appendChild(newReviewElement);


        reviewRating.value = '';
        reviewText.value = '';
        reviewerName.value = '';
        reviewerEmail.value = '';
    });
    fetchData(productId);
});
