'use strict';

$(window).scroll(function(){
  // If the user scrolled a bit (150 pixels) alter the header class to change it
  if($(this).scrollTop() > $('header').outerHeight()){
    $('header').addClass('header-scroll');
  }else{
    $('header').removeClass('header-scroll');
  }
});

/* Handles Main Menu */
$('.site-menu-toggle').on('click', function(){
  $('.site-nav').toggleClass('site-nav-visible');
});

$('.site-nav').on('mouseleave', function(){
  $(this).removeClass('site-nav-visible');
});
