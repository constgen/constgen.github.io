Core.register('applyResellers', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {
				return true
			},

			destroy: function () {
				return false
			},

			listen: {
				'app-load': function () {
					return true
				}
			}

		}
		return module
	}(document.querySelector('#applyResellers'))) //Node element
})
