
// Browser events extension for Core

Core.extend(function(Core){

	var Event = (function(window, document){
			
		//Define touch screen
		var TchDevice = ('createTouch' in document) || (/android|blackberry/i.test(navigator.userAgent) && 'ontouchstart' in window) //true or false
		
		// текущий номер обработчика
		var guid = 0
		
		function fixEvent(event){
			// получить объект события
			event = event || window.event
			
			// один объект события может передаваться по цепочке разным обработчикам
			// при этом кроссбраузерная обработка будет вызвана только 1 раз
			if(event.isFixed) return event
			event.isFixed = true // пометить событие как обработанное
			
			// добавить preventDefault/stopPropagation для IE
			event.preventDefault || (event.preventDefault = function(){this.returnValue = false; this.defaultPrevented = true})
			event.stopPropagation || (event.stopPropagation = function(){this.cancelBubble = true})
	
			// добавить target для IE
			event.target || (event.target = event.srcElement || '');
			
			// добавить relatedTarget в IE, если это нужно
			if(!event.relatedTarget && event.fromElement)
				event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;
			
			//альтернатива timeStamp(врямя события) для всех браузеров
			event.time = event.timeStamp || (function(){var date=new Date(); return date.getTime()}())
			//добавить timeStamp для ИЕ, но не Опера
			if(!event.timeStamp&&event.timeStamp!=0) event.timeStamp = event.time
			
			//вычислить pageX/pageY для IE
			if(event.pageX == null && event.clientX != null){
				var html = document.documentElement, body = document.body
				event.pageX = event.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
				event.pageY = event.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
			}
	
			// записать нажатую кнопку мыши в which для IE
			// 1 == левая; 2 == средняя; 3 == правая
			//if(!event.which && event.button)
			//	event.which = (event.button & 1 ? 1 : (event.button & 2 ? 3 : (event.button & 4 ? 2 : 0) ))
			event.which || event.button && (event.which = event.button & 1 ? 1 : event.button & 2 ? 3 : event.button & 4 ? 2 : 0)
	
			return event
		}
		
		function cloneEvent(e){
			if(e.isCloned) return
			var event = []
			for (i in e) {event[i] = e[i]}
			event.isCloned=true
			return event
		}
		
		function uniteEvent(event){
			event.target || (event.target = event.changedTouches[0].target)
			event.pageX || (event.pageX = event.changedTouches[0].pageX||0)
			event.pageY || (event.pageY = event.changedTouches[0].pageY||0)
			event.screenX || (event.screenX = event.changedTouches[0].screenX||0)
			event.screenY || (event.screenY = event.changedTouches[0].screenY||0)
			event.clientX || (event.clientX = event.changedTouches[0].clientX||0)
			event.clientY || (event.clientY = event.changedTouches[0].clientY||0)
			return event
		}
		
		function checkElementUni(elem){
			if(!elem.uni){
				elem.uni = {}
				elem.pushed = false 
			}
		}
		
		/* Вызывается в контексте элемента всегда this = element */
		function commonHandle(event){
			event = fixEvent(event)
			event.unitype || (event.unitype = event.type)
			var handlers = this.events[event.unitype]
			for(var i in handlers){
				try{
					var ret = handlers[i].call(this, event)
					if(ret===false){
						event.preventDefault()
						event.stopPropagation()
					} else if (ret !== undefined)
						event.result = ret
				} catch(e){ throw e }
				
				//В jQuery аналогичный флаг ставится методом event.stopImmediatePropagation()
				if(event.stop) break
			}
		}
		
		
		function addEvent(elem, type, handler){
			if(elem.addEventListener) elem.addEventListener(type, handler, false)
			else if(elem.attachEvent) elem.attachEvent('on'+type, handler)
			//else elem['on'+type] = handler
		}
	
		
		
		function removeEvent(elem, type, handler){
			if(elem.removeEventListener) elem.removeEventListener(type, handler, false)
			else if(elem.detachEvent) elem.detachEvent('on'+type, handler)
			//else elem['on'+type] = null
		} 
		
		//function addEvent(elem, type, handler){
	//		if(elem.addEventListener){
	//			elem.addEventListener(type, handler, false)
	//			return handler
	//		}
	//		else if(elem.attachEvent){
	//			iehandler = function() { handler.call(elem) }
	//			elem.attachEvent("on"+type, iehandler)	
	//			return iehandler
	//		}
	//	} 
		
		function addClass (el, clss){
			el.className || (el.className = clss)
			if (el.className.indexOf(clss)==-1) el.className += ' '+clss
		}
		
		function removeClass (el, clss){
			if ( (new RegExp('\\b'+clss+'\\b')).test(el.className) )
				el.className = el.className.replace(new RegExp('\\b'+clss+'\\b\\s\|\\s\\b'+clss+'\\b\|\\b'+clss+'\\b'), '')
		}
		
		
		//Create touch/mouse event mutant from original event and fix it
		function createPointerUnitEvent(event, type, fix){
			(fix !== undefined) || (fix = true)
			if (!!event.initTouchEvent) {// all browsers with touch screen
				var e = document.createEvent('TouchEvent')
				
				try {//Android 2.3+
					e.initTouchEvent(event.touches, event.targetTouches, event.changedTouches,
								type, window,
								event.screenX||event.changedTouches[0].screenX||0,
								event.screenY||event.changedTouches[0].screenY||0,
								event.clientX||event.changedTouches[0].clientX||0,
								event.clientY||event.changedTouches[0].clientY||0, 
								event.ctrlKey, event.altKey, event.shiftKey, event.metaKey,
								event.scale||1, event.rotation||0);
					// iOS initiates this event, thats why check for wright arguments
					if (e.type != type) throw 'wrong arguments in initTouchEvent function'	
				} catch (err) {
					try {//iOS, Opera
						e.initTouchEvent(type, true, true, window, 0, 
								event.screenX||event.changedTouches[0].screenX||0,
								event.screenY||event.changedTouches[0].screenY||0,
								event.clientX||event.changedTouches[0].clientX||0,
								event.clientY||event.changedTouches[0].clientY||0, 
								event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, 
								event.touches, event.targetTouches, event.changedTouches, event.scale||1, event.rotation||0);	
					} catch (err2) {//Firefox
						e.initTouchEvent(type, true, true, window, 0, 
								event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, 
								event.touches, event.targetTouches, event.changedTouches, event.scale||1, event.rotation||0);
					}
					
				}
	
				(event.target) ? event.target.dispatchEvent(e) : event.changedTouches[0].target.dispatchEvent(e)
	
				e.target || (e.target = event.changedTouches[0].target)
				e.pageX || (e.pageX = event.changedTouches[0].pageX||0)
				e.pageY || (e.pageY = event.changedTouches[0].pageY||0)
				e.screenX || (e.screenX = event.changedTouches[0].screenX||0)
				e.screenY || (e.screenY = event.changedTouches[0].screenY||0)
				e.clientX || (e.clientX = event.changedTouches[0].clientX||0)
				e.clientY || (e.clientY = event.changedTouches[0].clientY||0)
				
				/*var msg = ''
				for (var x in e)
					msg += x+': '+e[x]+'\n'
				console.log(msg);*/
			
			} else if (!!event.initMouseEvent) {// all browsers except IE before version 9
				var e = document.createEvent('MouseEvent')
				e.initMouseEvent(type, true, true, window, 0, 
								event.screenX||0, event.screenY||0, event.clientX||0, event.clientY||0, 
								event.ctrlKey||false, event.altKey||false, event.shiftKey||false, event.metaKey||false, 
								event.button||0, event.relatedTarget||null)
				event.target.dispatchEvent(e)
			} else if(!!document.createEventObject) {// IE before version 9
				var e = document.createEventObject(window.event)
				e.type = type
				e.detail = event.detail
				e.screenX = event.screenX||0
				e.screenY = event.screenY||0
				e.clientX = event.clientX||0
				e.clientY = event.clientY||0
				e.ctrlKey = event.ctrlKey||false
				e.altKey = event.altKey||false
				e.shiftKey = event.shiftKey||false
				e.metaKey = event.metaKey||false
				e.button = event.button||0
				e.fromElement = event.fromElement||null
				e.toElement = event.toElement||null
				e.srcElement = event.srcElement
			} else if (!!event.initEvent) {// for despatching
				var e = document.createEvent('Event')
				e.initEvent(type, true, true)
				event.target.dispatchEvent(e)
			}

			e.scale || (e.scale = 1)
			e.rotation || (e.rotation = 0)
			return (fix) ? fixEvent(e) : e
		}
		
		//Create generic(resize,scroll,...) event mutant from original event and fix it
		function createUnitEvent (event, type, fix) {
			(fix != undefined) || (fix = true)
			if (event.initEvent) {// all browsers except IE before version 9
				var e = document.createEvent('Event')
				e.initEvent(type, false, false)
				event.target.dispatchEvent(e)
			} else if (document.createEventObject) {// IE before version 9
				var e = document.createEventObject(window.event)
				e.type = type
				e.srcElement = event.srcElement
			}
			
			return (fix) ? fixEvent(e) : e
		}
		
		
		
	  
		return {
			add: function (elem, type, handler) {
				// исправляем небольшой глюк IE с передачей объекта window
				if( elem.setInterval && (elem != window && !elem.frameElement) )
					elem = window
				
				
				//Назначить функции-обработчику уникальный номер. По нему обработчик можно будет легко найти в списке events[type].
				if (!handler.guid)
					handler.guid = ++guid
				
				//Инициализовать служебную структуру events и обработчик handle.
				//Обработчик handle фильтрует редко возникающую ошибку, когда событие отрабатывает после unload'а страницы.
				//Основная же его задача - передать вызов универсальному обработчику commonHandle с правильным указанием текущего элемента this.
				//Как и events, handle достаточно инициализовать один раз для любых событий
				
				//Если обработчиков такого типа событий не существует - инициализуем events[type] и вешаем elem.handle как обработчик на elem для запуска браузером по событию type
				if (!elem.events) {
					elem.events = {}
					elem.handle = function(event) {
						if (typeof Event !== "undefined")
							return commonHandle.call(elem, event)
					}
				}
				
				if(!elem.events[type]){
					elem.events[type] = {}        
		
					switch(type){
						case 'mouseenter':
						case 'mouseleave':
							if ('onmouseenter' in document.body) {addEvent(elem, type, elem.handle); break}
							checkElementUni(elem)
							if (!elem.uni[type]) {
								elem.uni[type]={}//elem.uni[mouseenter/mouseleave]
								elem.uni[type].handle = (function(){
									function checkIfChild (el,parent) {
										try {
											if (el.nodeName=='HTML') return true
											if (el===parent) return false
											return checkIfChild(el.parentNode,parent)
										} catch (e) {return true}
									}
									return (type == 'mouseenter') ? 
									/*mouseenter*/function(e) {
										if (e.target!==this) return
										else if (checkIfChild(e.relatedTarget,this)) {
											e = createPointerUnitEvent(e,type)
											elem.handle(e)
										}
									}:
									/*mouseleave*/function(e) {
										if (e.target!==this || !checkIfChild(e.relatedTarget,this)) return
										e = createPointerUnitEvent(e,type)
										elem.handle(e)
									}
									
								}())
	
								//use mouseover/mouseout
								addEvent(elem, (type=='mouseenter') ? 'mouseover' : 'mouseout', elem.uni[type].handle)
							}
							break
							
						case 'wheel':
						case 'mousewheel':
							if (elem===window) elem = document //there are bugs with attaching on window
							checkElementUni(elem)
							if (!elem.uni[type]) {
								elem.uni[type] = {}//elem.uni.wheel
								elem.uni[type].handle = function(e){
									
									// Запрещаем обработку события браузером по умолчанию
									//if(e) e.preventDefault()
									//else e.returnValue=false
									
									//e = createPointerUnitEvent(e,type)
									e.unitype = type
									
									var delta // Направление скролла: 1 - скролл вверх, -1 - скролл вниз
									if (e.wheelDelta) {
										delta = e.wheelDelta/120
										//if(window.opera) delta=-delta
									} else if (e.detail)
										delta = -e.detail/3
									else if (e.deltaY)
										delta = -1*Math.round(e.deltaY/100)
									e.delta = delta //Math.round(delta) //Safari Round
									e.deltaX || (e.deltaX = 0)
									e.deltaY || (e.deltaY = -delta*(101))
									e.deltaZ  || (e.deltaZ = 0)
									elem.handle(e)
								}
								// mousewheel/wheel event object: 
								// delta 	- scroll direction
								//		 	(1) - up, (-1) - down
								// deltaY - distance the wheel has rotated around the y-axis, (-101) - up, (101) - down
								// deltaX - distance the wheel has rotated around the x-axis
								// deltaZ - distance the wheel has rotated around the z-axis
	
								//bind for different browsers	
								addEvent(elem, 'DOMMouseScroll', elem.uni[type].handle)
								addEvent(elem, 'mousewheel', elem.uni[type].handle)
								//addEvent(elem, 'wheel', elem.uni[type].handle)
								//alert('onwheel' in document.body)
							}
							break
						
						case 'scrollstart':
						case 'scrollend':
						case 'scroll':
							checkElementUni(elem)
							// one uni-handler for three
							if (elem.uni['scrollstart'] || elem.uni['scrollend'] || elem.uni['scroll']) break

							elem.uni[type] = {} // elem.uni.scrollstart or elem.uni.scrollend or elem.uni.scroll, no metter
							elem.uni[type].timer // for catching noscroll event 
							elem.uni[type].delay = (TchDevice) ? 70 : 200// for catching noscroll event 
							elem.uni[type].scrolling = false // scrolling state
							
							elem.uni[type].handle = function(e){
								elem.uni[type].start(e)
								e.scrollTop = document.body.scrollTop || document.documentElement.scrollTop
								e.scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft
								elem.handle(e)
							} 
							
							elem.uni[type].start = function(e){
								clearTimeout(elem.uni[type].timer)
								elem.uni[type].timer = setTimeout(function() {
									elem.uni[type].end(e)
									elem.uni[type].scrolling = false
								}, elem.uni[type].delay )
								
								if (elem.uni[type].scrolling || TchDevice) return
								elem.uni[type].scrolling = true
								
								// make fake event
								e = {
									type: 'scrollstart',
									scrollTop: document.body.scrollTop || document.documentElement.scrollTop,
									scrollLeft: document.body.scrollLeft || document.documentElement.scrollLeft
								}
								// handle start event
								elem.handle(e)
							}
							
							
							elem.uni[type].end = function(e){
								// make fake event
								e = {
									type: 'scrollend',
									scrollTop: document.body.scrollTop || document.documentElement.scrollTop,
									scrollLeft: document.body.scrollLeft || document.documentElement.scrollLeft
								}
								// handle end event
								elem.handle(e)
							}
							
							// for default behaviour 
							addEvent(elem, 'scroll', elem.uni[type].handle)
							
							break
							// Touch is under construction !!!!!
							
							// next is only for touch device
							if (!TchDevice) break
							
							elem.uni[type].coord = {dX:0, dY:0} // coordinates of scroll start
							elem.uni[type].touchtimer
							
							elem.uni[type].touchhandle = function(e){
								//e = createPointerUnitEvent(e,'scroll')
								
								/*if (elem.uni[type].scrolling) return
								elem.uni[type].scrolling = true
								
								// make fake event
								e = {
									type: 'scrollstart'
								}
								// handle start event
								elem.handle(e)*/
								console.log('touch scrollstart')
								return;
								var X = e.clientX - elem.uni[type].coord.dX,
									Y = e.clientY - elem.uni[type].coord.dY
								
								console.log(Y)
								
								
								if (Math.abs(X) < 5 && Math.abs(Y) < 5) {
									e.scrollTop = Y
									e.scrollLeft = X
									elem.handle(e)
								}
							} 
							
							elem.uni[type].touchstart = function(e){
								/*this.uni[type].coord = {
									dX: e.changedTouches[0].clientX, 
									dY: e.changedTouches[0].clientY
								}*/
								
								console.log('touch scrollstart')
								
								/*elem.uni[type].touchtimer = setTimeout( function(){
									
									addEvent(elem, 'touchmove', elem.uni[type].touchhandle) 
								}, 100)*/
							}
							
							elem.uni[type].cancel = function(e){
								clearTimeout(elem.uni[type].touchtimer)
							}
								
								
							// bind for touch device on touchmove only if touchstart on screen
							addEvent(elem, 'touchstart', elem.uni[type].touchstart)
							//remove handler if you finish to scroll	
							addEvent(elem, 'touchend', elem.uni[type].cancel)
							addEvent(elem, 'touchcancel', elem.uni[type].cancel)

							break
						/*There is some additions in scroll events: event.scrollTop and event scrollLeft*/
						
						/*case 'scroll':						
							if (false && TchDevice && (elem === document || elem === window)) {// special event for touch device document
								checkElementUni(elem)
								if (!elem.uni[type]) {
									elem.uni[type] = {}//elem.uni.scroll
									elem.uni[type].coord = {dX:0, dY:0}//coordinates of scroll start
									elem.uni[type].timer 
									elem.uni[type].handle = function(e){
										e = createPointerUnitEvent(e,type)
										var X = e.clientX - elem.uni[type].coord.dX,
											Y = e.clientY - elem.uni[type].coord.dY
										//console.log('X:'+X+'   Y:'+Y)
										//document.getElementById('b2').innerHTML += '0 '
										
										if (Math.abs(X) < 20 && Math.abs(Y) < 20) {
											e.scrollTop = Y
											e.scrollLeft = X
											console.log(e.scrollTop)
											elem.handle(e)
										}
									} 
									
									elem.uni[type].start = function(e){
										this.uni[type].coord = {
											dX: e.changedTouches[0].clientX, 
											dY: e.changedTouches[0].clientY
										}
										//clearTimeout(elem.uni[type].timer)
										elem.uni[type].timer = setTimeout( function(){
											document.getElementById('b2').innerHTML += 'bind ';
											addEvent(elem, 'touchmove', elem.uni[type].handle) 
										}, 200)
									}
									
									elem.uni[type].cancel = function(e){
										clearTimeout(elem.uni[type].timer)
										removeEvent(elem, 'touchmove', elem.uni[type].handle)
									}
									
									//bind for touch device on touchmove only if touchstart on screen
									addEvent(elem, 'touchstart', elem.uni[type].start)
									//remove handler if you finish to scroll	
									addEvent(elem, 'touchend', elem.uni[type].cancel)
									addEvent(elem, 'touchcancel', elem.uni[type].cancel)
								}
							}
							
							else {
								// standart event for nottouch device and for internal elements on touch device
								addEvent(elem, type, elem.handle)
							}
							break*/
						
						case 'transitionend':
							checkElementUni(elem)
							if (!elem.uni[type]) {
								elem.uni[type] = {} //elem.uni[transitionend]
								elem.uni[type].handle = function(e){
									elem.handle({
										type: type,
										target: e.target,
										preventDefault: function () { e.preventDefault() },
										stopPropagation: function () { e.stopPropagation() }
									})
								}

								addEvent(elem, 'webkitTransitionEnd', elem.uni[type].handle)
								addEvent(elem, 'oTransitionEnd', elem.uni[type].handle)
								addEvent(elem, 'transitionend', elem.uni[type].handle)
							}
							break
							
						case 'touch': break
						case 'push': 
							checkElementUni(elem)
							if (!elem.uni[type]) {
								elem.uni[type] = {}//elem.uni.touch
								elem.uni[type].handle = function(e){
									e = createPointerUnitEvent(e,type)
									elem.handle(e)
									addEvent(elem, (TchDevice)? 'touchend' : 'mouseup', elem.uni[type].cancel)
									addClass(elem, 'pushed')
								}
								elem.uni[type].cancel = function(e){
									removeClass(elem, 'pushed')
									removeEvent(this, (TchDevice)? 'touchend' : 'mouseup', elem.uni[type].cancel)
								}
								
								if (!TchDevice) //if not touch device use Mousedown as Touch
									addEvent(elem, 'mousedown', elem.uni[type].handle)
								else //else use Touchstart as Touch
									addEvent(elem, 'touchstart', elem.uni[type].handle)
							}
							break
							
						case 'tap':
							checkElementUni(elem)
							if (!elem.uni[type]) {
								elem.uni[type]= {}//elem.uni.tap
	
								if (!TchDevice) {//if not touch device use Click as Tap
									elem.uni[type].handle = function (e) {
										e = createPointerUnitEvent(e,type)
										elem.handle(e)
										//elem.uni[type].cancel()
									}
									// for push state
									elem.uni[type].start = function () {
										addClass(elem, 'pushed')
										addEvent(document.body, 'mouseup', elem.uni[type].cancel)
									}
									elem.uni[type].cancel = function () {
										removeClass(elem, 'pushed')
										removeEvent(document.body, 'mouseup', elem.uni[type].cancel)
									}
									
									addEvent(elem, 'click', elem.uni[type].handle)
									addEvent(elem, 'mousedown', elem.uni[type].start)
									
								} 
								
								else {//else use Touchend as Tap
									elem.uni[type].handle = function(e){
										e = createPointerUnitEvent(e,type)
										elem.handle(e)
										elem.uni[type].cancel()
									}
									elem.uni[type].start = function(e){
										addEvent(this, 'touchend', elem.uni[type].handle)
										addClass(elem, 'pushed')
									}
									elem.uni[type].cancel = function(e){
										removeClass(elem, 'pushed')
										removeEvent(this, 'touchend', elem.uni[type].handle)
									}
									//attach on touchend only on touchstart
									addEvent(elem, 'touchstart', elem.uni[type].start)
									//remove Tap handler if you try to scroll	
									addEvent(elem, 'touchmove', elem.uni[type].cancel)
									addEvent(elem, 'touchcancel', elem.uni[type].cancel)
								}	
							}
							break
							//if you add handlers to element click(1) and tap(2), on desktop fireing will be click(1) then tap(2), on touch device always taps will fire before click - tap(2) and then click(1) 
							
						case 'dbltap':
							checkElementUni(elem)
							if(!elem.uni[type]){
								elem.uni[type]={}//elem.uni.dbltap
								elem.uni[type].id=''//for timout
								elem.uni[type].timer = 0//for number of rapid taps
								elem.uni[type].handle = function(e){
									e = createPointerUnitEvent(e,type)
									elem.handle(e)
									if(TchDevice){elem.uni[type].cancel(); elem.uni[type].timer=0}
								}
								
								if(!TchDevice){//if not touch device use Duble Click as Duble Tap
									if(elem.nodeName=='A') elem.onclick = function(){return false}//cancel click on links to make posible dblclick, handlers will fire any way on click
									addEvent(elem, 'dblclick', elem.uni[type].handle)
								} else{//else use Touchend as Duble Tap
									elem.uni[type].start = function(e){
										if(this.uni[type].timer==1){
											clearTimeout(elem.uni[type].id)
											addEvent(elem, 'touchend', elem.uni[type].handle)
										} else{
											this.uni[type].timer+=1
											this.uni[type].id = setTimeout(function(){elem.uni[type].timer=0},300)
										}
									}
									elem.uni[type].cancel = function(e){removeEvent(elem, 'touchend', elem.uni[type].handle)}
									if(elem.nodeName=='A') elem.onclick = function(){return false}//cancel click on links to make posible dbltap, handlers will fire any way on click
									//attach on touchend only on touchstart
									addEvent(elem, 'touchstart', elem.uni[type].start)
									//remove Tap handler if you try to scroll	
									addEvent(elem, 'touchmove', elem.uni[type].cancel)
									addEvent(elem, 'touchcancel', elem.uni[type].cancel)
								}	
							}
							break
							
						case 'hold':
							checkElementUni(elem)
							if(!elem.uni[type]){
								elem.uni[type]={}//elem.uni.hold
								elem.uni[type].id=''//for timeout
								elem.uni[type].timer=0//for time delta
								elem.uni[type].start = function(e){
									elem.onclick = null
									elem.pushed = true
									if(TchDevice) addEvent(elem, 'touchend', elem.click)
									if(TchDevice) e.preventDefault()
									e = createPointerUnitEvent(e,type)
									elem.uni[type].timer = e.time
									//elem.uni[type].id = setTimeout(function(){elem.handle(e)},500)
									elem.uni[type].id = setTimeout(function(){
										elem.onclick = function(){return false}
										elem.handle(e)
									},500)
									
								}
								elem.uni[type].cancel = function(e){
									elem.pushed = false
									if(TchDevice) removeEvent(elem, 'touchend', elem.click)
									var time = e.timeStamp||(function(){var date=new Date(); return date.getTime()}())
									if(time-elem.uni[type].timer<500) clearTimeout(elem.uni[type].id)
								}
								
								
								if(!TchDevice){//if not touch device use long Mousedown
									addEvent(elem, 'mousedown', elem.uni[type].start)
									addEvent(document, 'mouseup', elem.uni[type].cancel)
									addEvent(elem, 'mousemove', elem.uni[type].cancel)
									addEvent(elem, 'dragstart', elem.uni[type].cancel)	
								} else{//else use long Touch
									//hold on element cancels touch scrolling 
									addEvent(elem, 'touchstart', elem.uni[type].start)
									//short untap cancels hold on element
									addEvent(document, 'touchend', elem.uni[type].cancel)
									addEvent(elem, 'touchmove', elem.uni[type].cancel)
									addEvent(elem, 'touchcancel', elem.uni[type].cancel)
									
								}	
							}
							break
						case 'swipe':// prevents page scrolling
						case 'slideleft':
						case 'slideright':
						case 'slidetop':
						case 'slidebottom':
						case 'slide': //move over 30px to fire event
							//Next code is used for move and swipe event
							checkElementUni(elem)
							if(!elem.uni[type]){
								elem.uni[type]={}//elem.uni.swipe(or .move)
								elem.uni[type].coord={dX:0,dY:0}//coordinates of swipe/move start
								elem.uni[type].handle = (type=='swipe') ?//switch handler according to type 
									/*for swipe*/function(e){
										e = createPointerUnitEvent(e,type)
										e.changeX = e.clientX - elem.uni[type].coord.dX
										e.changeY = e.clientY - elem.uni[type].coord.dY
										e.changeTimeStamp = e.time - elem.uni[type].coord.dTime
										//e.top = (e.Y<0)?-1*e.Y:0
										//e.right = (e.X>0)?e.X:0
										//e.bottom = (e.Y>0)?e.Y:0
										//e.left = (e.X<0)?-1*e.X:0
										elem.handle(e)
									} 
									//swipe event object: 
									//changeX,changeY  - coordinate changing in two directions 
									//				 	from left top corner of first touch (+/-number)
									//	  top, right
									//	bottom, left - coordinate changing in four directions (0+)
									// changeTimeStamp - time from start to now
									: 
									
									/*for slide*/function(e){
										e = createPointerUnitEvent(e,type)
										var X = e.clientX - elem.uni[type].coord.dX,
											Y = e.clientY - elem.uni[type].coord.dY
										if (Math.abs(X) > 30 || Math.abs(Y) > 30) {
											e.directionX = (X>0) ? 'right' : 'left'//right|left
											e.directionY = (Y>0) ? 'bottom' : 'top'//bottom|top
											e.direction = (X>0) ? ((Math.abs(Y)<X)? 'right' : e.directionY) : ((Math.abs(Y)<-1*X)? 'left' : e.directionY) //right|left|top|bottom
											e.changeTimeStamp = e.time - elem.uni[type].coord.dTime
											elem.uni[type].cancel()
											if( (type=='slideleft' && e.direction!='left') || 
												(type=='slideright' && e.direction!='right') || 
												(type=='slidetop' && e.direction!='top') || 
												(type=='slidebottom' && e.direction!='bottom') ) return
											elem.handle(e) //fire swipe according to direction
										}
									}
									//slide event object: 
									//	directionX,
									//  directionY - swipeing in one of two directions (left/right, top/bottom)
									//	direction  - direction of swipeing, according to first 
									//				 touch of swipe('top', 'right', 'bottom', 'left')
									// changeTimeStamp -  time from start to slide event
	
	
								if (!TchDevice) {//if not touch device use Mousemove
									elem.uni[type].start = function (e) {
										elem.uni[type].coord = {
											dX: e.clientX, 
											dY: e.clientY,
											dTime: e.timeStamp
										}
										addEvent(document, 'mousemove', elem.uni[type].handle)
										addClass(elem, 'pushed')
									}
									elem.uni[type].cancel = function(e){
										removeClass(elem, 'pushed')
										removeEvent(document, 'mousemove', elem.uni[type].handle)
									}
									//attach on mousemove only if mousedown on element
									addEvent(elem, 'mousedown', elem.uni[type].start)
									//remove Tap handler if you finish to swipe/move	
									addEvent(document, 'mouseup', elem.uni[type].cancel)
									//prevent text selection
									elem.onselectstart = function (e) {return false}
									elem.style.WebkitUserSelect = 'none'
									elem.style.MozUserSelect = 'none'
									elem.style.userSelect = 'none'
								} else {//else use Touchmove
									elem.uni[type].start = function(e){
										this.uni[type].coord={
											dX: e.changedTouches[0].clientX, 
											dY: e.changedTouches[0].clientY
										}
										addEvent(document, 'touchmove', elem.uni[type].handle)
									}
									elem.uni[type].cancel = function(e){removeEvent(document, 'touchmove', elem.uni[type].handle)}
									//attach on touchmove only if touchstart on element
									addEvent(elem, 'touchstart', elem.uni[type].start)
									//remove Move handler if you finish to swipe/move	
									addEvent(document, 'touchend', elem.uni[type].cancel)
									addEvent(elem, 'touchcancel', elem.uni[type].cancel)
								}	
							}
							break
							
						case 'gesturestart':
						case 'gesturechange':
						case 'gestureend':
						case 'pinch': break
						
						case 'orientationchange': //can be attached only to window
							if (elem!==window) break
							if ('onorientationchange' in window) {addEvent(window, type, elem.handle); break}
							checkElementUni(elem)
							if (!elem.uni[type]) {
								window.orientation = ((window.innerWidth||document.getElementsByTagName('html')[0].offsetWidth)>(window.innerHeight||document.getElementsByTagName('html')[0].offsetHeight)*1.1)? 90:0
								elem.uni[type]={}//window.uni.orientationchange
								elem.uni[type].handle=function(e){
									var orientation = ((window.innerWidth||document.getElementsByTagName('html')[0].offsetWidth)>(window.innerHeight||document.getElementsByTagName('html')[0].offsetHeight)*1.1)? 90:0
									if(window.orientation!=orientation){
										window.orientation = orientation
										e = createUnitEvent(e,type)
										elem.handle(e)
									}	
								}
								//use resize as orientationchange	
								addEvent(window, 'resize', elem.uni[type].handle)
							}
							break
						case 'ready': //can be attached only to document
							if (elem !== document) break
							checkElementUni(elem)
							if (!elem.uni[type]) {
								elem.uni[type] = {}//document.uni.ready
								elem.uni[type].called = false//used for preventing multiple init of handler
								elem.uni[type].handle = function(e){
									if(elem.uni[type].called) return
									elem.uni[type].called = true
									e = (e) ? createUnitEvent(e,type) : 
										//or fake event
										(function(){
											var date = new Date(); date = date.getTime()
											return {type: type, timeStamp: date, time: date}
										}())
									elem.handle(e)
								}
								
								if (document.addEventListener) document.addEventListener('DOMContentLoaded', elem.uni[type].handle, false)
								else if (document.attachEvent) {
									if(document.documentElement.doScroll && window == window.top){
										function tryScroll(){
											if(elem.uni[type].called) return
											if(!document.body) return
											try{document.documentElement.doScroll('left'); elem.uni[type].handle()} 
											catch(e){setTimeout(tryScroll, 10)}
										}
										tryScroll()
									}
									document.attachEvent("onreadystatechange", function(){
										if(document.readyState === "complete" ) elem.uni[type].handle()
									})
									
								}
								//fall back for some browsers
								addEvent(window, 'load', elem.uni[type].handle )
							}
							break
							
						case 'hashchange': //can be attached only to window
							if (elem!==window) break
							checkElementUni(elem)
							if (!elem.uni[type]) {
								elem.uni[type] = {}//window.uni.hashchange
								elem.uni[type].hashCheck = window.location.hash//for cheking hash change
								if('onhashchange' in window && !(document.documentMode&&document.documentMode<8)) {
									elem.uni[type].handle = function(e){
										e.newURL || (e.newURL = window.location.href.split('#')[0] + window.location.hash)
										e.oldURL || (e.oldURL = window.location.href.split('#')[0] + elem.uni[type].hashCheck)
										elem.uni[type].hashCheck = window.location.hash
										this.handle(e)
									}
									addEvent(elem, type, elem.uni[type].handle )
									break //break switch()
								}
								
								elem.uni[type].handle = (-[1,]) ?
								//for old browsers
								function(){
									var hash = window.location.hash
									if (elem.uni[type].hashCheck != hash){
										var e = {
											type: 'hashchange',
											isFixed: true,
											target: window,
											timeStamp: (function(){var date=new Date(); return date.getTime()}()),
											newURL: window.location.href.split('#')[0]+hash,
											oldURL: window.location.href.split('#')[0]+elem.uni[type].hashCheck
										}
										e.time = e.timeStamp
										elem.uni[type].hashCheck = hash
										elem.handle(e)
									}
								}
								://for old IE, iframe hack is used
								(function(elem, type){
									if (document.getElementById('hashframe') == null) {
										var hashframe = document.createElement('iframe')
										hashframe.id = 'hashframe'
										hashframe.src = ''
										hashframe.style.display='none'
										/*hashframe.style.width='1px'
										hashframe.style.height='1px'
										hashframe.style.overflow='hidden'
										hashframe.style.border='none'*/
										//hashframe.style.width='100px'; hashframe.style.height='100px'; 
										//hashframe.style.position='fixed'; hashframe.style.left='0';
										//hashframe.style.zIndex='1000'; hashframe.style.top='100px';
										//hashframe.style.background='#ccc'; hashframe.style.display='block'
										document.getElementsByTagName('body')[0].appendChild(hashframe)
										hashframe = hashframe.contentWindow.document
										hashframe.open()
										hashframe.write(window.location.hash)
										hashframe.close()
									}	
									return function(){
										var hash = window.location.hash
										var ieHash = document.getElementById('hashframe').contentWindow.document.getElementsByTagName('body')[0].innerHTML
										//console.log('hash: '+hash+', hashCheck: '+elem.uni[type].hashCheck+', frame:'+ieHash)
										if (elem.uni[type].hashCheck != hash) {
											var hashframe = document.getElementById('hashframe').contentWindow.document
											hashframe.open()
											hashframe.write(hash)
											hashframe.close()
											var e = {
												type: 'hashchange',
												isFixed: true,
												target: window,
												timeStamp: (function(){var date=new Date(); return date.getTime()}()),
												newURL: window.location.href.split('#')[0] + hash,
												oldURL: window.location.href.split('#')[0] + elem.uni[type].hashCheck
											}
											e.time = e.timeStamp
											elem.uni[type].hashCheck = hash
											elem.handle(e)
										}
										else if (elem.uni[type].hashCheck != ieHash) {
											window.location.hash = ieHash
											//hash = ieHash
											var e = {
												type: 'hashchange',
												isFixed: true,
												target: window,
												timeStamp: (function(){var date=new Date(); return date.getTime()}()),
												newURL: window.location.href.split('#')[0]+hash,
												oldURL: window.location.href.split('#')[0]+elem.uni[type].hashCheck
											}
											e.time = e.timeStamp
											elem.uni[type].hashCheck = ieHash
											elem.handle(e)
										}	
									}
								}(elem, type))
								//if history navigation is between several domains, in old IE history do not saves on previous or next domain
								elem.uni[type].id = window.setInterval(elem.uni[type].handle, 100)	
							}
							break
							
						case 'deviceorientation'://can be attached only to window
							if (elem!==window) break
							if ('ondeviceorientation' in window) {addEvent(elem, type, elem.handle); break}
							checkElementUni(elem)
							if (!elem.uni[type]) {
								elem.uni[type] = {}//elem.uni.deviceorientation
								elem.uni[type].handle = function(e){
									e = createUnitEvent(e,type)
									e.gamma || (e.gamma = -(e.x * (180 / Math.PI)) || null) 
									e.beta || (e.beta = -(e.y * (180 / Math.PI)) || null)
									e.alpha || (e.alpha = -(e.z * (180 / Math.PI)) || null)
									elem.handle(e)
								}
								
								//use MozOrientation as ondeviceorientation in Mozilla browser	
								if ('onMozOrientation' in window) addEvent(window, 'MozOrientation', elem.uni[type].handle)
								//use onload as ondeviceorientation in old browser	
								else addEvent(window, 'load', elem.uni[type].handle) //original deviceorientation event fires after load event, but here it fires in queue of attached onload events 
							}
							break
							
						default:
							addEvent(elem, type, elem.handle)
					}
				}
				
				//Добавляем пользовательский обработчик в список elem.events[type] под заданным номером.
				//Так как номер устанавливается один раз, и далее не меняется - это приводит к ряду интересных фич. Например, запуск add с одинаковыми аргументами добавит событие только один раз
				elem.events[type][handler.guid] = handler
				//elem.events[type][handler.guid || (handler.guid = ++guid)] = handler
				
			},
			
			
			
			
		
			remove: function(elem, type, handler) {
				//Получить список обработчиков
				var handlers = elem.events && elem.events[type]
				
				if(!handlers) return
				
				
				if(!handler){
					for(var handle in handlers){ delete events[type][handle] }
					return
				}
				
				//Удалить обработчик по его номеру
				delete handlers[handler.guid]
				
				//Проверить, не пуст ли список обработчиков 
				for(var any in handlers) return
				 
				//Если пуст, то удалить служебный обработчик и очистить служебную структуру events[type]
				if(elem.removeEventListener)
					elem.removeEventListener(type, elem.handle, false)
				else if(elem.detachEvent)
					elem.detachEvent("on" + type, elem.handle)
				
				delete elem.events[type]
				
				//Если событий вообще не осталось - удалить events и handle за ненадобностью. IE может выдать ошибку при delete свойства элемента, поэтому для него предусмотрен блок catch.
				for (var any in elem.events) return
				try{
					delete elem.handle
					delete elem.events 
				} catch(e) { //IE
					if (!!elem.removeAttribute) {
						elem.removeAttribute("handle")
						lem.removeAttribute("events")
					} else { //if elem === document
						elem.handle = null
						elem.events = null
					}
				}
			},
			
			
			
			// Fire event
			dispatch: function(elem, type) {
				var Event, ret,
					bubbles = true,
					cancelable = true;
				
				switch (type) {
					case 'change':
						cancelable = false
				}

				if (!!document.createEvent) {// all browsers except IE before version 9
					Event = document.createEvent("Event")
					Event.initEvent(type, bubbles, cancelable)
					return elem.dispatchEvent(Event)
				} else if (!!document.createEventObject) {   // IE before version 9
					if (type == 'click' && !!elem.click)
						return elem.click()
					Event = document.createEventObject(window.event);
					Event.srcElement = elem
					return elem.fireEvent(type, Event)
				}
			}
		}
	}(window, document))
	
	return {
		Event: {
			add: Event.add,
			remove: Event.remove,
			dispatch: Event.dispatch
		}
	}
})

Core.extend(function(Core){
	Core.bind(window, 'orientationchange', 'layout-update')
})