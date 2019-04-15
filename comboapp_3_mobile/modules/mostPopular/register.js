Core.register('mostPopular', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {            
                module.viewport = $(root).find('.viewport')
				module.wall = $(root).find('.wall')
				module.slides = module.wall.find('.slide')
                module.hasCssTransition = sandbox.hasFeature('css-transition')
                
                //First update position
                setPosition();
                
                function setPosition(){
                    var middleIndex = parseInt((module.slides.length)/2);

                    currentSlide = module.slides.eq(middleIndex);
                    module.wall.css({ left: -currentSlide.position().left });
                    module.slides.filter('.current').removeClass('current');
                    currentSlide.addClass('current');
                }
                
                
                //Method of image navigation
                module.goToSlide = function (i) {
					if (module.wall.is(':animated')) return
					deferredAnimation = $.Deferred()

					module.slides.filter('.current').removeClass('current')
					module.slides.eq(i).addClass('current')

					//update viewport width to new current image view
					module.hasCssTransition ?
						module.viewport.css({ width: module.slides.eq(i).width() })
						: module.viewport.animate({ width: module.slides.eq(i).width() }, module.SPEED)

					//update wall position to new image to be at the center
					module.hasCssTransition ?
						module.wall.css({ left: -module.slides.eq(i).position().left })
						: module.wall.animate(
							{ left: -module.slides.eq(i).position().left },
							module.SPEED,
							deferredAnimation.resolve //deferred callback
						)
				}
                
                //Interactions               
                module.wall.delegate('.slide', 'click', function () {  
					module.goToSlide(module.wall.find('.slide').index(this))
				})
                
                //Slide with touch
				sandbox.Event.add(module.wall.get(0), 'slideleft', function () {
					//go to next image
					module.slides.filter('.current').next().click()
				})
				sandbox.Event.add(module.wall.get(0), 'slideright', function () {
					//go to prev image
					module.slides.filter('.current').prev().click()
				})
                
                setTimeout(function(){$(root).find('.slider').addClass('transition');},15);

			},

			listen: {
				'app-load': function () {

				}
			}

		}
		return module
	}(document.querySelector('.mostPopular'))) //Node element
})
