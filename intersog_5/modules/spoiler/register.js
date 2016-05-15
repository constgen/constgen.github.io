Core.register('spoiler', function (sandbox) {
	var root, module;
	// root HTML element
	if (!(root = document.querySelector('.spoiler'))) return;
	// module
	var module = {
		init: function () {
			$('.spoiler-body').hide()
			$('.spoiler-button').click(function () {
			    $(this).toggleClass("active").toggleClass("unactive").parent().find('.spoiler-body').slideToggle();
			    if ($(this).hasClass('unactive')) {
			        $(this).html('Less');
			    } else {
			        $(this).html('More');
			    }
			})

		},

		destroy: function () {

		},

		//switchable styles
		css: '',

		listen: {
			'app-load': function () {

			}
		}

	}
	// return module object
	return module;
})

