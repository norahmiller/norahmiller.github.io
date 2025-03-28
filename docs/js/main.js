src="https://code.jquery.com/jquery-3.6.0.min.js"

src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inview/1.0.0/jquery.inview.min.js"


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


  // ---------------------------------------------------------------------------
  //  Progress Bar
  // ---------------------------------------------------------------------------

  document.addEventListener("DOMContentLoaded", function () {
    console.log("Page loaded! Animating progress bars...");

    document.querySelectorAll('.progress-bar .bar').forEach(bar => {
        let width = bar.getAttribute('aria-valuenow') + "%";
        console.log("Setting bar width:", width);
        bar.style.width = width;
    });
});
