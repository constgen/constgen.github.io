Core.register('clientItem', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {
                            $(function() {
                                if (navigator.appVersion.indexOf("MSIE 7.") !== -1)                        
                                    $('#clientItem ul.links li').not(':first').prepend('<span class="slash">/</span>');                        

                            });
				
			},

			listen: {
				'app-load': function () {

				}
			}

		}
		return module
	}(document.querySelector('#clientItem'))) //Node element
})
