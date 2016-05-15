// $(window).resize(function() {

//     $(".featuresList .featuresItem").each(function() {

//         $(this).css("min-height", 0);
//         $(this).css("min-height", $(this).parent().outerHeight());

//     });

// });
//Slider options
$(document).ready(function() {
  window.slider = new Swipe(document.getElementById('slider'), {
    callback: function(e, pos) {              
      var i = bullets.length;
      while (i--) {
        bullets[i].className = '';
            }
          bullets[pos].className = 'on';
    },
    startSlide: 0,
    speed: 500,
    auto: 10000
  })
  bullets = document.getElementById('position').getElementsByTagName('span')
});