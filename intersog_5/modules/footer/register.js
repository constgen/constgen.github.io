Core.register('footer', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {
                if (!sandbox.hasFeature('css-border-radius')) root.className += ' no_border-radius'

                $("#footer-menu a[href*='work.html#'], #footer-menu a[href*='work#']").click(function(){
					var tag = $(this).attr("href").split("#")[1];
					sandbox.action('filter-apps', { tag: tag})	// sending to Core event 'filter-apps' with selected tag in params
					
				})
			}
		}
		return module
	}(document.querySelector('#footer'))) //Node element
})
