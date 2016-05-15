Core.register('noJavascript', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {
				//If Javascipt is anebled, navigate back
				window.history.back()
			}

		}
		return module
	}(document.querySelector('.noJavascript'))) //Node element
})
