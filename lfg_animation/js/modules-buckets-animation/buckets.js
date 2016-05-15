define(['jquery', './Core', 'module'], function ($, Core, self) {
	'use strict';
	
	var undefined,
		module = {},
		moduleUrl = self.uri.substr(0, self.uri.lastIndexOf('/')), //path to module folder
		root = $('#buckets-animation'),
		elemAmount,
		elemSubValue1,
		elemSubValue2,
		ModuleReady, // Promise for module is ready to interact
		Odometers = {}, //odometers collection
		Buckets = {},
		SpriteElements = {},
		BounceElements = {},
		OdometerElements = {},
        devider = ',',
		Animations = {}, //collection of animations of different elements
		AnimationMap = [], //queue ofanimations and delays (in miliseconds) between them
		timeout; //setTimoutPromise shortcut

	//exit from function if a necessary HTML element was not found
	if (!root.length) return;

	//some setups for loader
	Core.config.baseUrl = moduleUrl
	//Core.config.cache = true
	Core.config.cacheImages = true



										/*requestAnimationFrame polyfill*/
	; (function () {
		var lastTime = 0;
		var vendors = ['webkit', 'moz', 'ms'];
		for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
			window.cancelAnimationFrame =
			  window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function (callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function () { callback(currTime + timeToCall); },
				  timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};

		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function (id) {
				clearTimeout(id);
			};
	}());

	// usage:
	// instead of setInterval(render, 16) ....
	//(function animloop() {
	//	requestAnimationFrame(animloop);
	//	render();
	//})();


	function formatMoney (val, c, d, t) {
		c = c || '.'
		d = d || '.'
		t = t || ','
		var m = (c = Math.abs(c) + 1 ? c : 2, d = d || ",", t = t || ".",
			/(\d+)(?:(\.\d+)|)/.exec(val + "")), x = m[1].length > 3 ? m[1].length % 3 : 0;
		return (x ? m[1].substr(0, x) + t : "") + m[1].substr(x).replace(/(\d{3})(?=\d)/g,
			"$1" + t);
	}


	timeout = function (ms) {
		return new Core.Promise().wait(ms)
	}


	//insert html body to module root container
	ModuleReady = Core.load(moduleUrl + '/buckets.html', 'async').then(function (textContent) {
		root.html(textContent)
		//redefine root html element
		root = root.find('.animatedBuckets')
        
        //check browser version
        if (!-[1,]) { 
            $(root).addClass('ie-lt9');
         }
      
        //Support css3
        if (Core.Features['css-transition']) {
            if (!Core.Features['css-transform3d']) {
                if (Core.Features['css-transform']) {
                    $(root).addClass('tr-2d');
                }
            }
        } else {
            root.addClass('no-tr');
        }
        
        

	})

	//Load styles
	ModuleReady.and(Core.load(moduleUrl + '/buckets.css', 'async'))


										/*Basic object constructor*/
	function Rectangle (options) {
		options = options || {}
		
		this.width = options.width || 100
		this.height = options.height || 100
		this.top = options.top || 0
		this.left = options.left || 0

		this.text = options.text || ''
		this.imageSrc = options.src || ''
		this.isLoaded = false


		this.domElem = $('<span>')
		//info about constructor in the DOM
		this.domElem.attr('data-constructor', 'Rectangle')
		this.domElem.css({
            position: 'relative',
			display: 'inline-block',
			width: this.width,
			height: this.height,
			top: this.top,
			left: this.left,
			margin: 0,
			padding: 0,
			border: 0,
			backgroundImage: options.imageSrc ? 'url(' + options.imageSrc + ')' : '',
			backgroundPosition: 'bottom center',
			backgroundRepeat: 'no-repeat',
			backgroundColor: 'transparent'

		})
		this.domElem.html(this.text)

		
		this.loaded = (options.imageSrc ? Core.load(options.imageSrc, { type: 'png' }) : Core.Promise()).then(function () {
			this.isLoaded = true
		}.bind(this))
		

		return this;
	}

	Rectangle.prototype.insert = function (parent) {
		if (!parent) {
			this.domElem.css({position: 'absolute'})
		}
		$(parent || root).append(this.domElem)
	}

	


										/*Bounce object constructor*/
	function BounceObject(options) {
		options = options || {}
		var constr = new Rectangle(options),
			prop;

		//migrate all properties and methods
		for (prop in constr) {
			this[prop] = constr[prop]
		}

		this.domElem.attr('data-constructor', 'BounceObject')
		this.domElem.addClass('bounceElem')
		this.domElem.addClass('bounceOut')
		if (!Core.Features['css-transition']) { this.domElem.css({ width: 0 }) }
		this.duration = 200

		return this;
	}
    
	BounceObject.prototype.show = function (isAnimated) {
		isAnimated = (isAnimated === undefined) ? true : isAnimated


		//disable transition for some time
		if (!isAnimated) {
			this.domElem.addClass('noTransition')
			timeout().then(function () { this.domElem.removeClass('noTransition') }.bind(this))
		}

		//jQuery
		if (!Core.Features['css-transition']) {
			if (isAnimated) {
				//this.domElem.animate({ width: "100%" }, this.duration);
				//this.domElem.animate({ width: "80%" }, this.duration);
				this.domElem.animate({ width: "100%" }, this.duration);
			}
			else {
				this.domElem.css({ width: "100%" });
			}
		}
		//CSS3
		else {
			this.domElem.removeClass('bounceOut');
		}
	}

	BounceObject.prototype.hide = function (isAnimated) {
		isAnimated = (isAnimated === undefined) ? true : isAnimated


		//disable transition for some time
		if (!isAnimated) {
			this.domElem.addClass('noTransition')
			timeout().then(function () { this.domElem.removeClass('noTransition') }.bind(this))
		}

		//jQuery
		if (!Core.Features['css-transition']) {
			//this.domElem.animate({ width: "80%" }, this.duration);
			//this.domElem.animate({ width: "100%" }, this.duration);
			this.domElem[isAnimated ? 'animate' : 'css']({ width: "0" }, this.duration);
		}
		//CSS3
		else {
			this.domElem.addClass('bounceOut');
		}
	}






										/*Scalable object constructor*/
	function ScaleObject(options) {
		options = options || {}
		var constr = new Rectangle(options),
			prop;

		//migrate all properties and methods
		for (prop in constr) {
			this[prop] = constr[prop]
		}

		this.domElem.attr('data-constructor', 'ScaleObject')
		this.domElem.addClass('scaleElem')
		this.duration = 200;

		return this;
	}

	ScaleObject.prototype.scale = function (val, isAnimated) {
		if (!/%$/.test(val)) {
			val = parseFloat(val, 10)
		}
        
		isAnimated = (isAnimated === undefined) ? true : isAnimated

		//disable transition for some time
		if (!isAnimated) {
			this.domElem.addClass('noTransition')
			timeout().then(function () { this.domElem.removeClass('noTransition') }.bind(this))
		}

		//jQuery
		if (root.hasClass('no-tr')) {
			this.domElem.css({ transform: 'none' });

			var oldHeight = this.domElem.height(),
				newHeight = this.domElem.height() * val,
				oldWidth = this.domElem.width(),
				newWidth = this.domElem.width() * val,
				newTop = -(newHeight - oldHeight);

			this.domElem[isAnimated ? 'animate' : 'css']({
				zoom: val,
				top: newTop
			});
		}
		//CSS3
		else {
			this.domElem.css({ transform: 'scale(' + val + ')' })
		}
	}







										/*Sprite object constructor*/
	function SpriteObject(options) {
		options = options || {}
		var constr = new Rectangle(options),
			prop;

		//migrate all properties and methods
		for (prop in constr) {
			this[prop] = constr[prop]
		}

		this.domElem.attr('data-constructor', 'SpriteObject')
		this.domElem.addClass('spriteElem')

		this.duration = options.duration || 3000
		this.loop = options.loop || false
		this.invert = options.revert || false

		this.domElem.css({
			backgroundSize: 'auto',
			backgroundPosition: 'center 0'
		})

		this.startDate
		this.endDate
		this.nowDate
		this.iteration = 1
		this.iterationMin = 1
		this.iterationMax = 1
		this.loopStart = options.loopStart || this.iterationMin
		this.loopEnd = options.loopEnd || this.iterationMax
		//this.top = (iteration * this.height) - this.height
		this.isInLoop = this.loop
		this.msPerIteration = this.duration / this.loopEnd
		this.animationFrameId = 0

		this.loaded.then(function (image) {
			this.iterationMax = Math.round(image.height / this.height)
			this.loopEnd = options.loopEnd || this.iterationMax
			this.msPerIteration = this.duration / this.iterationMax

			//console.log(this.loopStart, this.loopEnd)
		}.bind(this))

		return this;
	}

	SpriteObject.prototype.start = function () {
		var sprite = this,
			finishPromise = new Core.Promise();

		this.loaded.then(function () {
			if (sprite.animationFrameId) return;
			//console.log('start')

			sprite.startDate = (new Date).getTime()
			sprite.nowDate = sprite.startDate
			//anable loop state
			sprite.isInLoop = sprite.loop

			function render() {
				var top;
				sprite.nowDate = (new Date).getTime()
				//if loop option is anebled then reset frame position to begining
				if (sprite.isInLoop && (sprite.iteration >= sprite.loopEnd)) {
					sprite.startDate = sprite.nowDate - (sprite.msPerIteration * sprite.loopStart)
					sprite.iteration = sprite.loopStart
				//else go to next frame
				} else {
					sprite.iteration = sprite.invert ?
						(sprite.iterationMax - Math.round((sprite.nowDate - sprite.startDate) / sprite.msPerIteration))
						: Math.round((sprite.nowDate - sprite.startDate) / sprite.msPerIteration)
				}

				//stop animation at last frame
				if (sprite.iteration > sprite.iterationMax || sprite.iteration < sprite.iterationMin) return;

				top = (sprite.iteration * sprite.height) - sprite.height
				sprite.domElem.css({
					backgroundPosition: 'center -' + top + 'px'
				})

				//console.log(sprite.iteration)
			};

			(function animloop() {
				if (sprite.iteration <= sprite.iterationMax && sprite.iteration >= 0) {
					sprite.animationFrameId = requestAnimationFrame(animloop);
					render();
				} else {
					//resolve Promise
					finishPromise.wait()
				}
			}())
		})

		//return Promise
		return finishPromise;
	}

	SpriteObject.prototype.stop = function () {
		var sprite = this;
		this.loaded.then(function () {
			//console.log('stop')
			cancelAnimationFrame(sprite.animationFrameId)
			sprite.animationFrameId = 0
		})
	}

	SpriteObject.prototype.reset = function () {
		var sprite = this;
		this.loaded.then(function () {
			//console.log('reset')
			cancelAnimationFrame(sprite.animationFrameId)

			//reset properties
			sprite.domElem.css({
				backgroundPosition: sprite.invert ? 'center bottom' : 'center 0'
			})
			sprite.startDate
			sprite.endDate
			sprite.nowDate
			sprite.iteration = sprite.invert ? sprite.iterationMax : 1
			sprite.isInLoop = sprite.loop
			sprite.animationFrameId = 0
		})
	}


	SpriteObject.prototype.finish = function () {
		var sprite = this;
		var finishPromise = new Core.Promise();
		this.loaded.then(function () {
			
			//console.log('finish')
			//check that animation is running
			if (!sprite.animationFrameId) return;

			cancelAnimationFrame(sprite.animationFrameId)
	
			//disable loop state
			sprite.isInLoop = false

			function render() {
				var top;

				sprite.nowDate = (new Date).getTime()
				sprite.iteration = Math.round((sprite.nowDate - sprite.startDate) / sprite.msPerIteration)

				//stop animation at last frame
				if (sprite.iteration > sprite.iterationMax || sprite.iteration < sprite.iterationMin) return;

				top = (sprite.iteration * sprite.height) - sprite.height
				sprite.domElem.css({
					backgroundPosition: 'center -' + top + 'px'
				})

				//console.log(sprite.iteration)
			};

			(function animloop() {
				if (sprite.iteration <= sprite.iterationMax && sprite.iteration >= 0) {
					sprite.animationFrameId = requestAnimationFrame(animloop);
					render();
				} else {
					//resolve Promise
					finishPromise.wait()
				}
			}())
		})

		//return Promise
		return finishPromise;
	}




										/*Odometer object constructor*/

	function OdometerObject(options) {
		options = options || {}
		options.width = 'auto'
		options.height = 'auto'
		var constr = new Rectangle(options),
			prop,
			i,
			len;

		//migrate all properties and methods
		for (prop in constr) {
			this[prop] = constr[prop]
		}

		this.domElem.attr('data-constructor', 'OdometerObject')
		this.domElem.addClass('odometerElem')
		this.duration = options.duration || 500
		this.Items = []
        this.ItemsValues = []

		i = 7
		while (i--) {
			len = this.Items.push(new OdometerObjectItem({
				duration: this.duration
			}))

			this.domElem.append(this.Items[len-1].domElem)

			//add comma through every 3 items
			if (i && i % 3 == 0) {
				this.domElem.append('<span class="devider">' + devider + '</span>')
			}
		}
        this.Items.forEach(function(element){
            element.hide();
        });
        this.Items[len-1].domElem.css('width','');
        this.domElem.find('.devider').css('display', 'none');
        

		return this;
        
        
	}

	OdometerObject.prototype.set = function (value, isAnimated) {
		value = parseInt(value, 10)
		value = String(value)
		var len = this.Items.length,
            ItemsValues = [],
			itm,
            i;
//		console.log(this.Items);
		while (value.length < 7) {
			value = '0' + value
		}

		while (value) {
			ItemsValues.push(value.charAt(0))
			value = value.substr(1)
		}

		//set items values
		while (len--) {
			this.Items[len].set(ItemsValues[len], isAnimated)
		}
        
        
        //check for zero

        this.Items.forEach(function(element){
            element.show();
        })
        this.domElem.find('.devider').css({display: ''});
        i = 0;
        while((itm = ItemsValues[i++]) && (i < 7)) {

            if (itm == 0) {
                this.Items[i-1].hide();
                 if (this.Items[i-1].domElem.next().text() == devider) {
                    this.Items[i-1].domElem.next().css({display: 'none'});
                }
            } else {
                break;
            }
            
        }
	}

	function OdometerObjectItem(options) {
		options = options || {}
		options.width = 'auto'
		options.height = 'auto'
		var constr = new Rectangle(options),
			prop;

		//migrate all properties and methods
		for (prop in constr) {
			this[prop] = constr[prop]
		}

		this.domElem.attr('data-constructor', 'OdometerObjectItem')
		this.domElem.addClass('odometerItemElem')
		this.duration = options.duration || 0;

		this.domElem.css({
			'visibility': 'hidden',
			'overflow': 'hidden',
			'vertical-align': 'middle'
		})
		this.domElem.html('8')//invisible fake value
		this.domElem.append('<div style="position: absolute; visibility: visible; top: 0; left: 0; width: 100%;"><div class="n0">0</div><div class="n1">1</div><div class="n2">2</div><div class="n3">3</div><div class="n4">4</div><div class="n5">5</div><div class="n6">6</div><div class="n7">7</div><div class="n8">8</div><div class="n9">9</div></div>')
		this.domElem.children('div').css({
			positio: 'absolute',
			visibility: 'visible',
			top: 0,
			left: 0,
			width: '100%',
			transition: 'top ' + options.duration + 'ms ease'
		})
        

		return this;
	}

	OdometerObjectItem.prototype.set = function (value, isAnimated) {
		var elem = this.domElem.children('div'),
			top = this.domElem.find('.n' + value).position().top;

		isAnimated = (isAnimated === undefined) ? true : isAnimated
        
		//disable transition for some time
		if (!isAnimated) {
			elem.addClass('noTransition')
			timeout().then(function () { elem.removeClass('noTransition') }.bind(this))
		}

		//jQuery
        if (root.hasClass('no-tr')) {
        	elem.stop(true, false)[isAnimated ? 'animate' : 'css']({ top: -top }, this.duration);
        }
		//CSS3
        else {
        	elem.css({ top: -top })
        }
        
		
	}
  
    OdometerObjectItem.prototype.hide = function () {
        this.domElem[0].style.width = "0";             
	}
    OdometerObjectItem.prototype.show = function () {
        this.domElem[0].style.width = "";             
	}
 
    
    




										/*Create all necessary elements*/
	//'OR' separators
	BounceElements.or1 = new BounceObject({
		width: 37,
		height: 39,
		imageSrc: moduleUrl + '/images/or.png'
	})

	BounceElements.or2 = new BounceObject({
		width: 37,
		height: 39,
		imageSrc: moduleUrl + '/images/or.png'
	})

	//3 bottom buckets
	Buckets.bucket1 = new ScaleObject({
		width: 84,
//		height: 86,
        height: '100%',
		imageSrc: moduleUrl + '/images/bucket-default.png'
	})

	Buckets.bucket2 = new ScaleObject({
		width: 84,
//		height: 86,
        height: '100%',
		imageSrc: moduleUrl + '/images/bucket-default.png'
	})

	Buckets.bucket3 = new ScaleObject({
        width: 84,
//		height: 86,
        height: '100%',
		imageSrc: moduleUrl + '/images/bucket-default.png'
	})


	SpriteElements.topBucket = new SpriteObject({
		width: 69,
		height: 72,
		duration: 200,
		imageSrc: moduleUrl + '/images/topbucket-sprite.png'
	})


	//dollar fall
	SpriteElements.moneyFlow1 = new SpriteObject({
		top: -130,
		left: 84,
		width: 251,
		height: 218,
		duration: 1500,
		loop: true,
		loopStart: 33,
		loopEnd: 40,
		imageSrc: moduleUrl + '/images/money_flow-1-sprite.png'
	})

	SpriteElements.moneyFlow2 = new SpriteObject({
		top: -97,
		left: 45,
		width: 36,
		height: 245,
		duration: 1500,
		loop: true,
		loopStart: 30,
		loopEnd: 38,
		imageSrc: moduleUrl + '/images/money_flow-2-sprite.png'
	})

	SpriteElements.moneyFlow3 = new SpriteObject({
		top: -118,
		left: 10,
		width: 238,
		height: 226,
		duration: 1500,
		loop: true,
		loopStart: 30,
		loopEnd: 38,
		imageSrc: moduleUrl + '/images/money_flow-3-sprite.png'
	})


	//odometers
	OdometerElements.odometer1 = new OdometerObject({ duration: 250 })
	OdometerElements.odometer2 = new OdometerObject({ duration: 250 })
	//OdometerElements.odometer3 = new OdometerObject()
	

											/*Animation logic*/
	//define logic of animations of elements, `rate` parameter is a percent value of position of global animation. Animation functions always return Promise object
	Animations = {
		animateOr1: function (rate) {
			if (!rate) {
				BounceElements.or1.hide(module.isAnimationEnabled)
			} else {
				BounceElements.or1.show(module.isAnimationEnabled);
			}
			return new Core.Promise(rate).wait(module.isAnimationEnabled ? BounceElements.or1.duration : 0);
		},
		animateOr2: function (rate) {
			if (!rate) {
				BounceElements.or2.hide(module.isAnimationEnabled)
			} else {
				BounceElements.or2.show(module.isAnimationEnabled)
			}
			return new Core.Promise(rate).wait(module.isAnimationEnabled ? BounceElements.or2.duration : 0);
		},

		animateBucket1: function (rate) {
			//recalculate rate, because it needed at this moment
			rate = module.amount / module.maxAmount

			var scale = module.subValue1 / module.amount || 1,
				max = 1.5,
                min = 0.4,
                modifier = 0.845;

			if (scale < min) {
				scale = min
			} else if (scale > max) {
				scale = max
			}

			scale = rate ? (scale * modifier) : 1

			Buckets.bucket1.scale(scale, module.isAnimationEnabled)

			return new Core.Promise(rate).wait(module.isAnimationEnabled ? Buckets.bucket1.duration : 0);
		},
		animateBucket2: function (rate) {
			//recalculate rate, because it needed at this moment
			rate = module.amount / module.maxAmount

			var scale = module.subValue2 / module.amount || 1,
				max = 1.5,
                min = 0.4,
                modifier = 0.845;

			if (scale < min) {
				scale = min
			} else if (scale > max) {
				scale = max
			}
			
			scale = rate ? (scale * modifier) : 1

			Buckets.bucket2.scale(scale, module.isAnimationEnabled)

            //rate = (rate) ? ((rate * k < min) ? min : ((rate * k > max) ? max : rate)) : 1
            //Buckets.bucket2.scale(rate);


			return new Core.Promise(rate).wait(module.isAnimationEnabled ? Buckets.bucket2.duration : 0);
		},
		animateBucket3: function (rate) {
			//recalculate rate, because it needed at this moment
			rate = module.amount / module.maxAmount

			var scale = module.subValue3 / module.amount || 1,
				max = 1.5,
                min = 0.4,
                modifier = 0.845;

			if (scale < min) {
				scale = min
			} else if (scale > max) {
				scale = max
			}

			scale = rate ? (scale * modifier) : 1

			Buckets.bucket3.scale(scale, module.isAnimationEnabled)

			return new Core.Promise(rate).wait(module.isAnimationEnabled ? Buckets.bucket3.duration : 0);
		},

		animateTopBucket: function (rate) {
			SpriteElements.topBucket.timeoutId

			if (!rate || !module.isAnimationEnabled) {
				SpriteElements.topBucket.reset()
				return Core.Promise(rate);
			} else {
				clearTimeout(SpriteElements.topBucket.timeoutId)
				
				SpriteElements.topBucket.start()
				SpriteElements.topBucket.timeoutId = setTimeout(function () {
					//invert animation mode
					SpriteElements.topBucket.invert = true
					SpriteElements.topBucket.reset()
					SpriteElements.topBucket.start().then(function () {
						//reset to normal animation mode
						SpriteElements.topBucket.invert = false
						SpriteElements.topBucket.reset()
					})
				}, (SpriteElements.moneyFlow1.duration + SpriteElements.moneyFlow2.duration + SpriteElements.moneyFlow3.duration))

				return new Core.Promise(rate).wait(SpriteElements.topBucket.duration);
			}
			
		},
		animateMoneyFlow1: function (rate) {
			SpriteElements.moneyFlow1.timeoutId

			if (!rate || !module.isAnimationEnabled) {
				SpriteElements.moneyFlow1.reset()
				return Core.Promise(rate);
			} else {
				clearTimeout(SpriteElements.moneyFlow1.timeoutId)
				SpriteElements.moneyFlow1.start()

				SpriteElements.moneyFlow1.timeoutId = setTimeout(function () {
					SpriteElements.moneyFlow1.finish().then(function () { SpriteElements.moneyFlow1.reset() })
				}, SpriteElements.moneyFlow1.duration - 500)

				return new Core.Promise(rate).wait(SpriteElements.moneyFlow1.duration);
			}
			
		},
		animateMoneyFlow2: function (rate) {
			SpriteElements.moneyFlow2.timeoutId

			if (!rate || !module.isAnimationEnabled) {
				SpriteElements.moneyFlow2.reset()
				return Core.Promise(rate);
			} else {
				clearTimeout(SpriteElements.moneyFlow2.timeoutId)
				SpriteElements.moneyFlow2.start()

				SpriteElements.moneyFlow2.timeoutId = setTimeout(function () {
					SpriteElements.moneyFlow2.finish().then(function () { SpriteElements.moneyFlow2.reset() })
				}, SpriteElements.moneyFlow2.duration - 500)

				return new Core.Promise(rate).wait(SpriteElements.moneyFlow2.duration);
			}
		},
		animateMoneyFlow3: function (rate) {
			SpriteElements.moneyFlow3.timeoutId

			if (!rate || !module.isAnimationEnabled) {
				SpriteElements.moneyFlow2.reset()
				return Core.Promise(rate);
			} else {
				clearTimeout(SpriteElements.moneyFlow3.timeoutId)
				SpriteElements.moneyFlow3.start()

				SpriteElements.moneyFlow3.timeoutId = setTimeout(function () {
					SpriteElements.moneyFlow3.finish().then(function () { SpriteElements.moneyFlow3.reset() })
				}, SpriteElements.moneyFlow3.duration - 500)

				return new Core.Promise(rate).wait(SpriteElements.moneyFlow3.duration);
			}
		},


		animateOdometer1: function(rate) {
			OdometerElements.odometer1.set(module.subValue1/*, module.isAnimationEnabled*/)

			return new Core.Promise(rate).wait(module.isAnimationEnabled ? OdometerElements.odometer1.duration : 0);
		},

		animateOdometer2: function(rate) {
			OdometerElements.odometer2.set(module.subValue2/*, module.isAnimationEnabled*/)

			return new Core.Promise(rate).wait(module.isAnimationEnabled ? OdometerElements.odometer2.duration : 0);
		}
	}


	function runAnimationMap(Map, value) {//returns Promise object, that is resolved when all animations are finished
		var animationQueue = Core.Promise(value);

		//WITH animation
		if (module.isAnimationEnabled) {
			Map.forEach(function (step) {
				if (step instanceof Array) {
					//animationQueue.and(runAnimationMap1(step, value))
					animationQueue.then(function () {
						runAnimationMap(step, value)
					})
				}
				else if (typeof step === 'function') {
					animationQueue.then(step)//.then(function () { console.log('animated') })
				}
				else if (typeof step === 'number') {
					animationQueue.delay(step)//.then(function () { console.log('delayed', step) })
				}

			})
		}
		//WITHOUT animation
		else {
			Map.forEach(function (step) {
				if (step instanceof Array) {
					runAnimationMap(step, value)
				}
				else if (typeof step === 'function') {
					step(value)
				}
			})
		}
		return animationQueue;
	}




	//Define animation queue
	AnimationMap = [
		10,
		//money fall queue
		[Animations.animateTopBucket, Animations.animateMoneyFlow1, Animations.animateMoneyFlow2, Animations.animateMoneyFlow3], SpriteElements.topBucket.duration,
		250,
		[Animations.animateOdometer1],
		Animations.animateBucket1, SpriteElements.moneyFlow1.duration - Buckets.bucket1.duration, Animations.animateOr1,
		[Animations.animateOdometer2],
		Animations.animateBucket2, SpriteElements.moneyFlow2.duration - Buckets.bucket2.duration, Animations.animateOr2,
		Animations.animateBucket3
	]
	

	//when module DOM ready
	ModuleReady.then(function () {
		//cache elements links
		elemAmount = $(root).find('.amountValue')
		elemSubValue1 = root.find('.bucket.left .block-text .money .hidden-value .value')
		elemSubValue2 = root.find('.bucket.center .block-text .money .hidden-value .value')


		//insert ele,ents into rendering surface
		BounceElements.or1.insert($('.separator-cube.left'))
		BounceElements.or2.insert($('.separator-cube.right'))

		Buckets.bucket1.insert($('.bucket.left .block-bucket'))
		Buckets.bucket2.insert($('.bucket.center .block-bucket'))
		Buckets.bucket3.insert($('.bucket.right .block-bucket'))

		SpriteElements.topBucket.insert($('.top-bucket .block-bucket'))

		SpriteElements.moneyFlow1.insert($('.bottom-buckets .animation-block'))
		SpriteElements.moneyFlow2.insert($('.bottom-buckets .animation-block'))
		SpriteElements.moneyFlow3.insert($('.bottom-buckets .animation-block'))

		OdometerElements.odometer1.insert(root.find('.bucket.left .block-text .money .value').eq(0))
		OdometerElements.odometer2.insert(root.find('.bucket.center .block-text .money .value').eq(0))
		//OdometerElements.odometer3.insert(root.find('.bucket.right .block-text .money .value').eq(0))
	})







												/*Module definition*/


	//keeps an amount value
	module.amount = 0
	module.subValue1 = 0
	module.subValue2 = 0
	module.subValue3 = 0

	//previous amount value
	module.prevAmount = 0

	//if animation is enabled every element is animated, if not - every element instantly moves to last frame
	module.isAnimationEnabled = true

	//keeps an amount 100% base for calculation of the animation state
	module.maxAmount = 500000

	//sets a new amount value and update view
	module.setValue = function (options) {
		//options.amount
		//options.reimbursements
		//options.benefit
		//options.animate

		options.animate = (options.animate === undefined) ? true : options.animate
		module.isAnimationEnabled = options.animate

		module.prevAmount = module.amount //save old
		module.amount = parseFloat(options.amount, 10) || 0
		module.subValue1 = parseFloat(options.reimbursements, 10)
		module.subValue2 = parseFloat(options.benefit, 10)
		module.subValue3 = module.amount
		

		//start change values only when all resources are loaded and module is ready
		ModuleReady.then(function () {
			module.updateAmount()
		})
	}

	//starts animation to dispay a new value
	module.updateAmount = function () {
		//if vakue didn't change, do nothing
		if (module.amount == module.prevAmount) return;

		var amount = module.amount,
			max = parseFloat(module.maxAmount, 10),
			rate = amount / max;

		if (module.amount > module.prevAmount) {
			//start encrease animation
		}
		else {
			//start decrease animation
		}
		
		//set amount value
		elemAmount.html(formatMoney(amount))

		//set invisible values for drawing to canvas
		elemSubValue1.html(formatMoney(module.subValue1))
		elemSubValue2.html(formatMoney(module.subValue2))
		
		return runAnimationMap(AnimationMap, rate) //pass rate

	}

	//return only public methods and properties
	return {
		setValue: module.setValue,
		//maxAmount: module.maxAmount
	};
})