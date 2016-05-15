Core.register('socialButtons', function (sandbox) {
	'use strict';
	var root, module;
	// root HTML element
	if (!(root = sandbox.root = document.querySelector && document.querySelector('.socialButtons'))) return;

	// return module object
	return module = {
		//switchable styles
		css: '',

		init: function () {
			//show module
			//root.style.display = 'display: block;'
			module.showSocialButtons = function () {
			    var overlay = $(root).find('.overlay');//$("<div></div>").attr('class','overlay');
			    root.style.display = ''
			    $(overlay).css('display', 'block');
			    $(overlay).on('touchmove', function(e) {
				    e.preventDefault();
				}, false);
		        if (navigator.appVersion.indexOf("Chrome/") != -1) {
					$(root).find('.socialButtons').css('width', '100%');
				}

		        $(root).removeClass('hid').addClass('vis');
		        //$(overlay).appendTo('body');
		        $(overlay).click(function () {
		        	$(this).css('display','none');
		            module.hideSocialButtons()
		            return false;
    	        })
                $('.socialButtons > a').click(function () {
		            setTimeout(module.hideSocialButtons, 15)
    	        })

		    },
		    module.hideSocialButtons = function () {

                root.style.display = 'none'
                $(root).removeClass('vis').addClass('hid');

            }
		},

		destroy: function () {
			//hide module
			root.style.display = 'none'
		},

		listen: {
			'app-load': function (detail) {
				if (!detail) return;
			},
			'socialButtons-open': function () {
			    module.showSocialButtons()
			}
		}
	}
})

