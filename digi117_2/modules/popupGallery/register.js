Core.register('popupGallery', function (sandbox) {
	return (function (root, undefined) {
		if (!root) return
		var module = {
			init: function () {
				module.gallery = $(root).find('.gallery')
				module.viewport = $(root).find('.viewport')
				module.wall = $(root).find('.wall')
				module.images = module.wall.find('img')
				module.SPEED = 600 //and also in CSS transitions
				module.hasCssTransition = sandbox.hasFeature('css-transition')

				var deferredAnimation; //for Deferred object

				//Preload image
				module.loadImage = function (img) {
					if (!img || (img.src && img.complete)) {
						
						return
					}

					var tempImage = new Image();
					
					tempImage.onload = function () {
						//show image in HTML
						img.src = tempImage.src
						if (deferredAnimation) {
							deferredAnimation.done(function () {
								//show image
								img.style.width = 'auto'
								//update wall with new image
								module.updatePositions()
								deferredAnimation = undefined
							})
						}
						else {
							//show image
							img.style.width = 'auto'
							//update wall with new image
							module.updatePositions()
						}
						
						
						//clean
						tempImage = undefined
					}
					tempImage.src = img.getAttribute('data-src')
					//img.style.width = tempImage.width + 'px'//setup image width for correct calculations
					//if (tempImage.complete) tempImage.onload() //for cached images
				}

				//load 4 adjacent images
				module.loadAdjacentImage = function (img) {
					module.loadImage($(img).prev().get(0))
					module.loadImage($(img).prev().prev().get(0))
					module.loadImage($(img).next().get(0))
					module.loadImage($(img).next().next().get(0))
				}

				//Show gallery
				module.show = function (positionTop) {
					//disallow global heavy animations
					sandbox.action('pause-loopanimations', { initiator: 'popupGallery' })

					if (positionTop || positionTop === 0)
						module.gallery.css({top: positionTop})
					$(root).fadeIn(400)
				}

				//Hide gallery
				module.hide = function () {
					$(root).fadeOut(400)
					//allow global heavy animations
					sandbox.action('resume-loopanimations', { initiator: 'popupGallery' })
				}

				//Make neccessary image current
				//callback for transition method
				if (module.hasCssTransition)
					sandbox.Event.add(module.wall.get(0), 'transitionend', function (e) {
						if (e.target === this && deferredAnimation)
							deferredAnimation.resolve()
					})


				//Method of image navigation
				module.goToImage = function (i) {
					if (module.wall.is(':animated')) return
					deferredAnimation = $.Deferred()

					module.images.filter('.current').removeClass('current')
					module.images.eq(i).addClass('current')

					//update viewport width to new current image view
					module.hasCssTransition ?
						module.viewport.css({ width: module.images.eq(i).width() })
						: module.viewport.animate({ width: module.images.eq(i).width() }, module.SPEED)

					//update wall position to new image to be at the center
					module.hasCssTransition ?
						module.wall.css({ left: -module.images.eq(i).position().left })
						: module.wall.animate(
							{ left: -module.images.eq(i).position().left },
							module.SPEED,
							deferredAnimation.resolve //deferred callback
						)
				}



				//Instantly update position
				module.updatePositions = function (i) {
					var currentImage;
					
					if (i) {
						currentImage = module.images.eq(i)
						module.images.filter('.current').removeClass('current')
						currentImage.addClass('current')
					}
					else {
						currentImage = module.images.filter('.current')
					}
					
					//disable transitions
					$(module.wall).addClass('notransition')
					$(module.viewport).addClass('notransition')
					
					//update wall position to new image to be at the center
					module.wall.css({ left: -currentImage.position().left })
					//update viewport width to new current image view
					module.viewport.css({ width: currentImage.width() })

					//enable transitions
					setTimeout(function(){
						$(module.wall).removeClass('notransition')
						$(module.viewport).removeClass('notransition')
					}, 15)
				}

				//Interactions
				module.viewport.find('.close').on('click', function () {
					module.hide()
					return false
				})

				module.wall.delegate('img', 'click', function (e) {
					//if click on active image
					if ($(this).hasClass('current')) {
						var pos = e.clientX - $(this).offset().left
						if (pos < this.offsetWidth / 2) {
							//go to prev image
							module.images.filter('.current').prev().click()
						}
						else {
							//go to next image
							module.images.filter('.current').next().click()
						}
						return
					}
					module.loadAdjacentImage(this)
					module.goToImage(module.wall.find('img').index(this))
				})

				//slide with touch
				sandbox.Event.add(module.wall.get(0), 'slideleft', function () {
					//go to next image
					module.images.filter('.current').next().click()
				})
				sandbox.Event.add(module.wall.get(0), 'slideright', function () {
					//go to prev image
					module.images.filter('.current').prev().click()
				})


				//append gallery to '#wrapper' element
				if (document.getElementById('wrapper'))
					document.getElementById('wrapper').appendChild(root)
			},

			listen: {
				'content-update': function (detail) {
					if (!detail || !detail.photos) return

					var imgHTML = '';

					//add photos to html
					$(detail.photos.images).each(function () {
						imgHTML += '<img data-src="' + this + '" />'
					})


					
					module.wall.html(imgHTML)
					//update image collection
					module.images = module.wall.find('img')
				},

				//show gallery when it was called
				'gallery-show': function (detail) {
					var currentImage;

					module.show(detail.top)

					if (detail.imageSrc) {
						currentImage = $(module.images.filter('[data-src="' + detail.imageSrc + '"]'))
						module.loadImage(currentImage.get(0))
						//load adjacent images
						module.loadAdjacentImage(currentImage.get(0))
						
						module.updatePositions(
							module.wall.find('img').index(currentImage.get(0))
						)
					}
					
				},
				
				'gallery-hide': function (detail) {
					module.hide()
				},


				'brandcolor-change': function (detail) {
					module.viewport.css({ backgroundColor: detail.background })
				}
			}

		}
		return module
	}(document.querySelector('.popupGallery'))) //Node element
})
