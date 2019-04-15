													/*Устранение недостатков в ИЕ*/

if($.browser.msie){
(function(){
	if(!-[1,]){ //IE<9
		//Иконки на странице Solutions заменяются на иконки без теней, т.к. возникают артефакты при смене прозрачности
		$('#solutionbar a img').each(function(){
			$(this).attr('src','gallery/solutions/ie'+$(this).attr('src').split('solutions')[1])
		})
	}
	
	/*Отмена обведения*/
	function rf(){return false}
	var selectors = $('.select-no').get()
	var i = selectors.length
	while(i--){
		selectors[i].attachEvent( "onselectstart", rf);
	}
	
	/*Плавный переход при наведении на кнопки формы*/
	function ButtonHover(){	if($(this).is(":animated")!=true) $(this).animate({
		backgroundColor: '#1a648c',
		borderTopColor: '#2ba4e6',
		borderRightColor: '#2ba4e6',
		borderBottomColor: '#2ba4e6',
		borderLeftColor: '#2ba4e6'
	},250) }
	function ButtonUnHover(){ $(this).animate({
		backgroundColor: '#54a1cc',
		borderTopColor: '#67c5f9',
		borderRightColor: '#67c5f9',
		borderBottomColor: '#67c5f9',
		borderLeftColor: '#67c5f9'
	},250) }
	
	
	
	$('button, .button, .linkedin_button').mouseenter(ButtonHover).mouseleave(ButtonUnHover)
	$(document).ready(function(){
		$('.file input[type="file"]')
		.mouseenter(function(){$(this).prev().each(ButtonHover)})
		.mouseleave(function(){$(this).prev().each(ButtonUnHover)})
	})
	
}())
}
															


				
														/*Scrollbar*/

$("#scroller").scrollable({ 
	circular: false, 
	mousewheel: false,
	speed: 500,
	next: '.scroll-next',
	prev: '.scroll-prev'
})

var scrollapi = $("#scroller").data("scrollable");
$("#scroller").mousewheel(function(event, delta) {
	if(delta>0 && $("#scroller .items").is(":animated")!=true) scrollapi.prev()
	if(delta<0 && $("#scroller .items").is(":animated")!=true) scrollapi.next()
})


$("#scroller .items").tabs("#work-gallery > img", {tabs: 'a', current:'active', event: 'mouseup',  effect: "fade" ,fadeInSpeed: 800, fadeOutSpeed:0})




																/*Solutionbar*/
																
$("#solutionbar").tabs("#solutions-gallery > img", {tabs: 'a', current: Navi.activeclass, event: 'mousedown',  effect: "fade" ,fadeInSpeed: 200, fadeOutSpeed:0, initialIndex: null})
$('#solutionbar a').click(function(e){if(e.which!=2) return false})
							
/*При наведении на псевдо ссылки подсвечивается соответствующая иконка*/
$('#solutions .list a, #solutions .typical').hover(function(){ $('#solutionbar a[href="'+$(this).attr('href')+'"]').addClass('hover')},
function(){$('#solutionbar a').removeClass('hover')})

document.getElementById('solutionbar').onmouseover = function(e){
	e = e || window.event	
	var target = e.target || e.srcElement
	if (target.nodeName == 'IMG'){
		fixTooltip(target.parentNode)
	}
}


															/*Прокрутка в About*/

var scrollbar = document.getElementById('scrollbar')
var dragger = document.getElementById('dragger')
var textscroller = document.getElementById('textscroller')
//Scrolling.init(textscroller, scrollbar, dragger)
//$(window).resize(function(){Scrolling.init(textscroller, scrollbar, dragger); Scrolling.jobsinit()});

																												






	


															/*Навигация по сайту*/
															
Content.insertAnchors(Content.workThumbs)//ссылки работ


Navi.extend.init = function(){
	var api = Navi
	//клик по логотипу открывает Главную
	$(api.logo).click(function(e){ if(e.which!=2){api.openPage('home'); return false} })
	
	//меню (в ссылках писать href="#someanchor")
	$(api.menu+' a').mousedown(function(e){ if(e.which==1) api.openPage($(this).attr('href')) })
	$(api.menu+' a').click(function(e){if(e.which!=2) return false})
	$(api.menu).mousedown(function(e){ if(e.which==1) $(api.solutionbar+' a').removeClass(api.activeclass) })
	
	//клик на скроллер переключает на Work
	$('#scroller').mousedown(function(e){ if(e.which==1) Navi.openPage('work')	})
	$('#scroller a').bind('mousedown', function(e, propagation){if(propagation==false && e.which==1) e.stopPropagation() })
	$('#scroller a').click(function(e){if(e.which!=2) return false})
	
	//Особая страница Solutions
	$(api.solutions+' a').mousedown(function(e){ if(e.which==1) api.openSolutionbar($(this).attr('href')); return false })
	$(api.solutions+' a').click(function(e){if(e.which!=2) return false})
	$('.listofsolutions').mousedown(function(e){
		if(e.which==1){ 
			api.openPage('solutions')
			$(api.solutionbar+' a').removeClass(api.activeclass)
		}
		return false 
	})
	$(api.solutionbar+' a').mousedown(function(e){ if(e.which==1) api.openSolutionbar('null'); $(this).addClass(api.activeclass) })
	
}
Navi.init();
	
												/*Submenu*/	
$('#mainmenu span').click(function(){Navi.openPage('marketingmanager')})




												/*Отложенная загрузка элементов страницы*/														
Content.grayIndexImages() //Сделать иконки на главной чёрнобелыми
Content.grayContactImages()	//Сделать фон в Контактах чёрнобелым	
Content.grayOurteam() //фотографии в Our Team сделать чёрнобелыми
Content.loadThisPage()
$('#scroller a, #solutionbar a, #solutions a').mousedown(function(){Content.loadInstant($(this).attr('href'))})//Немедленная подгрузка выбраного фона
$(window).load(function(){
	$('#preloader').hide()
	$('#overlay').fadeOut(1000,function(){
		Content.loadThumbs(Content.workThumbs)	
		Content.loadBg(Content.workImages)
		Content.loadBg(Content.solutionImages)
	}) //Догрузить невидимые картинки				
})

			
			
			
