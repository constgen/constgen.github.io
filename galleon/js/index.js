
/* Fonts*/
Cufon.set("fontFamily", "Myriad Pro");
Cufon.replace("#search form button", {hover: true, fontSize:'24px'});
Cufon.replace("#feedback button", {hover: true, fontSize:'14px'});
Cufon.replace("h2", {fontSize:'19px'});
//Cufon.replace("#mainmenu a", {hover: true, fontSize:'14px'});
//Cufon.replace("#mainmenu .submenu a", {hover: true, fontSize:'12px'});

Cufon.set("fontFamily", "Myriad Pro Cond");
Cufon.replace(".call", {fontSize:'15px'});
Cufon.replace(".call span", {fontSize:'25px'});
Cufon.replace("#search #searchTabs a", {textShadow: "0px 1px #fff", fontSize:'15px'});




$(document).ready(function(){
		
	/*For Fonts*/
	$("#search #searchTabs a").click(function(){Cufon.refresh(["#search #searchTabs a"]);});
	
	
	
	
/* Menu*/
	$("li.sub").click( function(){
		$(".submenu").fadeOut(100); 
		$(this).children(".submenu").fadeIn(400); 
	})
	$(".submenu").click(function(event){
	  event.stopPropagation();
	});  
	//Alternater
	/*$("li.sub").click( function(){
		$(".submenu").fadeOut(100); 
		$(this).children(".submenu").fadeIn(400); 
		return false; 
	}).parents().click( function(){
		$(".submenu").fadeOut(100);	
	});*/
	
	
	
	
/* Pagination*/
	var i = 0;
	var active_i;//для номера текущей страницы
	//посчитать количество страниц в навигации
	$('#pagenav .numbers').children("a").each (function () {
		i++;
		if ($(this).is('.active') == true){ active_i = i;}
	});
	var pages = i;
	
	//если больше 7 страниц минимизировать навигацию
	if (pages>7){
		
		i=0; $('#pagenav .numbers').children("a").each (function () {
			i++;
			if (
			i>1 && i<pages 
			&&			 
			(i>4 || active_i>4)
			&& 
			(i<(pages-3) || active_i<(pages-3)) 
			) 
			 {this.style.display = 'none';}
		});

		//отобразить активный элемент и соседние по одному справа и слева
		 $('.active').css ({display: 'block'});
		 $('.active').next('a').css ({display: 'block'});
		 $('.active').prev('a').css ({display: 'block'});
		 
		 if(active_i>4){$('#pagenav .numbers a:first-child').after('<a class="dots frst">...</a>');}//вставить первое многоточие
		 if(active_i<(pages-3)){$('#pagenav .numbers a:last-child').before('<a class="dots lst">...</a>');}//вставить последнее многоточие
		
		//раскрыть страницы между первым многоточием и спрятать между последним
		$('.dots.frst').click(function(){					
			i=0; $('#pagenav .numbers').children("a").each (function () {
				i++;
				if (i<=active_i+1/*с учётом многоточия*/){$(this).css ({display: 'block'});}
				else if (i>active_i && $(this).is('.dots') == false && $(this).is(':last-child') == false){this.style.display ='none';}
				else if ($(this).is('.dots') == true ){this.style.display = 'block';}
			});
			this.style.display ='none';
			$('.active').next('a').css({display: 'block'});
			if ($('.active').next('a').next('a').next('a').is(':last-child') == true){$('.active').next('a').next('a').css({display: 'block'});}
		});
		
		//раскрыть страницы между последним многоточиеми спрятать между последним
		$('.dots.lst').click(function(){					
			i=0; $('#pagenav .numbers').children("a").each (function () {
				i++;
				if (i>=active_i/*с учётом многоточия*/){$(this).css ({display: 'block'});}
				else if (i<active_i && $(this).is('.dots') == false && i!=1){this.style.display = 'none';}
				else if ($(this).is('.dots') == true ){this.style.display = 'block';}
			});
			this.style.display = 'none';
		 	$('.active').prev('a').css ({display: 'block'});
			if ($('.active').prev('a').prev('a').prev('a').is(':first-child') == true){$('.active').prev('a').prev('a').css({display: 'block'});}
		});
	}
	/* End of Pagination*/
	
	
});


