Core.register('header', function (sandbox) {
	'use strict';
	var root, module;
	// root HTML element
	if (!(root = sandbox.root = document.querySelector && document.querySelector('.header'))) return;

	// return module object
	return module = {
		//switchable styles
		css: '',

		init: function () {
			//show module
			root.style.display = ''
            
            $(function(){positionLogo()});
            
            function positionLogo() {             
                var logoWidth = $(root).find('.logo'),
                    contentWidth = $(root).width(),
                    logoMargin = 10;         
                if (contentWidth >= 1260) {
                    logoWidth.width(Math.floor((contentWidth -(logoMargin * 5)) / 5) );
                } else 
                if ( (contentWidth < 1260) && (contentWidth >= 1004) ) {
                    logoWidth.width(Math.floor((contentWidth -(logoMargin * 4)) / 4) );
                } else
                if ( (contentWidth < 1004) && (contentWidth >= 758) ) {
                    logoWidth.width(Math.floor((contentWidth -(logoMargin * 3)) / 3) );
                }
                if ( (contentWidth < 758) && (contentWidth >= 450) ) {
                    logoWidth.width(Math.floor((contentWidth -(logoMargin * 2)) / 2) );
                }
                if ( (contentWidth < 450) && (contentWidth >= 367) ) {
                    logoWidth.width(Math.floor((contentWidth -(logoMargin * 3)) / 3) );
                }
                if ( (contentWidth < 367) ) {
                    logoWidth.width(Math.floor((contentWidth -(logoMargin * 2)) / 2) );
                }

            }
            
            positionLogo();         
            
            $(window).bind('resize', function(e) {
                positionLogo();
            }.debounce(15)); // debounce with a 150 millisecond limit
		},

		destroy: function () {
			//hide module
			root.style.display = 'none'
		},

		listen: {
			'app-load': function (detail) {
				if (!detail) return;
			}
		}
	}
})

