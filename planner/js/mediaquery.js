/*
Media Query crossbrowser support plugin (polyfill) ver. 0.4

Works only on sever (or virtual sever), but dosn't work from local folder

				Support:
for: IE 5+, Firefox 1+, Safari 2
native: IE 9+, Firefox 3.5+, Opera 7+, Safari 3+, Chrome




*/


(function(window,document){
	
	//Check for Media Query browser support
	//fast check
	if (!!window.matchMedia) return;
	//alternative check (from Modernizr)
	if (function(){
		var st = document.createElement('style'),
			div = document.createElement('div'),
			ret;	
		st.textContent = '@media all {#query{height:3px}}';
		document.getElementsByTagName('head')[0].appendChild(st);
		div.id = 'query';
		document.documentElement.appendChild(div);		
		ret = div.offsetHeight === 3;	
		st.parentNode.removeChild(st);
		div.parentNode.removeChild(div);
		return !!ret;
	}()) return
	
	
	var MediaQuery = {},
		stylesText = '', mediaStylesText = '',
		i, x, str //temporary
		style = document.getElementsByTagName('style'),
		//convert StyleSheets object to array
		stylesheet = (function(){
			var Arr = [], i=0, sheets = document.styleSheets, len = sheets.length;
			while (i < len)
				Arr.push(sheets[i]), i++
			return Arr
		}()),
		//XHR object for ajax reques of stylesheet files
		XHR = (function(){
			var xmlhttp;
			try { xmlhttp = new ActiveXObject("Msxml2.XMLHTTP") } 
			catch (e) {
				try { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP") } 
				catch (E) {	xmlhttp = false }
			}
			if (!xmlhttp && typeof XMLHttpRequest!='undefined')
				xmlhttp = new XMLHttpRequest();
			return xmlhttp;
		}());
	
	//function for ajax request of stylesheet files, returns styles text string
	function ajaxRequest(url){
		if (!XHR) return
		try {
			XHR.open('GET', url, false)
			XHR.send(null)
			//normal
			if (XHR.status == 200)
				return XHR.responseText
			//local
			else if (XHR.status == 0) {
				return ''
			} else return ''
		//crossdomaine
		} catch (err) {
			return ''
		}
	}

	//Collect all style sheets text to one string
	i=0; while (x = stylesheet[i++]) {	
		if (x.href) {
			stylesText += (x.media) ? 
				('@media '+x.media+' {'+ajaxRequest(x.href) + '} ') : 
				(ajaxRequest(x.href) + ' ')
		} else {
			stylesText += (x.innerHTML||'') + ' '
		}
		
	}
	
	// if no rules, stop parsing
	if (!stylesText) return
	
	//clean comments first
	stylesText = stylesText.replace(/\/\*(.|\n|\r)*?\*\//g,'')

	//Collect all Media Queries text to one string
	while (/@media/.test(stylesText)) {
		// Regexp for parsing media rules
		str = /@media[A-Za-z0-9\s:\(\)\-\/]+(\{(.|\n|\r)+?(\}(\s|\n|\r)*\})|({}))/.exec(stylesText)[0]
		mediaStylesText += '\n'+str
		// remove matched media rule from style
		stylesText = stylesText.replace(str, '')	
	}
	
	//Make an array of Media Queries strings from text
	mediaStylesText = mediaStylesText.split(/@media[\s]*/)
	mediaStylesText.shift()

	//Make an key-stylevalue object of Media Queries styles
	i=0; while (x = mediaStylesText[i++])  {
		str = x.substr(0,x.indexOf('{')).replace(/\n/g,'').replace(/\s*:\s*/g,':').replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,'')
		MediaQuery[i] = {
			media: str,
			style: x.substring(x.indexOf('{')+1,x.lastIndexOf('}'))
		}
	}
	
	//Append new stylesheet, where Media Queries rules will be
	var stl = document.createElement('style')
	stl.setAttribute('type', 'text/css')
	if (stl.styleSheet) stl.styleSheet.cssText = ''
	else stl.textContent = ''
	document.getElementsByTagName('head')[0].appendChild(stl)
	
	
	//function to change styles on the page
	function redraw(styles){
		if (stl.styleSheet) stl.styleSheet.cssText = styles
		else stl.textContent = styles
	}
	
	//constants
	var constDevice = (function(){ return 'all only screen' }()),
		constScan = (function(){ return 'progressive' }())//or interlace

	//function to trigger Media Queries every time window change size
	function updateQuery(e){
		var device = constDevice,//all, screen, handheld, tv etc.
		width = window.innerWidth || document.getElementsByTagName('html')[0].offsetWidth,
		height = window.innerHeight || document.getElementsByTagName('html')[0].offsetHeight,
		deviceWidth = window.screen.width,
		deviceHeight = window.screen.height,
		orientation = (width > height) ? 'landscape' : 'portrait',
		aspectRatio = width/height,
		deviceAspectRatio = deviceWidth/deviceHeight,
		color = 8,
		colorIndex = Math.pow(color,3),
		//monochrome = 0,
		resolution = 96,//dpi
		scan = constScan,//progressive or interlace
		grid = 0,//0 or 1 only
		i, n, x, query, queryRule, Style = '';

		nextquery: //goto 
		for (query in MediaQuery) {
			queryRule = MediaQuery[query].media.split(/\s+and\s+/i)
			
			//first rule may be device or feature
			i = (/\(.*\)/.test(queryRule[0])) ? 0 : 1
			if (i && device.indexOf(queryRule[0].toLowerCase())==-1) continue

			//next rules are features
			while (n = queryRule[i++]) {
				switch ( n.substr(0,n.search(/:|\)/)) ) {
					//width, height, device-width, device-height
					case '(width':
					case '(height':
					case '(device-width':
					case '(device-height': 
						if (
							n.substring(n.indexOf(':')+1,n.indexOf('px')) != 
							( (/width/.test(n)) ? 
							(/device/.test(n)) ? deviceWidth : width :
							(/device/.test(n)) ? deviceHeight : height )
						) 
							continue nextquery
						break
					case '(max-width':
					case '(max-height':
					case '(max-device-width':
					case '(max-device-height': 
						if (
							n.substring(n.indexOf(':')+1,n.indexOf('px')) <= 
							( (/width/.test(n)) ? 
							(/device/.test(n)) ? deviceWidth : width :
							(/device/.test(n)) ? deviceHeight : height )
						)
							continue nextquery
						break
					case '(min-width':
					case '(min-height':
					case '(min-device-width':
					case '(min-device-height': 
						if (
							n.substring(n.indexOf(':')+1,n.indexOf('px')) >= 
							( (/width/.test(n)) ? 
							(/device/.test(n)) ? deviceWidth : width :
							(/device/.test(n)) ? deviceHeight : height )
						) 
							continue nextquery
						break
					//orientation
					case '(orientation': 
						if (n.substring(n.indexOf(':')+1,n.indexOf(')')) != orientation) 
							continue nextquery
						break
					//aspect-ratio, device-aspect-ratio
					case '(aspect-ratio': 
					case '(device-aspect-ratio': 
						x = n.substring(n.indexOf(':')+1,n.indexOf(')'))
						if (/\//.test(x)) x = 
							x.substr(0,x.indexOf('/'))/
							x.substr(x.indexOf('/')+1)
						if ( x != ((/device/.test(n)) ? deviceAspectRatio : aspectRatio) ) 
							continue nextquery
						break
					case '(max-aspect-ratio': 
					case '(max-device-aspect-ratio':
						x = n.substring(n.indexOf(':')+1,n.indexOf(')'))
						if (/\//.test(x)) x = 
							x.substr(0,x.indexOf('/'))/
							x.substr(x.indexOf('/')+1)
						if ( x <= ((/device/.test(n)) ? deviceAspectRatio : aspectRatio) ) 
							continue nextquery
						break
					case '(min-aspect-ratio': 
					case '(min-device-aspect-ratio': 
						x = n.substring(n.indexOf(':')+1,n.indexOf(')'))
						if (/\//.test(x)) x = 
							x.substr(0,x.indexOf('/'))/
							x.substr(x.indexOf('/')+1)
						if ( x >= ((/device/.test(n)) ? deviceAspectRatio : aspectRatio) ) 
							continue nextquery
						break
					//color, color-index
					case '(color': 
					case '(color-index': 
						if (n=='(color)' || n=='(color-index)' ) break
						if ( n.substring(n.indexOf(':')+1,n.indexOf(')')) != ((/index/.test(n)) ? colorIndex : color) ) 
							continue nextquery
						break
					case '(max-color':
					case '(max-color-index': 
					case '(min-color': 
					case '(min-color-index': break
					//monochrome
					case '(monochrome':
					case '(max-monochrome':
					case '(min-monochrome': continue nextquery
					//resolution
					case '(resolution': 
						if (n=='(resolution)') continue nextquery
						if ( n.substring(n.indexOf(':')+1,n.indexOf('dpi')) != resolution ) continue nextquery	
						break
					case '(max-resolution': 
						if ( n.substring(n.indexOf(':')+1,n.indexOf('dpi')) <= resolution ) continue nextquery	
						break
					case '(min-resolution': 
						if ( n.substring(n.indexOf(':')+1,n.indexOf('dpi')) >= resolution ) continue nextquery	
						break
					//scan
					case '(scan': 
						if (n=='(scan)') continue nextquery
						if ( n.substring(n.indexOf(':')+1,n.indexOf(')')) != scan ) continue nextquery	
						break
					//grid
					case '(grid': 
						if (
							( n=='(grid)' && 0 != grid ) ||
							( n.substring(n.indexOf(':')+1,n.indexOf(')')) != grid )
						) continue nextquery
						break
					default: continue nextquery
				}
				
				
				
			}
			
			Style += MediaQuery[query].style
		}	
		redraw(Style)
	}

	
	updateQuery()//Query at first run
	
	//Attach handler on window resize event
	if (window.addEventListener) window.addEventListener('resize', updateQuery, false);
	else if (window.attachEvent) window.attachEvent('onresize', updateQuery);
	else window.onresize = updateQuery;
	
	
}(window,document))