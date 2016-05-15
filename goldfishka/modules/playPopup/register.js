Core.register('playPopup', function (sandbox) {
	'use strict';
	var root, module;
	// root HTML element
	if (!(root = sandbox.root = document.querySelector && document.querySelector('.playPopup'))) return;

	// return module object
	return module = {
		//switchable styles
		css: '',

		init: function () {
			//show module
		    //root.style.display = ''

		    module.showPopup = function () {

		        // root.style.display = ''
		        // setTimeout (function(){
		        	// $(root).removeClass('hid').addClass('vis')
				// }, 300);
				setTimeout (function(){
					$(root).find('.overlay').addClass('showIn').removeClass('showOut');
					$(root).find('.wrap').addClass('showIn').addClass('bounced').removeClass('showOut');
				}, 500);
				setTimeout (function(){
					$(root).find('.wrap').addClass('showIn').addClass('bounced').removeClass('showOut');
				}, 800);
				// $(root).removeClass('hid').addClass('vis')

				sandbox.Event.add($(root).find('.overlay'), 'tap', function () {
					module.hidePopup()
		            return false;
				})

		    },
            module.hidePopup = function () {
            	$(root).find('.overlay').addClass('showOut').removeClass('showIn');
            	$(root).find('.wrap').addClass('showOut').removeClass('showIn').removeClass('bounced');
            	// setTimeout (function(){
                	// root.style.display = 'none'
                	// $(root).removeClass('vis').addClass('hid')
            	// }, 1000);

            }

		},

		destroy: function () {
			//hide module
			//root.style.display = 'none'
		},

		listen: {
			'app-load': function (detail) {
				if (!detail) return;
			},
			'playPopup-open': function (detail) {
				if (!detail || (!detail.imageSrc) || (detail.imageSrc == '')){
					$(root).find('.overlay').addClass('showOut').removeClass('showIn');
					$(root).find('.wrap').addClass('showOut').removeClass('showIn');
					// $(root).find('.wrap .content').css('display','none');
				} else {
					$(root).find('.overlay').addClass('showIn').removeClass('showOut');
					$(root).find('.wrap').addClass('showIn').removeClass('showOut');
					// $(root).find('.wrap .content').css('display','block');
					$(root).find('.wrap .content img').prop('src', detail.imageSrc);
				}
			    module.showPopup()
			}
		}
	}
})

