
/* Fonts */
Cufon.set("fontFamily", "Myriad Pro");
Cufon.replace('#indexmenu', {hover: true, fontSize:'21px'}); 
Cufon.replace('#mainmenu', {hover: true, fontSize:'14px'}); 
Cufon.replace("#call", {textShadow: "0px 1px #fff"});
Cufon.replace("h2", {textShadow: "0px 1px #fff"});

Cufon.set("fontFamily", "BauhausCTT");
Cufon.replace("#call", {textShadow: "0px 1px #fff"});



$(document).ready(function(){
	
/* Menus */

	var speed = 300;
	if(-[1,]){		
	$('.menu a').mouseenter(function(){ 
		if ($(this).parent('li').is('.active')) {} else {
			$(this).css({background:'none'}).children('.hover_bg').stop(true,true).fadeIn(speed);
		}
	});
	$('.menu a').mouseleave(function(){ $(this).children('.hover_bg').fadeOut(speed); });	
	}else{}
	
/* Pages */
	if(-[1,]){$('#content').fadeIn(400);}
	
/* Fullscreen img */
	$('#bord').click(function(){ $('.image:not(:hidden)').trigger("click");});

});



