Core.register('gallerySlider', function (sandbox) {
	'use strict';
	var root, module;
	// root HTML element
	if (!(root = sandbox.root = document.querySelector && document.querySelector('.gallerySlider'))) return;

	var jqToolsReady = sandbox.load('{baseURL}/plugins/jquery.tools.min.js', 'defer')
	
	// return module object
	return module = {
		//switchable styles
		css: '',

		init: function () {
			//show module
		    root.style.display = ''
		    
		    jqToolsReady.then(function () {
                
		        $(root).find('.scrollable').scrollable({
		            circular: true,
		            mousewheel: false,
		            speed: 500,
		            next: '.next',
		            prev: '.prev',
		            clickable: false
		        }).navigator({
		            navi: '.slider-navi',
		            activeClass: 'current'
		        }).autoscroll({
		            autoplay: true,
		            interval: 5000
		        });
		        
		        // get api
		        var scrollableControl = $(".scrollable").data("scrollable");
		        
		        var pane = scrollableControl.getIndex() + 2;
		        $(".items").find("div:not(.cloned):nth-child(" + pane + ")").attr("id", "current-slide");

		        scrollableControl.onSeek(function () {

		            $(".items").find("div").attr("id", "");
		            pane = scrollableControl.getIndex() + 2;
                    $(".items").find("div:not(.cloned):nth-child(" + pane + ")").attr("id", "current-slide");

		        });

		        // image-slider page navigation positioning
		        //$(".slider-navi").css('margin-left', function () {
		        //    var offset = (parseInt($(".items").css('width')) / 2) - (parseInt($(".slider-navi").css('width')) / 2);
		        //    return offset;
		        //});
               
		    })
		    
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

