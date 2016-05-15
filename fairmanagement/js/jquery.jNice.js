/*
 * UPDATED: 12.19.07
 *
 ******************************************** */
(function($){
	$.fn.jNice = function(options){
		var self = this;
		var safari = $.browser.safari; /* We need to check for safari to fix the input:text problem */
	
		/* each form */
		this.each(function(){
			/***************************

			  Check Boxes 
			 ***************************/
			$('input:checkbox', this).each(function(){
				$(this).addClass('jNiceHidden').wrap('<span></span>');
				var $wrapper = $(this).parent();
				$wrapper.prepend('<a href="#" class="jNiceCheckbox"></a>');
				/* Click Handler */
				$(this).siblings('a.jNiceCheckbox').click(function(){
						var $a = $(this);
						var input = $a.siblings('input')[0];
						if (input.checked===true){
							input.checked = false;
							$a.removeClass('jNiceChecked');
						}
						else {
							input.checked = true;
							$a.addClass('jNiceChecked');
						}
						return false;
				});
				/* set the default state */
				if (this.checked){$('a.jNiceCheckbox', $wrapper).addClass('jNiceChecked');}
			});
			
			/***************************


			  Selects 
			 ***************************/
			$('select', this).each(function(index){
				var $select = $(this);
				/* First thing we do is Wrap it */
				$(this).addClass('jNiceHidden').wrap('<div class="jNiceSelectWrapper"></div>');
				var $wrapper = $(this).parent().css({zIndex: 100-index});
				/* Now add the html for the select */
				$wrapper.prepend('<div><span></span><a href="#" class="jNiceSelectOpen"></a></div><ul><div class="list-top"></div><div class="list-middle"></div><div class="list-bottom"></div></ul>');
				var $ul = $('ul', $wrapper);
				/* Now we add the options */
				$('option', this).each(function(i){
					$ul.children('.list-middle').append('<li><a href="#" index="'+ i +'">'+ this.text +'</a></li>');
				});
				/* Hide the ul and add click handler to the a */
				$ul.hide().find('a').click(function(){
						$('a.selected', $wrapper).removeClass('selected');
						$(this).addClass('selected');	
						/* Fire the onchange event */
						if ($select[0].selectedIndex != $(this).attr('index') && $select[0].onchange) { $select[0].selectedIndex = $(this).attr('index'); $select[0].onchange(); }
						$select[0].selectedIndex = $(this).attr('index');
						$('span:eq(0)', $wrapper).html($(this).html());
						$ul.hide();
						return false;
				});
				/* Set the defalut */
				$('a:eq('+ this.selectedIndex +')', $ul).click();
			});/* End select each */
			
			/* Apply the click handler to the Open */
			$('a.jNiceSelectOpen', this).click(function(){
														var $ul = $(this).parent().siblings('ul');
														if ($ul.css('display')=='none'){hideSelect();} /* Check if box is already open to still allow toggle, but close all other selects */
    													$ul.slideToggle();
														var offSet = ($('a.selected', $ul).offset().top - $ul.offset().top);
														$ul.animate({scrollTop: offSet});
														return false;
												});
		
		}); /* End Form each */
		
		/* Hide all open selects */
		var hideSelect = function(){
			$('.jNiceSelectWrapper ul:visible').hide();
		};
		
		/* Check for an external click */
		var checkExternalClick = function(event) {
			if ($(event.target).parents('.jNiceSelectWrapper').length === 0) { hideSelect(); }
		};

		/* Apply document listener */
		$(document).mousedown(checkExternalClick);
		
			
		/* Add a new handler for the reset action */
		var jReset = function(f){
			var sel;
			$('.jNiceSelectWrapper select', f).each(function(){sel = (this.selectedIndex<0) ? 0 : this.selectedIndex; $('ul', $(this).parent()).each(function(){$('a:eq('+ sel +')', this).click();});});
			$('a.jNiceCheckbox, a.jNiceRadio', f).removeClass('jNiceChecked');
			$('input:checkbox, input:radio', f).each(function(){if(this.checked){$('a', $(this).parent()).addClass('jNiceChecked');}});
		};
		this.bind('reset',function(){var action = function(){jReset(this);}; window.setTimeout(action, 10);});
		
	};/* End the Plugin */
	
	
	
	$.fn.jNice2 = function(options){
		var self = this;
		var safari = $.browser.safari; /* We need to check for safari to fix the input:text problem */
	
		/* each form */
		this.each(function(){
			/***************************

			  Selects 
			 ***************************/
			$('select', this).each(function(index){
				var $select = $(this);
				/* First thing we do is Wrap it */
				$(this).addClass('jNiceHidden').wrap('<div class="jNiceSelectWrapper"></div>');
				var $wrapper = $(this).parent().css({zIndex: 100-index});
				/* Now add the html for the select */
				$wrapper.prepend('<div><span></span><a href="#" class="jNiceSelectOpen"></a></div><ul><div class="list-top"></div><div class="list-middle"></div><div class="list-bottom"></div></ul>');
				var $ul = $('ul', $wrapper);
				/* Now we add the options */
				$('option', this).each(function(i){
					$ul.children('.list-middle').append('<li><a href="#" index="'+ i +'">'+ this.text +'</a></li>');
				});
				/* Hide the ul and add click handler to the a */
				$ul.hide().find('a').click(function(){
						$('a.selected', $wrapper).removeClass('selected');
						$(this).addClass('selected');	
						/* Fire the onchange event */
						if ($select[0].selectedIndex != $(this).attr('index') && $select[0].onchange) { $select[0].selectedIndex = $(this).attr('index'); $select[0].onchange(); }
						$select[0].selectedIndex = $(this).attr('index');
						$('span:eq(0)', $wrapper).html($(this).html());
						$ul.hide();
						return false;
				});
				/* Set the defalut */
				$('a:eq('+ this.selectedIndex +')', $ul).click();
			});/* End select each */
			
			/* Apply the click handler to the Open */
			$('a.jNiceSelectOpen', this).click(function(){
														var $ul = $(this).parent().siblings('ul');
														if ($ul.css('display')=='none'){hideSelect();} /* Check if box is already open to still allow toggle, but close all other selects */
    													$ul.slideToggle();
														var offSet = ($('a.selected', $ul).offset().top - $ul.offset().top);
														$ul.animate({scrollTop: offSet});
														return false;
												});
		
		}); /* End Form each */
		
		/* Hide all open selects */
		var hideSelect = function(){
			$('.jNiceSelectWrapper ul:visible').hide();
		};
		
		/* Check for an external click */
		var checkExternalClick = function(event) {
			if ($(event.target).parents('.jNiceSelectWrapper').length === 0) { hideSelect(); }
		};

		/* Apply document listener */
		$(document).mousedown(checkExternalClick);
		
			
		/* Add a new handler for the reset action */
		var jReset = function(f){
			var sel;
			$('.jNiceSelectWrapper select', f).each(function(){sel = (this.selectedIndex<0) ? 0 : this.selectedIndex; $('ul', $(this).parent()).each(function(){$('a:eq('+ sel +')', this).click();});});
			$('a.jNiceCheckbox, a.jNiceRadio', f).removeClass('jNiceChecked');
			$('input:checkbox, input:radio', f).each(function(){if(this.checked){$('a', $(this).parent()).addClass('jNiceChecked');}});
		};
		this.bind('reset',function(){var action = function(){jReset(this);}; window.setTimeout(action, 10);});
		
	};/* End the modified Plugin */
	

	/* Automatically apply to any forms with class jNice */
	$(function(){$('form.jNice').jNice();	});
	$(function(){$('form.jNice2').jNice2();	});

})(jQuery);
				   
