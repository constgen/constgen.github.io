Core.register('mainmenu', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {
				$("#menu .with-sub-menu > a").click(function(){
					return false
				});
			},

			listen: {
				'app-load': function () {

				}
			}

		}
		return module
	}(document.querySelector('#tab-nav'))) //Node element
})