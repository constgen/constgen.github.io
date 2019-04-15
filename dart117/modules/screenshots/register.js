Core.register('screenshots', function (sandbox) {
	return (function (root) {
		if (!root) return

		sandbox.load('{baseUrl}/plugins/colorbox/colorbox.css', 'async')
		var colorboxReady = sandbox.load('{baseUrl}/plugins/colorbox/jquery.colorbox-min.js', 'defer')

		var module = {
			init: function () {
                if (!sandbox.hasFeature('css-border-radius')) root.className += ' no_border-radius'
				
                colorboxReady.then(function(){
                	$(root).find(".groupBox").colorbox({ rel: 'group1' });
                })
			}
		}
		return module
	}(document.querySelector('.screenshots'))) //Node element
})
