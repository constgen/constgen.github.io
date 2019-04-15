Core.register('default', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {
				var i, el, collection;

				/* Check SVG support */
				if (!sandbox.hasFeature('element-svg')) {

					$(root).find('img[src$=".svg"]').each(function () {
						this.src = this.src.replace('.svg', '')
					})
				}
			},

			listen: {
				'app-load': function () {

				}
			}

		}
		return module
	}(document.querySelector('#default'))) //Node element
})
