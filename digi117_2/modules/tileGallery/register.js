Core.register('tileGallery', function (sandbox) {
	return (function (root, $) {
		if (!root || !$) return
		var module = {
			init: function () {
				module.tile = $(root).find('.tile')
				module.tileHeight = module.tile.eq(0).height()
				module.tileWidth = module.tile.eq(0).width()
				module.Photos = []
				module.CurrentPhotos = []
				module.interval = 3000
				module.quwwant = 3
				module.hasCssTransition = sandbox.hasFeature('css-transition')

				var intervalId;

				//request gallery images
				sandbox.action('gallery-request')


				sandbox.Event.add(root, 'slideleft', function (e) {
					console.log(e.direction)
				})

				//update method
				module.update = {
					QUEUE: 0,
					TOGETHER:  1,
					method: 1
				}

				//build start images in gallery layout
				module.build = function () {
					
					var i = 14,//prepare 14 images
						tilesHTML = '',
						imageSrc = {};

					while (i--) {
						imageSrc = randomImage(module.CurrentPhotos)
						module.CurrentPhotos.push(imageSrc.thumb)
						tilesHTML += '<div data-src="' + imageSrc.image + '" class="tile ' + (imageSrc.image ? '' : 'empty') + '">\
							<div class="effect">\
								<div class="image"><img '
									+ (imageSrc.thumb ? 
										'src="' + imageSrc.thumb + '"' 
										: 'style="width: 0;"') +
								'></div>\
							</div>\
							<div class="hover"></div>\
						</div>'
						
					}
					$(root).find('.tiles').html(tilesHTML)
					//update tiles collection and height, width
					module.tile = $(root).find('.tile')
					module.tileHeight = module.tile.eq(0).height()
					module.tileWidth = module.tile.eq(0).width()
				}


				module.started = false
				//start to animate tiles
				module.start = function () {
					if (module.started || !module.Photos.thumbs || !module.Photos.thumbs.length) return

					var i1 = 0,
						i2 = 0,
						i3 = 0,
						imageSrc;

					module.started = true
					$(module).removeClass('notransitions')

					switch (module.update.method) {
						case module.update.TOGETHER:
							intervalId = setInterval(function () {
								i1 = random(0, module.tile.length - 1)
								imageSrc = randomImage(module.CurrentPhotos)
								module.CurrentPhotos[i1] = imageSrc.thumb
								module.tile.eq(i1).attr('data-src', imageSrc.image)
								//toggle empty class
								imageSrc.thumb ? module.tile.eq(i1).removeClass('empty') : module.tile.eq(i1).addClass('empty')
								changeEffectUp(module.tile.eq(i1), imageSrc.thumb)


								i2 = random(0, module.tile.length - 1)
								imageSrc = randomImage(module.CurrentPhotos)
								module.CurrentPhotos[i2] = imageSrc.thumb
								module.tile.eq(i2).attr('data-src', imageSrc.image)
								//toggle empty class
								imageSrc.thumb ? module.tile.eq(i2).removeClass('empty') : module.tile.eq(i2).addClass('empty')
								changeEffectUp(module.tile.eq(i2), imageSrc.thumb)


								i3 = random(0, module.tile.length - 1)
								imageSrc = randomImage(module.CurrentPhotos)
								module.CurrentPhotos[i3] = imageSrc.thumb
								module.tile.eq(i3).attr('data-src', imageSrc.image)
								//toggle empty class
								imageSrc.thumb ? module.tile.eq(i3).removeClass('empty') : module.tile.eq(i3).addClass('empty')
								changeEffectUp(module.tile.eq(i3), imageSrc.thumb)


								i4 = random(0, module.tile.length - 1)
								imageSrc = randomImage(module.CurrentPhotos)
								module.CurrentPhotos[i4] = imageSrc.thumb
								module.tile.eq(i4).attr('data-src', imageSrc.image)
								//toggle empty class
								imageSrc.thumb ? module.tile.eq(i4).removeClass('empty') : module.tile.eq(i4).addClass('empty')
								changeEffectUp(module.tile.eq(i4), imageSrc.thumb)


							}, module.interval)
							break
						case module.update.QUEUE:
							//under construction
							break
					}
				}

				module.stop = function () {
					clearInterval(intervalId)
					module.started = false
					$(module).addClass('notransitions')
				}
				 


				function random(min, max, exclude){
					// использование Math.round() даст неравномерное распределение!
					// Math.floor(Math.random() * (max - min + 1)) + min;
					// exclude - array of excluded values
					do {
						var ret = Math.round(Math.random() * (max - min + 1)) + min;
					} while (exclude && exclude.length &&  (new RegExp('\\b'+ret+'\\b').test(exclude.join(' '))))

					return ret;
				}

				function randomImage(excluded) {				
					// 0.25 - вероятность пустого тайла
					if (!random(0, 3))
						return '' //return empty image

					//define exluded images indexes
					var excludedIndexes = [], 
						i = module.Photos.length,
						randomIndex;
					if (excluded && excluded.length) {
						excluded = excluded.join(' ')
						while (i--) {
							if (new RegExp('\\b' + module.Photos.thumbs[i] + '\\b').test(excluded))
								excludedIndexes.push(i)
						}
					}

					//return random image
					randomIndex = random(0, module.Photos.thumbs.length - 1, excludedIndexes)
					return {
						thumb: module.Photos.thumbs[randomIndex],
						image: module.Photos.images[randomIndex]
					}
				}

				

				//Handler to open big gallery
				$(root).find('.tiles').delegate('.tile', 'click', function () {
					if (!$(this).attr('data-src')) return
					sandbox.action('gallery-open', {
						top: $(root).offset().top,
						imageSrc: $(this).attr('data-src')
					})
				})

				//Callback for CSS transition
				if (module.hasCssTransition) {
					sandbox.Event.add($(root).find('.tiles').get(0), 'transitionend', function (e) {
						//check if it is 'effect element'
						if (!/effect/.test(e.target.className)) return

						var effect = $(e.target)
					
						//disable transition
						effect.addClass('notransition')
						//reset DOM
						effect.find('.image:first-child').remove()
						effect.css({ top: 0 })
						//aneble transition
						setTimeout(function(){
							effect.removeClass('notransition')
						}, 15)
					})
				}

				//effect - from bottom to top
				function changeEffectUp(tile, nextImageSrc){
					var container = tile.find('.effect'),
						h = module.tileHeight,
						SPEED = 500; //also in CSS transition
					
					//if next is image
					if (nextImageSrc) {
						var nextImage = new Image()
						//when image loaded, start animation
						nextImage.onload = function () {
							scaleImage(nextImage)
							//add new image
							container.append('<div class="image"></div>').find('.image:last-child').append(nextImage)
							//start animation
							if (module.hasCssTransition) {
								container.css({ top: -h })
							}
							else {
								container.animate({ top: -h }, SPEED, function () {
									//reset DOM
									container.find('.image:first-child').remove()
									container.css({ top: 0 })
								})
							}

							nextImage = null
						}
						nextImage.src = nextImageSrc
						//if (nextImage.complete) nextImage.onload()
					}
					//if next is empty
					else {
						//add new empty element
						container.append('<div class="image"></div>')
						//start animation

						if (module.hasCssTransition) {
							container.css({ top: -h })
						}
						else {
							container.animate({ top: -h }, SPEED, function () {
								//reset DOM
								container.find('.image:first-child').remove()
								container.css({ top: 0 })
							})
						}
					}	
				}

				//function for right image scale to fill all tile
				function scaleImage(img) {
					var portraid = (img.height > img.width)
					//if portraid image
					if (portraid) {
						img.style.width = module.tileWidth + 'px'
					}
						//if landscape image
					else {
						img.style.height = module.tileHeight + 'px'
					}
				}	
			},

			listen: {
				'content-update': function (detail) {
					if (!detail || !detail.photos) return

					module.Photos = detail.photos //add photos to collection
					
					module.build() //fill gallery with start images
					module.start() //start tile slideshow
				},

				'brandcolor-change': function (detail) {
					module.tile.css({ backgroundColor: detail.borderDark })
					module.tile.find('.hover').css({ borderColor: detail.borderDark })
				},

				'pause-loopanimations': function (detail) {
					module.stop()//stop tile slideshow
				},

				'resume-loopanimations': function (detail) {
					module.start()//start tile slideshow
				}
			}

		}
		return module
	}(document.querySelector('.tileGallery'), window.jQuery)) //Node element
})
