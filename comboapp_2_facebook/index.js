


															/*Services*/

var service = $('.service')
service.each(function(){
	$(this).click(openInfo)
})

$('.back').each(function(){
	$(this).click(closeInfo)
})

function openInfo(){
	var el, i=0
	while (el = service[i++]) el.getElementsByTagName('div')[0].style.visibility = 'hidden'
	this.getElementsByTagName('div')[0].style.visibility = 'visible'
}

function closeInfo(e){
	e = e || window.event
	(e.stopPropagation) ? e.stopPropagation() : (this.cancelBubble = true)
	this.parentNode.style.visibility = 'hidden'
}




																/*Scrolling*/
																

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

var touchdevice = 'createTouch' in document; //true or false

var Scrolling = {
	
	dragMaster: function(textscroller, coef, topspace){
		var mouseOffset
		var api = this
		
		// получить сдвиг target относительно курсора мыши
		function getMouseOffset(target, e) {
			var docPos	= api.getPosition(target)
			// TouchOffset
			if (e.touches) {
				var touch =  e.touches[0] || e.changedTouches[0] || e.targetTouches[0]
				return {x:touch.pageX - docPos.x, y:touch.pageY - docPos.y}
			}
			// or MouseOffset
			return {x:e.pageX - docPos.x, y:e.pageY - docPos.y}
		}
		

		function mouseUp(){
			// очистить обработчики, т.к перенос закончен
			removeDocumentEventHandlers()
		}

		function mouseMove(e){
			e = fixEvent(e)	
			textscroller.scrollTop = (e.pageY-mouseOffset.y-topspace)*coef
			return false
		}
		
		function touchMove(e){
			e.preventDefault()
			var touch = e.touches[0] || e.changedTouches[0] || e.targetTouches[0]
			textscroller.scrollTop = (touch.pageY-mouseOffset.y-topspace)*coef
			//return false
		}
	
		function mouseDown(e) {
			e = fixEvent(e)
			if (e.which!=1) return	
			// получить сдвиг элемента относительно курсора мыши
			mouseOffset = getMouseOffset(this, e)
			addDocumentEventHandlers()
			return false
		}
		
		function touchDown(e) {
			//if(e.touches.length!=1) return	
			// получить сдвиг элемента относительно курсора мыши
			mouseOffset = getMouseOffset(this, e)
			addDocumentEventHandlers()
			//if (!e.changedTouches) document.ontouchmove = mouseMove
			return false
		}
		
		function addDocumentEventHandlers() {
			document.onmousemove = mouseMove
			document.ontouchmove = touchMove //for touch device
			document.onmouseup = mouseUp
			document.ontouchend = mouseUp //for touch device
			document.ondragstart = document.body.onselectstart = function() {return false}
		}
		function removeDocumentEventHandlers() {
			document.onmousemove = document.onmouseup = document.ondragstart = document.body.onselectstart = document.ontouchmove = document.ontouchend = null
		}
		
		//Прокрутка с помощью жестов над текстом
		var touchOffset
		var topOffset
		textscroller.ontouchstart = function(e){ 
			touchOffset = (function(target, e){
				var touch = e.touches[0] || e.changedTouches[0] || e.targetTouches[0] 
				return {x:touch.pageX + target.scrollLeft, y:touch.pageY + target.scrollTop} 
			}(this, e))
			textscroller.ontouchmove = scrollerMove
			return false
		}	
		function scrollerMove(e){
			var touch = e.touches[0] || e.changedTouches[0] || e.targetTouches[0]
			textscroller.scrollTop = touchOffset.y-touch.pageY
			return false
		}
		textscroller.ontouchend = function(){textscroller.ontouchmove = textscroller.ontouchend = null}

		return {
			makeDraggable: function(element){
				element.onmousedown = mouseDown
				element.ontouchstart = touchDown //for touch device
			}
		}
	
	},
	
	 getPosition: function(e){
		var left = 0
		var top  = 0
		while (e.offsetParent){
			left += e.offsetLeft
			top  += e.offsetTop
			e	 = e.offsetParent
		}	
		left += e.offsetLeft
		top  += e.offsetTop
		return {x:left, y:top}
	},
	
	servicesinit: function(){
		
		var Services = []
		
		$('.service .info').each(function(){
			Services.push({
				textscroller: $(this).find('.textscroller')[0],
				scrollbar: $(this).find('.scrollbar')[0],
			 	dragger: $(this).find('.dragger')[0]
			})
		});
		
		
		var i=0, serv, textscroller, scrollbar, dragger
		while (serv = Services[i++]) {
			textscroller = serv.textscroller
			scrollbar = serv.scrollbar
			dragger = serv.dragger
			
			var textscroller_height = $(textscroller).height() //высота блока с прокруткой
			var textscroller_innerHeight = $(textscroller.getElementsByTagName('article')[0]).outerHeight() //высота контента в блоке с прокруткой
			
			if(
				/auto|scroll/i.test($(textscroller).css('overflow-y')) && 
				textscroller_height<textscroller_innerHeight
			){scrollbar.style.display = 'block'}
			else {scrollbar.style.display = 'none'; dragger.style.top=0}
	
			//try catch ,т.к. может быть деление на 0
			try {dragger.style.height=(textscroller_height/textscroller_innerHeight*100+'%')} 
			catch (e){}
			//коеффициент ускорения проерутки при передвижении скроллбара курсором
			var coef = textscroller_innerHeight/$(scrollbar).height()
			//отступ сверху, необходима для правильной прокрутки
			var topspace = this.getPosition(scrollbar).y
			
			var moveScroll = (function(dragger, textscroller, textscroller_innerHeight){ return function(){dragger.style.top=parseInt(textscroller.scrollTop)/textscroller_innerHeight*100+'%'} }(dragger, textscroller, textscroller_innerHeight))
			textscroller.onscroll = moveScroll
			
			this.dragMaster(textscroller, coef, topspace).makeDraggable(dragger) //привязка Drag & Drop к скроллеру
			
			if(textscroller_height==textscroller_innerHeight) {
				scrollbar.style.display = 'none'
				textscroller.ontouchstart = function(){document.body.removeEventListener('touchmove', noScroll, false)}
				textscroller.ontouchend = function(){document.body.addEventListener('touchmove', noScroll, false)}
				textscroller.style.padding=0; 
				$('#about .wrapper').get(0).style.overflow='visible'
			}
			
			//Прокрутка стрелками вверх/вниз
			$('.arrow-up').mousedown(function(){textscroller.scrollTop+=-40})
			$('.arrow-down').mousedown(function(){textscroller.scrollTop+=40})
			if(touchdevice){
				document.getElementsByClassName('arrow-up')[0].ontouchstart = function(){textscroller.scrollTop+=-40; return false}
				document.getElementsByClassName('arrow-down')[0].ontouchstart = function(){textscroller.scrollTop+=40; return false}
			}
				
			//$(textscroller).mousewheel(function(e){e.stopPropagation()}) 
			
			var wheel = (function(textscroller){ return function (e,delta) {
				e.preventDefault();
				if(delta>0) textscroller.scrollTop+=-30
				else textscroller.scrollTop+=30
				/*if(delta>0) scroll_top(textscroller,-40)
				else scroll_top(textscroller,40)*/
			} }(textscroller))
			//$(document).mousewheel(wheel) 
			
				
			
		}//end while
	}

};


Scrolling.servicesinit()