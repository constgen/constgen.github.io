Core.register('footer', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {
                if (!sandbox.hasFeature('css-border-radius')) root.className += ' no_border-radius'
			}
		}
		return module
	}(document.querySelector('#footer'))) //Node element
})
