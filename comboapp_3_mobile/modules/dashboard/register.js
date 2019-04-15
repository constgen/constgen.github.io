Core.register('dashboard', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {
				sandbox.Event.add(root.querySelectorAll('li a'), 'tap', function () { })
			},

			listen: {
				'app-load': function () {

				}
			}

		}
		return module
	}(document.querySelector('#dashboard'))) //Node element
})
