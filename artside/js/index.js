														/* Fonts*/
	Cufon.set("fontFamily", "DINCyr-LightAlternate")
	.replace("h2")
	.replace(".mainmenu", {hover: true, fontSize: '38px'})
	.replace("#tel")
 
 
jQuery(function($){
	
														/* Navigation-accordion  */ 
	
	var li = $("#projects ul li")
	var img = $("#projects .image .thumb")
	var h1 = $('#projects ul li').css("height");//высота в свёрнутом виде из CSS
	var h2 = '50px' //высота при наведении 
	var h3 = '329px'  //высота в развёрнутом виде
	var current_h  //для вычесления текущей высоты
	var show_close_speed = 400
	 
	function element_open /*разворачивает*/ () {
		clearTimeout(timeoutid)
		li.stop(true, false)
	 	if($(this).is(".current")==false){
			$.each(li, function (){ if($(this).is(".over")==true){$(this).animate({ height: h2 }, 0);} else {$(this).animate({ height: h1 }, 200);} });
			li.removeClass("current") //ниодин не развёрнут
			$(this).toggleClass("current") //текущий развёрнут
			.animate({ height: h3 }, show_close_speed);
		}
	}
	 	 
	function element_close /*сворачивает*/ () {		
		 if($(this).parent('.image').parent(li).is(".current")==true){
			$(this).parent('.image').parent(li).removeClass("current") //не развёрнут   
			.animate({ height: h2 }, show_close_speed)
			return false;
		 }
	}
	 
	function element_over /*наведение на элемент*/ () {		
			
				/*//расчёт полной высоты конкретно для данного блока
				current_h = $(this).css('height');
				this.style.height = 'auto'; 
				h3 = $(this).height();
				this.style.height = current_h;*/
		
		$(this).stop(true, false).find("img.thumb").stop(true, true)
		$(this).addClass("over") //курсор наведён
		.find("img.thumb").css({'visibility':'visible', 'display':'none'}).fadeIn(200) //меняет цвет миниатюры на цветную
		if($(this).is(".current")==false){ var that = $(this); timeoutid = setTimeout(function(){that.animate({ height: h2 }, 300) },150) }
	}
	 
	function element_default /*элемент не выделен*/ () { 
		$(this).removeClass("over") //курсор не наведён
		$("#projects li img.thumb").fadeOut(200) //возврощает чёрно-белый цвет миниатюры 
		if($(this).is(".current")==false){ clearTimeout(timeoutid); $(this).animate({ height: h1 }, 300)  }
	}
	
 
	img.bind('mousedown', element_close) //сворачивает
	li.bind('mousedown', element_open) //разворачивает 	 	
	.bind('mouseenter', element_over) //наведение на элемент	
	.bind('mouseleave', element_default) //элемент не выделен
	
 
	var openstatus = 0 //значения открытости или закрытости списка
	function openall /*открыть все элементы*/ (){
		openstatus = 1
		$('.all span').html('Свернуть все').parent('.all').unbind('click')
		img.unbind() 
		li.unbind().animate({'height': h3}, show_close_speed)
		
		setTimeout(function(){									
			$('.all').bind('click',closeall)
		}, show_close_speed+50)
		
		li.bind('mouseenter', function () {		
			$(this).find("img.thumb").stop(true, true)
			.css({'visibility':'visible', 'display':'none'}).fadeIn(200) //меняет цвет миниатюры на цветную			
		})
		
		li.bind('mouseleave', function () { 
			$("#projects li img.thumb").fadeOut(200) //возврощает чёрно-белый цвет миниатюры 
		})
		
		img.click(function () { 
			window.location=$(this).parent().children('a').attr('href') //редирект по ссылке
		})
	}

	function closeall /*закрыть все элементы*/(){
		openstatus = 0
		$('.all span').html('Показать все').parent('.all').unbind('click')
		img.unbind('click')
		li/*.stop(true,false)*/.animate({'height': h1}, show_close_speed)
		
		setTimeout(function(){			
			$('.all').bind('click',openall)
		}, show_close_speed+50)
			
		img.bind('mousedown', element_close) //сворачивает	
		li.bind('mousedown', element_open) //разворачивает  	
		.bind('mouseenter', element_over) //наведение на элемент	
		.bind('mouseleave', element_default) //элемент не выделен		
	}

	$(".all").bind('click',openall) //разворачивает все

	
	
/*------------------------------------------*/



														/* Menu */
	var menu_speed = 400
	$('.mainmenu li a').prepend('<div class="hover_bg"></div>')	
	$('.mainmenu a').mouseenter(function(){ 
		var parent_width = $(this).outerWidth()
		if (($(this).parent('li').is('.active')) || ($(this).is('.active')) ) {} else {
			$(this).css({background:'none'}).children('.hover_bg').css({'width': parent_width}).stop(true,true).fadeIn(menu_speed)
		}
	});
	$('.mainmenu a').mouseleave(function(){ $('.mainmenu li a .hover_bg').stop(true,true);$(this).children('.hover_bg').fadeOut(menu_speed) });	
	



	
														/* Pages' effects */
	

	
	/*if(-[1,]){
		$('.sidebar h2').css({display:'none'}).fadeIn(1000);$('.sidebar p').css({display:'none'}).fadeIn(1800)
		$('.content').css({display:'none'}).fadeIn(800);
	
		$('.mainmenu a, #projects a, #footer a').click( function () {
			$('.content, .sidebar p, .sidebar h2 ').fadeTo(200, 0.00001); return true;
		} );
	}
	else {$('.content').css({display:'block'})}
	$(window).unload( function () { $('.content').fadeIn(0); } );*/
	
	$('.singlepage a:has(img)').removeAttr('href') //убирает ссылки картинок в тексте (для wordpress)


	/* Links */	
	
	/* footer link */	
	$('#footer a').css({position: 'relative', 'text-decoration': 'none'}).prepend('<div class="hover_bg"></div>')
	.mouseenter(function(){ 		
		$(this).children('.hover_bg').stop(true,true).fadeOut(200)
	}).mouseleave(function(){ 
		$(this).children('.hover_bg').fadeIn(300)
	});	
	
	/* showall link , gallery link*/
	$.fn.hoverslide = function () {
		this.each(function(){			
			if($(this).css('position')!='absolute'){$(this).css({position: 'relative'}) }	
			$(this).wrapInner('<span>').prepend('<div class="hover_bg"></div>')
			var button_bg = $(this).css('background-color')
			var button_height = $(this).innerHeight()
			$(this).mouseenter(function(){ $(this).css({background: button_bg}).children('.hover_bg').stop(true,true).animate({height: button_height}, 200)
			})
			.mouseleave(function(){ $(this).children('.hover_bg').delay(100).animate({height: 0}, 200); })		
		})
	}

	$('.content .readon, .content .all').hoverslide()
	
	$.fn.slidebutton = function () {
		this.each(function(){
			var button = $(this).parents('#projects ul li').children('.readon');		
			var button_height = button.innerHeight();
			$(this).mouseenter(function(){ 
				if(openstatus==1 && $(this).is('.image') || $(this).is('a')) {	
					button.children('.hover_bg').stop(true,true).animate({height: button_height}, 200)
				}
			})			
			.mouseleave(function(){ button.children('.hover_bg').delay(100).animate({height: 0}, 200) })					
		})
	}

	$('#projects ul li h3 a, #projects ul li .image').slidebutton()
	
	
	
	/* Footer resizing  */
	/*
	function refreshfooter(){
		var html = $('html');
		var newheight; //новая высота страницы
		var footer = $('#footer');
		var foot_pos = footer.offset();	
		var cont_h = $('.container').height();
		
		newheight = cont_h+102;
		html.animate({'height':newheight}, 400);
		//html.height(newheight);
		
		//alert (newheight);
	 
	}*/
	
});/*end of jQuery function*/



	





