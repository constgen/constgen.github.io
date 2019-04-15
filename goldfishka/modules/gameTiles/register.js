Core.register('gameTiles', function (sandbox) {
	'use strict';
	var root, module;
	// root HTML element
	if (!(root = sandbox.root = document.querySelector && document.querySelector('.gameTiles'))) return;

	// return module object
	return module = {
		//switchable styles
		css: '',

		init: function () {
			//show module
			root.style.opacity = '';

			// popup open event
			sandbox.Event.add($('.tiles'), 'tap', function () {

				if ($(this).parents('.swiper-slide').hasClass('current')) {

					// sandbox.action('playPopup-open', {
					// 		imageSrc: $(this).find('.img img').prop('src')
					// })
				}
				return false;

			})

            setTimeout(function(){
                $(root).removeClass('animatedOut');
            }, 100);
            
            var tiles = $(root).find('.tiles'),               
                contentTiles = $(root).find('.content');
        
            $(function(){positionTiles()});
  
            
        
            function positionTiles() {
                contentTiles.css('width','auto');
                
                var contentWidth = contentTiles.width(),
                    tilesMargin = tiles.outerWidth(true) - tiles.outerWidth();

                contentTiles.css('width',contentWidth);  
            
                if (contentWidth >= 1260) {
                    tiles.width(Math.floor((contentWidth -(tilesMargin * 5)) / 5) );
                } else 
                if ( (contentWidth < 1260) && (contentWidth >= 1004) ) {
                    tiles.width(Math.floor((contentWidth -(tilesMargin * 4)) / 4) );
                } else
                if ( (contentWidth < 1004) && (contentWidth >= 758) ) {
                    tiles.width(Math.floor((contentWidth -(tilesMargin * 3)) / 3) );
                }
                if ( (contentWidth < 758) && (contentWidth >= 450) ) {
                    tiles.width(Math.floor((contentWidth -(tilesMargin * 2)) / 2) );
                }
                if ( (contentWidth < 450) && (contentWidth >= 367) ) {
                    tiles.width(Math.floor((contentWidth -(tilesMargin * 3)) / 3) );
                }
                if ( (contentWidth < 367) ) {
                    tiles.width(Math.floor((contentWidth -(tilesMargin * 2)) / 2) );
                }
            }
            
            positionTiles();         
            
            $(window).bind('resize', function(e) {              
                positionTiles();
            }.debounce(10)); // debounce with a 150 millisecond limit

		},

		destroy: function () {
			//hide module
			root.style.opacity = 0
		},

		listen: {
			'app-load': function (detail) {
				if (!detail) return;
			}
		}
	}
})

