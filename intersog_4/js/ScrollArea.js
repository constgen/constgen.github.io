/*
Scroller plugin v 0.1.0


							How does it work:



*/




(function(document, window){
	
	//Define touch screen
	var TchDevice = 'createTouch' in document, //true or false
		$ //internal vaeriable for global object
	
	function noScroll(e) {e.preventDefault()}
	
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
	
	function getPosition(e){
		var left = 0
		var top  = 0
		while (e.offsetParent) {
			left += e.offsetLeft
			top  += e.offsetTop
			e	 = e.offsetParent
		}	
		left += e.offsetLeft
		top  += e.offsetTop
		return {x:left, y:top}
	}
	
	function getCSS(){return 'auto'}
	
	function getFirstChild(elem){
		var i=0, el, list = elem.childNodes
		while (el = list[i++])
			if (el.nodeType == 1) return el
		return null
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
	}
	
	// получить сдвиг target относительно курсора мыши
			function getPointerOffset(target, e) {
				var docPos	= getPosition(target)
				// TouchOffset
				if (e.touches) {
					var touch =  e.touches[0] || e.changedTouches[0] || e.targetTouches[0]
					return {x:touch.pageX - docPos.x, y:touch.pageY - docPos.y}
				}
				// or MouseOffset
				return {x:e.pageX - docPos.x, y:e.pageY - docPos.y}
			}
	
	$ = {
		dragMaster: function(area, coef, topspace){
			var pointerOffset

			function mouseMove(e){
				e = fixEvent(e)	
				area.scrollTop = (e.pageY - pointerOffset.y - topspace)*coef
				return false
			}
			
			function touchMove(e){
				e.preventDefault()
				var touch = e.touches[0] || e.changedTouches[0] || e.targetTouches[0]
				area.scrollTop = (touch.pageY - pointerOffset.y - topspace)*coef
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
			
			//Прокрутка с помощью жестов над текстом
			/*if (TchDevice) {
				var touchOffset, topOffset
				area.ontouchstart = function(e){ 
					touchOffset = (function(target, e){
						var touch = e.touches[0] || e.changedTouches[0] || e.targetTouches[0] 
						return {x:touch.pageX + target.scrollLeft, y:touch.pageY + target.scrollTop} 
					}(this, e))
					area.ontouchmove = scrollerMove
					return false
				}	
				function scrollerMove(e){
					var touch = e.touches[0] || e.changedTouches[0] || e.targetTouches[0]
					area.scrollTop = touchOffset.y - touch.pageY
					return false
				}
				area.ontouchend = function(){area.ontouchmove = area.ontouchend = null}
			}
			*/
			return {
				makeDraggable: function(element){
					if (TchDevice) 
						element.ontouchstart = touchDown //for touch device
					else 
						element.onmousedown = mouseDown
				}
			}
		
		},

		set: function(element){
			
			var i, x
			//create divs
			var scrollarea = document.createElement('div')
			scrollarea.className = 'scrollarea'
			var area = document.createElement('div')
			area.className = 'area'
			var scrollinner = document.createElement('div')
			scrollinner.className = 'scrollinner'
			
			//create decorative scrollbar
			var scrollbar = document.createElement('div')
			scrollbar.className = 'scrollbar'
			scrollbar.innerHTML = '<span class="arrow-up"></span><span class="arrow-down"></span><span class="background"></span><span class="dragger"></span>'
			
			//append scrollable content and scrollbar to outer div
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
			
			var /*area = getElementByClass(element, 'area'),*/
				/*scrollbar = getElementByClass(element, 'scrollbar'),*/
				dragger = getElementByClass(scrollbar, 'dragger'),
				areaHeight = area.offsetHeight, //высота блока с прокруткой
				areaInnerHeight = getFirstChild(area).offsetHeight, //высота контента в блоке с прокруткой
				//коеффициент ускорения прокрутки при передвижении скроллбара курсором
				coef = areaInnerHeight/scrollbar.offsetHeight
				topspace = getPosition(scrollbar).y //отступ сверху, необходим для правильной прокрутки
			
			
			x = getCSS(area, 'overflow-y')
			
			if (/auto|scroll/i.test(x) /*&& areaHeight < areaInnerHeight*/) {
				element.style.overflow = 'visible'
				area.style.overflowY = x
				scrollbar.style.display = 'block'
			} else {
				scrollbar.style.display = 'none'
				//dragger.style.top = 0
			}

			
			//try catch ,т.к. может быть деление на 0
			try { dragger.style.height = (areaHeight/areaInnerHeight*100+'%') } 
			catch (e) {}
			
			area.onscroll = moveScroll
			function moveScroll(e){
				dragger.style.top = parseInt(area.scrollTop)/areaInnerHeight*100+'%'
				//draggerX.style.left = parseInt(area.scrollLeft)/areaInnerWidth*100+'%'
			}
			
			this.dragMaster(area, coef, topspace).makeDraggable(dragger) //привязка Drag & Drop к скроллеру
			
			if (areaHeight == areaInnerHeight) {
				scrollbar.style.display = 'none'
				area.ontouchstart = function(){document.body.removeEventListener('touchmove', noScroll, false)}
				area.ontouchend = function(){document.body.addEventListener('touchmove', noScroll, false)}
				area.style.padding = 0
				area.style.overflow = scrollarea.style.overflow = 'visible'
			}
			
			//Прокрутка стрелками вверх/вниз
			if(!TchDevice) {
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
				
			//$(textscroller).mousewheel(function(e){e.stopPropagation()}) 
					
			
			
		},
		
		update: function(){
			var i = 0, el, elem = getElementsByClass(document, 'js-scroll')
			while (el = elem[i++])
				$.set(el)
		}
	}
	
	
	//Tabs initialisation. Istant or after DOMready.
	;(document.body) ? $.update() : domReady(function(){$.update()})
	
	//Expose Tab to the global object
	window.ScrollArea = $
	
}(document, window));