Core.register('team', function (sandbox) {
	return (function (root, $) {
		if (!root || !$) return
		var module = {
			init: function () {
				/*Устранение недостатков в ИЕ*/
				if (!-[1, ]) {
					$('#ourteam .member:nth-child(even)').addClass('even')

					//for IE7 only
					if ($.browser.msie && $.browser.version.substr(0, 1) < 8)
						$('#ourteam .description').each(function () {
							$(this).append('<span class="before"></span><span class="after"></span>')
						})
				}


				/*Our Team*/
				var Height = $('#ourteam').height()
				$('#ourteam .member').each(function () {
					if (this.offsetTop + $(this).find('.description').get(0).offsetHeight > Height)
						$(this).addClass('invert')
				})

				


				var descriptiontext = $('.descriptiontext'), delay;
				$('#ourteam .member').mouseenter(function () {
					if (descriptiontext.is(":animated") != true) {
						clearTimeout(delay)
						descriptiontext.fadeOut(100)
					}
				}).mouseleave(function () {
					if (descriptiontext.is(":animated") != true)
						delay = setTimeout(function () {
							descriptiontext.fadeIn(100)
						}, 400)

				})
				
				//Canvas method for opera
				if (!$.browser.opera) return

				/*Grayscale images (чёрно-белые картинки)*/
				function grayscaleImageIE(imgObj) {
					imgObj.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(grayScale=1)';
				}

				function grayscaleImageFF(imgObj) {
					imgObj.style.filter = 'url(../css/filters.svg#gray)';
				}

				function grayscaleImage(imgObj, w, h) {
					var canvas = document.createElement('canvas');
					var ctx = canvas.getContext('2d');

					var imgW = w || imgObj.width;
					var imgH = h || imgObj.height;
					canvas.width = imgW;
					canvas.height = imgH;

					ctx.drawImage(imgObj, 0, 0);
					var imgPixels = ctx.getImageData(0, 0, imgW, imgH);

					for (var y = 0; y < imgPixels.height; y++) {
						for (var x = 0; x < imgPixels.width; x++) {
							var i = (y * 4) * imgPixels.width + x * 4;
							var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3; /*простая формула*/
							/*var avg = imgPixels.data[i]*0.299 + imgPixels.data[i + 1]*0.587 + imgPixels.data[i + 2]*0.114;*/ /*формула телевидения*/
							imgPixels.data[i] = avg;
							imgPixels.data[i + 1] = avg;
							imgPixels.data[i + 2] = avg;
						}
					}

					ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);

					var data = canvas.toDataURL('image/png')

					//для Anndroid, который не поддерживает toDataURL()
					if (data.indexOf('data:image/png') == -1) return imgObj.src.slice(0, imgObj.src.lastIndexOf('.')) + '-gray' + imgObj.src.slice(imgObj.src.lastIndexOf('.'))

					return data;
				}

				/*Gray Images*/
				(function ($) {
					var i = 0,
					img = new Array(),
					div = root.getElementsByTagName('div'),
					elem,
					imagesrc;
					while (elem = div[i++]) {
						if (elem.getElementsByTagName('img')[0]) {
							/*mozilla natively, use same image*/ if ($.browser.mozilla) { }
								/*or use canvas*/ else if (!!document.createElement('canvas').getContext) {
									img[i] = new Image()
									img[i].src = elem.getElementsByTagName('img')[0].src
									if (img[i].complete) elem.getElementsByTagName('img')[0].src = grayscaleImage(img[i])
									else {
										img[i].onload = (function (elem, image) {
											return function (event) {
												elem.getElementsByTagName('img')[0].src = grayscaleImage(image)
											}
										})(elem, img[i])
									}
								}
									/*IE natively, use same image*/else { }
						}
					}
				}(jQuery))
				
			},

			listen: {
				'app-load': function () {

				}
			}

		}
		return module
	}(document.querySelector('#ourteam'), window.jQuery)) //Node element
})
