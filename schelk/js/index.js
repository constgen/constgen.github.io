
// Gallery

$(function() {
    $(".gallery").jCarouselLite({
      btnNext: ".nav-right",
      btnPrev: ".nav-left",
		visible: 1,
    	speed: 500
   		//auto: 800,
		//circular: false
    });
});

//------------------------------------------



// Imgdownload

a = new Image();
a.src = "images/women-bg.jpg";
b = new Image();
b.src = "images/men-bg.jpg";

//------------------------------------------



// Fonts

	Cufon.replace(".bg p" , { fontFamily: 'Myriad Pro' });
	Cufon.replace("h2" , { fontFamily: 'Myriad Pro Cond' });
	Cufon.replace(".menu a" , { fontFamily: 'Myriad Pro Cond' });
	
//------------------------------------------


// Navigation

$(document).ready(function(){
	 
	$(".menu a").mouseleave(function(){$(".fon:animated").stop(true, true);});
	$(".menu a").mouseleave(function () {$(".fon").fadeOut(500);});
	
	$("#men").mouseenter(function () {$(".bg-men").fadeIn(900);});
	
	$("#women").mouseenter(function () {$(".bg-women").fadeIn(900);});
	
	$("#kids").mouseenter(function () {$(".bg-kids").fadeIn(900);});
	
	$("#peiz").mouseenter(function () {$(".bg-peiz").fadeIn(900);});
	
	$("#posta").mouseenter(function () {$(".bg-posta").fadeIn(900);});
	
	$("#predm").mouseenter(function () {$(".bg-predm").fadeIn(700);});
	
	$("#wed").mouseenter(function () {$(".bg-wed").fadeIn(700);});
});

//------------------------------------------