/* Portdolio Tabs */

$(window).ready(function() {
    var tabContainers = $('div.tabs > div');
    tabContainers.hide().filter(':first').show();
    
    $('div.tabs ul.tabNavigation a').click(function () {
        tabContainers.hide();
        tabContainers.filter(this.hash).show();
        $('div.tabs ul.tabNavigation a').removeClass('selected');
        $(this).addClass('selected');
        return false;
    }).filter(':first').click();
});

/* Services Accordion */

// Когда страница полностью загружена
$(window).ready(function()
{	
	// Скрываем все секции кроме первой
	$('#accordion > div:not(:first)').hide();
	// Делаем первую секцию активной
	$('#accordion h3:first, #accordion div:first').addClass('active');
	// Если пользователь кликнул на секцию
	$('#accordion > h3').click(function()
	{
		// Сбрасываем все секции
		$('#accordion > h3').removeClass('active');
		$('#accordion > div:visible').slideUp(0);
		
		// Делаем активной на которую кликнули
		$(this).addClass('active');
		box = $(this).next().addClass('active');
		$(box).fadeIn('fast, easeOut');
	});
});

$(document).ready (function(){
	$('#slide1').timerGallery({idPre: 'img' , interval : '4000' });	
});