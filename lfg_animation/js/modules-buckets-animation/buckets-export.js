define(['jquery', './buckets', './Core', 'module'], function ($, buckets, Core, self) {
	'use strict';
	
	var undefined,
		Util = {},
		moduleUrl = self.uri.substr(0, self.uri.lastIndexOf('/')), //path to module folder
		isCanvasSupported = (function () {
			//From Modernizr
			var elem = document.createElement('canvas');
			return !!(elem.getContext && elem.getContext('2d'));
		}());

	//returns Image as a Canvas element with imported image pixels
	Util.getCanvasFromImage = function (image) {
		var canvas,
			ctx,
			imagePixels,
			data;

		canvas = document.createElement('canvas')
		if (image.complete) {
			ctx = canvas.getContext('2d')
			canvas.width = image.width
			canvas.height = image.height
			ctx.drawImage(image, 0, 0)

		}

		return canvas;
	}


	//resize canvas with antialiasing
	Util.scaleCanvas = function (canvas, scale) {
		var ctx = canvas.getContext('2d'),
			tempCanvas = document.createElement('canvas'),
			tempCtx = tempCanvas.getContext('2d'),
			imagePixels = ctx.getImageData(0, 0, canvas.width, canvas.height),
			x, y, i, avg;

		function resizeToScale(canvas) {
			tempCanvas.width = canvas.width //save previous width
			tempCanvas.height = canvas.height //save previous height
			tempCtx.drawImage(canvas, 0, 0)//save previous image
			//devrese size to half
			canvas.width = canvas.width * scale
			canvas.height = canvas.height * scale

			ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, canvas.width, canvas.height);

			return canvas;
		}

		resizeToScale(canvas)

		return canvas;
	}

	
	Util.fillTextWrap = function (ctx, text, left, top, maxWidth, lineHeight) {
		var words = text.split(" "),
			countWords = words.length,
			line = "",
			n;

		//polyfill
		ctx.measureText = ctx.measureText || ctx.mozMeasureText

		for (n = 0; n < countWords; n++) {
			var testLine = line + words[n] + " ";
			var testWidth = ctx.measureText(testLine).width;
			if (testWidth > maxWidth) {
				ctx.fillText(line, left, top);
				line = words[n] + " ";
				top += lineHeight;
			}
			else {
				line = testLine;
			}
		}
		ctx.fillText(line, left, top);
	}

	Util.drawHtmlElement = function (ctx, elem, topElem, backgroundImage) {
		var text = $('<div>' + $(elem).html().replace(/<sup>.*?<\/sup>/gi, '') + '</div>').text(),
			left = $(elem).offset().left - $(topElem).offset().left,
			top = $(elem).offset().top - $(topElem).offset().top,
			width = $(elem).width(),
			color = $(elem).css('color'),
			fontSize = $(elem).css('font-size'),
			fontStyle = $(elem).css('font-style'),
			fontWeight = $(elem).css('font-weight'),
			fontFamily = $(elem).css('font-family'),
			cssLineHeight = $(elem).css('line-height'),
			cssTextAlign = $(elem).css('text-align');
		

		//css background implementation
		var backgroundPixels,
			cssBackgroundImage = $(elem).css('background-image').replace(/^url\(('|"|\s)?/i, '').replace(/('|"|\s)??\)$/i, ''),
			cssScale,
			//backgroundImage,
			canvasBackgroundImage;
		
		cssScale = (function () {
			var transform = $(elem).css('transform'),
				zoom =  $(elem).css('zoom'),
				values;
			
			//parse percentage as rate
			if (zoom && /%$/.test(zoom)) {
				zoom = parseFloat(zoom, 10)/100
			}
			
			if (zoom && zoom !== 'normal' && transform == 'matrix(1, 0, 0, 1, 0, 0)') {
				return zoom;
			} else if (transform !== 'none') {
				values = transform.split('(')[1].split(')')[0].split(',')
				values[0]//scaleX
				values[3]//scaleY

				//return scaleX only
				return values[0];
			}   else {
				return 1;
			}
		}())
		
		if (cssBackgroundImage !== 'none') {
			
			//if backround image object is passed directly to the function, use it
			if (backgroundImage) {
				//backgroundImage = backgroundImage
			}
			//otherwise create image from css property 
			else {
				backgroundImage = new Image()
				backgroundImage.src = cssBackgroundImage
			}
			
			canvasBackgroundImage = Util.getCanvasFromImage(backgroundImage)
			canvasBackgroundImage = Util.scaleCanvas(canvasBackgroundImage, cssScale)

			

			//for visual debug
			//ctx.fillStyle = "#000";
			//ctx.fillRect(left, top, backgroundImage.width, backgroundImage.height);

			//draw background first
			ctx.drawImage(canvasBackgroundImage, 0, 0, canvasBackgroundImage.width, canvasBackgroundImage.height, left, top, canvasBackgroundImage.width, canvasBackgroundImage.height);
		}

		//correct line-height
		switch (cssLineHeight) {
			case 'normal': cssLineHeight = parseInt(fontSize, 10) + 4; break;
			default: cssLineHeight = parseInt(cssLineHeight, 10)
		}

		//correct left position
		if (cssTextAlign == 'center') {
			left = left + width / 2
		}

		ctx.fillStyle = color
		ctx.font = [fontStyle, fontWeight, fontSize, fontFamily].join(' ')
		ctx.textAlign = cssTextAlign
		Util.fillTextWrap(ctx, text, left, top, width, cssLineHeight)
	}


	return {
		asImage: function (callback) {
			if (!isCanvasSupported) {
				alert('Export is not successfull')
				return;
			}

			var root = $('.animatedBuckets'); //rott html element
			
			//import main background
			Core.load([moduleUrl + '/images/bg_export.png', moduleUrl + '/images/bucket-default.png'], { type: 'png' }).then(function (Images) {
				var bgImage = Images[0],
					bucketImage = Images[1],
					canvas = Util.getCanvasFromImage(bgImage),
					ctx = canvas.getContext('2d'),
					data;
				
				// ctx.fillStyle = '#000'
				// ctx.font = '[font style][font weight][font size][font face]'
				// ctx.textBaseline = 'top | hanging | middle | alphabetic | ideographic | bottom'
				// ctx.textAlign = 'center | start | end | left | right'
				// ctx.fillText('Text', left, top)


				 ctx.fillStyle = '#000'
				 ctx.font = 'normal normal 12px Arial'
				 ctx.textBaseline = 'middle'
				 
				 //ctx.fillText('Income tax-free LTC reimbursements', 10, 50);
				// Util.fillTextWrap(ctx, 'Income tax-free LTC reimbursements', 10, 100, 50, 16)


				//Top bucket
				 root.find('.top-bucket .block-text').each(function () {
					Util.drawHtmlElement(ctx, this, root)
				})


				//Bottom buckets
				root.find('.bottom-buckets .bucket .scaleElem').each(function () {
					Util.drawHtmlElement(ctx, this, root, bucketImage)
				})

				//Bottom values
				root.find('.bottom-buckets .block-text .money .hidden-value').each(function () {
					Util.drawHtmlElement(ctx, this, root)
				})

				//Bottom text descriptions
				root.find('.bottom-buckets .block-text .text').each(function () {
					Util.drawHtmlElement(ctx, this, root)
				})


				data = canvas.toDataURL('image/png')

				//for Anndroid, which does not support toDataURL()
				if (data.indexOf('data:image/png') == -1) {
					data = undefined
				}

				//return DataURL
				callback(data)
			})
		}
	}
})