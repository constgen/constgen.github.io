Core.register('vocations', function (sandbox) {
	return (function (root, $) {
		if (!root || !$) return
		var module = {
			init: function () {
				var SPEED = 400;
				
				/*Vocations open/close*/
				$(root).find('.switch .button:not(.send)').click(function () {
					var article = $(this).parents('article')
					article.addClass('opened').find('.fulldescription').slideDown(SPEED)
					$('html, body').animate({
						scrollTop: article.offset().top + 2
					}, 1000)
					return false
				})

			},

			listen: {
				
			}

		}
		return module
	}(document.querySelector('.vocations'), window.jQuery)) //Node element
})
