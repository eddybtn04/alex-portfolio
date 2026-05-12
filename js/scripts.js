
document.addEventListener('DOMContentLoaded', function () {

    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
        var nameInput = document.getElementById('name');
        var emailInput = document.getElementById('email');
        var messageInput = document.getElementById('message');
        var subjectInput = document.getElementById('subject');
        var statusEl = document.getElementById('form-status');

        function showError(input, msg) {
            var err = document.getElementById(input.id + '-error');
            if (err) err.textContent = msg || '';
        }

        function validate() {
            var valid = true;
            if (!nameInput.value.trim()) { showError(nameInput, 'Please enter your name'); valid = false; } else showError(nameInput, '');
            if (!emailInput.value.trim()) { showError(emailInput, 'Please enter your email'); valid = false; }
            else if (!/^\S+@\S+\.\S+$/.test(emailInput.value)) { showError(emailInput, 'Please enter a valid email'); valid = false; } else showError(emailInput, '');
            if (!subjectInput.value.trim()) { showError(subjectInput, 'Please enter a subject'); valid = false; } else showError(subjectInput, '');
            if (!messageInput.value.trim()) { showError(messageInput, 'Please enter a message'); valid = false; } else showError(messageInput, '');
            return valid;
        }

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            statusEl.textContent = '';
            if (!validate()) {
                statusEl.textContent = 'Please fix the errors above.';
                return;
            }

            // simulate send
            var data = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim()
            };

            // Disable form while "sending"
            var submitBtn = contactForm.querySelector('[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;

            statusEl.textContent = 'Sending...';

            // In a real site, replace with fetch() to your backend / third-party form service
            setTimeout(function () {
                statusEl.textContent = 'Message sent — thank you!';
                contactForm.reset();
                if (submitBtn) submitBtn.disabled = false;
            }, 900);
        });
    }

});


$(function() {

    "use strict";

    var wind = $(window);



    // scrollIt
    $.scrollIt({
      upKey: 38,                // key code to navigate to the next section
      downKey: 40,              // key code to navigate to the previous section
      easing: 'swing',          // the easing function for animation
      scrollTime: 600,          // how long (in ms) the animation takes
      activeClass: 'active',    // class given to the active nav element
      onPageChange: null,       // function(pageIndex) that is called when page is changed
      topOffset: -70            // offste (in px) for fixed top navigation
    });



    // navbar scrolling background
    wind.on("scroll",function () {

        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar"),
            logo = $(".navbar .logo> img");

        if(bodyScroll > 100){

            navbar.addClass("nav-scroll");
            logo.attr('src', 'img/logo-dark.png');

        }else{

            navbar.removeClass("nav-scroll");
            logo.attr('src', 'img/logo-light.png');
        }
    });


    // close navbar-collapse when a  clicked
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });



    // progress bar
    wind.on('scroll', function () {
        $(".skill-progress .progres").each(function () {
            var bottom_of_object = 
            $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = 
            $(window).scrollTop() + $(window).height();
            var myVal = $(this).attr('data-value');
            if(bottom_of_window > bottom_of_object) {
                $(this).css({
                  width : myVal
                });
            }
        });
    });



    // sections background image from data background
    var pageSection = $(".bg-img, section");
    pageSection.each(function(indx){
        
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });


    


    // magnificPopup
    $('.gallery').magnificPopup({
        delegate: '.popimg',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    // YouTubePopUp
    $("a.vid").YouTubePopUp();


});


// === window When Loading === //

$(window).on("load",function (){

    var wind = $(window);

    // Preloader
    $(".loading").fadeOut(500);


    // stellar
    wind.stellar();


    // isotope
    $('.gallery').isotope({
      // options
      itemSelector: '.items'
    });

    var $gallery = $('.gallery').isotope({
      // options
    });

    // filter items on button click
    $('.filtering').on( 'click', 'span', function() {

        var filterValue = $(this).attr('data-filter');

        $gallery.isotope({ filter: filterValue });

    });

    $('.filtering').on( 'click', 'span', function() {

        $(this).addClass('active').siblings().removeClass('active');

    });


    

});


