/*
Version 1.8

Compatable with: 
	- Cordova 1.5+
	- Blackberry WebWorks


IO:
	out:
		developer-module-registered
		developer-module-started
		developer-module-stopped
		developer-configuration-update
		developer-error
	
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
		cordova = window.cordova || window.Cordova || window.PhoneGap, // Cordova Lib
		blackberry = window.blackberry, // Blackberry OS
		windows = window.Windows, // Windows 8 OS
		Modules = {}, // Registered Modules collection
		Core = {}, // Application Core
		Sandbox;// Modules Sandbox


	// file:///Users/mchorich/Library/Application Support/iPhone Simulator/5.1/Applications/FAA15ED0-F0C4-4EF9-8C45-B5AEB75F2ED0/strategicthinking.app/www/index.html
	// file:///var/mobile/Applications/490C8C47-BBCD-4FA9-B404-AE2766726AB8/strategicthinking.app/www/index.html
	// file:///android_asset/www/index.html
	// local:///index.html

	Core.isCordova = Core.isPhonegap = (!!cordova && /android_asset|^(file:).+www|^local:\/\/\/index.html/.test(location.href)) //detect usage in mobile device WebView with Phonegap




											/*Nesessary Functions*/

	//returns <link> tag string
	function insert_link(href) {
		return '<link href="' + (Core.config.cache ? href : href + '?rand=' + Math.random()) + '" rel="stylesheet" type="text/css">\n'
	}

	//returns <style> tag string
	function insert_style(src) {
		return '<style type="text/css">' + Core.require(src) + '</style>\n'
	}

	//returns <script> tag string
	function insert_script(src, async) {//async - attribute for deferred loading
		return '<script src="' + (Core.config.cache ? src : src + '?rand=' + Math.random()) + '" ' + (async ? 'async' : '') + ' type="text/javascript"></' + 'script>\n'
	}

	//returns <link> DOM element
	function create_link(href) {
		var linkNode = document.createElement('link')
		linkNode.setAttribute('type', 'text/css')
		linkNode.setAttribute('rel', 'stylesheet')
		linkNode.setAttribute('href', Core.config.cache ? href : href + '?rand=' + Math.random())

		//clean
		href = undefined

		return linkNode
	}

	//returns <style> DOM element
	function create_style(src) {
		var styleNode = document.createElement('<style>')
		styleNode.setAttribute('type', 'text/css')
		styleNode.innerHTML = Core.require(src)

		//clean
		src = undefined

		return styleNode
	}

	//returns <script> DOM element
	function create_script(src, async) {//async - attribute for deferred loading
		var scriptNode = document.createElement('script')
		scriptNode.setAttribute('type', 'text/javascript')
		scriptNode.setAttribute('src', Core.config.cache ? src : src + '?rand=' + Math.random())
		if (async) scriptNode.setAttribute('async', 'true')

		//clean
		src = async = undefined

		return scriptNode
	}

	//Promise 1.1
	;(function (global) {
		var Deferred,
			Promise,
			When,
			undefined;

		function isFunc(func) {
			return (typeof func === 'function')
		}

		Deferred = function (canceler) {
			var defer = this,
				isResolved = false,
				isRejected = false,
				//isHandled = false,
				//isError = false,
				result = [],//arguments array
				Callbacks = [],
				newPromise;

			function updateResult(newResult) {
				if (newResult !== undefined)
					result = [newResult]
			}

			function call(handler) {
				var func = isResolved ? handler.done : handler.canceled,
					newResult;

				if (func) {
					try {
						newResult = func.apply(defer.promise, result); //new or old value
						if (newResult && typeof newResult.then === "function" && newResult !== defer.promise) {
							newPromise = newResult //save link to new Promise object
							while (handler = Callbacks.shift()) { //migrate handlers to new promise
								newResult.then(handler.done, handler.canceled, handler.progress)
							}
							//check if return value have changed
							newResult.then(updateResult, updateResult, updateResult)
							return
						}
						else
							updateResult(newResult)
					}
					catch (err) {
						//if exeption is in doneCallback, switch to rejected state from this moment
						if (!isRejected)
							defer.reject(err)

						throw err
					}
				} else {
					//if Deferred rejected and there is no errorback, throw Error
					//if (isRejected) throw result[0]
				}
			}

			this.resolve = function (/*args*/) {
				//prevent second resolve
				if (isResolved || isRejected) {
					//console.log("This Deferred has already been finished")
					return this
				}
				var handler;
				result = arguments //save value
				isResolved = true
				while (handler = Callbacks.shift()) {
					call(handler)
				}
				//clear
				handler = null
				Callbacks = []
				return this
			}

			this.reject = function (/*args*/) {
				//prevent second reject
				if (isRejected) {
					//console.log("This Deferred has already been finished")
					return this
				}
				var handler;
				result = arguments //save value
				isResolved = false
				isRejected = true
				while (handler = Callbacks.shift()) {
					call(handler)
				}
				//clear
				handler = null
				Callbacks = []
				return this
			}

			this.progress = function (/*args*/) {
				if (isResolved || isRejected)
					return this
				var handler, i = 0, ret;
				result = arguments //save value
				try {
					while (handler = Callbacks[i++]) {
						handler.progress && (ret = handler.progress.apply(defer.promise, result))

						//progress handler can't return promise
						if (!(ret && typeof ret.then === 'function'))
							updateResult(ret)
					}
				} catch (err) {
					throw err
				}
				return this
			}

			this.then = function (doneCallback, canceledCallback, progressCallback) {
				var handler = {
					done: isFunc(doneCallback) ? doneCallback : undefined,
					canceled: isFunc(canceledCallback) ? canceledCallback : undefined,
					progress: isFunc(progressCallback) ? progressCallback : undefined
				}
				//if new Promise appeared in chain, attach callbacks to new Promise
				if (newPromise) {
					newPromise.then(doneCallback, canceledCallback, progressCallback)
				}
					//if Deferred is resolved or rejected, execute doneCallback immediately
				else if (isResolved || isRejected)
					call(handler)
				else {
					Callbacks.push(handler)
				}
				return this
			}

			this.cancel = function () {
				isFunc(canceler) && canceler()
				defer.reject(new Error('Canceled'))
			}

			//Promise object
			this.promise = {
				then: this.then,
				cancel: this.cancel,
				//helpers
				join: function (/*args*/) {
					return When([this].concat(arguments))
				},
				//create delay between callbacks and errorbacks, has no effect to progressback
				delay: function (ms) {
					if (ms) {
						var delayPromise = new Promise();
						this.then(
							function done() {
								return delayPromise.wait(ms).then(function () { return result[0] })
							},
							function canceled() {
								return delayPromise.timeout(ms).then(null, function () { return result[0] })
							}
						)
					}
					return this
				},
				//wait before resolve promise
				wait: function (ms) {
					var id;
					if (ms)
						id = setTimeout(defer.resolve, ms)
					else
						defer.resolve()
					return this.then(
						function done() {
							clearTimeout(id)
						},
						function canceled() {
							clearTimeout(id)
						}
					)
				},
				//wait before reject and cancel promise
				timeout: function (ms) {
					var id;
					if (ms) {
						id = setTimeout(function () {
							defer.reject(new Error('Timedout'))
							//and do cancelatin
							defer.cancel()
						}, ms)
					}
					else {
						defer.reject(new Error('Timedout'))
						//and do cancelatin
						defer.cancel()
					}
					return this.then(
						function done() {
							clearTimeout(id)
						},
						function canceled() {
							clearTimeout(id)
						}
					)
				},
				//call progress with interval before promise is resolved or rejected
				interval: function (ms) {
					var id;
					if (ms)
						id = setInterval(defer.progress, ms)
					else
						defer.progress()
					return this.then(
						function done() {
							clearInterval(id)
						},
						function canceled() {
							clearInterval(id)
						}
					)
				}
			}
		}

		//polymorph Promise constructor
		Promise = function (initFunc, cancelFunc) {
			var defer = new Deferred(cancelFunc)

			//Promise constructor has to be used with `new` operator, else return istant resolved promise object
			if (!(this instanceof Promise))
				return defer.resolve(initFunc).promise

			if (!isFunc(initFunc)) {
				// if `initFunc` is not a function, create passive promise with preseted result
				return defer.promise.then(function () { return initFunc })
			}

			//else create promise
			initFunc(defer.resolve, defer.reject, defer.progress)
			return defer.promise
		}

		//When method, gathers many promises and switch to resolved state when they all resolve
		When = function (promArr, cancelFunc) {
			var defer = new Deferred(cancelFunc)
			//if `promArr` is array, join promises
			if (promArr instanceof Array) {
				var len = promArr.length,
					done = 0,
					results = [];

				Array.prototype.forEach.call(promArr, function (p, i) {
					//check if it is promise object, if not create it
					p = (!!p.then) ? p : (isFunc(p)) ? Promise(p()) : Promise(p)

					p.then((function (i) {
						return function (result) {
							done += 1;
							results[i] = result
							if (done === len)
								defer.resolve(results)
						}
					}(i)),
						function () {

						}
					)
				})

				return defer.promise
			}

			//else return passive promise 
			return defer.promise
		}

		//expose Promise constructor and when method to global scope
		global.Promise = Promise
		global.when = When
	}(Core));//Core as global scope









												/*Core public interface */

	Core.include = function (path) {
		if (!path) return

		path = path.replace(/\/+$/, '')

		//include files if they are available (index.html, style.css, ie.css, register.js, dictionary.js)

		//css
		//if (Core.isUrlAvailable(path + '/style.css')) document.head.appendChild(create_link(path + '/style.css'))
		//if ((!-[1, ]) && Core.isUrlAvailable(path + '/ie.css')) document.head.appendChild(create_link(path + '/ie.css'))
		Core.load(path + '/style.css')
		if (!-[1, ]) Core.load(path + '/ie.css') //always for IE <=8

		//dictionary
		//Core.configure(path + '/dictionary.js')

		//html
		if (Core.isUrlAvailable(path + '/index.html')) {
			document.writeln(
				Core.template(
					Core.require(path + '/index.html'), //request module html to be templated
					{ url: path } //module info
				)
			)
		}

		//js
		Core.load(path + '/register.js', {defer: true})
		//if (Core.isUrlAvailable(path + '/register.js')) document.writeln(insert_script(path + '/register.js'))

		//clean
		path = undefined
	}


	Core.load = function (source, options) {
		var n, s, i, src = '', scriptNode;
		options || (options = {})// {defer: {Boolean}, async: {Boolean}}

		function isExternal (src) {
			return (
				!!(options.defer || options.async)
				&& (/htt(p|ps):\/\//i.test(src))
				&& !(new RegExp('htt(p|ps):\\/\\/' + location.hostname, 'i').test(src))
			)
		}

		
		//if src is Array, find first available source from list
		if (typeof source === 'object' && 0 in source) {
			i = 0;
			while (s = Core.template(source[i++])) { // Core.template() used to replace {}-like variables
				//allow external resources from http
				if (s && (isExternal(s) || Core.isUrlAvailable(s))) {
					src = s
					break
				}
			}
		}
		//if src is String
		else {
			source = Core.template(source) // Core.template() used to replace {}-like variables
			//allow external resources from http
			if (source && (isExternal(source) || Core.isUrlAvailable(source))) {
				src = source
			}
		}

		//if no available source do not load
		if (!src) return

		n = src.lastIndexOf('.');
		if (n == -1) return

		switch (src.substr(n)) {
			case '.json':
			case '.js':
				if (options.defer || options.async) {
					//isExternal(src) ?// IE fix
						document.write(insert_script(src, options.async ? true : false))
						//: document.head.appendChild(create_script(src, options.async ? true : false))
				}
				else if (window.execScript)
					window.execScript(Core.require(src))
				else {
					scriptNode = document.createElement('script')
					scriptNode.setAttribute('type', 'text/javascript')
					scriptNode.innerHTML = Core.require(src)
					document.head.appendChild(scriptNode)
				}
				return
			case '.css':
				document.head.appendChild(create_link(src))
				return
			case '.hmlt'://to be tested
				document.writeln(Core.template(Core.require(src), { url: src.substr(0, src.lastIndexOf('/')) }))
			default: return
		}

		//clean
		n = s = i = src = scriptNode = source = options = undefined
	}

	Core.register = function (moduleId, moduleBody) {
		if (Modules[moduleId] = moduleBody(new Sandbox(moduleId))) //returns object {init: ..., destroy: ..., listen: ...} or undefined
			Core.invoke(
				'developer-module-registered',
				{ module: Modules[moduleId] }
			)
	}

	Core.start = function (/*args*/) {
		var module, moduleId, i = 0;

		while (moduleId = arguments[i++]) {
			module = Modules[moduleId]
			if (!module || module._initiated) return
			module._id = moduleId
			if (typeof module.init === 'function') {
				try {
					module.init() // start module life
					module._initiated = true //switch initiated status
					Core.invoke(
						'developer-module-started',
						{ module: module }
					)
				} catch (err) {
					module._initiated = false //switch initiated status
					Core.error('[Module: ' + module._id + ':init]', err)
				}
			}
		}
	}

	Core.stop = function (moduleId) {
		var module, moduleId, i = 0;

		while (moduleId = arguments[i++]) {
			module = Modules[moduleId]
			if (!module || !module._initiated) return
			if (typeof module.destroy === 'function') {
				try {
					module.destroy() // stop module life
					module._initiated = false //switch initiated status
					Core.invoke(
						'developer-module-stopped',
						{ module: module }
					)
				} catch (err) {
					module._initiated = true //switch initiated status
					Core.error('[Module: ' + module._id + ':destroy]', err)
				}
			}
		}
	}

	Core.startAll = function () {
		var moduleId;
		for (moduleId in Modules)
			Core.start(moduleId)
	}

	Core.stopAll = function () {
		var moduleId
		for (moduleId in Modules)
			Core.stop(moduleId)
	}

	Core.extend = function (extendFunc) {//@extendFunc may be object or function that can return object
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
		var i = 0, message, err = '';

		//join all messages and error objects from arguments to one string
		while (message = arguments[i++])
			err += message.toString() + ' '

		//log error
		Core.invoke('developer-error', { error: err })
		console.log(err)

		//clean
		i = message = err = undefined
	}

	//App configuration
	Core.config = {
		// default home url
		baseUrl: (/^htt(p|ps)/i.test(location.protocol) && !/(127\.0\.0\.1|localhost)/i.test(location.hostname)) ?
			(window.location.protocol + '//' + window.location.host) //server host
			: ( window.location.protocol + '//' + window.location.host + window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/')) ), //local file system or localhost
		apiURL: '',
		lang: 'en',
		cache: false,
		cacheImages: false,
		preloadImages: false,
		security: false
	}

	//App dictionary for templater, empty by default
	Core.Dictionary = []

	//Function to configure Core.config, Core.Dictionary
	Core.configure = function (url) {
		if (!url) return
		url = Core.template(url)
		
		if (!Core.isUrlAvailable(url)) return

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

					//developer event
					Core.invoke('developer-configuration-update', {
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
				if (event == 'ready') {
					if (elem !== document) continue
					var called = false,
						ready, tryScroll, IEDOMContentLoaded;
					
					ready = function () {
						if (called) return;
						called = true;
						handler()
					}

					if (document.addEventListener) document.addEventListener("DOMContentLoaded", ready, false)
					else if (document.attachEvent) {
						if (document.documentElement.doScroll && window == window.top) {
							tryScroll = function () {
								if (called) return
								if (!document.body) return
								try { document.documentElement.doScroll("left"); ready() } catch (e) { setTimeout(tryScroll, 10) }
							}
							tryScroll()
						}
	
						IEDOMContentLoaded = function () {
							if (document.readyState == "complete") {
								this.detachEvent("onreadystatechange", IEDOMContentLoaded);
								ready()
							}
						}
						document.attachEvent("onreadystatechange", IEDOMContentLoaded)
					}
					addEvent(window, 'load', ready)

					continue
				}

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
		//find handlers in module 'listen' collection
		for (i in Modules) {
			if (
				Modules[i]
				&& Modules[i]._initiated
				&& 'listen' in Modules[i]
				&& event in Modules[i].listen
			) {
				//single function
				if (typeof Modules[i].listen[event] === 'function') {
					try {//catch errors without stopping app execution
						Modules[i].listen[event](detail)
					} catch (err) {
						Core.error('[Module: ' + Modules[i]._id + ':listen.' + event + ']', err)
					}
				}
				//array of functions
				else if (Modules[i].listen[event].length) {
					n = 0;
					while (handler = Modules[i].listen[event][n++]) {
						try {//catch errors without stopping app execution
							handler(detail)
						} catch (err) {
							Core.error('[Module: ' + Modules[i]._id + ':listen.' + event + '.handler(' + (n - 1) + ')]', err)
						}
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
		Core.bind(document, 'ready', 'app-ready')
		Core.bind(window, 'load', 'app-load')
	}
	//layout event
	Core.bind(document, 'ready', 'layout-update')//with default detail
	Core.bind(window, 'resize', 'layout-update')//with default detail
	//language event
	Core.bind(document, 'ready', 'language-update')//with default detail



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
			// CSS 3D transforms
			'css-transform3d': checkCSS('perspectiveProperty'),

			'css-transform': checkCSS('transformProperty'),

			'css-transition': checkCSS('transitionProperty'),

			'css-border-radius': checkCSS('borderRadius'),

			'css-opacity': checkCSS('opacity'),

			//detect touch device/browser
			'touch': ('createTouch' in document) || (/android|blackberry/i.test(navigator.userAgent) && 'ontouchstart' in window),

			//detect mouse device/browser
			'mouse': true,

			//detect retina display
			'retina': (function () {
				return (window.devicePixelRatio && window.devicePixelRatio >= 2) ? true : false
			}()),
			// for IE9 - screen.deviceXDPI / screen.logicalXDPI

			'cordova': Core.isCordova,
			'phonegap': Core.isCordova
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
		money: function (n, c, d, t) {
			c = c || '.'
			d = d || '.'
			t = t || ','
			var m = (c = Math.abs(c) + 1 ? c : 2, d = d || ",", t = t || ".",
				/(\d+)(?:(\.\d+)|)/.exec(n + "")), x = m[1].length > 3 ? m[1].length % 3 : 0;
			return (x ? m[1].substr(0, x) + t : "") + m[1].substr(x).replace(/(\d{3})(?=\d)/g,
				"$1" + t) + (c ? d + (+m[2] || 0).toFixed(c).substr(2) : "");
		},

		//Format to price (89.00 to 89, 789.994566 to 789.99)
		price: function (p) {
			if (!p) return p
			p = parseFloat(p, 10)
			//if decimal use 2 chars
			if (p - parseInt(p, 10) != 0)
				p = p.toFixed(2)
			return p
		},

		//Format to time ( to 15:55:05)
		time: function (seconds, mask) {
			mask || (mask = '')
			var date = new Date(parseInt(seconds, 10) * 1000), //seconds*1000 = miliseconds
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

		//Format to date ( to 03-22-2012 15:55:05)
		date: function (miliseconds, mask) {
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
		alert: function (message, title, buttonName) {
			return new Core.Promise(function (callback) {
				if (navigator.notification) {//Cordova
					navigator.notification.alert(message, callback, title, buttonName || 'OK')
				} else {
					callback(alert(message))
				}
			})
		},
		confirm: function (message, title, buttonNames) {
			return new Core.Promise(function (callback) {
				if (navigator.notification) {//Cordova
					navigator.notification.confirm(message, function (b) {
						if (b == 1)
							callback(true)
						else
							callback(false)
					}, title, buttonNames || 'OK,Cancel')
				} else {
					callback(confirm(message))
				}
			})
		},
		beep: function (times) {
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
		vibrate: function (ms) {
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
		notification: function (message, title, imageUrl) {
			var notif, isCanceled;
			return new Core.Promise(function (callback, errorback, progressback) {
				var notifications;
				if (notifications = window.webkitNotifications) {//HTML 5 notification
					notifications.requestPermission(function () {
						if (isCanceled) return
						if (notifications.checkPermission() == 0) {
							notif = notifications.createNotification(imageUrl || '', title || '', message)
							notif.onclose = callback
							notif.onerror = errorback
							notif.ondisplay = progressback
							notif.onshow = progressback
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

	// Request of text content of any file
	Core.require = function (url) { //function for ajax request of files, returns text string
		var xhr = new Core.XHR();
		url = Core.template(url)
		try {
			xhr.open('GET', Core.config.cache ? url : url + '?rand=' + Math.random(), false)
			xhr.send(null)
			//normal
			if (xhr.status == 200)
				return xhr.responseText
			//local
			else if (xhr.status == 0) {
				if (xhr.responseText) return xhr.responseText
				Core.error('[XHR]', 'Warning: Can\'t access to file ' + url)
				return ' '
			} else return ' '
		//crossdomaine
		} catch (err) {
			Core.error('[XHR]', '(' + url + ')', err)
			return ' '
		}
	}

	// Check file by url
	Core.isUrlAvailable = function (url) { //function for checking file existence/availability
		var xhr = new Core.XHR();
		try {
			xhr.open('HEAD', Core.template(url) + '?rand=' + Math.random(), false)
			xhr.send(null)
			
			return (xhr.readyState == 4) && !!(
				(xhr.status == 0 && (xhr.responseText || xhr.responseXML || xhr.response)) //local
				|| xhr.status == 200
				|| xhr.status == 301
				|| xhr.status == 302
				|| xhr.status == 303
				|| xhr.status == 307
			)	
		} catch (err) {
			Core.error('[XHR]', '('+url+')', err)
			return false
		}
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

		//TO BE TESTED
		'visibility': {
			get: function (el) {
				return {
					visibility: (function () {
						if (Core.accessor['style'].get('visibility', el).visibility == 'hidden') return false

						return (function elementVisibility(el) {
							if (el === document) return true
							if (
								Core.accessor['style'].get('display', el) == 'none'
								|| Core.accessor['style'].get('opacity', el) == '0'
								|| (
									Core.accessor['style'].get('overflow', el) == 'hidden'
									&& (!el.offsetHeight || !el.offsetWidth)
									)
								) return false
							return elementVisibility(el.parentNode)
						}(el))
					}())
				}
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
		},

		'script': {
			add: function (js) {
				if (typeof js !== 'string') return
				var scriptNode = document.createElement('script')
				scriptNode.innerHTML = js
				document.body.appendChild(scriptNode)
			}
		}
	}






											/* Sandbox public interface */

	Sandbox = function (moduleId) {

		this.hasFeature = function (featureName) {
			if (typeof featureName !== 'string') return
			if (featureName in Core.Features)
				return Core.Features[featureName]
			return false
		}

		this.template = Core.template

		this.load = Core.load

		this.Notify = Core.Notify

		//Notifications
		this.alert = Core.Notify.alert
		this.confirm = Core.Notify.confirm
		this.beep = Core.Notify.beep
		this.vibrate = Core.Notify.vibrate
		this.notification = Core.Notify.notification

		this.Promise = Core.Promise

		this.format = function (data) {
			return {
				to: function (type) {
					if (type in Core.Formats)
						return Core.Formats[type].apply(
							Core.Formats,
							[data].concat(Array.prototype.slice.call(arguments, 1))
						)
					else
						return data
				}
			}
		}
		this.sort = null
		this.filter = null

		//browser events fasade
		this.Event = {
			add: function (elements, types, handlers) {
				if (!elements) {
					Core.error('[Event.add] elment is undefined')
					return
				}
				// elements must be an array
				;('0' in elements) || (elements = [elements])
				// types must be an array
				types = types.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, '').split(/\s+/)
				// handlers must be an array
				;(handlers instanceof Array) || (handlers = [handlers])
				
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
					Core.error('[Event.add] elment is undefined')
					return
				}
				// elements must be an array
				; ('0' in elements) || (elements = [elements])
				// types must be an array
				types = types.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, '').split(/\s+/)
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
					Core.error('[Event.add] elment is undefined')
					return
				}
				// elements must be an array
				; ('0' in elements) || (elements = [elements])
				// types must be an array
				types = types.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, '').split(/\s+/)

				//use Array.prototype because of elements may be a collection, not only an array
				Array.prototype.forEach.call(elements, function (element) {
					types.forEach(function (type) {
						Core.Event.fire.call(Core.Event, element, type, params)
					})
				})

				return this // return Sandbox.Event object
			}
		}

		this.action = function (event, detail) {
			if (!event || !(event in Core.actions)) return
			var i = 0, func;
			while (func = Core.actions[event][i++])
				func(detail, {
					type: event,
					targetId: moduleId,
					timeStamp: new Date().getTime(),
					detail: detail
				})
			return this // return Sandbox object
		}

		// for applying accessors
		function getAccessor(type) {
			return function () {
				if (arguments[0] in Core.accessor && type in Core.accessor[arguments[0]])
					return Core.accessor[arguments[0]][type](arguments[1], arguments[2], arguments[3], arguments[4]) // call necessary function
				else
					return {}
			}
		}

		this.set = getAccessor('set')
		this.get = getAccessor('get')
		this.add = getAccessor('add')
		this.remove = getAccessor('remove')
		this.toggle = getAccessor('toggle')
		getAccessor = undefined //clean
	}






											/*Fixes, polyfills, hacks*/

	//document.head
	document.head || (document.head = document.getElementsByTagName('head')[0])

	// Array forEach
	// Production steps of ECMA-262, Edition 5, 15.4.4.18
	// Reference: http://es5.github.com/#x15.4.4.18
	if (!Array.prototype.forEach) {
		Array.prototype.forEach = function (callback, thisArg) {
			var T, k, kValue;

			if (this == null)
				throw new TypeError("this is null or not defined")

			var O = Object(this),
				len = O.length >>> 0; // Hack to convert O.length to a UInt32

			// See: http://es5.github.com/#x9.11
			if ({}.toString.call(callback) != "[object Function]") {
				throw new TypeError(callback + " is not a function")
			}
			if (thisArg)
				T = thisArg
			k = 0
			while (k < len) {
				if (k in O) {
					kValue = O[k]
					callback.call(T, kValue, k, O)
				}
				k++
			}
		}
	}

	// fix absent console
	window.console || (window.console = { log: function () { } })

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
			return console.log(string)
		} else { return console.log(param) }
	})
	



	//Expose Core to the global object
	window.Core = {
		include: Core.include,
		load: Core.load,
		register: Core.register,
		start: Core.start,
		stop: Core.stop,
		startAll: Core.startAll,
		stopAll: Core.stopAll,
		extend: Core.extend,
		configure: Core.configure,



		modules: Modules
	}


}(window));
