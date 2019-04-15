						
														/*Prevent page scrolling*/
function noScroll(e) {e.preventDefault()}
if(document.addEventListener) document.body.addEventListener('touchmove', noScroll, false)




														/*New effects for Tabs*/


$.tools.tabs.addEffect("css-fade", function(i, done) {
	var conf = this.getConf()        
	var speedOut = conf.fadeOutSpeed || 0
	var speedIn = conf.fadeInSpeed || 0
	var panes = this.getPanes()
	var animationdelay

	if (speedOut!=0 || speedIn!=0) {
		clearTimeout(animationdelay)
		panes.css({
			'-webkit-transition': 'opacity '+speedOut/1000+'s', 
			'-moz-transition': 'opacity '+speedOut/1000+'s', 
			'-o-transition': 'opacity '+speedOut/1000+'s', 
			'transition': 'opacity '+speedOut/1000+'s',
			opacity:0})
		animationdelay = setTimeout(
			function(){
				panes.css({display: 'none'})
				panes.eq(i).css({display: 'inline',opacity:0})
				panes.eq(i).css({
					'-webkit-transition': 'opacity '+speedIn/1000+'s', 
					'-moz-transition': 'opacity '+speedIn/1000+'s', 
					'-o-transition': 'opacity '+speedIn/1000+'s', 
					'transition': 'opacity '+speedIn/1000+'s'})
				panes.eq(i).css({opacity:1})
			} 
		,speedOut)
		
	} else {
		panes.hide();	
		panes.eq(i).show()
	}
})
	
	
	
				
														/*Scrollbar*/

$("#scroller").scrollable({ 
	circular: false, 
	mousewheel: false,
	keyboard: false,
	speed: 0,
	next: '.scroll-next',
	prev: '.scroll-prev'
})

var scrollapi = $("#scroller").data("scrollable");
document.getElementsByClassName('scroll-next')[0].ontouchstart = function(e){scrollapi.next(); return false}
document.getElementsByClassName('scroll-prev')[0].ontouchstart = function(e){scrollapi.prev(); return false}

/*Прокрутка с помощью перетаскивания*/
(function($){
	var scroller = $('#scroller')
	var scrollcontainer = scroller.find('div')[0]
	var scroll_left = 0
	var scroll_start = 0
	var scroll_limit = 70
	var scrolled=0
	var scroll_position_left
	
	function calculate_left_max(){ return (scrollcontainer.getElementsByTagName('div')[0].offsetWidth-5)*(scrollcontainer.getElementsByTagName('div').length-1)}
	var scroll_position_left_max = calculate_left_max()
	//addEvent(window,'orientationchange', function(){scroll_position_left_max = calculate_left_max()})
	window.addEventListener('orientationchange', function(){scroll_position_left_max = calculate_left_max()}, false)
	
	scrollcontainer.ontouchstart = function(e){
		if(e.touches.length==1){
			scrolled=0
			scroll_start = e.touches[0].pageX
			scroll_position_left = scrollcontainer.style.left || 0
			var left = 0
			var o = scrollcontainer
			while (o.offsetParent){
				left += o.offsetLeft
				o	 = o.offsetParent
			}	
			left += o.offsetLeft
			scroll_left = e.touches[0].pageX - left + 77
		}
	}
	scrollcontainer.ontouchmove = function(e){
		document.getElementById('scroller').ontouchstart = null
		document.getElementById('scroller').ontouchend = null
		scrollcontainer.ontouchend = scroller_ontouchend
		if(e.touches.length==1 && scrolled==0){
			if((e.touches[0].pageX - scroll_start) < scroll_limit && (e.touches[0].pageX - scroll_start) > -scroll_limit){
				scrollcontainer.style.left = e.touches[0].pageX - scroll_left + "px"
				
			}
			else if((e.touches[0].pageX - scroll_start) > scroll_limit && parseInt(scroll_position_left)<0) {scrollapi.prev(); scrolled=1; }
			else if((e.touches[0].pageX - scroll_start) < -scroll_limit && parseInt(scroll_position_left)>-scroll_position_left_max) {scrollapi.next(); scrolled=1; }
		}
		//return false
	}
	
	function scroller_ontouchend(e){ if(scrolled==0) scrollcontainer.style.left = parseInt(scroll_position_left) + "px"}
}(jQuery))

$("#scroller .items").tabs("#work-gallery > img", {tabs: 'a', current:'active', event: 'mouseup',  effect: "css-fade" ,fadeInSpeed: 800, fadeOutSpeed:200})




																/*Solutionbar*/
																
$("#solutionbar").tabs("#solutions-gallery > img", {tabs: 'a', current: Navi.activeclass, event: 'mousedown',  effect: "css-fade" ,fadeInSpeed: 200, fadeOutSpeed:0, initialIndex: null})
$('#solutionbar a').click(function(){return false})

								
/*При наведении на псевдо ссылки подсвечивается соответствующая иконка*/
/*$('#solutions .list a, #solutions .typical').hover(function(){ $('#solutionbar a[href="'+$(this).attr('href')+'"]').addClass('hover')},
function(){$('#solutionbar a').removeClass('hover')})*/






															/*Прокрутка в About*/

var scrollbar = document.getElementById('scrollbar')
var dragger = document.getElementById('dragger')
var textscroller = document.getElementById('textscroller')
//Scrolling.init(textscroller, scrollbar, dragger)
//addEvent(window,'resize', function(){Scrolling.init(textscroller, scrollbar, dragger)})
$(window).resize(function(){Scrolling.init(textscroller, scrollbar, dragger); Scrolling.jobsinit()})



															/*Навигация по сайту*/

