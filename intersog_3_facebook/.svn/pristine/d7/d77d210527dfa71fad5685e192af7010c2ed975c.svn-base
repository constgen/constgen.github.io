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
