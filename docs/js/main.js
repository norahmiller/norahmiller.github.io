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


document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");

    menuToggle.addEventListener("click", function () {
        nav.classList.toggle("active");
    });
});

document.addEventListener("click", function (event) {
    console.log("Clicked element:", event.target);
});