Core.register('portfolio', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {

				$(".links a").click(function (e){

					e.preventDefault()

					var destId = $(this).attr("href");
					var destElement = $(destId).get(0);
					var dest = sandbox.get('offset', destElement).top

					module.scrollToDestination(dest);

					return false;
				});

				module.repairBefores();
                            $(function() {
                                if (navigator.appVersion.indexOf("MSIE 7.") !== -1)                        
                                    $('#portfolio ul.links li').not(':first').prepend('<span class="slash">/</span>');                        

                            });

			},

			scrollToDestination: function (dest) {
				if (!!($('html').scrollTop())) {
					$('html').animate({
						scrollTop: dest
					}, 500, 'swing');
				} else {
					$('html, body').animate({
						scrollTop: dest
					}, 500, 'swing');
				}
			},




			repairBefores: function(){
				if (($.browser.msie) && ($.browser.version == '7.0')) {
					var filters = $(".links li:not(:first-child) a")
					filters.before("<span style='padding-right:10px;color:#989898;'>/</span>")
				}
			},



			listen: {
				'app-load': function () {

				}
			}

		}
		return module
	}(document.querySelector('#portfolio'))) //Node element
})
