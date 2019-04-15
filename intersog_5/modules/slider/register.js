Core.register('slider', function (sandbox) {
	return (function (root,$) {
		if (!root || !$) return
		sandbox.load('plugins/jquery.tools.min.js');
        var module = {
        	init: function () {
        		module.navigationContainer = $(root).find('.navigation')
        		module.background = $(root).find('.bg')
        		module.indicator = module.navigationContainer.find('.indicator')//elemet, that slides to active tab
				module.SPEED = 400
				
				//New effects
                $.tools.tabs.addEffect("nicefade", function (i, done) {
                	var pane = this.getCurrentPane(),
						panes = this.getPanes(),
                		nextpane = panes.eq(i),
						tabs = this.getTabs(),
                		nexttab = tabs.eq(i),
						indicator = tabs.parent().find('.indicator'), //elemet, that slides to active tab
						speed = this.getConf().speed,
                		animationdelay;;

                	if (!pane.length) return

                	//move indicator to position of current tab from left of parent
                	if (sandbox.hasFeature('css-transition')) {
                		indicator.css({ left: nexttab.offset().left - nexttab.parent().offset().left })
                	}
                	else {
                		indicator.animate({ left: nexttab.offset().left - nexttab.parent().offset().left }, speed)
                	}

					//fix positions
                	panes.css({ zIndex: '' })
                	nextpane.css({
                		position: 'absolute',
                		top: 0,
                		left: 0
                	})

                	//fade effect
                	if (sandbox.hasFeature('css-transition')) {
                		clearTimeout(animationdelay)
                		nextpane.css({  })
                		nextpane.css({
                			zIndex: 10,
                			'-webkit-transition': 'opacity ' + speed / 1000 + 's',
                			'-moz-transition': 'opacity ' + speed / 1000 + 's',
                			'-o-transition': 'opacity ' + speed / 1000 + 's',
                			'transition': 'opacity ' + speed / 1000 + 's',
                			opacity: 1
                		})
                		animationdelay = setTimeout(
							function () {
								pane.css({
									zIndex: '',
									'-webkit-transition': 'none',
									'-moz-transition': 'none',
									'-o-transition': 'none',
									'transition': 'none',
									opacity: 0
								})
							}
						, speed)
                	}
                	else {
                		nextpane.css({zIndex: 10})
                		nextpane.animate({ opacity: 1 }, speed, function () {
                			pane.css({ opacity: 0 })
                			nextpane.css({ zIndex: '' })
                		})
                	}
                	

                	done.call();
                });


        		//Changes of brand colors, event for all site
                function changeColor(e, i) {
                	var detail = $.parseJSON(this.getTabs().eq(i).attr('data-brandcolor'))
                	sandbox.action('brandcolor-setup', detail)
                }

                $(".slider .tabs").tabs(".panes > a", {
                    tabs: 'a',
                    history: true,
                    current:'active',
                    event: 'click',
                    effect: 'nicefade', //fade, default
                    rotate: true,
                    speed: module.SPEED,
                    onBeforeClick: changeColor
                })/*.slideshow({
                    autoplay: true,
                    interval: 3000,
                    autopause: true,
                    clickable: false
                })*/

                $('.slider .tabs a').click(function () { return false })


                //var test_elem = document.createElement('div')
                //test_elem.style.cssText = '\
        		//	filter: url();\
        		//	-webkit-filter: grayscale(1);\
				//	filter: grayscale(1);\
				//	filter: progid:DXImageTransform.Microsoft.BasicImage(grayScale=1);\
				//'
                //console.log(/^grayscale/.test(test_elem.style.webkitFilter) || /^(grayscale|url\(|progid)/.test(test_elem.style.filter))


//                if (sandbox.get('device').browser == 'firefox' || sandbox.get('device').browser == 'chrome') return
//        		//Canvas method for grayscale images in all browsers beside
//
//                function grayscaleImage(imgObj, w, h) {
//                	var canvas = document.createElement('canvas');
//                	var ctx = canvas.getContext('2d');
//
//                	var imgW = w || imgObj.width;
//                	var imgH = h || imgObj.height;
//                	canvas.width = imgW;
//                	canvas.height = imgH;
//
//                	ctx.drawImage(imgObj, 0, 0);
//                	var imgPixels = ctx.getImageData(0, 0, imgW, imgH);
//
//                	for (var y = 0; y < imgPixels.height; y++) {
//                		for (var x = 0; x < imgPixels.width; x++) {
//                			var i = (y * 4) * imgPixels.width + x * 4;
//                			var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3; /*������� �������*/
//                			/*var avg = imgPixels.data[i]*0.299 + imgPixels.data[i + 1]*0.587 + imgPixels.data[i + 2]*0.114;*/ /*������� �����������*/
//                			imgPixels.data[i] = avg;
//                			imgPixels.data[i + 1] = avg;
//                			imgPixels.data[i + 2] = avg;
//                		}
//                	}
//
//                	ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
//
//                	var data = canvas.toDataURL('image/png')
//
//                	//��� Anndroid, ������� �� ������������ toDataURL()
//                	if (data.indexOf('data:image/png') == -1) return imgObj.src.slice(0, imgObj.src.lastIndexOf('.')) + '-gray' + imgObj.src.slice(imgObj.src.lastIndexOf('.'))
//
//                	return data;
//                }
//
//        		/*Gray Images*/
//        		;(function ($) {
//                	var i = 0,
//						Img = [],
//						imageElem;
//
//                	module.navigationContainer.find('a').each(function (i) {
//                		if (imageElem = $(this).find('img').get(0)) {
//                			if (!!document.createElement('canvas').getContext) {
//                				Img[i] = new Image()
//                				Img[i].src = imageElem.src
//                				if (Img[i].complete) imageElem.src = grayscaleImage(Img[i])
//                				else {
//                					Img[i].onload = (function (elem, image) {
//                						return function (event) {
//                							imageElem.src = grayscaleImage(image)
//                						}
//                					})(elem, Img[i])
//                				}
//                			}
//                		}
//                	})
//                }(jQuery))
			},

			listen: {
				//listen for changes in colors to adopt to brand colors
				'brandcolor-change': function (detail) {
					if (sandbox.hasFeature('css-transition')) {
						module.indicator.css({ borderColor: detail.borderDark })
						module.navigationContainer.css({ borderColor: detail.borderDark })
						module.background.css({ borderColor: detail.borderLight, backgroundColor: detail.background })
					}
					else {
						module.indicator.css({ borderColor: detail.borderDark })
						module.navigationContainer.animate({ borderColor: detail.borderDark }, module.SPEED)
						module.background.animate({ borderColor: detail.borderLight, backgroundColor: detail.background }, module.SPEED)
					}
				}
			}
		}
		return module
	}(document.querySelector('.slider'),window.jQuery)) //Node element
})
