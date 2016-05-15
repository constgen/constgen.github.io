

//	Background
	$(function(){
		$.fn.supersized.options = {  
				startwidth: 16,  
				startheight: 9,
				vertical_center: 1,
				
				slideshow: 0,
				navigation: 1,
				transition: 1, //0-None, 1-Fade, 2-slide top, 3-slide right, 4-slide bottom, 5-slide left
				pause_hover: 0,
				slide_counter: 1,
				slide_captions: 1,
				slide_interval: 3000  
		};
        $('#supersize').supersized(); 
    });

//-----------------------------------------------



//	Info in INDEX

$(document).ready(function(){	
$(".button").mouseenter(function () {$(".subinfo").stop(true, true); $(this).next(".subinfo").fadeIn(900); });
$(".button").mouseleave(function () {$(".subinfo").stop(true, true); $(".subinfo").fadeOut(200);});
//$(".button").click(function () {$(".subinfo").stop(true, true); $(".subinfo").fadeOut(0);});
});

//$(window).unload( function () {$(".subinfo").stop(true, true); $(".subinfo").fadeOut(0);} );
//-----------------------------------------------



//	Mainmenu submenu

$(document).ready(function(){
$(".button").click(function () {
	$(".submenu").stop(false, true); 
	if(-[1,]){$(this).parents("li").children(".submenu").fadeIn(400);}
	else{$(this).parents("li").children(".submenu").fadeIn(0);};
	$(this).parents("li").children(".submenu").parents("li").children(".button").addClass("active");
});
	
//$(".submenu").mouseleave(function () {
//	if(-[1,]){$(this).fadeOut(50); $(".button").removeClass("active");}
//	else{$(this).fadeOut(0); $(".button").removeClass("active");};
//});
//
//$(".submenu a").click(function () {$(".submenu").fadeOut(0); $(".button").removeClass("active");});

$(".submenu").mouseleave(function () {
	if(-[1,]){$(this).fadeOut(400); $(this).prev(".button").removeClass("active");}
	else{$(this).fadeOut(0); $(this).prev(".button").removeClass("active");};
});

$(".submenu").click(function () {
	if(-[1,]){$(this).fadeOut(400); $(this).prev(".button").removeClass("active");}
	else{$(this).fadeOut(0);  $(this).prev(".button").removeClass("active");};
});

});

//-----------------------------------------------

















