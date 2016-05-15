Core.register('serviceShortcut', function (sandbox) {
	return (function (roots) {
		if (!roots.length) return
		var module = {
			init: function () {

			},

			listen: {
				
			}

		}
		return module
	}(document.querySelectorAll('.shortcuts'))) //Node element
})