document.addEventListener('DOMContentLoaded', function () {
    var body = document.body;

    // Hide scrollbar initially
    body.classList.remove('scrollable');

    // Optional: Hide scrollbar after user stops scrolling
    var hideScrollbarTimeout;

    window.addEventListener('scroll', function () {
        clearTimeout(hideScrollbarTimeout);
        body.classList.add('scrollable'); // Ensure scrollbar is visible while scrolling
        hideScrollbarTimeout = setTimeout(function () {
            body.classList.remove('scrollable'); // Hide scrollbar after inactivity
        }, 2000); // Adjust timeout as needed (e.g., 2000 milliseconds)
    });
});