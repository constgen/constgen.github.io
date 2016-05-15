
/* SubmitForm --------------------------------------------- */
function submitform(){	$(":submit").trigger("click"); }


$(document).ready(function(){


/* Pages */
//	if(-[1,]){$('#content').css({display:'none'}).fadeIn(400);}
	

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
});
/* End of Pagination*/



