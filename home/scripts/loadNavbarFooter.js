document.addEventListener("DOMContentLoaded", function () {
    fetch("../html/header.html")
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');

            // Extract the header (nav) and footer elements
            const header = doc.querySelector('nav');
            const footer = doc.querySelector('footer');

            // Insert the header and footer into the placeholders
            document.getElementById('navbar-placeholder').appendChild(header);
            document.getElementById('footer-placeholder').appendChild(footer);
        })
        .catch(error => console.error("Error loading header and footer:", error));
});
