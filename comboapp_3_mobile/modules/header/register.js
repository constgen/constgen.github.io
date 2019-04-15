Core.register('header', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {
				module.logo = document.querySelector('#logo')

				//if page 404 or noscript, no rotation
				if (/404|noscript/.test(document.documentElement.className)) {
					return
				}

				//Start rotation of logo
				sandbox.Event.add(window, 'load', function(){
					module.logo.className = 'animate'
				})
			},

			listen: {
				
			}

		}
		return module
	}(document.querySelector('#header')))
})
