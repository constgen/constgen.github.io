
Core.register('redHorizontalLine', function (sandbox) {
	return (function (root, $) {
		if (!root || !$) return
		var module = {
			init: function () {
				//color lines
				module.mainColor = $(root)
				module.secondaryColor = $(root).find('.wrapper')
				module.SPEED = 400

			},

			listen: {
				//listen for changes in colors to adopt to brand colors
				'brandcolor-change': function (detail) {
					if (sandbox.hasFeature('css-transition')) {
						module.mainColor.css({ backgroundColor: detail.borderLight })
						module.secondaryColor.css({ backgroundColor: detail.borderDark })
					} else {
						module.mainColor.animate({ backgroundColor: detail.borderLight }, module.SPEED)
						module.secondaryColor.animate({ backgroundColor: detail.borderDark }, module.SPEED)
					}
				}
			}

		}
		return module
	}(document.querySelector('.red_horizontal_line'), window.jQuery)) //Node element
})
