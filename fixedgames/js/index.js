
// Fonts

	Cufon.replace("h2" , { fontFamily: 'Myriad Pro' });

//------------------------------------------


/* LoginForm --------------------------------------------- */

function submitloginform()
	{
	$("#push").trigger("click");
	}


$(document).ready(function(){

	var tab = $("#enter")
	var form = $("#login form")
	var reg = $("#reg")
	var registration = $("#registration-bg")
	var foc
	var over
	
	if(-[1,]){
	$(tab).mouseenter(function () {$(form).fadeIn(150); $(this).addClass("active"); });
	$(form).mouseenter(function () {over=1});	
	$(form).mouseleave(function () { over=0; if(foc!=1) {$(form).fadeOut(200); $(tab).removeClass("active");} });
	$('body').click(function () { if(over!=1) {$(form).fadeOut(200); $(tab).removeClass("active");} });
	
	$(reg).click(function () {$("#registration").fadeIn(250); });	
	$(registration).click(function () {$("#registration").fadeOut(100); });
	}
	
	else{
	$(tab).mouseenter(function () {$(form).fadeIn(0); $(this).addClass("active"); });	
	$(form).mouseleave(function () { if(foc!=1) {$(form).fadeOut(0); $(tab).removeClass("active");} });
	
	$(reg).click(function () {$("#registration").fadeIn(0); });	
	$(registration).click(function () {$("#registration").fadeOut(0); });
	};
	
	$(":password, :text").focusin(function () { foc=1 });
	$(":password, :text").focusout(function () { foc=0 });	
	
	/*$(form).mouseleave(function(){$(form).stop(false, true);});*/
/*  --------------------------------------------- */
	
	
/* Mainmenu --------------------------------------------- */
	
	function push_matches () {
		$(".stats").fadeOut(0); 
		$(".matches").fadeIn(300);
		$("#mainmenu li").removeClass("active");
		$("#menu-matches").parent("li").addClass("active");
	}
	
	function push_stats () {
		$(".matches").fadeOut(0); 
		$(".stats").fadeIn(300);
		$("#mainmenu li").removeClass("active");
		$("#menu-stats").parent("li").addClass("active");
	}
	
	$("#menu-matches").click(push_matches);
	$(".menu-matches").click(push_matches);
	
	$("#menu-stats").click(push_stats);
	$(".menu-stats").click(push_stats);
	
	
	
	
/* Links --------------------------------------------- */
	
	$("table a").click(function () {$(this).fadeOut(100).fadeIn(200); });	
	
	
/*  --------------------------------------------- */




/* Table scrolling --------------------------------------------- */
	

$('div#scDown').click( function() { $('div#scrolled').scrollTo( '+=180px', 400 ); } );
$('div#scUp').click( function() { $('div#scrolled').scrollTo( '-=180px', 400 ); } );

$(".load").fadeOut(0).fadeIn(500);

});









