jQuery.noConflict();


/* Lavalamp menu --------------------------------------------- */
jQuery(function($) {
			$("#mainmenu li a").css({'background':'none','margin':'0 1px','border':'none'});//онулируем css
			$("#mainmenu li a").mouseenter(function(){
				$(this).css({'background':'none','margin':'0 1px','border':'none'});//онулируем css
			});
            $("#mainmenu").lavaLamp({
                fx: "easeinout", 
                speed: 300,
            });
        });
  


/* SubmitForm --------------------------------------------- */

function submitform(){jQuery(":submit").trigger("click"); }


function showall(){ 
	jQuery('.image div').show(); 
	jQuery('.gallery').hide(); 
	jQuery('.show a:first').hide();
	jQuery('.show a:last').show();
};

function hideall(){ 
	jQuery('.image div').hide();
	jQuery('.image div:first').show();
	jQuery('.gallery').show(); 
	jQuery('.show a:first').show();
	jQuery('.show a:last').hide();
};


/* Login --------------------------------------------- */
jQuery(document).ready(function($) {	
$("#login-enter").attr('href', '#login-form');	
	
$("#login-enter").fancybox({
			overlayShow: true,
			overlayOpacity: 0.73,							  
			"padding" : 0,
			overlayColor: "#000",
			speedIn:300,
			speedOut:0,
			showCloseButton:false,
			enableEscapeButton:true
			});
});