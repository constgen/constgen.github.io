Core.register('advertisingDetails', function (sandbox) {
	'use strict';
	var root, module;
	// root HTML element
	if (!(root = sandbox.root = document.querySelector && document.querySelector('.advertisingDetails'))) return;

	// return module object
	return module = {
		//switchable styles
		css: '',

		init: function () {
			//show module
			root.style.display = ''
			
			$(root).find('.openingList .title').click(function(){
				
				var isOpened = $(this).parent().hasClass('open');
				$(root).find('.openingList .open').removeClass('open');
				$(root).find('.openingList .description').css('height','0');
				
				var elDescription = $(this).parent().find('.description');
				
				if (!isOpened) {
					$(this).parent().addClass('open');
					elDescription.css('height','auto');					
					var heightDescription = elDescription.height();
					elDescription.css('height','0');
					elDescription.css('height',heightDescription);
					console.log(heightDescription);
				} else {
					$(this).parent().removeClass('open');
					elDescription.css('height','0');
				}
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

