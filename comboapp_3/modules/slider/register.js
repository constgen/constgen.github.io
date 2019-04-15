Core.register('slider', function (sandbox) {
	return (function (root, $) {
		if (!root || !$) return

		//Load jQuery Plugin
		sandbox.load('{baseURL}/plugins/jquery.tools.min.js')

		var module = {
			init: function () {


				//for IE7 only fix :after
				if ($.browser.msie && $.browser.version.substr(0, 1) < 8) {
					$(root).find(".slidetabs").append('<span class="before"></span><span class="after"></span>')
				}

				//Customize plugin
				$(root).find(".slidetabs").tabs(".slider .slidecontent .slide-item", {
					// enable "cross-fading" effect
					effect: 'fade',
					fadeOutSpeed: "slow",
					// start from the beginning after the last tab
					rotate: true
				}).slideshow({// use the slideshow plugin. It accepts its own configuration
					next: '.next',
					prev: '.prev',
                    autoplay: true,
                    interval: 5000,
                    autopause: true,
                    clickable: false
				});


				$(root).children('a').click(function () {
					return false
				});


			}

		}
		return module
	}(document.querySelector('.slider'), window.jQuery))
})

