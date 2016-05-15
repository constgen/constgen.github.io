Core.register('footer', function (sandbox) {
	return (function (root, $) {
		if (!root || !$) return
		var module = {
			init: function () {
				var i, el, collection;

				/* Check SVG support */
				if (!sandbox.hasFeature('element-svg')) {

					$(root).find('img[src$=".svg"]').each(function () {
						this.src = this.src.replace('.svg', '')
					})

					//collection = root.querySelectorAll('img[src$=".svg"]')
					//i = 0
					//while (el = collection[i++]) {
					//	el.src = el.src.replace('.svg', '')
					//}
				}
			}

		}
		return module
	}(document.querySelector('#footer'), window.jQuery))
})
