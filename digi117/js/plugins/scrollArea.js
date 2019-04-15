/*
Scroller plugin v 0.3.1


							How does it work:



*/




(function(document, window){
	
	
	var TchDevice = 'createTouch' in document, //Define touch screen, true or false
		$; //internal vaeriable for global object
	
	// Check CSS3, from Modernizr
	var	CSS_OverflowScrolling;									
	(function(document, window){
		domPrefixes = 'Webkit Moz O ms Khtml'.split(' ')
		testElem = document.createElement('test')
		test_style = testElem.style
		function test_props_all( prop ) { 
			var uc_prop = prop.charAt(0).toUpperCase() + prop.substr(1)
			props   = (prop + ' ' + domPrefixes.join(uc_prop + ' ') + uc_prop).split(' ')
			return !!test_props( props );
		}
		
		function test_props (props) {
			for (var i in props)
				if (test_style[ props[i] ] !== undefined) 
					return true
		}
		//transitionProperty, backgroundsize, borderimage, boxShadow, animationName, columnCount, boxReflect, overflowScrolling
		
		CSS_OverflowScrolling = test_props_all('overflowScrolling')
		
		domPrefixes,testElem,test_style = null
	}(document, window))
	
	function fixEvent(e) {
		// получить объект событие для IE
		e = e || window.event
		// добавить pageX/pageY для IE
		if ( e.pageX == null && e.clientX != null ) {
			var html = document.documentElement
			var body = document.body
			e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
			e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
		}	
		// добавить which для IE
		if (!e.which && e.button) {
			e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) )
		}
		return e
	}
	
	function getElementByClass(elem, clss){
		var list, i=0, el
		if (!!document.getElementsByClassName) return elem.getElementsByClassName(clss)[0]
		list = elem.getElementsByTagName('*')
		while (el = list[i++])
			if (el.className.search('\\b'+clss+'\\b')!=-1) return el
		return null	
	}
	
	function getElementsByClass(elem, clss) {
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
	
	function getOffsetPosition(elem) {
		if (elem.getBoundingClientRect) {
			var box = elem.getBoundingClientRect(),
				body = document.body,
				docElem = document.documentElement,
				scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
				scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
				clientTop = docElem.clientTop || body.clientTop || 0,
				clientLeft = docElem.clientLeft || body.clientLeft || 0,
				top  = box.top +  scrollTop - clientTop,
				left = box.left + scrollLeft - clientLeft;

			return { left: Math.round(left), top: Math.round(top) }
		} else {
			var top = 0, left = 0;
			while (elem) {
				top = top + parseInt(elem.offsetTop)
				left = left + parseInt(elem.offsetLeft)
				elem = elem.offsetParent
			}
		
			return {x: left, y: top}
		}
	}
	
	function getStyle(el, cssprop) {
		if (document.defaultView && document.defaultView.getComputedStyle)
			return document.defaultView.getComputedStyle(el, null).getPropertyValue(cssprop)
		else if (el.currentStyle) {
			var re = /\-(\w)/g
			cssprop = cssprop.replace(re, function (strMatch, p1){ return p1.toUpperCase() })
			if (cssprop=='float') cssprop='styleFloat'
			return el.currentStyle[cssprop]
		}
	}
	
	function getFirstChild(elem){
		var i=0, el, list = elem.childNodes
		while (el = list[i++])
			if (el.nodeType == 1) return el
		return null
	}
	
	function domReady (handler){
		var called = false
		function ready(){if(called) return;	called = true; handler()}
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
	}
	
	// получить сдвиг target относительно курсора мыши
	function getPointerOffset(target, e) {
		var docPos	= getOffsetPosition(target)
		// TouchOffset
		if (e.touches) {
			var touch =  e.touches[0] || e.changedTouches[0] || e.targetTouches[0]
			return {x:touch.pageX - docPos.left, y:touch.pageY - docPos.top}
		}
		// or MouseOffset
		return {x: e.pageX - docPos.left, y: e.pageY - docPos.top}
	}
	
	function noScroll(e) {e.preventDefault()}
	
	function noMove(e) {e.stopPropagation()}
	
	//Scroll attach function
	function ScrollMaster(draggerV, draggerH, areaInnerHeight) {
		
		function doScroll(){
			draggerV.style.top = parseInt(this.scrollTop)/areaInnerHeight*100+'%'
			//draggerH.style.left = parseInt(area.scrollLeft)/areaInnerWidth*100+'%'
		}
		
		//Прокрутка с помощью жестов над текстом
		if (TchDevice) {
			var touchOffset;
			function doMove(e){
				var touch = e.touches[0] || e.changedTouches[0] || e.targetTouches[0]
				this.scrollTop = touchOffset.top - touch.pageY
				return false
			}
		}
		

		return {
			makeScrollable: function (area) {
				
				area.onscroll = null
				area.onscroll = doScroll
				
				if (!TchDevice) return
				
				if (CSS_OverflowScrolling) {
					area.ontouchmove = noMove
					area.style.WebkitOverflowScrolling = 'touch'
					return
				}
				
				area.ontouchstart = function(e){ 
					touchOffset = (function(target, e){
						var touch = e.touches[0] || e.changedTouches[0] || e.targetTouches[0] 
						return {left: touch.pageX + target.scrollLeft, top: touch.pageY + target.scrollTop} 
					}(this, e))
					area.ontouchmove = doMove
				}	
				area.ontouchend = function(){area.ontouchmove = area.ontouchend = null}
			}
		}
	}
	
	//Drug & drop attach function
	function DragMaster (area, coef, scrollbar) {
		var pointerOffset,
			topspace = getOffsetPosition(scrollbar).top; //отступ сверху, необходим для правильной прокрутки
		
		function mouseMove(e){
			e = fixEvent(e)	
			area.scrollTop = (e.pageY - pointerOffset.y - topspace)*coef
			return false
		}
		
		function touchMove(e){
			e.preventDefault()
			var touch = e.touches[0] || e.changedTouches[0] || e.targetTouches[0]
			area.scrollTop = (touch.pageY - pointerOffset.y - topspace) * coef
			//return false
		}
	
		function mouseDown(e) {
			e = fixEvent(e)
			if (e.which!=1) return	
			// получить сдвиг элемента относительно курсора мыши
			pointerOffset = getPointerOffset(this, e)
			addDocumentEventHandlers()
			return false
		}
		
		function touchDown(e) {
			//if(e.touches.length!=1) return	
			// получить сдвиг элемента относительно курсора мыши
			pointerOffset = getPointerOffset(this, e)
			addDocumentEventHandlers()
			//if (!e.changedTouches) document.ontouchmove = mouseMove
			return false
		}
		
		function addDocumentEventHandlers() {
			document.onmousemove = mouseMove
			document.ontouchmove = touchMove //for touch device
			document.onmouseup = removeDocumentEventHandlers // очистить обработчики, т.к перенос закончен
			document.ontouchend = removeDocumentEventHandlers // очистить обработчики, т.к перенос закончен
			document.ondragstart = document.body.onselectstart = function() {return false}
		}
		function removeDocumentEventHandlers() {
			document.onmousemove = document.onmouseup = document.ondragstart = document.body.onselectstart = document.ontouchmove = document.ontouchend = null
		}

		return {
			makeDraggable: function(draggerV, draggerH){
				if (TchDevice) 
					draggerV.ontouchstart = touchDown //for touch device
				else 
					draggerV.onmousedown = mouseDown
			}
		}
	
	}
	
	
	$ = {
		set: function(element){
			
			var i, x
			//create divs
			var scrollarea = document.createElement('div')
			scrollarea.className = 'scrollarea'
			scrollarea.style.position = 'relative'
			scrollarea.style.height = '100%'
			scrollarea.style.width = '100%'
			scrollarea.style.padding = '0'
			scrollarea.style.margin = '0'
			
			var area = document.createElement('div')
			area.className = 'area'
			area.style.margin = 0
			area.style.padding = 0
			area.style.width = '100%'
			area.style.height = '100%'
			
			var scrollinner = document.createElement('div')
			scrollinner.className = 'scrollinner'
			scrollinner.style.padding = 0
			if (TchDevice) scrollinner.style.paddingRight = '16px'
			scrollinner.style.margin = 0
			
			//consider padding property of container element
			scrollarea.style.paddingLeft = getStyle(element, 'padding-left')
			scrollarea.style.paddingTop = getStyle(element, 'padding-top')
			scrollarea.style.paddingRight = getStyle(element, 'padding-right')
			scrollarea.style.paddingBottom = getStyle(element, 'padding-bottom')
			scrollarea.style.marginLeft = '-'+scrollarea.style.paddingLeft
			scrollarea.style.marginTop = '-'+scrollarea.style.paddingTop
			//scrollarea.style.marginRight = '-'+scrollarea.style.paddingRight
			scrollarea.style.marginBottom = '-'+scrollarea.style.paddingBottom
			

			//create decorative scrollbars
			var scrollbar = document.createElement('div')
			scrollbar.className = 'scrollbar scrollbar-vertical'
			scrollbar.innerHTML = '\
			<span class="background"></span><span class="dragger dragger-vertical"></span><span class="arrow-up"></span><span class="arrow-down"></span>'
					
			//append scrollable content and scrollbars to outer div
			scrollarea.appendChild(area).appendChild(scrollinner)
			scrollarea.appendChild(scrollbar)
			
			//move inner content to new div
			var InnerText = (function(){
				var el, i=0, Arr=[]
				while (el = element.childNodes[i++])
					if (el.nodeType == 1 || el.nodeType == 3) Arr.push(el)
				return Arr
			}())
			
			i=0; while (x = InnerText[i++])
				scrollinner.appendChild(x)
			
			element.appendChild(scrollarea)
			
			//Hardware acceleration on touchdevice
			if (TchDevice) {
				area.style.WebkitTransform = 'translateZ(0)'
				area.style.MozTransform = 'translateZ(0)'
				area.style.MsTransform = 'translateZ(0)'
				area.style.OTransform = 'translateZ(0)'
				area.style.transform = 'translateZ(0)'
			}
			
			//Events
			//Прокрутка стрелками вверх/вниз
			if (!TchDevice) {
				getElementByClass(scrollbar, 'arrow-up').onmousedown = function(){
					area.scrollTop+=-40
				}
				getElementByClass(scrollbar, 'arrow-down').onmousedown = function(){
					area.scrollTop+=40
				}				
			} else {
				getElementByClass(scrollbar, 'arrow-up').ontouchstart = function(){
					area.scrollTop+=-40
					return false
				}
				getElementByClass(scrollbar, 'arrow-down').ontouchstart = function(){
					area.scrollTop+=40
					return false
				}

			}
		},
		
		//Recalculate scrollbar apearence and sizes
		update: function(elem) {
			if (!!elem)
				buildScrollbars(elem)
			else {
				var i = 0, el, elem = getElementsByClass(document, 'js-scroll')
					while (el = elem[i++]) 
						buildScrollbars(el)
			}
			
			
			function buildScrollbars(element){
				var x,
					scrollarea = getElementByClass(element, 'scrollarea'),
					area = getElementByClass(element, 'area'),
					scrollinner = getElementByClass(element, 'scrollinner'),
					scrollbar = getElementByClass(element, 'scrollbar');

				scrollinner.style.paddingBottom = '1px'// для правильного расчёта высоты scrollinner	
				scrollarea.style.overflow = 'visible'// тоже для расчёта высоты
				
				var	draggerV = getElementByClass(scrollbar, 'dragger-vertical'),
					draggerH = getElementByClass(scrollbar, 'dragger-horizontal'),
					areaHeight = area.offsetHeight, //высота блока с прокруткой
					areaInnerHeight = scrollinner.offsetHeight - 1;
						//высота контента в блоке с прокруткой с вычетом специально добавленного отступа
				scrollinner.style.paddingBottom = '' // обнуление отступа, т.к. он больше не нужен

				x = element.getAttribute('data-origin-overflow-y') || getStyle(element, 'overflow-y')
				element.setAttribute('data-origin-overflow-y', x)
				
				if (/auto|scroll/i.test(x) && areaHeight < areaInnerHeight) { // show scrollbars
					element.style.overflow = 'hidden'
					scrollarea.style.overflow = 'hidden'
					area.style.padding = '0 '+ (parseInt(getStyle(element, 'padding-right'), 10) + 30) +'px 0 0'
					area.style.overflowY = x
					scrollbar.style.display = 'block'
				} else if (areaHeight == areaInnerHeight) { //bugfix in Opera mobile
					scrollbar.style.display = 'none'
					area.style.padding = 0
					area.style.overflow = scrollarea.style.overflow = 'visible'
				} else { // hide scrollbars
					scrollbar.style.display = 'none'
					area.style.padding = 0
					scrollarea.style.overflow = getStyle(element, 'overflow')
				}

				//try catch ,т.к. может быть деление на 0
				try { 
					//draggerV.style.height = (areaHeight/areaInnerHeight*100+'%')
					draggerV.style.height = (areaHeight/areaInnerHeight)*draggerV.parentNode.offsetHeight+'px'
				} 
				catch (err) {}
								
				//Scroll handler
				ScrollMaster(draggerV, draggerH, areaInnerHeight).makeScrollable(area)
				
				//Drag & Drop handler
				var coef = areaInnerHeight/scrollbar.offsetHeight;
						//коеффициент ускорения прокрутки при передвижении скроллбара курсором
				DragMaster(area, coef, scrollbar).makeDraggable(draggerV, draggerH) //привязка Drag & Drop к скроллеру
				

				//$(textscroller).mousewheel(function(e){e.stopPropagation()}) 
			}
			
			return this
		}
	}
	
	
	function init(){
		var i = 0, el, elem = getElementsByClass(document, 'js-scroll')
			while (el = elem[i++]) {
				$.set(el)
				$.update(el)
			}
	}
	
	//Tabs initialisation. Istant or after DOMready.
	;(document.body) ? init() : domReady(function(){init()})
	
	//Expose Tab to the global object
	window.ScrollArea = $
	
}(document, window));