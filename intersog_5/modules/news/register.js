Core.register('news', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {
				// slide for items
				$(root).find('.scroller').scrollable();
				$(root).find('.scrollable > a').click(function(){return false});
			},

			listen: {
				'app-load': function () {

				}
			}

		}
		return module
	}(document.querySelector('.news'))) //Node element
})
