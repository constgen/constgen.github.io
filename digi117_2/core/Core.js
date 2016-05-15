/*
Version 1.51

Compatable with: 
	- Cordova 1.5+
	- Blackberry WebWorks


IO:
	out:
		developer-module-registered
		developer-module-started
		developer-module-stoped
		developer-configuration-change
		developer-error
	
		app-ready
		app-load
		app-search
		layout-change
		language-change
	
	in:
		language-setup

ACCESS:
	get: language


To do:
- permissions
*/

; (function (window, undefined, cordova, blackberry) {
	'use strict';

	if (window.Core) return

	var document = window.document,
		location = window.location,
		Modules = {}, //Registered Modules collection
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
		document.writeln(
			Core.template(
				Core.require(path + '/index.html'), //request module html to be templated
				{ url: path } //module info
			)
		)

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
				if (s && (isExternal(s) || true)) {
					src = s
					break
				}
			}
		}
		//if src is String
		else {
			source = Core.template(source) // Core.template() used to replace {}-like variables
			//allow external resources from http
			if (source && (isExternal(source) || true)) {
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

	Core.register = function (moduleName, moduleBody) {
		if (Modules[moduleName] = moduleBody(new Sandbox())) //returns object {init: ..., destroy: ..., listen: ...} or undefined
			Core.invoke(
				'developer-module-registered',
				{ module: Modules[moduleName] }
			)

		//clean
		moduleName = moduleBody = undefined
	}

	Core.start = function (moduleName) {
		var module = Modules[moduleName]
		if (!module || module._initiated) return
		module._nameId = moduleName
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
				Core.error('[Module: ' + module._nameId + ':init]', err)
			}
		}

		//clean
		module = moduleName = undefined
	}

	Core.stop = function (moduleName) {
		var module = Modules[moduleName]
		if (!module || !module._initiated) return
		if (typeof module.destroy === 'function') {
			try {
				module.destroy() // stop module life
				module._initiated = false //switch initiated status
				Core.invoke(
					'developer-module-stoped',
					{ module: module }
				)
			} catch (err) {
				module._initiated = true //switch initiated status
				Core.error('[Module: ' + module._nameId + ':destroy]', err)
			}
		}

		//clean
		module = moduleName = undefined
	}

	Core.startAll = function () {
		var moduleName
		for (moduleName in Modules)
			Core.start(moduleName)

		//clean
		moduleName = undefined
	}

	Core.stopAll = function () {
		var moduleName
		for (moduleName in Modules)
			Core.stop(moduleName)

		//clean
		moduleName = undefined
	}

	Core.extend = function (extendFunc) {
		var obj, i, j;

		if (typeof extendFunc !== 'function') {
			Core.error('Core.extend() argument must be a function. Example: Core.extend(function(Core){...})')
			return
		}

		if (!(obj = extendFunc(Core))) return

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
		baseUrl: ( window.location.protocol + '//' + window.location.host + window.location.pathname.substr(0, window.location.pathname.lastIndexOf('/')) ), //local file system or localhost
		apiURL: '',
		lang: 'en',
		cache: false,
		cacheImages: false,
		preloadImages: false
	}

	//App dictionary for templater, empty by default
	Core.Dictionary = []

	//Function to configure Core.config, Core.Dictionary
	Core.configure = function (url) {
		if (!url) return
		url = Core.template(url)
		
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

				if (!window.TemporaryCoreVariable) return

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
				Core.invoke('developer-configuration-change', {
					type: type,
					configuration: TemporaryCoreVariable
				})

				//language event
				Core.invoke('language-change')//with default detail

				//clean global scope
				if (window.TemporaryCoreVariable) window.TemporaryCoreVariable = undefined

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
	// Core.event is deprecated, and it is only present for backward compability
	Core.Event = Core.event = {
		add: function (elem, type, handler) {
			type = type.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, '').split(/\s+/)

			var i = 0, event;

			while (event = type[i++]) {

				if (event == 'ready') {
					if (elem !== document) continue
					var called = false,
						ready, tryScroll;
					ready = function () { if (called) return; called = true; handler() }
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
						document.attachEvent("onreadystatechange", function () { if (document.readyState === "complete") ready() })
					}
					if (window.addEventListener) window.addEventListener('load', ready, false)
					else if (window.attachEvent) window.attachEvent('onload', ready)

					continue
				}

				if (event == 'deviceready') { //for Cordova
					if (elem === document && elem.addEventListener)
						document.addEventListener('deviceready', handler, false)
					continue
				}

				if (elem.addEventListener) elem.addEventListener(event, handler, false)
				else if (elem.attachEvent) elem.attachEvent('on' + event, handler)
				else elem['on' + event] = handler
			}
		},

		remove: function (elem, type, handler) {
			type = type.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, '').split(/\s+/)
			var i = 0, event;
			while (event = type[i++]) {
				if (elem.removeEventListener) elem.removeEventListener(event, handler, false)
				else if (elem.detachEvent) elem.detachEvent('on' + event, handler)
				else elem['on' + event] = null
			}
		},

		fire: function (elem, type) { }
	}

	// Send global events
	Core.invoke = function (event, detail) {
		if (!event) return

		// Here are default settings for some events if there was no [detail] parameter
		if (!detail)
			switch (event) {
				case 'layout-change':
					detail = {
						width: window.innerWidth || document.getElementsByTagName('html')[0].offsetWidth,
						height: window.innerHeight || document.getElementsByTagName('html')[0].offsetHeight,
						orientation: (window.orientation == 0 || window.orientation == 180) ? 'portraid' : 'landscape'
					}
					break

				case 'language-change':
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
						Core.error('[Module: ' + Modules[i]._nameId + ':listen.' + event + ']', err)
					}
				}
				//array of functions
				else if (Modules[i].listen[event].length) {
					n = 0;
					while (handler = Modules[i].listen[event][n++]) {
						try {//catch errors without stopping app execution
							handler(detail)
						} catch (err) {
							Core.error('[Module: ' + Modules[i]._nameId + ':listen.' + event + '.handler(' + (n - 1) + ')]', err)
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
				Core.invoke('layout-change', detail)//with default detail if undefined
			}
		],

		'language-setup': [
			function (detail) {
				if (!detail || !detail.lang) return
				Core.config.lang = detail.lang
				//language event
				Core.invoke('language-change')//with default detail
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

			/*Core.Event.add(document, 'pause', function(){ Core.invoke('app-hide') })
			Core.Event.add(document, 'resume', function(){ Core.invoke('app-open') })
			Core.Event.add(document, 'menubutton', function(){ Core.invoke('app-menu') })*/

			//Core.Event.add(document, 'volumeupbutton', function(){  })
			//Core.Event.add(document, 'volumedownbutton', function(){  })

		})

	} else {
		Core.bind(document, 'ready', 'app-ready')
		Core.bind(window, 'load', 'app-load')
	}
	//layout event
	Core.bind(document, 'ready', 'layout-change')//with default detail
	Core.bind(window, 'resize', 'layout-change')//with default detail
	//language event
	Core.bind(document, 'ready', 'language-change')//with default detail



	//Feature detection, true or false
	Core.feature = (function () {

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

			// SVG support (from Modernizr)
			'element-svg': (function () {
				return (!!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect)
			}()),

			'element-canvas': (function () {
				//From Modernizr
				var elem = document.createElement('canvas');
				return !!(elem.getContext && elem.getContext('2d'));
			}()),

			// Check input[type="range"] support (from Modernizr)
			'element-input[type=range]': (function () {
				var inputElem = document.createElement('input')
				inputElem.setAttribute('type', 'range')
				if (inputElem.type == 'range') return true
				else return false
			}()),

			//localStorage, sessionStorage
			'js-webStorage': (('localStorage' in window) && window['localStorage'] !== null),

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

	//XmlXttpRequest constructor for AJAX request
	Core.XHR = function () {
		try { return new XMLHttpRequest() } catch (err) { }
		try { return new ActiveXObject("Msxml2.XMLHTTP") } catch (err) { }
		try { return new ActiveXObject("Microsoft.XMLHTTP") } catch (err) { }
		//if undefined
		this.open = this.send = function () { }
		Core.error('No Support: XMLHttpRequest')
		return this
	}


	// Ajax wrapper for any library
	Core.ajax = function (options) {
		if (!options.url) return

		//try to use jQuery
		if (window.jQuery)
			return jQuery.ajax({
				url: options.url,
				type: options.type || 'GET',
				dataType: (function (responseType) {
					switch (responseType) {
						case 'document': return 'xml'
						case 'json': return 'json'
						case 'text': return 'text'
						default: return ''
					}
				}(options.response)),
				username: options.user || '',
				password: options.password || '',
				async: (function (async) {
					if (async === undefined) return true
					else return async
				}(options.async)),
				headers: options.headers || {},
				data: options.data || null,
				//jQuery specific
				//accepts: 'text/plain',
				processData: false
				//mimeType: '',//A mime type to override the XHR mime type.
				//timeout: 0, //in miliseconds
			})

	}


	// Data formats
	Core.Format = {
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

		//Format to time format ( to 15:55:05)
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

		//Format to date format ( to 03-22-2012 15:55:05)
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


	Core.Notify = Core.notify = {
		alert: function (message, callback, title, buttonName) {
			(typeof callback === 'function') || (callback = function () { })
			if (navigator.notification) {//Cordova
				navigator.notification.alert(message, callback, title, buttonName || 'OK')
			} else {
				alert(message)
				callback()
			}
		},
		confirm: function (message, callback, title, buttonNames) {
			(typeof callback === 'function') || (callback = function () { })
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
		},
		beep: function (times) {
			if (navigator.notification) {//Cordova
				navigator.notification.beep(times)
			} else {
				while (times--)
					console.log('beep')
			}
		},
		vibrate: function (milliseconds) {
			if (navigator.notification) {//Cordova
				navigator.notification.vibrate(milliseconds)
			} else {
				console.log('vibrate ' + milliseconds + ' milliseconds')
			}
		},
		notification: function (message, callback, title, imageUrl) {
			(typeof callback === 'function') || (callback = function () { })
			var notif,
				notifications;
			if (notifications = window.webkitNotifications) {//HTML 5 notification
				notifications.requestPermission(function () {
					if (notifications.checkPermission() == 0) {
						notif = notifications.createNotification(imageUrl || '', title || '', message)
						notif.onclose = callback
						notif.show()
					}

				})
			}
		}
	}

	// Request of text content of any file
	Core.require = function (url) { //function for ajax request of files, returns text string
		var xhr = new Core.XHR();
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
			xhr.open('HEAD', Core.config.cache ? url : url + '?rand=' + Math.random(), false)
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
			},
			add: function (clss, el) {
				el.className || (el.className = clss)
				if (!(new RegExp('\\b' + clss + '\\b')).test(el.className)) el.className += ' ' + clss
			},
			toggle: function (clss, el) {
				if (!(new RegExp('\\b' + clss + '\\b')).test(el.className))
					el.className += ' ' + clss
				else
					el.className = el.className.replace(new RegExp('\\b' + clss + '\\b\\s\|\\s\\b' + clss + '\\b\|\\b' + clss + '\\b', 'g'), '')
			},
			get: function (clss, el) {
				if ((new RegExp('\\b' + clss + '\\b')).test(el.className)) return true
				return false
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
					//Define language name
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

	Sandbox = function () {

		this.hasFeature = function (featureName) {
			if (typeof featureName !== 'string') return
			if (featureName in Core.feature)
				return Core.feature[featureName]
			return false
		}

		this.template = Core.template

		this.load = Core.load

		this.notify = Core.notify //deprecated
		this.Notify = Core.Notify
		this.notification = Core.Notify //deprecated

		this.Format = Core.Format

		//browser events fasade
		this.Event = {
			add: function () {
				Core.Event.add.apply(Core.Event, arguments)
				return this // return Sandbox.Event object
			},
			remove: function () {
				Core.Event.remove.apply(Core.Event, arguments)
				return this // return Sandbox.Event object
			},
			fire: function () {
				Core.Event.dispatch.apply(Core.Event, arguments)
				return this // return Sandbox.Event object
			}
		}

		this.action = function (event, detail) {
			if (!event || !(event in Core.actions)) return
			var i = 0, func
			while (func = Core.actions[event][i++])
				func(detail)
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


	// fix absent console
	window.console || (window.console = { log: function () { } })

	// Modify console.debug for devices
	if (Core.isCordova || !console.debug) {
		console.debug = function (param) {
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
		}
	}











	//Expose Core to the global object
	window.Core = {
		include: Core.include,
		load: Core.load,
		register: Core.register,
		start: Core.start,
		stop: Core.stop,
		startAll: Core.startAll,
		stopAll: Core.stopAll,
		extend: Core.extend
	}


}(window, undefined, window.cordova || window.Cordova || window.PhoneGap, window.blackberry));
