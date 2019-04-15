

/* Fonts ---------------------------------------------*/


Cufon.set("fontFamily", "Myriad Pro");

Cufon.replace('#mainmenu', {hover: true, fontSize: '16px'}); 
Cufon.replace('table');
Cufon.replace('table a');
Cufon.replace('h2');
Cufon.replace('h3');
Cufon.replace('.anytext');
Cufon.replace('.help');
Cufon.replace('small');
Cufon.replace('.dollar');
Cufon.replace('p');
Cufon.replace('label');



/*  ---------------------------------------------*/



/* SubmitForm --------------------------------------------- */

function submitform(){	$(":submit").trigger("click"); }


/* Links */
$(document).ready(function(){
		
	$('p a').css({background:'', 'text-decoration': 'none'});
	function article_a(){$('.article a').css({background:'url(images/bg-a-underline.png) repeat-x left bottom','text-decoration': 'none'});}
	article_a();
	$('.article a').mouseenter(function(){ $(this).css({background:'none'}); });
	$('.article a').mouseleave(article_a);
	function table_a(){$('table a').not('.jNiceCheckbox').css({background:'url(images/bg-a-underline.png) repeat-x left bottom','text-decoration': 'none'});}
	table_a();
	$('table a').mouseenter(function(){ $(this.not('.jNiceCheckbox')).css({background:'none'}); });
	$('table a').mouseleave(table_a);

});