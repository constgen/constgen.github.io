Core.register('serviceCategories', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {
				sandbox.Event.add(root.querySelectorAll('li'),'tap', function(){})
			}

		}
		return module
	}(document.querySelector('.serviceCategories'))) //Node element
})
