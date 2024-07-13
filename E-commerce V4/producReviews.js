document.addEventListener('DOMContentLoaded', () => {
    const reviewsContainer = document.getElementById('reviews-container');
    const reviewForm = document.getElementById('review-form');
    const reviewerName = document.getElementById('reviewer-name');
    const reviewerEmail = document.getElementById('reviewer-email');
    const reviewRating = document.getElementById('review-rating');
    const reviewText = document.getElementById('review-text');

    // format the date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    // Function to create a review element
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

    // Fetch product details and reviews
    fetch('https://dummyjson.com/products/1')
        .then(response => response.json())
        .then(data => {
            // Display product details (omitted for brevity)

            // Display existing reviews
            data.reviews.forEach(review => {
                const reviewElement = createReviewElement(review);
                reviewsContainer.appendChild(reviewElement);
            });
        });

    // Handle new review submission
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

        // Clear the form fields
        reviewRating.value = '';
        reviewText.value = '';
        reviewerName.value = '';
        reviewerEmail.value = '';
    });
});
