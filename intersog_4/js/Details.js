/*
Details (like HTML5 <details>) plugin ver. 0.3.2
*/


//Details - global object
(function(document, window, $){
	// $ - internal vaeriable for global object
	$.onbeforetoggle = $.onbeforetoggle || function(data){} 
	$.onaftertoggle = $.onaftertoggle || function(data){}
	$.ontoggle = $.ontoggle || function(data){ //toggle details event
		data.details.style.height = (data.opened) ? 'auto': data.summary.offsetHeight+'px';
	} 
	$.onopen = $.onreset || function(data){}
	$.onclose = $.onreset || function(data){}
	
	$.options = (typeof $.options === 'object') && $.options || {}
	$.options = {
		events: $.options.events || 'click',
		activeClass: $.options.activeClass || 'active',
		defultSummaryText: $.options.defultSummaryText || 'Details'
	}
	
	var details = [], //like-details elements on the page
		IE = (!-[1,]); //is IE <9
	//fix for old IE
	document.createElement('summary')
	
	$.init = function(){
		var d=0, x, i, el,
			detail, summary;

		//remove previous events at every init()
		while ( (summary = details[d++]) && (summary = summary.getElementsByTagName('summary')[0]) ) {
			removeEvents(summary, $.options.events, details[d-1].detailsToggle||null)
		}
		
		details = getElementsByClass(document,'js-details') //renew array
		
		d=0; while (detail = details[d++]) {
			//if NO <summary>, do <summary>
			summary = detail.getElementsByTagName('summary')
			if (summary.length)
				summary = summary[0]
			else {
				summary = document.createElement('summary')
				summary.innerHTML = $.options.defultSummaryText
				detail.insertBefore(summary, detail.getElementsByTagName('*')[0])
			}
			
			detail.style.overflow = 'hidden'
			detail.detailsToggle = eventHandler(detail, summary) //save handler in element
			addEvents(summary, $.options.events, detail.detailsToggle)
		}
	}
	
	//Open/close all details on page, or group of details
	//argument (group) - is string, name of group to be opened/closed. It is optional.
	$.open = function(group){}
	$.close = function(group){}
		
	//Event handler function, called by every event defined in options
	function eventHandler(detail, summary){
		return function (e) {
			e = e || window.event || {}
			e.target || (e.target = e.srcElement || null)
			
			x = (detail.getAttribute('data-opened') !== null)
			
			var data = {
				details: detail,
				summary: summary,
				group: [],
				opened: x,
				event: e
			},
			dataG = { //data object for closing group events
				//details: later,
				//summary: later,
				group: [], //always epty for group event
				opened: false,
				event: e
			}
			//toggle event
			if (typeof $.onbeforetoggle === 'function')	$.onbeforetoggle(data)
			 
			if (x) {
				detail.removeAttribute('data-opened')
				if (IE) {detail.style.height = 0; detail.style.height = ''}
				data.opened = false
			}
			else {
				if (x = detail.getAttribute('data-detailgroup'), x !== null) {
					i=0; while (el = details[i++])
						if (
							el.getAttribute('data-detailgroup') === x 
							&& (dataG.opened = (el.getAttribute('data-opened') !== null))
							) {
							data.group.push(el)
							dataG.details = el
							dataG.summary = el.getElementsByTagName('summary')[0]
							//toggle event for group <like-details> element
							if (typeof $.onbeforetoggle === 'function') $.onbeforetoggle(dataG) 
							el.removeAttribute('data-opened')
							if (IE) {detail.style.height = 0; detail.style.height = ''}
							dataG.opened = false
							//toggle event for group <like-details> element
							if (typeof $.ontoggle === 'function') $.ontoggle(dataG) 
							//toggle event for group <like-details> element
							if (typeof $.onaftertoggle === 'function') $.onaftertoggle(dataG) 
						}
				}
				detail.setAttribute('data-opened','true')
				if (IE) {detail.style.height = 0; detail.style.height = ''}
				data.opened = true
			}
			//toggle event
			if (typeof $.ontoggle === 'function') $.ontoggle(data)
			//toggle event
			if (typeof $.onaftertoggle === 'function') $.onaftertoggle(data);
			
			//prevent default behavior
			(e.preventDefault) ? e.preventDefault() : (e.returnValue = false)
		}
	}
	
/*necessary functions*/
	function getElementsByClass(elem,clss) {
		var list, result = [], i=0, el
		if (!!document.getElementsByClassName) { 
			list = elem.getElementsByClassName(clss)
			while (el = list[i++])
				result.push(el)
			return result
		}
		list = elem.getElementsByTagName('*') 
		while (el = list[i++])
			if (el.className.search('\\b'+clss+'\\b') != -1) result.push(el)
		return result	
	}
	
	function addEvents(elem, type, handler){
		type = type.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,'').split(/\s+/)
		var i=0, event
		while (event = type[i++]) {
			if (elem.addEventListener) elem.addEventListener(event, handler, false)
			else if (elem.attachEvent) elem.attachEvent('on'+event, handler)
			else elem['on'+event] = handler
		}
    }
	
	function removeEvents(elem, type, handler){
		type = type.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,'').split(/\s+/)
		var i=0, event
		while (event = type[i++]) {
			if (elem.removeEventListener) elem.removeEventListener(event, handler, false)
			else if (elem.detachEvent) elem.detachEvent('on'+event, handler)
			else elem['on'+event] = null
		}
    }

	
	function getChildrens(node) {
		var childList = node.childNodes, Arr = [], i=0, el;
		while (el = childList[i++])
			if (el.nodeType == 1) Arr.push(el)
		return Arr
	}
	
	function addClass(el,clss){
		if (!el) return
		el.className || (el.className = clss)
		if (el.className.indexOf(clss)==-1) el.className += ' '+clss
	}
	
	function removeClass(el,clss){
		if (!el) return
		el.className = el.className.replace(
			RegExp('\\b'+$.options.activeClass+'\\b\\s|\\s\\b'+$.options.activeClass+'\\b|\\b'+$.options.activeClass+'\\b'), ''
		)
	}

	function domReady (handler){
		var called = false
		function ready(){if(called) return;	called=true; handler()}
		if (document.addEventListener) document.addEventListener("DOMContentLoaded", ready, false) 
		else if(document.attachEvent){
			if (document.documentElement.doScroll && window == window.top){
				function tryScroll(){
					if (called) return
					if (!document.body) return
					try {document.documentElement.doScroll("left");	ready()} catch(e) {setTimeout(tryScroll, 0)}
				}
				tryScroll()
			}
			document.attachEvent("onreadystatechange", function(){if(document.readyState === "complete" ) ready()})
		}	
		if(window.addEventListener) window.addEventListener('load', ready, false)
		else if(window.attachEvent) window.attachEvent('onload', ready)
	};	
	
	//Details initialisation. Istant or after DOMready.
	(document.body) ? $.init() : domReady(function(){$.init()})
	
	//Expose Details to the global object
	window.Details = $;

	
}(document, window, window.Details||{}));