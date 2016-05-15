Core.register('careersADayInTheLifePopup', function(sandbox) {
    return (function(root, $) {
        if (!root)
            return
        var module = {
            overlay: $("#careersADayInTheLifePopupOverlay"),

            init: function () {
            	module.open = function () {
            		//if opened, do nothing
            		if (module.overlay.hasClass("opened")) {
						return
            		}

                    toggleHeight = '100%'
                    module.overlay.css({display: 'block'});

                    //toggle animation
                    $("#careersADayInTheLifePopupOverlay").animate({
                    	height: '100%'//opened height of form
                    }, 500, 'swing', function() {
                        module.overlay.addClass("opened")
                    });
            	}

            	module.close = function () {
					//if closed, do nothing
            		if (!module.overlay.hasClass("opened")) {
            			return
            		}

            		//toggle animation
            		$("#careersADayInTheLifePopupOverlay").animate({
            			height: 0 //base height of form
            		}, 500, 'swing', function () {
            			module.overlay.css({ display: 'none' });
            			module.overlay.removeClass("opened")
            		});
            	}

            	$(root).find('#careersADayInTheLifePopupCloseButton a').click(function () {
            		module.close()
            		//prevent default behaviour
					return false
            	})
            },
            listen: {
            	'careers-video-popup': function () {
					module.open()
                }
            }

        }
        return module
    }(document.querySelector('#careersADayInTheLifePopup'), window.jQuery)) //Node element
})
