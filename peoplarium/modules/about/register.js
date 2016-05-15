Core.register('about', function (sandbox) {
	'use strict';
	var root, module;
	// root HTML element
	if (!(root = sandbox.root = document.querySelector && document.querySelector('.about'))) return;

	// return module object
	return module = {
		//switchable styles
		css: '',

		init: function () {
			//show module
		    root.style.display = ''

		    // read-more button
		    $('.spoiler-body').hide();
		    $('.read-more').click(function () {

		        $(this).toggleClass("active").toggleClass("unactive").parent().find('.spoiler-body').slideToggle();

		        if ($(this).hasClass('unactive')) {
		            $(this).find('span').html('Скрыть');
		        } else {
		            $(this).find('span').html('Подробнее');
		        }

		    });

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

