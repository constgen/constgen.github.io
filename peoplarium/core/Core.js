/*
Version 2.3.1

Compatable with: 
	- Cordova 1.5+
	- Blackberry WebWorks


IO:
	out:
		debug-module-register
		debug-module-start
		debug-module-stop
		debug-configuration-update
		debug-error
	
		app-ready
		app-load
		app-search
		layout-update
		language-update
	
	in:
		layout-change
		language-change

ACCESS:
	get: language


To do:
- permissions
*/

; (function (window) {
	'use strict';

	if (window.Core) return

	var undefined,
		document = window.document,
		location = window.location,
		cordova = window.cordova || window.Cordova || window.PhoneGap, // Cordova Lib (optional)
		blackberry = window.blackberry, // Blackberry OS
		windows = window.Windows, // Windows 8 OS
		Modules = {}, // Registered Modules collection
		Core = {}, // Application Core
		Sandbox,// Modules Sandbox
		Resources = {},// Resource manager
		Includes = [];// Included modules collection

	



															/*Fixes, polyfills*/
	//document.head polyfill
	document.head || (document.head = document.getElementsByTagName('head')[0])

	// compressed with http://www.refresh-sf.com/yui/
	// Array forEach
	Array.prototype.forEach = Array.prototype.forEach || function (g, b) { var d, c, e; if (this == null) { throw new TypeError("this is null or not defined") } var f = Object(this), a = f.length >>> 0; if ({}.toString.call(g) != "[object Function]") { throw new TypeError(g + " is not a function") } if (b) { d = b } c = 0; while (c < a) { if (c in f) { e = f[c]; g.call(d, e, c, f) } c++ } }
	// Array map
	Array.prototype.map = Array.prototype.map || function (i, h) { if (this == null) { throw new TypeError("this is null or not defined") } if ({}.toString.call(i) != "[object Function]") { throw new TypeError(i + " is not a function") } var b, a, c, d, g, f = Object(this), e = f.length >>> 0; h && (b = h); a = new Array(e); c = 0; while (c < e) { if (c in f) { d = f[c]; g = i.call(b, d, c, f); a[c] = g } c++ } return a }
	// Array filter
	Array.prototype.filter = Array.prototype.filter || function (b) { if (this == null) { throw new TypeError("this is null or not defined") } var f = Object(this); var a = f.length >>> 0; if (typeof b != "function") { throw new TypeError(b + " is not a function") } var e = []; var d = arguments[1]; for (var c = 0; c < a; c++) { if (c in f) { var g = f[c]; if (b.call(d, g, c, f)) { e.push(g) } } } return e }
	// Array some
	Array.prototype.some = Array.prototype.some || function (b) { if (this == null) { throw new TypeError("this is null or not defined") } var e = Object(this); var a = e.length >>> 0; if (typeof b != "function") { throw new TypeError(b + " is not a function") } var d = arguments[1]; for (var c = 0; c < a; c++) { if (c in e && b.call(d, e[c], c, e)) { return true } } return false }
	// Array every
	Array.prototype.every = Array.prototype.every || function (b) { if (this == null) { throw new TypeError("this is null or not defined") } var e = Object(this); var a = e.length >>> 0; if (typeof b != "function") { throw new TypeError(b + " is not a function") } var d = arguments[1]; for (var c = 0; c < a; c++) { if (c in e && !b.call(d, e[c], c, e)) { return false } } return true }
	// Function bind
	Function.prototype.bind = Function.prototype.bind || function (a) { if (typeof this !== "function") { throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable") } var e = Array.prototype.slice.call(arguments, 1), d = this, b = function () { }, c = function () { return d.apply(this instanceof b && a ? this : a, e.concat(Array.prototype.slice.call(arguments))) }; b.prototype = this.prototype; c.prototype = new b(); return c }

	// document readyState
	; (function () {
		var handler;
		if (document.readyState == null && document.addEventListener) {
			document.readyState = "loading";
			document.addEventListener("DOMContentLoaded", handler = function () {
				document.removeEventListener("DOMContentLoaded", handler, false);
				handler = undefined
				document.readyState = "complete"
			}, false)
		}
	}())

	// fix absent console
	window.console || (window.console = { log: function () { } })
	// fix absent console.error
	window.console.error || (window.console.error = window.console.log)
	// fix absent console.dir
	window.console.dir || (window.console.dir = function (param) {
		var i, string = '';
		if (typeof param === 'object') {

			/*array*/
			if (param.length) {
				return console.log('[' + param.toString() + ']');
			}

			/*object*/
			string += '{\n'
			for (i in param) {
				string += '  ' + i + ': ' + param[i] + '\n'
			}
			string += '}'
			return console.log(string);
		} else { return console.log(param); }
	})










	Core.isCordova = (!!cordova && /android_asset|^(file:).+www|^local:\/\/\/index.html/.test(location.href)) //detect usage in mobile device WebView with Phonegap

	//Collection of all resources objects
	Resources = {
		sequence: {js: [], css: [],	img: [], text: [], other: []},
		urls: {},
		add: function (url, options, executionFunction) {
			this.urls[url] = {
				type: options.type,
				async: options.async,
				defer: options.defer,
				reload: options.reload,
				loaded: false,
				executed: false,
				executionFunction: executionFunction
				//cancelFunction: cancelFunction
			}

			//if has handler add to sequence
			if (typeof executionFunction !== 'function')
				return;

			//define type of resource
			if (/js|json/.test(options.type))
				this.sequence.js.push(url)
			else if (/css/.test(options.type))
				this.sequence.css.push(url)
			else if (/jpg|jpeg|gif|png|svg/.test(options.type))
				this.sequence.img.push(url)
			else if (/html|htm|txt|tpl/.test(options.type))
				this.sequence.text.push(url)
			else
				this.sequence.other.push(url)
		},
		ready: function (readyUrl, isReady) {
			var resource,
				i = 0;

			this.urls[readyUrl].loaded = true
			//if not ready, mark as executed, to not break sequence
			isReady = (isReady === undefined) ? true : isReady
			this.urls[readyUrl].executed = !isReady
			//update script execution
			while (resource = Resources.urls[this.sequence.js[i++]]) {
				if (!resource.loaded && !resource.executed)
					break
				else if (resource.loaded && !resource.executed) {
					resource.executionFunction()
					resource.executed = true
				}
			}
			//update style callback execution, cascading is preserved by default
			i = 0
			while (resource = Resources.urls[this.sequence.css[i++]]) {
				if (!resource.loaded && !resource.executed)
					break
				else if (resource.loaded && !resource.executed) {
					resource.executionFunction()
					resource.executed = true
				}
			}
			//update image callback execution
			i = 0
			while (resource = Resources.urls[this.sequence.img[i++]]) {
				if (!resource.loaded && !resource.executed)
					break
				else if (resource.loaded && !resource.executed) {
					resource.executionFunction()
					resource.executed = true
				}
			}
			//update text callback execution
			i = 0
			while (resource = Resources.urls[this.sequence.text[i++]]) {
				if (!resource.loaded && !resource.executed)
					break
				else if (resource.loaded && !resource.executed) {
					resource.executionFunction()
					resource.executed = true
				}
			}

		}
	}



														/*Utility Functions*/

	
	Core.Util = {}

	//Error line number absence fixing
	Core.Util.fixError = function (err) {
		//try to find the line where an error accured
		err.line = err.line || err.lineNumber || (function () {
			if (!err.stack)	return 0;
			var	Stacks = err.stack,
				line;
			//remove first message string in Chrome
			Stacks = Stacks.replace(new RegExp('(\.+): '+err.message+'\n'), '')
			//devide errors in stack
			Stacks = Stacks.split('\n')
			//strip line number
			line = Stacks[0].replace(/(\s+|\))$/i, '').match(/:\d(:?\d)*$/g)
			line = (line && line.length) ? line[0].substr(1) : '*'
			return line
		}())
		//try to find the file in what an error accured
		err.source = (err.sourceURL || err.fileName || (function () {
			return ''
		}())).split('?')[0]
	}

	//Limited frequency of function execution
	Core.Util.limitExecution = function (func, ms) {
		var lastCallDate = null,
			limit = ms || 60;
		return function () {
			var that = this,
				args = arguments,
				nowDate = new Date().getTime();
			if (!lastCallDate || nowDate - lastCallDate >= limit) {
				lastCallDate = nowDate
				func.apply(that, args)
			}
		}
	}

	//delay function execution until rapid calling will end/stop
	Core.Util.deferExecution = function (func, ms) {
		var timer = null,
			wait = ms || 150;
		return function () {
			var that = this,
				args = arguments;
			function complete() {
				func.apply(that, args)
				timer = null
			}
			if (timer) clearTimeout(timer)
			timer = setTimeout(complete, wait)
		}
	}
	






	//Promise 1.5
	;(function (global) {
		var Deferred,
			Promise,
			every, any, some,
			undefined;

		function isFunc(func) {
			return (typeof func === 'function')
		}

		function setImmediate(callback) {
			return (!!window.setImmediate) ? 
				window.setImmediate(callback) //native
				: (window.msSetImmediate && window.msClearImmediate) ? window.msSetImmediate(callback) //IE10
					: window.setTimeout(callback, 1) //emulation
		}

		function clearImmediate(id) {
			return (!!window.clearImmediate) ?
					window.clearImmediate(id) //native
					: window.msClearImmediate ? window.msClearImmediate(callback) //IE10
						: window.clearTimeout(id) //emulation		
		}

		Deferred = function (canceler) {
			var defer = this;
			this.canceler = canceler
			this.isResolved = false
			this.isRejected = false
			//this.isHandled = false
			//this.isError = false
			this.result = []//arguments array
			this.Callbacks = []
			this.newPromise
			//Deferred may serve Promise or not
			this.promise = undefined
		}


		Deferred.prototype.updateResult = function (newResult) {
			if (newResult !== undefined)
				this.result = [newResult]
		}

		Deferred.prototype.call = function (handler) {
			var func = this.isResolved ? handler.done : handler.canceled,
				defer = this,
				newResult;
			
			if (func) {
				try {
					newResult = func.apply(defer.promise || defer, defer.result); //new or old value
					if (newResult && typeof newResult.then === "function" && newResult !== (defer.promise || defer)) {
						this.newPromise = newResult //save a link to the new Promise object
						while (handler = this.Callbacks.shift()) { //migrate handlers to new promise
							newResult.then(handler.done, handler.canceled, handler.progress)
						}
						//check if return value have changed
						newResult.then(defer.updateResult, defer.updateResult, defer.updateResult)
						return
					}
					else
						defer.updateResult(newResult)
				}
				catch (err) {
					//if exeption is in doneCallback, switch to rejected state from this moment
					if (!defer.isRejected) {
						defer.isResolved = false
						defer.reject(err)
					}
					throw err
				}
			} else {
				//if Deferred rejected and there is no errorback, throw Error
				//if (isRejected) throw result[0]
			}
		}

		Deferred.prototype.resolve = function (/*args*/) {
			//prevent second resolve
			if (this.isResolved || this.isRejected) {
				return this
			}
			var handler;
			this.result = arguments //save value
			this.isResolved = true
			while (handler = this.Callbacks.shift()) {
				this.call(handler)
			}
			//clear
			handler = null
			this.Callbacks = []
			return this
		}

		Deferred.prototype.reject = function (/*args*/) {
			//prevent second reject
			if (this.isResolved || this.isRejected) {
				return this
			}
			var handler;
			this.result = arguments //save value
			this.isResolved = false
			this.isRejected = true
			while (handler = this.Callbacks.shift()) {
				this.call(handler)
			}
			//clear
			handler = null
			this.Callbacks = []
			return this
		}

		Deferred.prototype.progress = function (/*args*/) {
			if (this.isResolved || this.isRejected)
				return this
			var handler, i = 0, ret;
			this.result = arguments //save value
			try {
				while (handler = this.Callbacks[i++]) {
					handler.progress && (ret = handler.progress.apply(this.promise, this.result))

					//progress handler can't return promise
					if (!(ret && typeof ret.then === 'function'))
						this.updateResult(ret)
				}
			} catch (err) {
				throw err
			}
			return this
		}

		Deferred.prototype.then = function (doneCallback, canceledCallback, progressCallback) {
			var handler = {
				done: isFunc(doneCallback) ? doneCallback : undefined,
				canceled: isFunc(canceledCallback) ? canceledCallback : undefined,
				progress: isFunc(progressCallback) ? progressCallback : undefined
			}
			//if new Promise appeared in chain, attach callbacks to new Promise
			if (this.newPromise) {
				this.newPromise.then(doneCallback, canceledCallback, progressCallback)
			}
			//if Deferred is resolved or rejected, execute doneCallback immediately
			else if (this.isResolved || this.isRejected)
				this.call(handler)
			else {
				this.Callbacks.push(handler)
			}
			return this
		}

		Deferred.prototype.cancel = function () {
			isFunc(this.canceler) && this.canceler()
			if (this.newPromise) {
				this.newPromise.cancel()
			}
			else {
				this.reject(new Error('Canceled'))
			}
			return this
		}

						/*Helpers*/
		//wait before resolve promise
		Deferred.prototype.wait = function (ms) {
			var id;
			if (ms)
				id = setTimeout(this.resolve.bind(this), ms)
			else
				id = setImmediate(this.resolve.bind(this))
			return this.then(
				function done() {
					clearTimeout(id)
					clearImmediate(id)
				},
				function canceled() {
					clearTimeout(id)
					clearImmediate(id)
				}
			)
		}
		//wait before reject and cancel promise
		Deferred.prototype.timeout = function (ms) {
			var id, defer = this;
			if (ms) {
				id = setTimeout(function () {
					defer.reject(new Error('Timedout'))
					//and do cancelatin
					defer.cancel()
				}, ms)
			}
			else {
				setImmediate(function () {
					defer.reject(new Error('Timedout'))
					//and do cancelatin
					defer.cancel()
				})
			}
			return this.then(
				function done() {
					clearTimeout(id)
					clearImmediate(id)
				},
				function canceled() {
					clearTimeout(id)
					clearImmediate(id)
				}
			)
		}
		//call progress with interval before promise is resolved or rejected
		Deferred.prototype.interval = function (ms) {
			var id;
			if (ms)
				id = setInterval(this.progress.bind(this), ms)
			else
				setImmediate(this.progress.bind(this))
			return this.then(
				function done() {
					clearInterval(id)
					clearImmediate(id)
				},
				function canceled() {
					clearInterval(id)
					clearImmediate(id)
				}
			)
		}
		//create delay between callbacks and errorbacks, has no effect to progressback
		Deferred.prototype.delay = function (ms) {
			if (ms) {
				var delayPromise = new Deferred(), defer = this;
				this.then(
					function done() {
						return delayPromise.wait(ms).then(function () { return defer.result[0] })
					},
					function canceled() {
						return delayPromise.timeout(ms).then(null, function () { return defer.result[0] })
					}
				)
			}
			return this;
		}
		Deferred.prototype.and = function (anotherPromise) {
			return this.then(
				function done(val) {
					return anotherPromise.then(
						function () { return val }, //success
						function (err) { return err }) //switch to error state with this error
				}
			)
		}


		//??????????????????????????????
		//current promise can't be resolved while joined promises are not resolved
		Deferred.prototype.join = function (/*promises*/) {
			var pushedPromise = arguments;

			this.Callbacks.unshift({
				done: function (val) {
					return every(pushedPromise).then(
						function () { return val }, //save old context
						function () { return new Promise() } //block
					)
				}
			})

			return this;
		}

		// Polymorph Promise constructor.
		// Promise constructor has to be used with `new` operator, 
		// else returns istant resolved promise object
		Promise = function (initFunc, cancelFunc) {
			var defer = new Deferred(cancelFunc);
			//Deferred will serve this Promise
			defer.promise = (this instanceof Promise) ? this : {}

			defer.promise.then = function (d, e, p) { defer.then(d, e, p); return this }
			defer.promise.cancel = function () { defer.cancel(); return this }
			defer.promise.wait = function (ms) { defer.wait(ms); return this }
			defer.promise.timeout = function (ms) {	defer.timeout(ms); return this }
			defer.promise.interval = function (ms) { defer.interval(ms); return this }
			defer.promise.delay = function (ms) { defer.delay(ms); return this }
			defer.promise.and = function (p) { defer.and(p); return this }

							/*Instant*/
			if (!(this instanceof Promise)) {
				if (typeof initFunc === 'object' && !!initFunc.then) {
					//redefine promise if another promise was passed as first argument
					defer.promise = initFunc
				}
				else {
					//make promise resolved with passed value
					defer.resolve(initFunc)
				}
			}
							/*Constructor*/
			else {
				if (!isFunc(initFunc)) {
					// if `initFunc` is not a function, create passive promise with preseted result
					defer.then(function () { return initFunc })
				}
				else {
					// create promise
					initFunc(defer.resolve.bind(defer), defer.reject.bind(defer), defer.progress.bind(defer))
				}
			}

			return defer.promise;
		}


		//`every` method, gathers many promises and becames resolved, when they all resolved
		every = function () {
			var promArr = [],
				len,
				done = 0,
				results = [];

			Array.prototype.forEach.call(arguments, function (itm) {
				if (itm instanceof Array || (typeof itm === 'object' && 0 in itm)) //like Array
					promArr = promArr.concat(Array.prototype.slice.call(itm))
				else
					promArr.push(itm)
			})
			
			len = promArr.length

			return new Core.Promise(function (resolve, reject, progress) {
				promArr.forEach(function (p, i) {
					//check if it is promise object, if not create it
					p = (typeof p === 'object' && !!p.then) ? p : (isFunc(p)) ? Promise(p()) : Promise(p)

					setImmediate(function(){
						p.then(
							function (result) {
								progress(result)
								done += 1;
								results[i] = result
								if (done == len) {
									resolve(results)
									//clean
									//done = results = len = undefined
								}
							},
							function (err) {
								reject(err)
								//clean
								//done = results = len = undefined
							}
						)
					})
				})
			}, function canceler() {
				//cancel all Promises in array
				promArr && setImmediate(function () {
					promArr.forEach(function (p) {
						p.cancel()
					})
				})
			})
		}

		//`any` method, gathers many promises and becames resolved, when they all fullfilled with any result.
		any = function () {
			var promArr = [],
				len,
				done = 0,
				results = [];

			Array.prototype.forEach.call(arguments, function (itm) {
				if (itm instanceof Array || (typeof itm === 'object' && 0 in itm)) //like Array
					promArr = promArr.concat(Array.prototype.slice.call(itm))
				else
					promArr.push(itm)
			})
			
			len = promArr.length

			//if no arguments, resolve promise
			if (!len)
				return Core.Promise([]);

			return new Core.Promise(function (resolve, reject, progress) {
				promArr.forEach(function (p, i) {
					//check if it is promise object, if not create it
					p = (typeof p === 'object' && !!p.then) ? p : (isFunc(p)) ? Promise(p()) : Promise(p)

					setImmediate(function () {
						p.then(
							function (result) {
								progress(result)
								done += 1
								results[i] = result
								if (done == len) {
									resolve(results)
								}
							},
							function (err) {
								progress(err)
								done += 1
								results[i] = err
								if (done == len) {
									resolve(results)
								}
							}
						)
					})
				})
			}, function canceler() {
				//cancel all Promises in array
				promArr && setImmediate(function(){
					promArr.forEach(function (p) {
						p.cancel()
					})
				})
			})
		}

		//`some` method, gathers many promises and becames resolved state when they all fullfilled with any result. But if all promises are rejected `one` also became rejected.
		some = function () {
			var promArr = [],
				len,
				error = 0,
				results = [];

			Array.prototype.forEach.call(arguments, function (itm) {
				if (itm instanceof Array || (typeof itm === 'object' && 0 in itm)) //like Array
					promArr = promArr.concat(Array.prototype.slice.call(itm))
				else
					promArr.push(itm)
			})

			len = promArr.length

			return new Core.Promise(function (resolve, reject, progress) {
				promArr.forEach(function (p, i) {
					//check if it is promise object, if not create it
					p = (typeof p === 'object' && !!p.then) ? p : (isFunc(p)) ? Promise(p()) : Promise(p)

					setImmediate(function () {
						p.then(
							function (result) {
								resolve(result)
							},
							function (err) {
								error += 1
								results[i] = err
								if (error == len) {
									//if all promise collection was rejected
									reject(results)
								}
							}
						)
					})
				})
			}, function canceler() {
				//cancel all Promises in array
				promArr && setImmediate(function () {
					promArr.forEach(function (p) {
						p.cancel()
					})
				})
			})
		}

		//expose `Promise` constructor and helpers to global scope
		global.Promise = Promise
		global.every = every
		global.any = any
		global.some = some
	}(Core));//Core as global scope





	// Promise of document 'ready'
	Core.DOMReady = new Core.Promise(function (onready, onabort) {
		var isReady;
		function complete() {
			if (isReady) return;
			//IEContentLoaded
			if (
				window.event
				&& window.event.type == 'readystatechange'
				&& document.readyState
				&& document.readyState !== 'complete'
			) return;

			isReady = true
			// remove handlers to clean memory
			// W3C
			if (window.addEventListener) {
				document.removeEventListener('DOMContentLoaded', complete, false)
				window.removeEventListener('load', complete, false)
			}
			// IE
			else if (window.attachEvent) {
				document.detachEvent('onreadystatechange', complete)
				window.detachEvent('onload', complete)
			}
			onready(document) //callback
		}

		// W3C
		if (window.addEventListener) {
			document.addEventListener('DOMContentLoaded', complete, false)
			// fallback. this is always called
			window.addEventListener('load', complete, false)
		}
		// IE
		else if (window.attachEvent) {
			// for iframes
			document.attachEvent('onreadystatechange', complete) //readyState checked in `complete` function
			// avoid frames with different domains issue
			var frameElement = 1;
			try { frameElement = window.frameElement } catch (e) { }
			if (!frameElement && document.head.doScroll) {
				(function () {
					try {
						document.head.doScroll('left')
						complete()
					} catch (e) {
						setTimeout(arguments.callee, 1)
						return;
					}
				}())
			}
			// fallback
			window.attachEvent('onload', complete)
		}
	})

	// Promise of window 'load'
	Core.DOMLoaded = new Core.Promise(function (loaded, aborted, progressed) {
		function complete(e) {
			// remove handlers to clean memory
			// W3C
			if (window.addEventListener) {
				window.removeEventListener('load', complete, false)
				window.removeEventListener('abort', complete, false)
			}
			// IE
			else if (window.attachEvent) {
				window.detachEvent('onload', complete)
				window.detachEvent('onabort', complete)
			}
			e || (e = window.event)
			switch (e.type) {
				case 'load': loaded(window); break //callback
				case 'abort': aborted(new Error('Aborted')); break //callback
			}
		}

		// W3C
		if (window.addEventListener) {
			window.addEventListener('load', complete, false)
			window.addEventListener('abort', complete, false)
		}
		// IE
		else if (window.attachEvent) {
			window.attachEvent('onload', complete)
			window.attachEvent('onabort', complete)
		}
	}, function canceler() {
		//stop page loading
		if (!!window.stop) window.stop()
		else if (!!document.execCommand) document.execCommand('Stop')
	})

	//Promise of loaded included UI modules
	Core.UIReady = new Core.Promise(function (loaded, error, progressed) {
		Core.DOMReady.then(
			function () {
				return Core.any(Includes).then(loaded, error, progressed)
			}, error, progressed
		)
	})

	//Because of dinamic loader DOMReady and DOMLoaded need to be deferred while necessary resources will be ready
	//DOMReady fulfills only when all sync or deferred resources loaded
	Core.DOMReady.then(function () {
		var Proms = [], resource, i;
		for (i in Resources.urls) {
			resource = Resources.urls[i]
			if (!resource.async)
				Proms.push(Resources.urls[i].promise)
		}
		return Core.any(Proms);
	})
	//DOMLoaded fulfills only when all (inclusive async) resources loaded
	Core.DOMLoaded.and(Core.DOMReady).then(
		function () {
			var Proms = [],	i;
			for (i in Resources.urls)
				Proms.push(Resources.urls[i].promise)
			return Core.any(Proms);
		},
		function () {
			var Proms = [], i;
			for (i in Resources.urls)
				Resources.urls[i].promise.cancel()
		}
	)





	

												/*Core public interface */

	//Loader 1.1
	Core.load = function (src, options) { //returns Promise
		options || (options = {})// {defer: {Boolean}, async: {Boolean}} (reload: {Boolean} - not emplemented yet)

		//`options` may also be String of attributes/parameters, separated by space or comma: 'defer reload' or 'async, reload'
		if (typeof options === 'string') {
			options = {
				defer: /(^|\s*,\s*|\s+)defer($|\s*,\s*|\s+)/.test(options),
				async: /(^|\s*,\s*|\s+)async($|\s*,\s*|\s+)/.test(options),
				reload: /(^|\s*,\s*|\s+)reload($|\s*,\s*|\s+)/.test(options)
			}
		}
		
		var n,
			elem,
			LoaderPromise,
			isLoaded = false,
			isCanceled = false,
			textContent = '',
			timerId;

		if (!src) return Core.Promise()

		if (src instanceof Array) {
			return Core.every(src.map(function (url) {
				return Core.load(url, options)
			}))
		}

		//prevent double resource loading
		if (src in Resources.urls)
			return Resources.urls[src].promise

		src = Core.template(src)  //process url variables
		n = src.split('?')[0].lastIndexOf('.');
		if (n == -1) return Core.Promise()

		//define type of resource
		options.type || (options.type = src.split('?')[0].substr(n + 1))
		switch (options.type) {
			//JavaScript files
			case 'json':
			case 'js':
				LoaderPromise = new Core.Promise(function (loaded, failed, progress) {
					//Reference:
					//	https://spreadsheets.google.com/lv?key=tDdcrv9wNQRCNCRCflWxhYQ
					//	http://www.phpied.com/preload-cssjavascript-without-execution/

					//BUGS:
					// - 'onerror' callbacks not always preserve execution order
					// - in Safari triggers 'onload' instead 'onerror' for external resources
					// - cancelation of loading (as Promise), do not cancels script loading, because of browsers behavior. File request still will be alive, but Promise will be rejected with canceled state. It may cause unnecessary delay in deferred sequence.
					// - in IE 6-9 alert during loading may cause 'onerror'

					//old webkit (v534.* and lower) has no execution order for dinamicly created scripts
					var brokenOrderBrowser = (function () {
						var match;
						if (!navigator.userAgent) return false;
						match = /(webkit)[\/]([\w.]+)/i.exec(navigator.userAgent)
						//check version of webkit
						if (match && match[2]) return (parseInt(match[2], 10) <= 534);
						return false;
					}())

					//Async
					//fallback for deferred loading
					if (brokenOrderBrowser && options.defer) {
						// First script is prefetched, after that it is inserted to DOM in correct order one by one to be executed.
						var len = Resources.sequence.js.length;

						elem = document.createElement('script')
						elem.setAttribute('type', 'text/javascript')
						elem.onload = function () {
							if (isLoaded) return
							//else
							this.onload = this.onerror = null
							isLoaded = true
							loaded(elem) //callback
						}
						elem.onerror = function (e) {
							this.onload = this.onerror = null
							isCanceled = true
							this.parentNode.removeChild(this)
							failed(typeof e === 'string' ? new Error(e) : new Error('Error 404: Script \'' + src + '\' not found')) //errorback
						}
						elem.defer = true
						elem.async = false

						//Add to resource collection
						Resources.add(src, options, function () { }) //empty function need to be here
						//setup SRC, considering cache
						elem.src = Core.config.cache ? src : Core.URL.randomize(src)

						//start prefetch in parallel way
						var script = document.createElement('script')
						script.type = 'text/prefetch'
						script.onload = function () {
							if (len) {
								Resources.urls[Resources.sequence.js[len - 1]].promise.then(function () {
									//insert to DOM, after previous resorce loaded
									document.head.appendChild(elem)
								}, function () {
									//insert to DOM, after previous resorce loaded
									document.head.appendChild(elem)
								})
							}
							else {
								//insert to DOM
								document.head.appendChild(elem)
							}
						}
						script.src = elem.src
						document.head.appendChild(script)
					}

					//Async
					else if (options.defer || options.async) {
						//options.defer - Parallel loading. Scripts will be ready in order, that they are loaded, but executed in right order.
						//options.async - Cancels `defer`. Parallel loading. Scripts will be executed in order, that they are loaded.
						elem = document.createElement('script')
						elem.setAttribute('type', 'text/javascript')

						//for old IE < 10
						if (!-[1, ] || (navigator.userAgent && /msie\s+9/i.test(navigator.userAgent))) {
							if (options.async) {
								//Add to resource collection
								Resources.add(src, options)
							}
							else {
								//Add to resource collection and attach handler to be executed in correct order
								Resources.add(src, options, function () {
									//insert to DOM
									document.body ? document.body.appendChild(elem) : document.head.appendChild(elem)
									//because IE can't detect 404
									if (elem.readyState == 'loading')
										elem.onerror() //call errorback
									else {
										isLoaded = true
										loaded(elem) //callback
									}
								})
							}

							elem.onreadystatechange = function () {
								if (isLoaded) return
								if (this.readyState && !/complete|loaded/.test(this.readyState)) {
									progress(this.readyState) //progressback
									return
								}
								//else
								if (options.async) {
									//insert to DOM
									document.body ? document.body.appendChild(elem) : document.head.appendChild(elem)
									//because IE can't detect 404
									if (elem.readyState == 'loading')
										elem.onerror() //call errorback
									else {
										isLoaded = true
										this.onreadystatechange = this.onerror = null
										loaded(elem) //callback
									}
								} else {
									Resources.ready(src)
								}
							}
						}
						//for sane browsers
						else {
							//Add to resource collection
							Resources.add(src, options)
							elem.onload = function () {
								isLoaded = true
								this.onload = this.onerror = null
								loaded(elem) //callback
							}
							//insert to DOM
							document.body ? document.body.appendChild(elem) : document.head.appendChild(elem)
						}

						elem.onerror = function (e) {
							isCanceled = true
							this.onload = this.onreadystatechange = this.onerror = null
							this.parentNode.removeChild(this)
							//to not break sequence
							if (!options.async)
								Resources.ready(src, false) //not ready - 404
							failed(typeof e === 'string' ? new Error(e) : new Error('Error 404: Script \'' + src + '\' not found')) //errorback
						}

						//for Opera, that do not support 'defer' and 'async', imitate asynchronous execution, to preserve UI rendering blocking
						if (window.opera && Object.prototype.toString.call(window.opera) == "[object Opera]" && !('async' in elem)) {
							timerId = setTimeout(function () {
								//setup SRC, considering cache
								elem.src = Core.config.cache ? src : Core.URL.randomize(src)
							}, 10)
						}
							//not old Opera
						else {
							if (options.async) {
								elem.defer = true //for fallback
								elem.async = true
							}
							else {
								elem.defer = true
								elem.async = false
							}
							//setup SRC, considering cache
							elem.src = Core.config.cache ? src : Core.URL.randomize(src)
						}
					}

					//Sync
					else {
						//Scripts executes emediatly as they are loaded. Rendering stops until script is not loaded. Browser rendering flow is blocked. Code from script may be used after Core.load() declaretion.

						//Add to resource collection
						Resources.add(src, options)
						textContent = Core.require(src, function (err) {
							isCanceled = true
							failed(new Error('Error 404: Script \'' + src + '\' not found'))
						})
						if (isCanceled) return
						//else
						isLoaded = true
						elem = document.createElement('script')
						elem.setAttribute('data-src', src)
						//catch error in IE
						try {
							elem.innerHTML = textContent// + '\n//@ sourceURL="'+src+'"'
						} catch (err) {
							elem.text = textContent// + '\n//@ sourceURL="' + src + '"'
						}
						//insert to DOM
						document.body ? document.body.appendChild(elem) : document.head.appendChild(elem)
						loaded(elem) //callback
					}

				},
				//on cancel loading
				function canceler() {
					// if Promise fulfilled
					if (isLoaded || isCanceled) return
					isCanceled = true
					elem.onload = elem.onreadystatechange = elem.onerror = null
					//elem.src && (elem.src = '#')
					//stop any delayed execution
					clearTimeout(timerId)
					//remove element from DOM
					elem.parentNode && elem.parentNode.removeChild(elem)
					//to not break sequence
					if (options.defer && !options.async)
						Resources.ready(src, false) //not ready - 404
				})
				break;

				//CSS files
			case 'css':
				LoaderPromise = new Core.Promise(function (loaded, failed, progress) {
					//Reference:
					//	http://www.backalleycoder.com/2011/03/20/link-tag-css-stylesheet-load-event/
					//	http://www.phpied.com/when-is-a-stylesheet-really-loaded/

					// BUGS: 
					// - in Firefox < 8: 'onerror' not accures because of fallback tricks. 'load' event accures instead.
					// - in IE and Safari: if css-file is empty or has no styles, browser triggers 'onerror'.
					
					//Async
					if (options.defer || options.async) {
						if (options.async) {
							//Add to resource collection
							Resources.add(src, options)
						}
						else {
							//Add to resource collection and attach handler to be executed in correct order
							Resources.add(src, options, function () {
								//change place in DOM, to change cascading rules
								document.head.appendChild(elem)
								isLoaded = true
								loaded(elem) //callback
							})
						}

						elem = document.createElement('link')
						elem.type = 'text/css'
						elem.rel = 'stylesheet'

						//check support for onload event. Next variables are used for workarounds.
						//some browsers don't support 'onload' & 'onerror'
						var isOnloadNotSupported = (elem.onload !== null),
							//Browsers that do nothing. It is Safari
							isBrokenBrowser = (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) || (/android/.test(navigator.userAgent.toLowerCase() || navigator.vendor.toLowerCase())),
							//Opera just do nothing when 404
							isOnerrorNotSupported = (window.opera && Object.prototype.toString.call(window.opera) == "[object Opera]"),
							//IE trigeres 'onload' even when 404
							isIE = ('readyState' in elem);
						
						elem.onload = function () {
							//Fix absent 'onerror'. Check for CSS rules in syle sheet.
							if (isIE) {
								try {
									if (
										elem.sheet && elem.sheet.cssRules && elem.sheet.cssRules.length
										|| elem.styleSheet && elem.styleSheet.rules && elem.styleSheet.rules.length
									) {
										//success, then continue
									}
									else {
										elem.onerror() //call errorback
										return; //exit function
									}
								} catch (err) {
									elem.onerror() //call errorback
									return; //exit function
								}
							}

							//clean
							this.onload = this.onreadystatechange = this.onerror = null
							if (options.async) {
								//change place in DOM, to change cascading rules
								document.head.appendChild(this)
								isLoaded = true
								loaded(elem) //callback
							}
							else {
								//remove from DOM to prevent effect on page untill it will be reinsered to another place to change queue
								document.head.removeChild(this)
								Resources.ready(src)
							}
						}
						//IE exclusive
						elem.onreadystatechange = function () {
							if (!/complete|loaded/.test(this.readyState)) {
								progress(this.readyState) //progressback
							}
						}
						elem.onerror = function (e) {
							this.onload = this.onreadystatechange = this.onerror = null
							isCanceled = true
							this.parentNode.removeChild(this)
							//to not break sequence
							if (!options.async)
								Resources.ready(src, false) //not ready - 404
							failed((typeof e === 'string') ? new Error(e) : new Error('Error 404: CSS \'' + src + '\' not found')) //errorback
						}

						//setup SRC, considering cache
						elem.href = Core.config.cache ? src : Core.URL.randomize(src)
						//execution depends on async or not async
						;(function (code) {
							(options.async) ? (timerId = setTimeout(code, 10)) : code()
						}(
							function () {
								//insert to DOM
								document.head.appendChild(elem)

								//fix absent 'onerror'
								if (isOnerrorNotSupported) {
									Core.URL.isAvailableAsync(elem.href).then(function (isAvail) {
										if (!isAvail) elem.onerror && elem.onerror() //404, call errorback
									})
								}
								//fix absent 'onload'
								if (isOnloadNotSupported) {
									//detect 404
									//Core.URL.isAvailableAsync(elem.href).then(function (isAvail) {
									//	if (!isAvail) {
									//		elem.onerror && elem.onerror()
									//		return
									//	}
									//Style import trick
									var style, pollingId;
									style = document.createElement('style');
									style.type = 'text/css'
									style.textContent = '@import "' + elem.href + '"'
									pollingId = setInterval(function () {
										try {
											style.sheet.cssRules; // accessable when loaded
											elem.onload && elem.onload()
											clearInterval(pollingId)
											//remove from DOM
											style.parentNode.removeChild(style)
											//clean
											style = pollingId = null
										} catch (e) { }
									}, 50)
									//insert to DOM
									document.head.appendChild(style)
									//})
								}
								//fix absent 'onload' and 'onerror'
								else if (isBrokenBrowser) {
									var pollingId;
									pollingId = setInterval(function () {
										try {
											//elem.sheet.cssRules; // accessable when loaded
											if (/*elem.sheet.cssRules &&*/ elem.sheet.cssRules.length)
												elem.onload && elem.onload() //call callback
											else
												elem.onerror && elem.onerror() //call errorback
											clearInterval(pollingId)
											pollingId = null
										} catch (err) {
											//for Safari 5. It has cross-origin restriction.
											//next is stolen from 'yepnope'
											//console.log(err)
											if ((err.code == 1e3) || (err.message == 'security' || err.message == 'denied')) {
												// if it's a security error, that means it loaded a cross domain file, 
												// so we can't do anything beside to call 'onload'
												elem.onload && elem.onload()
												clearInterval(pollingId)
												pollingId = null
											}
										}
									}, 50)

								}
							}
						))
					}

					//Sync
					else {
						//Add to resource collection
						Resources.add(src, options)
						textContent = Core.require(src, function (err) {
							isCanceled = true
							failed(new Error('Error 404: CSS \'' + src + '\' not found')) //errorback
						})
						if (isCanceled) return
						//else
						elem = document.createElement('style')
						elem.setAttribute('data-src', src)
						//insert to DOM before appending css text
						document.head.appendChild(elem)
						try {// Not IE
							elem.appendChild(document.createTextNode(textContent))
						} catch (err) {// IE
							elem.styleSheet.cssText = textContent
						}
						isLoaded = true
						loaded(elem) //callback
					}
				},
				//on cancel loading
				function canceler() {
					// if Promise fulfilled
					if (isLoaded || isCanceled) return
					isCanceled = true
					elem.onload = elem.onreadystatechange = elem.onerror = null
					//elem.href && (elem.href = '#')
					//stop any delayed execution
					clearTimeout(timerId)
					//remove element from DOM
					elem.parentNode && document.head.removeChild(elem)
					//to not break sequence
					if (options.defer && !options.async)
						Resources.ready(src, false) //not ready - 404
				})
				break;

				//Image files
			case 'jpg':
			case 'jpeg':
			case 'gif':
			case 'png':
			case 'svg':
				LoaderPromise = new Core.Promise(function (loaded, failed, progress) {
					//BUGS: 
					//	- if cache is anabled, in FF image is loaded successfully even if loading was canceled, because it was already in cache
					//	- onabort works only in IE and only if image is inserted in DOM. If image is not in DOM in IE, it can't be aborted.
					//	- in FF cancelation don't stop downloading of image

					// Image loading can't be synchronous, by default it is asynchronous.

					// callbacks may have call order
					if (options.defer && !options.async) {
						// Add to resource collection and attach handler to be executed in correct order.
						// Images load as soon as they are ready, but callbacks execute in right sequence.
						// Images has their own sequence, that not relative to 'js' or 'css' etc.
						Resources.add(src, options, function () {
							isLoaded = true
							loaded(elem) //callback
						})
					} else {
						// Add to resource collection
						Resources.add(src, options)
					}

					elem = new Image()
					elem.onload = elem.onreadystatechange = function () {
						if (this.readyState && !/complete|loaded/.test(this.readyState)) {
							progress(this.readyState) //progressback
							return
						}
						//else
						this.onload = this.onreadystatechange = this.onerror = this.onabort = null
						// if callbacks have call order
						if (options.defer && !options.async) {
							Resources.ready(src)
						} else {
							isLoaded = true
							loaded(this) //callback
						}
					}
					elem.onerror = function (e) {
						this.onload = this.onreadystatechange = this.onerror = this.onabort = null
						isCanceled = true
						failed((typeof e === 'string') ? e : new Error('Error 404: Image \'' + src + '\' not found')) //errorback
					}
					//window.onabort
					elem.onabort = function () {
						this.onload = this.onreadystatechange = this.onerror = this.onabort = null
						isCanceled = true
						failed(new Error('Aborted')) //errorback
					}
					//setup SRC, considering cache
					elem.src = (Core.config.cache && Core.config.cacheImages) ? src : Core.URL.randomize(src)
					//if image cached sometimes onload doesn't handle
					if (elem.complete && elem.onload) elem.onload()
				},
				//on cancel loading
				function canceler() {
					if (isLoaded || isCanceled) return
					isCanceled = true
					elem.onload = elem.onreadystatechange = elem.onabort = elem.onerror = null
					//stop any delayed execution
					clearTimeout(timerId)
					elem.src = '#'
					//to not break sequence
					if (options.defer && !options.async)
						Resources.ready(src, false) //not ready - 404
				})
				break;

			//text files
			case 'html':
			case 'htm':
			case 'txt':
			case 'tpl':
			//and default undefined type of resource
			default:
				LoaderPromise = new Core.Promise(function (loaded, failed, progress) {
					//Async
					if (options.defer || options.async) {
						//Nothing will be inserted into document. Returned value is a String.

						if (options.async) {
							// Add to resource collection
							Resources.add(src, options)
						}
						else {
							// Add to resource collection and attach handler to be executed in correct order.
							// Documents has theire own sequence, that not relative to 'js' or 'css' etc.
							Resources.add(src, options, function () {
								isLoaded = true
								loaded(textContent) //callback
							})
						}
						elem = Core.requireAsync(src).then(
							function (result) {
								textContent = Core.template(result)
								if (options.async) {
									isLoaded = true
									loaded(textContent) //callback
								}
								else
									Resources.ready(src)
							},
							function (err) {
								isCanceled = true
								failed(err)
							},
							function (val) { progress(val) }
						)
					}
					//Sync
					else {
						//Requested text emediatly will be inserted to document. Returned value is a String.

						//Add to resource collection
						Resources.add(src, options)
						textContent = Core.template(Core.require(src, function (err) {
							isCanceled = true
							failed(new Error('Error 404: Document \'' + src + '\' not found'))
						}))
						if (isCanceled) return
						//else
						//insert to DOM if resorce defined as a text file, otherwise just return the text content
						if (/^(html|htm|txt|tpl)$/.test(options.type))
							document.writeln(Core.template(textContent)) //and process variables in text
						isLoaded = true
						loaded(textContent) //callback
					}
				},
				//on cancel loading
				function canceler() {
					if (isLoaded || isCanceled) return
					isCanceled = true
					//stop any delayed execution
					clearTimeout(timerId)
					//cancel Promise `requireAsync`
					elem && elem.cancel()
					//to not break sequence
					if (options.defer && !options.async)
						Resources.ready(src, false) //not ready - 404
				})
		}

		//save promise in sorces collection to be used on every double request
		Resources.urls[src].promise = LoaderPromise

		//retur Promise object
		return LoaderPromise;
	}

	Core.include = function (path) { //returns Promise
		//include files if they are available: index.html, style.css, ie.css, register.js, dictionary.js
		if (!path) return
		path = path.replace(/\/+$/, '')//remove last dash
		var Proms = [];
		//css
		Proms.push(Core.load(path + '/style.css', { defer: true }))
		if (!-[1, ])  //always for IE <=8
			Proms.push(Core.load(path + '/ie.css', { defer: true }))
		//dictionary
		//Core.configure(path + '/dictionary.js')
		//html
		//setup unknown type to prevent insertion into document by default
		Proms.push(Core.load(path + '/index.html', { type: 'other' }).then(function (text) {
			text = Core.template(text, { url: path }/*module info*/)
			document.writeln(text)
			return text;
		}))
		//js
		Proms.push(Core.load(path + '/register.js', { defer: true }))
		//add to Includes collection
		Includes = Includes.concat(Proms)
		//return Promise collection
		return Core.any(Proms);
	}

	Core.register = function (moduleName, moduleBody) { //returns Core object
		//`moduleBody` may be object or function that returns object.
		if (typeof moduleBody === 'function') {
			moduleBody = moduleBody(new Sandbox(moduleName)) //returns object {init: ..., destroy: ..., listen: ...} or undefined
		}
		if (moduleBody) {
			//if module has object, register it
			Modules[moduleName] = {
				body: moduleBody,
				styles: null, //switchable styles - string ore style/link object
				name: moduleName,
				initiated: false,
				promise: Core.Promise() //empty resolved Promise
			}
			Core.invoke(
				'debug-module-register',
				{ module: Modules[moduleName] }
			)
		}
		//else cancel registration

		return this; 
	}

	Core.start = function (/*args*/) { //returns Promise object
		var module,
			moduleName,
			i = 0,
			Proms = []; //Promises collection

		while (moduleName = arguments[i++]) {
			module = Modules[moduleName]
			if (!module) {
				continue;
			}
			else if (module.initiated) {
				Proms.push(module.promise)
				continue;
			}
			else if (typeof module.body.init === 'function') {
				try {
					Proms.push(module.promise = module.body.init()) // start module life and save last Promise
					module.initiated = true //switch initiated status
					Core.invoke(
						'debug-module-start',
						{ module: module }
					)
				} catch (err) {
					Core.Util.fixError(err) //implement err.line
					Core.error('[Module: ' + module.name + ':init:' + err.line + ']', err)
				}

				//if module has switchable styles
				if (module.initiated && module.body.css) {
					module.styles = document.createElement('style')
					module.styles.setAttribute('data-module', moduleName)
					document.head.appendChild(module.styles)
					try {// Not IE
						module.styles.appendChild(document.createTextNode(module.body.css))
					} catch (err) {// IE
						module.styles.styleSheet.cssText = module.body.css
					}
				}
			}
		}
		return Core.any(Proms).then(function (results) { return (results.length > 1) ? results : Core.Promise(results[0]) });
	}

	Core.stop = function (/*args*/) { //returns Promise object
		var module,
			moduleName,
			i = 0,
			Proms = []; //Promises collection

		while (moduleName = arguments[i++]) {
			module = Modules[moduleName]
			if (!module) {
				continue;
			}
			else if (!module.initiated) {
				Proms.push(module.promise)
				continue;
			}
			else if (typeof module.body.destroy === 'function') {
				try {
					Proms.push(module.promise = module.body.destroy()) // end module life and save last Promise
					module.initiated = false //switch initiated status
					module.body.runtime_listen && (module.body.runtime_listen = undefined) //remove runtime listeners
					Core.invoke('debug-module-stop', { module: module })
				} catch (err) {
					Core.Util.fixError(err) //implement err.line
					Core.error('[Module: ' + module.name + ':destroy:' + err.line + ']', err)
				}
			}
			//if no destroy `funtion`
			else {
				Proms.push(module.promise = Core.Promise()) // end module life and save last Promise
				module.initiated = false //switch initiated status
				module.body.runtime_listen && (module.body.runtime_listen = undefined) //remove runtime listeners
				Core.invoke('debug-module-stop', { module: module })
			}

			//if module has switchable styles
			if (!module.initiated && module.styles) {
				document.head.removeChild(module.styles)
				module.styles = null
			}
		}
		return Core.any(Proms).then(function (results) { return (results.length > 1) ? results : Core.Promise(results[0]) });
	}

	Core.startAll = function () { //returns Promise object
		var moduleName, promises = [];
		for (moduleName in Modules) { promises.push(Core.start(moduleName)) }
		return Core.any(promises);
	}

	Core.stopAll = function () { //returns Promise object
		var moduleName, promises = [];
		for (moduleName in Modules) { promises.push(Core.stop(moduleName)) }
		return Core.any(promises);
	}

	Core.extend = function (extendFunc) {
		//`extendFunc` may be object or function that can return object
		var obj, i, j;
		
		if (typeof extendFunc !== 'function' && (typeof extendFunc !== 'object' || (extendFunc instanceof Array)) ) {
			Core.error('Core.extend() argument must be a function or object. Example: Core.extend(function(Core){...}), Core.extend({...})')
			return
		}

		obj = (typeof extendFunc === 'function') ? extendFunc(Core) : extendFunc

		if (!obj) return
		
		for (i in obj) {
			if (i in Core) {
				if (/^register|start|stop|startAll|stopAll|extend|invoke|bind|load|configure|template$/.test(i)) {
					Core.error('"' + i + '" feature is not extendable')
					continue
				}
				for (j in obj[i]) {
					if (i == 'actions' || i == 'action'/*for backward compability*/) {
						if (typeof obj[i][j] === 'function') {
							Core.actions[j] = (j in Core.actions) ? Core.actions[j].concat([obj[i][j]]) : [obj[i][j]]
						}
						else if (obj[i][j].length)//type array
							Core.actions[j] = (j in Core.actions) ? Core.actions[j].concat(obj[i][j]) : obj[i][j]
					} else
						Core[i][j] = obj[i][j]
				}
			} else
				Core[i] = obj[i]
		}

		//clean
		obj = i = j = extendFunc = undefined
	}











													/*Core private interface */

	// Error handler
	Core.error = function (/*arguments*/) {
		var i = 0, msg, err = '';

		//join all messages and error objects from arguments to one string
		while (msg = arguments[i++])
			err += ((msg.message) ? (msg.name +': '+ msg.message) : msg) + ' '

		//log error
		Core.invoke('debug-error', { error: err })
		console.error(err)
	}

	//App configuration
	Core.config = {
		// default home url
		baseUrl: window.location.protocol + '//' + window.location.host + window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/')),
			//(/^htt(p|ps)/i.test(location.protocol) && !/(127\.0\.0\.1|localhost)/i.test(location.hostname)) ?
			//(window.location.protocol + '//' + window.location.host) //server host
			//: ( window.location.protocol + '//' + window.location.host + window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/')) ), //local file system or localhost
		apiUrl: '',
		lang: 'en',
		cache: false,
		cacheImages: false,
		preloadImages: false,
		secure: false,
		debug: true
	}

	//App dictionary for templater, empty by default
	Core.Dictionary = []

	//Function to configure Core.config, Core.Dictionary
	Core.configure = function (url) {
		if (!url) return
		url = Core.template(url)
		
		if (!Core.URL.isAvailable(url)) return

		var format = url.lastIndexOf('.'), type, scriptNode;
		if (format == -1) return
		switch (url.substr(format)) {
			case '.json':
			case '.js':
				if (window.execScript)
					window.execScript('window.TemporaryCoreVariable = ' + Core.require(url))
				else {
					scriptNode = document.createElement('script')
					scriptNode.setAttribute('type', 'text/javascript')
					scriptNode.innerHTML = 'window.TemporaryCoreVariable = ' + Core.require(url)
					document.head.appendChild(scriptNode)
				}

				if (window.TemporaryCoreVariable) {
					//detect if it is dictionary
					if (/\bdictionary\b/i.test(url)) {
						type = 'dictionary'
						Core.Dictionary = TemporaryCoreVariable
					}
						//detect if it is configuration file
					else if (/\bconfig\b/i.test(url)) {
						type = 'config'
						Core.config = TemporaryCoreVariable
					}

					//debug event
					Core.invoke('debug-configuration-update', {
						type: type,
						configuration: TemporaryCoreVariable
					})

					//language event
					Core.invoke('language-update')//with default detail

					//clean global scope
					window.TemporaryCoreVariable = undefined
				}

				//clean
				format = type = scriptNode = undefined
		}
	}
	
	//Templater
	Core.template = function (html, module) {
		if (!html) return

		//base Core variables
		html = html.replace(/{baseUrl}/gi, Core.config.baseUrl)
		html = html.replace(/{lang}/g, Core.config.lang)

		/*Dictionary*/
		var i = Core.Dictionary.length,
			dictionary;
		//setup current dictionary
		while (i--) {
			if (Core.Dictionary[i].lang == Core.config.lang)
				dictionary = Core.Dictionary[i].dictionary || {}
		}
		//if dictionary not found, use first dictionary in array or don't use dictionary if it is empty
		if (!dictionary)
			dictionary = (Core.Dictionary.length) ? (Core.Dictionary[0].dictionary || {}) : {}
		//insert Dictionary variables
		for (i in dictionary) {

			/* Disabled for better performance
			//double % veriable {d(char1)(char2):{...%...%...}}
			html = html.replace(new RegExp('{d[\(](.+)[\)][\(](.+)[\)]:' + i + '}', 'g'), dictionary[i].replace('%', '$1').replace('%', '$2'))
			//one % veriable {d(char):{...%...}}
			html = html.replace(new RegExp('{d[\(](.+)[\)]:' + i + '}', 'g'), dictionary[i].replace('%', '$1'))
			*/
			//standard
			html = html.replace(new RegExp('{d:' + i + '}', 'g'), dictionary[i])
		}

		/* Disabled for better performance
		//Clean all other nontranslated phrases
		html = html.replace(/{(dictionary|d|d[\(].+[\)]):(.+)}/g, '$2')
		*/

		/*Module*/
		//base Module variables
		if (module) {
			html = html.replace(
				/{(module|m):(URL|url)}/g, 
				(/^htt(p|ps):\/\//.test(module.url)) ?
					module.url //external
					: Core.config.baseUrl + '/' + module.url //if local, return full path
			)
		}

		/*DOM*/
		html = html.replace(/{dom:GET}/g, window.location.search.substr(1))
		html = html.replace(/{dom:(URL|url)}/g, window.location.protocol + '//' + window.location.host + window.location.pathname)

		//clean
		module = i = dictionary = undefined

		return html //return new html
	}



									




	Core.URL = {} //Basic URL manipulation

	// Adds a parameter with random value, if not exist
	Core.URL.randomize = function (url) { //returns URL
		if (!/(\?|\&)rand=/.test(url)) {
			return url + (url.indexOf('?') === -1 ? '?' : '&') + 'rand=' + Math.random()
		}
		return url
	}

	// Checks if URL is in the same domain
	Core.URL.isExternal = function (url) { //returns Boolean
		url = Core.template(url) //replace variables in url
		return (
			(/htt(p|ps):\/\//i.test(url))
			&& !(new RegExp('htt(p|ps):\\/\\/' + location.hostname, 'i').test(url))
		)
	}

	// Sync checks file by url for existence/availability
	Core.URL.isAvailable = function (url) { //returns Boolean
		var xhr = new Core.XHR();
		url = Core.template(url)
		try {
			xhr.open('HEAD', Core.URL.randomize(url), false)
			xhr.send()
			return (xhr.readyState == 4) && !!(
				(xhr.status == 0 && (xhr.responseText || xhr.responseXML || xhr.response)) //local
				|| xhr.status == 200
				|| xhr.status == 301
				|| xhr.status == 302
				|| xhr.status == 303
				|| xhr.status == 307
			)
		} catch (err) {
			Core.error('[XHR]', '(' + url + ')', err)
			return false
		}
	}
	
	// Async checks file by url for existence/availability
	Core.URL.isAvailableAsync = function (url) { //returns Promise
		return new Core.Promise(function (available, error) {
		
			var xhr = new Core.XHR();
			url = Core.template(url)
			try {
				xhr.open('HEAD', Core.URL.randomize(url), true)
				xhr.onreadystatechange = function () {
					if (xhr.readyState != 4)
						return;
					//console.log(url, xhr.responseText, xhr.status)
					if (
						xhr.status == 200
						|| xhr.status == 301
						|| xhr.status == 302
						|| xhr.status == 303
						|| xhr.status == 307
						//only for local, otherwise it is mean that resource not found
						|| (xhr.status == 0 && !/^https*:\/\//.test(location.href) && xhr.responseText)
					) {
						available(true) //available
					}
					else {
						available(false) //not available
					}
					//clean
					this.onreadystatechange = null
				}
				xhr.send()
			} catch (err) {
				Core.error('[XHR]', '(' + url + ')', err)
				error(err) //error and not available
			}
		})
	}







	

	// Browser events
	Core.Event = {
		add: function (elem, type, handler) {
			type = type.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, '').split(/\s+/)

			var i = 0, event;

			function addEvent(elem, type, handler) {
				if (elem.attachEvent) {
					elem['e' + type + handler] = handler
					elem[type + handler] = function () { elem['e' + type + handler](window.event) }
					elem.attachEvent('on' + type, elem[type + handler])
				} else
					elem.addEventListener(type, handler, false)
			}

			while (event = type[i++]) {
				if (event == 'deviceready') { //for Cordova
					if (elem === document && elem.addEventListener)
						document.addEventListener('deviceready', handler, false)
					continue
				}

				//else
				addEvent(elem, event, handler)
			}
		},

		remove: function (elem, type, handler) {
			type = type.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, '').split(/\s+/)
			var i = 0, event;

			function removeEvent(elem, type, handler) {
				if (elem.detachEvent) {
					elem.detachEvent('on' + type, elem[type + handler])
					elem['e' + type + handler] = null
					elem[type + handler] = null
				} else
					elem.removeEventListener(type, handler, false)
			}

			while (event = type[i++]) {
				removeEvent(elem, event, handler)
			}
		},
		//not implemented by default
		fire: function (elem, type) { }
	}

	// Send global events
	Core.invoke = function (event, detail) {
		if (!event) return
		
		// Here are default settings for some events if there was no [detail] parameter
		if (!detail)
			switch (event) {
				case 'layout-update':
					detail = {
						width: window.innerWidth || document.getElementsByTagName('html')[0].offsetWidth,
						height: window.innerHeight || document.getElementsByTagName('html')[0].offsetHeight,
						orientation: (window.orientation == 0 || window.orientation == 180) ? 'portraid' : 'landscape',
						layout: 'default'
					}
					break

				case 'language-update':
					detail = Core.accessor.language.get() //watch function in accessors
					break
			}

		var i, n, handler;
		
		for (i in Modules) {
			//find handlers in module 'listen' collection
			if (
				Modules[i]
				&& Modules[i].initiated
				&& 'listen' in Modules[i].body
				&& event in Modules[i].body.listen
			) {
				//single function
				if (typeof Modules[i].body.listen[event] === 'function') {
					try {//catch errors without stopping app execution
						Modules[i].body.listen[event](detail)
					} catch (err) {
						Core.Util.fixError(err) //implement err.line
						Core.error('[Module: ' + Modules[i].name + ':listen.' + event + ':' + err.line + ']', err)
					}
				}
				//array of functions
				else if (Modules[i].body.listen[event].length) {
					n = 0;
					while (handler = Modules[i].body.listen[event][n++]) {
						try {//catch errors without stopping app execution
							handler(detail)
						} catch (err) {
							Core.Util.fixError(err) //implement err.line
							Core.error('[Module: ' + Modules[i].name + ':listen.' + event + '.handler(' + (n - 1) + '):' + err.line + ']', err)
						}
					}

				}
			}

			//find handlers in module 'runtime_listen' collection
			if (
				Modules[i]
				&& Modules[i].initiated
				&& Modules[i].body['runtime_listen']
				&& event in Modules[i].body.runtime_listen
			) {
				n = 0;
				while (handler = Modules[i].body.runtime_listen[event][n++]) {
					try {//catch errors without stopping app execution
						handler(detail)
					} catch (err) {
						Core.Util.fixError(err) //implement err.line
						Core.error('[Module: ' + Modules[i].name + ':runtime_listen.' + event + '.handler(' + (n - 1) + '):' + err.line + ']', err)
					}
				}
			}
		
		}
		
			
	}

	// Recived events whith multiple handlers
	Core.actions = {
		// There are default details for some evnets
		'layout-change': [
			function (detail) {
				//layout event
				Core.invoke('layout-update', detail)//with default detail if undefined
			}
		],

		'language-change': [
			function (detail) {
				if (!detail || !detail.lang) return
				Core.config.lang = detail.lang
				//language event
				Core.invoke('language-update')//with default detail
			}
		]
	}

	// Function to bind Core events, which fire global events for modules, when DOM events appear
	// (DOM Element, DOM Event(s), CORE event)
	Core.bind = function (element, browserEvents, appEvent, detail) {
		browserEvents = browserEvents.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, '').split(/\s+/)
		appEvent = appEvent.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, '').split(/\s+/)

		var e, a, i = 0, j = 0,
			handler = function (act) {
				//detail may be object or function that returns object dinamicly
				return (typeof detail === 'function') ?
					function () { Core.invoke(act, detail()) } :
					function () { Core.invoke(act, detail) }
			};

		while (e = browserEvents[i++]) {
			j = 0; while (a = appEvent[j++]) {
				Core.Event.add(element, e, handler(a))
			}
		}
		return this
	}


	// "event-to-action" bind
	if (Core.isCordova) {// If PhoneGap used, than attach special PhoneGap events
		Core.bind(document, 'deviceready', 'app-ready app-load')

		//Native device events
		Core.Event.add(document, 'deviceready', function () {
			Core.Event.add(document, 'searchbutton', function () { Core.invoke('app-search') })

			/*Core.Event.add(document, 'pause', function(){ Core.invoke('app-suspend') })
			Core.Event.add(document, 'resume', function(){ Core.invoke('app-resume') })
			Core.Event.add(document, 'menubutton', function(){ Core.invoke('app-menu') })*/

			//Core.Event.add(document, 'volumeupbutton', function(){  })
			//Core.Event.add(document, 'volumedownbutton', function(){  })

		})

	} else {
		Core.DOMReady.then(function () { Core.invoke('app-ready') })
		Core.DOMLoaded.then(function () { Core.invoke('app-load') })
	}
	//layout event
	Core.bind(window, 'resize', 'layout-update')//with default detail
	Core.DOMReady.then(function () {
		//layout event
		Core.invoke('layout-update')//with default detail
		//language event
		Core.invoke('language-update')//with default detail
	})


	//Feature detection, true or false
	Core.Features = (function () {
		// Check CSS3, from Modernizr								
		var checkCSS = (function () {
			var domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
				testElem = document.createElement('test'),
				test_style = testElem.style;

			function test_props_all(prop) {
				var uc_prop = prop.charAt(0).toUpperCase() + prop.substr(1),
					props = (prop + ' ' + domPrefixes.join(uc_prop + ' ') + uc_prop).split(' ');
				return !!test_props(props);
			}

			function test_props(props) {
				for (var i in props)
					if (test_style[props[i]] !== undefined)
						return true
			}
			// transitionProperty, backgroundsize, borderimage, boxShadow,
			// animationName, columnCount, boxReflect, overflowScrolling
			// opacity, transformProperty, perspectiveProperty
			// borderRadius

			return function (feature) {
				switch (feature) {
					case 'opacity':
						if (window.operamini) return false
						test_style.cssText = 'opacity:0.55'
						return /^0.55$/.test(test_style.opacity)
					case 'perspectiveProperty':
						if (window.Modernizr && 'csstransforms3d' in Modernizr)
							return Modernizr.csstransforms3d
						//CSSTRANSFORM3D = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix())
						//return ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix())

						// from Modernizr
						if (!!test_props(['WebkitPerspective'])) {
							var st = document.createElement('style'), ret;
							// "@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d),(modernizr){#modernizr{height:1px}}"
							//console.log('(-'+domPrefixes.join('-transform-3d), (-').toLowerCase()+')')
							st.textContent = '@media (-webkit-transform-3d){#csstransforms3d{left:9px;position:absolute;height:3px;}}'
							testElem.id = 'csstransforms3d'
							testElem.style.position = 'absolute'
							document.head.appendChild(st)
							document.documentElement.appendChild(testElem)
							ret = (testElem.offsetLeft == 9 && testElem.offsetHeight == 3)
							document.documentElement.removeChild(testElem)
							document.head.removeChild(st)
							st = null
							return ret
						}

						return !!test_props(['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'])

					case 'transformProperty':
						return !!test_props(['transformProperty', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'])
					default:
						return test_props_all(feature)
				}
			}

			return test_props_all
		}())

		return {
			// SVG support (from Modernizr)
			'element-svg': (!!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect),
			'css-transform3d': checkCSS('perspectiveProperty'),
			'css-transform': checkCSS('transformProperty'),
			'css-transition': checkCSS('transitionProperty'),
			'css-animation': checkCSS('animationName'),
			'css-box-shadow': checkCSS('boxShadow'),
			'css-background-size': checkCSS('backgroundsize'),
			'css-border-image': checkCSS('borderimage'),
			'css-columns': checkCSS('columnCount'),
			'css-border-radius': checkCSS('borderRadius'),
			'css-opacity': checkCSS('opacity'),
			//detect touch device/browser
			'touch': ('createTouch' in document) || (/android|blackberry/i.test(navigator.userAgent) && 'ontouchstart' in window),
			//detect retina display
			'retina': (function () {
				return (
					(window.devicePixelRatio && window.devicePixelRatio >= 2)
					|| 'matchMedia' in window && window.matchMedia('(-moz-device-pixel-ratio:1.0)').matches
				) ? true : false
			}()),
			// for IE9 - screen.deviceXDPI / screen.logicalXDPI
			'cordova': Core.isCordova
		}
	}())

	//XmlHttpRequest constructor for AJAX requests
	Core.XHR = function () {
		try { return new XMLHttpRequest() } catch (err) { }
		try { return new ActiveXObject("Msxml2.XMLHTTP") } catch (err) { }
		try { return new ActiveXObject("Microsoft.XMLHTTP") } catch (err) { }
		//if undefined
		this.open = this.send = function () { }
		Core.error('No Support: XMLHttpRequest')
		return this
	}


	// Data formats
	Core.Formats = {
		//Format to money (456789.00 to 456,789.00)
		money: function (c, d, t) {
			c = c || '.'
			d = d || '.'
			t = t || ','
			var m = (c = Math.abs(c) + 1 ? c : 2, d = d || ",", t = t || ".",
				/(\d+)(?:(\.\d+)|)/.exec(this + "")), x = m[1].length > 3 ? m[1].length % 3 : 0;
			return (x ? m[1].substr(0, x) + t : "") + m[1].substr(x).replace(/(\d{3})(?=\d)/g,
				"$1" + t) + (c ? d + (+m[2] || 0).toFixed(c).substr(2) : "");
		},

		//Format to price (89.00 to 89, 789.994566 to 789.99)
		price: function () {
			var p = parseFloat(this, 10)
			//if decimal use 2 chars
			if (p - parseInt(p, 10) != 0)
				p = p.toFixed(2)
			return p
		},

		//Format to time (15:55:05)
		time: function (mask) {
			mask || (mask = '')
			var seconds = this || 0,
				date = new Date(parseInt(seconds, 10) * 1000), //seconds*1000 = miliseconds
				h = date.getHours() - new Date(0).getHours(),
				m = date.getMinutes(),
				s = date.getSeconds(),
				hh = (h < 10) ? '0' + h : h,
				h12 = (h > 12) ? h - 12 : h,
				hh12 = (h > 12) ? '0' + (h - 12) : hh,
				mm = (m < 10) ? '0' + m : m,
				ss = (s < 10) ? '0' + s : s;

			// This formats your string to HH:MM:SS
			switch (mask.toLowerCase()) {
				case 'mm:ss': return mm + ':' + ss
				default: return hh + ':' + mm + ':' + ss

			}
		},

		//Format to date (03-22-2012 15:55:05)
		date: function (mask) {
			var miliseconds = this;
			mask || (mask = '')
			var date = new Date(parseInt(miliseconds, 10)),
				h = date.getHours(),
				m = date.getMinutes(),
				s = date.getSeconds(),
				D = date.getDate(),
				M = date.getMonth() + 1,
				YY = date.getYear(),
				hh = (h < 10) ? '0' + h : h,
				h12 = (h > 12) ? h - 12 : h,
				hh12 = (h > 12) ? '0' + (h - 12) : hh,
				mm = (m < 10) ? '0' + m : m,
				ss = (s < 10) ? '0' + s : s,
				DD = (D < 10) ? '0' + D : D,
				MM = (M < 10) ? '0' + M : M,
				YYYY = date.getFullYear();

			// This formats your string to HH:MM:SS
			switch (mask.toLowerCase()) {
				case 'MM-DD-YYYY hh:mm': return MM + '-' + DD + '-' + YYYY + ' ' + mm + ':' + ss
				case 'DD-MM-YYYY': return DD + '-' + MM + '-' + YYYY
				default: return MM + '-' + DD + '-' + YYYY

			}
		}
	}

	Core.Filters = {}
	Core.Sorts = {}

	// Connection status and type. Very simplified. Can be extended by 'connection.extension'
	Core.Connection = (function () {
		var connection = {
			type: 'unknown',
			status: ''//on , off
		}

		function updateConInfo(e) {
			// status
			if (!Core.Connection || Core.Connection === connection) //check if Connection has not been replaced by some extension
				connection.status = (!('onLine' in window.navigator) || window.navigator.onLine) ? 'on' : 'off'
			else { // clear
				Core.Event.remove(window, 'load', updateConInfo)
				Core.Event.remove(window, 'online', updateConInfo)
				Core.Event.remove(window, 'offline', updateConInfo)
				connection = updateConInfo = undefined
			}
		}
		// on start
		updateConInfo()
		// check for changes
		Core.Event.add(window, 'load', updateConInfo)
		Core.Event.add(window, 'online', updateConInfo)
		Core.Event.add(window, 'offline', updateConInfo)

		return connection
	}())


	//Default navigation. Can be extended by 'navigation.extension'
	Core.navigate = function (options) {
		if (!options) return

		//options can be object or url string
		if (typeof options === 'object') {
			if (!options.url) {
				return
			}
		} else if (typeof options === 'string') {
			options = { url: options }
		} else {
			Core.error('[Core.navigate] Type Error: wrong parameter')
			return
		}
		//navigate to url, variables may be used
		location.href = Core.template(options.url)
	}


	Core.Notify = {
		// options.title
		// options.icon
		// options.buttons (Array)
		// options.buttons[].label
		// options.buttons[].value
		alert: function (message, options) { // returns Promise
			return new Core.Promise(function (callback) {
				if (navigator.notification) {//Cordova
					var buttonName;

					options || (options = {})
					;(options.buttons && options.buttons.length) || (options.buttons = [
						{ label: 'OK', value: true }
					])
					buttonName = options.buttons[0].label
					navigator.notification.alert(
						message,
						function () { callback(options.buttons[0].value) },
						options.title,
						buttonName
					)
				} else {//Web
					callback(alert(message))
				}
			})
		},
		confirm: function (message, options) { // returns Promise
			return new Core.Promise(function (callback) {
				if (navigator.notification) {//Cordova
					var buttonNames;

					options || (options = {})
					;(options.buttons && options.buttons.length) || (options.buttons = [
						{ label: 'OK', value: true },
						{ label: 'Cancel', value: false }
					])
					buttonNames = (function () {
						var b = [];
						options.buttons.forEach(function (el) {
							b.push(el.label)
						})
						return b.join(',')
					}())
					navigator.notification.confirm(
						message,
						function (b) { callback(options.buttons[b - 1].value) },
						options.title,
						buttonNames
					)
				} else {//Web
					callback(confirm(message))
				}
			})
		},
		beep: function (times) { // returns Promise
			return new Core.Promise(function (callback) {
				if (navigator.notification) {//Cordova
					navigator.notification.beep(times)
					callback()
				} else {
					while (times--)
						console.log('beep')
					callback()
				}
			})	
		},
		vibrate: function (ms) { // returns Promise
			return new Core.Promise(function (callback) {
				if (navigator.notification) {//Cordova
					navigator.notification.vibrate(ms)
					callback()
				} else {
					console.log('vibrate ' + ms + ' milliseconds')
					callback()
				}
			})
		},
		notification: function (message, options) { // returns Promise
			var notif, isCanceled;
			return new Core.Promise(function (callback, errorback, progressback) {
				var notifications;
				if (notifications = window.webkitNotifications) {//HTML 5 notification
					notifications.requestPermission(function () {
						if (isCanceled) return
						if (notifications.checkPermission() == 0) {
							options || (options = {})
							options.title || (options.title = '')
							options.icon || (options.icon = '')
							notif = notifications.createNotification(
								options.icon,
								options.title,
								message
							)
							notif.onclose = function () { callback(false) }
							notif.onclick = function () {
								this.close()
								callback(true)
							}
							notif.onerror = function () { callback(new Error()) }
							notif.ondisplay = function () { callback('display') }
							notif.onshow = function () { callback('show') }
							notif.show()
						}
					})
				}
			},
			function canceler() {
				isCanceled = true
				//close notification
				notif && notif.close()
			})
		}
	}






	// Request for text content of any file
	Core.require = function (url, errback) { //returns text string
		var xhr = new Core.XHR();
		url = Core.template(url)
		try {
			xhr.open('GET', Core.config.cache ? url : url + '?rand=' + Math.random(), false)
			xhr.send(null)
			//normal
			if (xhr.status == 200)
				return xhr.responseText
			//local
			else if (xhr.status == 0 && xhr.responseText) {
				return xhr.responseText
			} else {
				Core.error('[XHR]', 'Can\'t access to file ' + url)
				errback && errback(new Error('Error 404: file \'' + url + '\' was not found'))
				return ' '
			}
		//crossdomaine
		} catch (err) {
			Core.error('[XHR]', '(' + url + ')', err)
			errback && errback(err)
			return ' '
		}
	}

	// Request for text content of any file asynchronously
	Core.requireAsync = function (url) { //returns Promise
		return new Core.Promise(function (complete, error) {
			var xhr = new Core.XHR();
			url = Core.template(url)
			try {
				xhr.open('GET', Core.config.cache ? url : Core.URL.randomize(url), true)
				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4) {
						//normal
						if (xhr.status == 200)
							complete(xhr.responseText) //success
							//local
						else if (xhr.status == 0 && xhr.responseText) {
							complete(xhr.responseText) //success
						} else {
							Core.error('[XHR]', 'Can\'t access to file ' + url)
							error(new Error('Can\'t access to file ' + url)) //fail
						}
						//clean
						this.onreadystatechange = null
					}
				}
				xhr.send(null)
				//crossdomaine
			} catch (err) {
				Core.error('[XHR]', '(' + url + ')', err)
				error(err) //fail
			}
		})
	}







	//setters, getters, adders, removers. Always return object
	Core.accessor = {
		'class': {
			remove: function (clss, el) {
				if ((new RegExp('\\b' + clss + '\\b')).test(el.className))
					el.className = el.className.replace(new RegExp('\\b' + clss + '\\b\\s\|\\s\\b' + clss + '\\b\|\\b' + clss + '\\b', 'g'), '')
				return {}
			},
			add: function (clss, el) {
				el.className || (el.className = clss)
				if (!(new RegExp('\\b' + clss + '\\b')).test(el.className)) el.className += ' ' + clss
				return {}
			},
			toggle: function (clss, el) {
				if (!(new RegExp('\\b' + clss + '\\b')).test(el.className))
					el.className += ' ' + clss
				else
					el.className = el.className.replace(new RegExp('\\b' + clss + '\\b\\s\|\\s\\b' + clss + '\\b\|\\b' + clss + '\\b', 'g'), '')
				return {}
			},
			get: function (clss, el) {
				if ((new RegExp('\\b' + clss + '\\b')).test(el.className)) return { has: true }
				return { has: false }
			}
		},

		'prefix-class': {
			set: function (clss, el) {
				var prefclss = clss.split('-')[0]
				if (!el.className)
					el.className = clss
				else if ((new RegExp('\\b' + prefclss + '-').test(el.className))) {
						//console.log('node category-market-2 text-fhfh'.match(new RegExp('\\b'+prefclss+'-[\\w\|-]\+', 'g')))
					el.className = el.className.replace(new RegExp('\\b' + prefclss + '-[\\w\|-]\+', 'g'), clss)
				}
				else
					el.className += ' ' + clss
				return el.className
			},
			get: function (prefclss, el) {
				return ((new RegExp('\\b' + prefclss + '-').test(el.className))) ?
					el.className.match(new RegExp('(\\b' + prefclss + '-)(\.+\\b)'))[0] :
					''
			},
			remove: function (prefclss, el) {
				if ((new RegExp('\\b' + prefclss + '-').test(el.className)))
					el.className = el.className.replace(new RegExp('\\b' + prefclss + '-[\\w\|-]\+', 'g'), '')
				return el.className
			}
		},


		'offset': {
			get: function (elem) {
				if (elem.getBoundingClientRect) {
					var box = elem.getBoundingClientRect(),
						body = document.body,
						docElem = document.documentElement,
						scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
						scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
						clientTop = docElem.clientTop || body.clientTop || 0,
						clientLeft = docElem.clientLeft || body.clientLeft || 0,
						top = box.top + scrollTop - clientTop,
						left = box.left + scrollLeft - clientLeft;
					return { left: Math.round(left), top: Math.round(top) }
				} else {
					var top = 0, left = 0;
					while (elem) {
						top = top + parseInt(elem.offsetTop)
						left = left + parseInt(elem.offsetLeft)
						elem = elem.offsetParent
					}
					return { x: left, y: top }
				}
			}
		},

		'style': {
			get: function (cssprop, el) {
				var ret = {}
				ret[cssprop] = (function () {
					if (document.defaultView && document.defaultView.getComputedStyle)
						return document.defaultView.getComputedStyle(el, null).getPropertyValue(cssprop)
					else if (el.currentStyle) {
						var re = /\-(\w)/g
						cssprop = cssprop.replace(re, function (strMatch, p1) { return p1.toUpperCase() })
						if (cssprop == 'float') cssprop = 'styleFloat'
						return el.currentStyle[cssprop]
					}
				}())

				return ret
			},
			set: function (cssprop, el) {
				return {}
			}
		},

		'language': {
			get: function () {
				var Languages = [], language, dict, i = 0;

				while (dict = Core.Dictionary[i++]) {
					//define language name
					if (dict.lang == Core.config.lang)
						language = dict.language

					//Languages collection
					Languages.push({
						lang: dict.lang,
						language: dict.language,
						active: (dict.lang == Core.config.lang)
					})
				}

				return {
					lang: Core.config.lang,
					language: language,
					languages: Languages
				}
			}
		}
	}




											/* Sandbox */

	Sandbox = function (moduleName) {
		this.template = Core.template
		this.moduleName = moduleName
		
		// for applying accessors
		function getAccessor(type) {
			return function () {
				if (arguments[0] in Core.accessor && type in Core.accessor[arguments[0]])
					return Core.accessor[arguments[0]][type](arguments[1], arguments[2], arguments[3], arguments[4]); // call necessary function
				else
					return {};
			}
		}

		this.set = getAccessor('set')
		this.get = getAccessor('get')
		this.add = getAccessor('add')
		this.remove = getAccessor('remove')
		this.toggle = getAccessor('toggle')
		getAccessor = undefined //clean
	}



	Sandbox.prototype.hasFeature = function (featureName) {
		if (typeof featureName !== 'string') return
		if (featureName in Core.Features)
			return Core.Features[featureName]
		return false
	}

	Sandbox.prototype.load = Core.load

	//Notifications
	Sandbox.prototype.alert = Core.Notify.alert
	Sandbox.prototype.confirm = Core.Notify.confirm
	//this.beep = Core.Notify.beep
	//this.vibrate = Core.Notify.vibrate
	Sandbox.prototype.notification = Core.Notify.notification

	Sandbox.prototype.Promise = Core.Promise
	Sandbox.prototype.every = Core.every
	Sandbox.prototype.any = Core.any
	Sandbox.prototype.some = Core.some

	//Method to work with different types of data
	Sandbox.prototype.data = (function () {
		var DataHandler = function (entryData) {
			this.result = entryData
		}

		DataHandler.prototype.format = function (type) {
			if (this.result !== undefined && type in Core.Formats)
				return new DataHandler(Core.Formats[type].apply(this.result || false, arguments));
			else
				return this;
		}

		DataHandler.prototype.sort = function (by) {
			if (this.result !== undefined && by in Core.Sorts)
				return new DataHandler(Core.Sorts[by].apply(this.result || false, arguments));
			else
				return this;
		}

		DataHandler.prototype.filter = function (by) {
			if (this.result !== undefined && by in Core.Filters)
				return new DataHandler(Core.Filters[by].apply(this.result || false, arguments));
			else
				return this;
		}

		//return data object
		return function (entryData) {  //returs object that have `result` property
			return new DataHandler(entryData);
		}
	}())

	//browser events fasade
	Sandbox.prototype.Event = {
		add: function (elements, types, handlers) {
			if (!elements) {
				Core.error('[Event.add] elment is undefined')
				return
			}
			// elements must be an array
			; (0 in elements && !elements.nodeName) || (elements = [elements])
			// types must be an array
			types = types.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, '').split(/\s+/)
			// handlers must be an array
			; (handlers instanceof Array) || (handlers = [handlers])

			//use Array.prototype because of elements may be a collection, not only an array
			Array.prototype.forEach.call(elements, function (element) {
				types.forEach(function (type) {
					handlers.forEach(function (handler) {
						Core.Event.add.call(Core.Event, element, type, handler)
					})
				})
			})

			return this // return Sandbox.Event object
		},
		remove: function (elements, types, handlers) {
			if (!elements) {
				Core.error('[Event.remove] elment is undefined')
				return
			}
			// elements must be an array
			; (0 in elements && !elements.nodeName) || (elements = [elements])
			// types must be an array
			types = (types||'').replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, '').split(/\s+/)
			// handlers must be an array
			; (handlers instanceof Array) || (handlers = [handlers])

			//use Array.prototype because of elements may be a collection, not only an array
			Array.prototype.forEach.call(elements, function (element) {
				types.forEach(function (type) {
					handlers.forEach(function (handler) {
						Core.Event.remove.call(Core.Event, element, type, handler)
					})
				})
			})

			return this // return Sandbox.Event object
		},
		fire: function (elements, types, params) {
			if (!elements) {
				Core.error('[Event.fire] elment is undefined')
				return;
			}
			if (!types) {
				Core.error('[Event.fire] type is undefined')
				return;
			}
			// elements must be an array
			; (0 in elements && !elements.nodeName) || (elements = [elements])
			// types must be an array
			types = types.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, '').split(/\s+/)

			//use Array.prototype because of elements may be a collection, not only an array
			Array.prototype.forEach.call(elements, function (element) {
				types.forEach(function (type) {
					Core.Event.fire.call(Core.Event, element, type, params)
				})
			})

			return this; // return Sandbox.Event object
		}
	}

	//alternative way to add listener of core events. These events are removed on every stopping of Module, so they may be used in init()
	Sandbox.prototype.listen = function (event, handler) {
		if (event && handler) {
			Modules[this.moduleName].body.runtime_listen || (Modules[this.moduleName].body.runtime_listen = {})
			var listener = Modules[this.moduleName].body.runtime_listen[event] || [];
			listener = (listener instanceof Array) ? listener.concat(handler) : [listener].concat(handler)
			Modules[this.moduleName].body.runtime_listen[event] = listener
		}
		return this;  // return Sandbox object
	}

	Sandbox.prototype.action = function (event, detail) {
		if (event && (event in Core.actions)) {
			var i = 0, func;
			while (func = Core.actions[event][i++])
				func(detail, {
					type: event,
					targetName: this.moduleName,
					timeStamp: (new Date()).getTime(),
					detail: detail
				})
		}
		return this; // return Sandbox object
	}


	//Expose Core to the global object
	window.Core = {
		include: Core.include,
		load: Core.load,
		UIReady: Core.UIReady,
		DOMReady: Core.DOMReady,
		DOMLoaded: Core.DOMLoaded,
		register: Core.register,
		start: Core.start,
		stop: Core.stop,
		startAll: Core.startAll,
		stopAll: Core.stopAll,
		extend: Core.extend,
		configure: Core.configure
	}


}(window));
