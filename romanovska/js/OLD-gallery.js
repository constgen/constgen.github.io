//$(document).ready(function() {  
//	$.fn.smoothDivScroll = function() {          
//		return this; 	
//  }  
//});

$(function() {
	$("div#makeMeScrollable").smoothDivScroll({
		mouseDownSpeedBooster: 0,
		autoScroll: "",
		autoScrollDirection: "",
		autoScrollStep: 1,
		autoScrollInterval: 15,
		startAtElementId: "startAtMe",
		visibleHotSpots: "always" });
});


//		$(function() {
//			$("div#makeMeScrollable").smoothDivScroll({ autoScroll: "onstart", 
//														autoScrollDirection: "endlessloopleft",
//														autoScrollStep: 1,
//														mouseDownSpeedBooster: 10,
//														autoScrollInterval: 15,
//														startAtElementId: "startAtMe",
//														visibleHotSpots: "always" });
//			
//		});
		
$(document).ready(function(){
	$(".scrollableArea :not(div#startAtMe) img.cover").show();
	$(".scrollableArea img.preview, .scrollableArea img.cover").click(function(){
		$(".scrollableArea img.cover:hidden").show();
		var th=this;
		$(th).parent('div').children('img.cover').hide();
		str = $(th).parent('div').children('img.preview').attr('src');
		str = str.replace("gallery/img_thumbnails","gallery/img_pictures");
		$("img.activeslide").fadeOut(0,
		function (){
			$("img.activeslide").attr('src',str).load(function () {
				$("img.activeslide").fadeIn(250);
			});
		});
	});
		
		
	var gall = $("#makeMeScrollable");	
	var block = $(".galleryhide");
	block.mouseenter(function () {gall.animate({bottom: '30'});});
	gall.mouseleave(function(){gall.stop(true, false);});
	block.mouseleave(function () {gall.animate({bottom: '-190'});});













//if($.browser.msie){
//
//}
//else{} 
///*$(".galleryhide").mouseenter(function () {gall.fadeTo(800, 1.0);});*/
//	gall.mouseenter(function () {gall.fadeTo(800, 1);});
//
//	gall.mouseleave(function(){gall.stop(true, false);});
//	gall.mouseleave(function () {gall.fadeTo(800, 0);});
	
		
	

	
	
	
		/*$(".galleryhide").mouseenter(function () {gall.fadeTo(800, 1.0);});*/
/*	gall.mouseenter(function () {gall.fadeTo(800, 1);$("#makeMeScrollable img").fadeIn(800);});
		
	
	
	gall.mouseleave(function(){gall.stop(true, false);});
	gall.mouseleave(function () {gall.fadeTo(800, 0);$("#makeMeScrollable img").fadeOut(800);});*/

	

});



//$(function() {
//
//	var moving=0; 
//
//	$('.activeslide').bind("mousemove", Move);
//
//	function Move() {
//	
//		$('#makeMeScrollable').fadeIn(100);
//		
//			
//		setTimeout(enableMove, 2000);
//		$('.activeslide').unbind();
//
//	
//	}
//
//	function enableMove() {$('#makeMeScrollable').fadeOut(1000); $('.activeslide').bind("mousemove", Move);}
//
//});








