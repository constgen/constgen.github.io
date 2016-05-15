Core.register('sendFormSuccess', function(sandbox) {
    return (function(root, $) {
        if (!root)
            return
        var module = {
            overlay: $("#sendFormSuccessOverlay"),

            init: function () {
            	module.open = function () {
            		//if opened, do nothing
            		if (module.overlay.hasClass("opened")) {
						return
            		}

                    toggleHeight = '100%'
                    module.overlay.css({display: 'block'});

                    //toggle animation
                    $("#sendFormSuccessOverlay").animate({
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
            		$("#sendFormSuccessOverlay").animate({
            			height: 0 //base height of form
            		}, 500, 'swing', function () {
            			module.overlay.css({ display: 'none' });
            			module.overlay.removeClass("opened")
            		});
            	}

            	$(root).find('#sendFormSuccessCloseButton a, #sendFormSuccessOverlay').click(function () {
            		module.close()
            		//prevent default behaviour
					return false
            	})
            },
            listen: {
            	'send-form-success': function () {
					module.open()
                }
            }

        }
        return module
    }(document.querySelector('#sendFormSuccess'), window.jQuery)) //Node element
})