Content.insertAnchors(Content.workThumbs)//ссылки работ

//Изменение настроек навигации
Navi.extend.init = function(){
	var api = Navi

	//клик по логотипу открывает Главную
		$(api.logo).click(function(){api.openPage('home');return false})
	document.getElementById('logo').ontouchstart = function(){ Navi.openPage('home'); return false}

	//меню (в ссылках писать href="#someanchor")
		$(api.menu+' a').mousedown(function(){ api.openPage($(this).attr('href')) })
		$(api.menu+' a').click(function(){return false})
		$(api.menu).mousedown(function(){ $(api.solutionbar+' a').removeClass(api.activeclass) })
	document.getElementById('mainmenu').ontouchstart = function(e){
		e = e || window.event
		var target = e.target || e.srcElement
		if (target.nodeName == 'A') api.openPage(target.getAttribute('href'))
		
		$(api.solutionbar+' a').removeClass(api.activeclass).removeClass('hover') //для Особой страницы Solutions
		
		e.preventDefault ? e.preventDefault() : (e.returnValue=false)
		e.stopPropagation ? e.stopPropagation() : (e.cancelBubble=true)
		return false
	}
	
	//клик на скроллер переключает на Work
		$('#scroller').mousedown(function(){ Navi.openPage('work')	})
		//$('#scroller a').bind('mousedown', function(e, propagation){if(propagation==false) e.stopPropagation() })
		$('#scroller a').click(function(){return false	})
	
	document.getElementById('scroller').ontouchend = function(e){
		Navi.openPage('work')
		try{ Tab.reset($('#casestudies > .current').get(0)) } catch(err){}
		e = e || window.event
		var target = e.target || e.srcElement
		if (target.nodeName == 'IMG') {
			var elem = this.getElementsByTagName('a')
			var len = elem.length
			var i=0; while(i<len){
				if(elem[i]===target.parentNode) {
					$("#scroller .items").data("tabs").click(i) 
					//Content.loadInstant(target.parentNode.getAttribute('href'))//Немедленная подгрузка выбраного фона
					
					var evnt = document.createEvent('MouseEvent')
					evnt.initMouseEvent('click', true, false, window, 0, 
									0, 0, 0, 0, 
									false, false, false, false, 
									0, elem[i])
					elem[i].dispatchEvent(evnt)
					
					
					break
				}
				i++
			}
		}
		

	}
	
	//Особая страница Solutions
		$(api.solutions+' a').mousedown(function(){ api.openSolutionbar($(this).attr('href')) })
		$(api.solutions+' a').click(function(){return false})
		$('.listofsolutions').mousedown(function(){ 
			api.openPage('solutions')
			$(api.solutionbar+' a').removeClass(api.activeclass)
			return false 
		})
	
	var Timeout
	$(api.solutionbar+' a').mousedown(function(){
		fixTooltip(this) 
		api.openSolutionbar('null')
		var target = $(this)
		$(api.solutionbar+' a').removeClass('hover')
		$(target).addClass('hover')
		$(target).addClass(api.activeclass)
		window.clearTimeout(Timeout)
		Timeout = window.setTimeout(function(){target.removeClass('hover') },2000) 
	})
	document.getElementById('solutionbar').ontouchstart = function(e){	
		e = e || window.event
		var target = e.target || e.srcElement
		if (target.nodeName == 'A'){
			window.clearTimeout(Timeout)
			$(api.solutionbar+' a').removeClass('hover')

			Content.loadInstant(target.getAttribute('href'))//Немедленная подгрузка выбраного фона
		}
		if(target.className=='listofsolutions')	{
			api.openPage('solutions')
			$(api.solutionbar+' a').removeClass(api.activeclass).removeClass('hover')
		}
		else if (target.nodeName == 'A'){
			fixTooltip(target) // Смещение подсказок у краёв экрана
			//api.openSolutionbar(target.getAttribute('href'))
			$(api.solutionbar).data("tabs").click($(api.solutionbar+' a').index(target))
			api.openSolutionbar('null')
			$(target).addClass('hover')
			Timeout = window.setTimeout(function(){ $(target).removeClass('hover') },2000)
		}
		e.preventDefault ? e.preventDefault() : (e.returnValue=false)
		e.stopPropagation ? e.stopPropagation() : (e.cancelBubble=true)
		return false
	}
}
Navi.init()


												/*Submenu*/	
//$('#mainmenu span').get(0).ontouchstart = function(){Navi.openPage('marketingmanager')}
//$('#mainmenu span').click(function(){Navi.openPage('vp')})
										


													/*Отложенная загрузка элементов страницы*/
													
$('.preloader').addClass('load')
Content.grayIndexImages() //Сделать иконки на главной чёрнобелыми
Content.grayOurteam() //фотографии в Our Team сделать чёрнобелыми
Content.loadThisPage()
$('#scroller a, #solutions a').mousedown(function(){Content.loadInstant($(this).attr('href'))})//Немедленная подгрузка выбраного фона
$(window).load(function(){
	$('#preloader').hide()
	$('.preloader').removeClass('load')
	$('#overlay').css({opacity:0, 'z-index': -10 })
	var loadingdelay = setInterval(
		function(){
			Content.loadThumbs(Content.workThumbs)	
			Content.loadBg(Content.workImages)
			Content.loadBg(Content.solutionImages)
			clearInterval(loadingdelay)
		} //Догрузить невидимые картинки
	,1000)
}) 
				
