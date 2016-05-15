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
				module.interval = 3500
				module.quwwant = 3
				module.hasCssTransition = sandbox.hasFeature('css-transition')

				var intervalId;

				//request gallery images
				sandbox.action('gallery-request')

				sandbox.Event.add(root, 'slideleft', function (e) {

				})

				//update method
				module.update = {
					QUEUE: 0,
					TOGETHER:  1,
					method: 1
				}

				//build start images in gallery layout
				module.build = function () {
				
					var numberTiles = 15,//prepare 15 images
						tilesHTML = '',
						imageSrc = {};

					while (numberTiles--) {
						imageSrc = randomImage(module.CurrentPhotos)
						module.CurrentPhotos.push(imageSrc.thumb)
						tilesHTML += '<div data-src="' + (imageSrc.image) + '" class="tile">\
							<div class="effect">\
								<div class="image"><img src="' + (imageSrc.thumb) + '"></div>\
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
						i4 = 0,
						imageSrc;

					module.started = true
					$(module).removeClass('notransitions')
					
					
					
					switch (module.update.method) {
						case module.update.TOGETHER:
							intervalId = setInterval(function () {
								//image 1
								i1 = random(0, module.tile.length - 1);
								imageSrc = randomImage(module.CurrentPhotos);
								module.CurrentPhotos[i1] = (imageSrc.thumb);
								module.tile.eq(i1).attr('data-src', (imageSrc.image));
								changeEffectUp(module.tile.eq(i1), (imageSrc.thumb));
								//image 2
								do {
									i2 = random(0, module.tile.length - 1, [i1]);
								} while ( (i2 == (parseInt(i1) - 1)) || (i2 == (parseInt(i1) + 1)) || (i2 == (parseInt(i1) - 3)) || (i2 == (parseInt(i1) + 3)) ); 
								imageSrc = randomImage(module.CurrentPhotos);
								module.CurrentPhotos[i2] = (imageSrc.thumb);
								module.tile.eq(i2).attr('data-src', (imageSrc.image));
								changeEffectUp(module.tile.eq(i2), (imageSrc.thumb));
								//image 3								
								do {
									i3 = random(0, module.tile.length - 1, [i1,i2]);
								} while ( (i3 == (parseInt(i1) - 1)) || (i3 == (parseInt(i1) + 1)) || (i3 == (parseInt(i2) - 1)) || (i3 == (parseInt(i2) + 1)) || (i3 == (parseInt(i1) - 3)) || (i3 == (parseInt(i1) + 3)) || (i3 == (parseInt(i2) - 3)) || (i3 == (parseInt(i2) + 3))); 								
								imageSrc = randomImage(module.CurrentPhotos);
								module.CurrentPhotos[i3] = (imageSrc.thumb);
								module.tile.eq(i3).attr('data-src', (imageSrc.image));
								changeEffectUp(module.tile.eq(i3), (imageSrc.thumb));
								//image 4								
								do {
									i4 = random(0, module.tile.length - 1, [i1,i2,i3]);
								} while ( (i4 == (parseInt(i1) - 1)) || (i4 == (parseInt(i1) + 1)) || (i4 == (parseInt(i2) - 1)) || (i4 == (parseInt(i2) + 1)) ||(i4 == (parseInt(i3) - 1)) || (i4 == (parseInt(i3) + 1)) || (i4 == (parseInt(i1) - 3)) || (i4 == (parseInt(i1) + 3)) || (i4 == (parseInt(i2) - 3)) || (i4 == (parseInt(i2) + 3)) ||(i4 == (parseInt(i3) - 3)) || (i4 == (parseInt(i3) + 3))); 
								imageSrc = randomImage(module.CurrentPhotos);
								module.CurrentPhotos[i4] = (imageSrc.thumb);
								module.tile.eq(i4).attr('data-src', (imageSrc.image));
								changeEffectUp(module.tile.eq(i4), (imageSrc.thumb));

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
					do {
						var ret = Math.floor(Math.random() * (max - min +1)) + min;
					} while (exclude && exclude.length &&  (new RegExp('\\b' + ret + '\\b').test(exclude.join(' '))))
					return ret;
				}

				function randomImage(excluded) {				

					//define exluded images indexes
					var excludedIndexes = [], 
						i = module.Photos.thumbs.length,
						randomIndex;
					if (excluded && excluded.length) {
						excluded = excluded.join(' ');
						while (i--) {
							if (new RegExp('\\b' + module.Photos.thumbs[i] + '\\b').test(excluded))
								excludedIndexes.push(i);
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

						var effect = $(e.target);
						//disable transition
						effect.addClass('notransition');
						//reset DOM
						effect.find('.image').not(':last').remove();
						effect.css({ top: 0 });
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
					
					var nextImage = new Image()
					//when image loaded, start animation
					nextImage.onload = function () {
						scaleImage(nextImage)
						//add new image
						container.append('<div class="image"></div>').find('.image:last-child').append(nextImage);
						//start animation
						if (module.hasCssTransition) {
							container.css({ top: -h });
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
					nextImage.src = nextImageSrc;
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

					module.Photos = detail.photos; //add photos to collection

					if (module.Photos.thumbs.length < 15) {
						$(root).find('.tiles').html('<p>Data not available!</p>');
					} else {
						module.build(); //fill gallery with start images
						module.start(); //start tile slideshow
					}
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
