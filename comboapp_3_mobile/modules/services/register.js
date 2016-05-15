Core.register('services', function (sandbox) {
	return (function (root, $) {
		if (!root || !$) return
		var module = {
			init: function () {
				var SPEED = 400

				//Open/close service package description
				$(root).delegate('.service.pack .buy .button', 'click', function () {
					$(this).toggleClass('expanded').parents('.service').find('.details').slideToggle(SPEED)
					return false
				})
			}
		}
		return module
	}(document.querySelector('.services'), window.jQuery)) //Node element
})
