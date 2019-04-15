/*
Tabs plugin ver. 0.3.2
*/




//Tab - global object
(function(document, window, $){
	
	// $ - internal vaeriable for global object
	
	$.onbeforeswitch = $.onbeforeswitch || function(info){} 
	$.onafterswitch = $.onafterswitch || function(info){}
	$.onswitch = $.onswitch || function(info){ //switch tab event
		removeClass(info.prevTab, $.options.activeClass)
		removeClass(info.prevContent, $.options.activeClass)
		addClass(info.tab, $.options.activeClass)
		addClass(info.content, $.options.activeClass)	
	} 
	$.onreset = $.onreset || function(info){}
	
	$.options = $.options || {}
	$.options = {
		events: $.options.events || 'click',
		activeClass: $.options.activeClass || 'active'
	}
	
	$.init = function(){
		var t=0, x, i,
			tab, tabs, tabsElem = getElementsByClass(document,'js-tabs'),
			content, contents, contentsElem,
			el, closeElem = getElementsByClass(document,'js-tabs-close')
			
		while (tabs = tabsElem[t++]) {
			x = tabs.getAttribute('data-tab-content')
			if (x===null) continue
			contentsElem = document.getElementById(x)
			tabs = tabs.getElementsByTagName('a')
			contents = getChildrens(contentsElem)
			i=0; while (tab = tabs[i++]) {
				addEvents(tab, $.options.events, (function(tab, tabs, contents, contentsElem){ return function(e){
					e = e || window.event
					e.target || (e.target = e.srcElement)
					
					var info = {}
					info.index = getIndex(tab, tabs)
					info.anchor = (tab.href.indexOf('#')!=-1) ? tab.href.substr(tab.href.lastIndexOf('#')+1) : ''
					info.tab = tab
					info.tabContainer = tabs
					info.content = (info.anchor) ? document.getElementById(info.anchor) : contents[info.index]
					info.contentContainer = contentsElem
					info.prevTab = getActiveTab(tabs)
					info.prevContent = getActiveContent(contentsElem)
					info.event = e

					//switch events
					$.onbeforeswitch(info);
					$.onswitch(info);
					$.onafterswitch(info);
					
					//prevent default behavior
					if (e.type == 'click') {
						;(e.preventDefault) ? e.preventDefault() : (e.returnValue = false)
					}
				} }(tab, tabsElem[t-1], contents, contentsElem)))
				
				//allways prevent default behavior on ckick
				if ($.options.events.indexOf('\\bclick\\b')==-1) 
					addEvents(tab, 'click', function(e){
						e = e || window.event
						;(e.preventDefault) ? e.preventDefault() : (e.returnValue = false)
					})
			}
		}
		
		t=0; while (el = closeElem[t++]) {
			x = el.getAttribute('data-tab-close')
			if (x==null) continue
			tabsElem = document.getElementById(x)

			addEvents(el, $.options.events, (function(tabsElem){ return function(e){
				e = e || window.event
				e.target || (e.target = e.srcElement)
				$.reset(tabsElem, e);
				//prevent default behavior
				;(e.preventDefault) ? e.preventDefault() : (e.returnValue = false)
			} }(tabsElem)))
		}
	}
	
	//Reset Tabs to default state - no one is active
	//argument - id (string) or link (object) to tabs container element, that has data-tab-content attribute
	$.reset = function(t, e){
		var tabCon = (typeof t === 'string') ? document.getElementById(t) : t,
			contentCon, x, info = {};
		if (!tabCon) return
		x = tabCon.getAttribute('data-tab-content')
		if (x==null) return
		contentCon = document.getElementById(x)
		
		//reset info
		info.index = -1
		info.anchor = ''
		info.tab = null
		info.tabContainer = tabCon
		info.content = null
		info.contentContainer = contentCon
		info.prevTab //see below
		info.prevContent //see below
		info.event = e || {type: 'reset', target: null}
		
		//remove active class of tab
		removeClass(info.prevTab = getActiveTab(tabCon), $.options.activeClass)
		//remove active class of content
		removeClass(info.prevContent = getActiveContent(contentCon), $.options.activeClass)

		//reset event
		$.onreset(info)
		
		//return global object
		return $
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
	
	function getChildrens(node) {
		var childList = node.childNodes, Arr = [], i=0, el;
		while (el = childList[i++])
			if (el.nodeType == 1) Arr.push(el)
		return Arr
	}
	
	function getIndex(child, parent){
		var el, i=0, list = getChildrens(parent)
		while (el = list[i++])
			if (el===child) return i-1
		return -1
	}
	
	function getActiveTab(t){
		var tab = t.getElementsByTagName('a'), i=0, el
		while (el = tab[i++])
			if (el.className.search('\\b'+$.options.activeClass+'\\b') != -1) return el
	}
	
	function getActiveContent(c){ 
		var content = getChildrens(c), i=0, el
		while (el = content[i++])
			if (el.className.search('\\b'+$.options.activeClass+'\\b') != -1) return el
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
	
	//Tabs initialisation. Istant or after DOMready.
	(document.body) ? $.init() : domReady(function(){$.init()})
	
	//Expose Tab to the global object
	window.Tab = $;

	
}(document, window, window.Tab||{}));