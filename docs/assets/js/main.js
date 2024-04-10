/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

		

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

	//Main left description
	
		var typedTextElement = document.getElementById("typed-text");
		var text = ", an Honors College\nstudent pursuing Computer Science\nat Purdue University.";
		var typingSpeed = 40; // Delay between typing each character (in milliseconds)
		var index = 0;
	
		function typeText() {
			if (index < text.length) {
				if (text.charAt(index) === '\n') {
					typedTextElement.innerHTML += "<br>";
				} else {
					typedTextElement.innerHTML += text.charAt(index);
				}
				index++;
				setTimeout(typeText, typingSpeed);
			} else {
				// Replace "Purdue University" with the linked text
				typedTextElement.innerHTML = typedTextElement.innerHTML.replace("Purdue University", "<a href='https://www.purdue.edu/'>Purdue University</a>");
			}
		}
	
		// Start typing out the text after a delay
		setTimeout(typeText, 1000); // Delay before starting typing (in milliseconds)
	

 //About button

 document.getElementById("Learn more").addEventListener("click", function() {
    var targetSection = document.getElementById("skills");
    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

	
  // ---------------------------------------------------------------------------
  //  Progress Bar
  // ---------------------------------------------------------------------------
  $('.skill-progress').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
    if (visible) {
      $.each($('div.progress-bar'), function () {
        $(this)
          .css('width', null)
          .css('width', $(this).attr('aria-valuenow') + '%');
      });
    }
  });


  // ---------------------------------------------------------------------------
  //  More skill
  // ---------------------------------------------------------------------------
  $('.more-skill').bind('inview', function (event, visible, visiblePartX, visiblePartY) {
    if (visible) {
      // configuration goes here
      $('.chart').easyPieChart({
        easing:       'easeOut'
        , barColor:   '#b6dcc5'
        , delay:      1500
        , lineWidth:  8
        , rotate:     0
        , scaleColor: false
        , size:       140
        , trackColor: '#bcbaba'
        , animate: {
            duration: 2500
            , enabled:  true
          }
        , onStep: function (from, to, percent) {
            this.el.children[0].innerHTML = Math.round(percent, 1);
          }
      });
    }
  });

  

  // ---------------------------------------------------------------------------
  //  Sidebar
  // ---------------------------------------------------------------------------


  let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();
})

function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
}

menuBtnChange();

document.addEventListener("DOMContentLoaded", function() {
    // Your JavaScript code here
    document.getElementById("homeButton").addEventListener("click", function() {
        var targetSection = document.getElementById("main");
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.getElementById("skillsButton").addEventListener("click", function() {
        var targetSection = document.getElementById("skills");
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.getElementById("contactButton").addEventListener("click", function() {
        var targetSection = document.getElementById("three");
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

	
	

		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});

})(jQuery);