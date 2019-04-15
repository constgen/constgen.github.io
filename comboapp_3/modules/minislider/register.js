Core.register('minislider', function (sandbox) {
	return (function (root, $) {
		if (!root || !$) return

		//Load jQuery Plugin
		sandbox.load('{baseURL}/plugins/jquery.tools.min.js')

		var module = {
			init: function () {

				module.saveLabel = $(root).find(".label .text .val")

				if (!sandbox.hasFeature('css-transform')) root.className += ' no-transform'

				$(".scroller").css("height", $(".scroller .slide").eq(0).height() + 50); //set starting height of scroller

				//Customize plugin
				var scroller = $(root).find(".scroller").scrollable({
					circular: true,
					mousewheel: false,
					speed: 500,
					next: '.next',
					prev: '.prev',
					onBeforeSeek: function (e, index) {
						var comingSlide = $(root).find(".scroller .slide:not(.cloned)").eq(index)
						if(!comingSlide[0]) {comingSlide = $(root).find(".scroller .slide:not(.cloned)").eq(0)}

						console.log(comingSlide.height())
						module.saveLabel.html(comingSlide.attr('data-save')) //change discount on label

						if (sandbox.hasFeature("css-transition")) { //animate height change of scroller from slide to slide
							$(".scroller").css("height", comingSlide.height() + 50);
						} else {
							$(".scroller").animate({ height: comingSlide.height() + 50 }, 500, 'swing');
						}

					}
				}).navigator(".paginator") // initialize pagination

				$(root).find('.scrollable > a').click(function () {
					return false
				})

				module.saveLabel.html($(root).find(".scroller .slide:not(.cloned)").eq(0).attr('data-save')) //change discount on label


			}

		}
		return module
	}(document.querySelector('.minislider'), window.jQuery)) //Node element
})
