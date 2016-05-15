
														/*Detecting touch device*/
var touchdevice = 'createTouch' in document; //true or false
	


													/* Проверка на поддержку свойств CSS3 */

domPrefixes = 'Webkit Moz O ms Khtml'.split(' ')
testElem = document.createElement('test')
test_style = testElem.style
function test_props_all( prop ) { 
	var uc_prop = prop.charAt(0).toUpperCase() + prop.substr(1)
	props   = (prop + ' ' + domPrefixes.join(uc_prop + ' ') + uc_prop).split(' ')
	return !!test_props( props );
}
function test_props( props ) {
	for ( var i in props ) {if ( test_style[ props[i] ] !== undefined  ) {return true}}
}
//transitionProperty, backgroundsize, borderimage, boxShadow, animationName, columnCount, boxReflect
cssboxshadow = test_props_all( 'boxShadow' )

domPrefixes,testElem,test_style = null
//alert(cssboxshadow)	
	
	
	
	



													/*Скроллеры и табы*/

;(function($, block){
	if (!block) return
	
	$("#scroll").scrollable({ 
		circular: false, 
		mousewheel: false,
		speed: 400,
		next: '.next',
		prev: '.prev'
	})/*.autoscroll({
		autoplay: true,
		interval: 1000,
		autopause: true,
		steps: 1
	})*/
	
	var Scrollapi = $("#scroll").data("scrollable")
	
	if (block.id == "portfolio") {
		$("#scroll").mousewheel(function(event, delta) {
			if(delta>0 && $("#scroll .items").is(":animated")!=true) Scrollapi.prev()
			if(delta<0 && $("#scroll .items").is(":animated")!=true) Scrollapi.next()
			return false
		})
	}
	
	$('#scrollable > a').click(function(){return false})
	
	/*In Process*/
	if (block.id == "process") {
		$('.tabs a').click(function(){
			var elem = $(this)
			if (elem.prev().hasClass('active'))
				Scrollapi.next()
			else if (elem.next().hasClass('active')) 
				Scrollapi.prev()
		})
		
		$('#scrollable .next').click(function(){if (!$(this).hasClass('disabled')) Tabapi.next()})
		$('#scrollable .prev').click(function(){if (!$(this).hasClass('disabled')) Tabapi.prev()})
	}
	
	//New effect
	$.tools.tabs.addEffect("slider", function(i, done) {
		var pane = this.getCurrentPane()
		pane.parent().animate({left: -i*(pane.outerWidth(true))},this.getConf().speed)
		done.call()
	});
	
	$(".tabs").tabs(".panes > div", {
		tabs: 'a',
		history: true,
		current:'active',
		event: 'click',
		effect: (block.id=="slides") ? 'slider' : 'fade' ,
		rotate: true,
		speed: 400
	}).slideshow({
		autoplay: (block.id == "slides") ? true : false,
		interval: 3000,
		autopause: true,
		clickable: false
	})
	
	var Tabapi = $('.tabs').data('tabs')
	
	$('.tabs a').click(function(){return false})

}(jQuery, document.getElementById('slides') || document.getElementById('process') || document.getElementById('feedback') || document.getElementById('portfolio')));



												/* Feedback open/close */

;(function($){
	$(window).bind('hashchange', function(e){
		if (!location.hash) $('#feedback').hide()
	})
	$('.feedback, .ordernow').click(function(){
		$('#feedback').show()
		//return false
	})
	$('#feedback .close').click(function(){
		$('#feedback').hide()
		window.location.hash = ''
		return false
	})	
	if (location.hash == '#feedbackform' || location.hash == '#ordernowform') $('#feedback').show()
}(jQuery))




												/* Toggle Details */

;(function($){
	/*In Leadership*/
	if ($('.leader').length)
		$('.more-detail').click(function(){
			$(this).prev().get(0).detailsToggle()
			$(this).toggleClass('opened')
			return false
		})
	
	/*In Product page*/
	if ($('#product').length) Details.onaftertoggle = function(data){
		if (data.opened) {
			data.details.style.overflow = 'auto'
			data.details.style.display = 'inline'
		} else {
			data.details.style.overflow = 'hidden'
			data.details.style.display = 'block'
		}

	}
}(jQuery));




										/*Sidebar switching active items*/
;(function($){
	/*In Product page*/
	if ($('#group').length) {
		var items  = $('#rightSidebar a')
		items.click(function(){
			items.removeClass('active')
			$(this).addClass('active')
		})	
	}
}(jQuery))




											/* AJAX subscribe */

function subscribed (data){
	var output = jQuery('.subscribebutton').parents('output').get(0)
	output.innerHTML = data.message
}

jQuery('.subscribebutton').click(function(){
	var input = this.parentNode.getElementsByTagName('input')[0];

	//return false
	if (!input.value || /invalid/.test(input.className) || !ValidForm.validation.input(input)) return false
	
	jQuery.ajax({
		//url: window.location.protocol+'//'+window.location.host+'/modules/mod_ajaxjnews/ajax.php?email='+value,
		url: 'http://test.intersogproducts.com/?r=index/subscribe&email=' + input.value,
		crossDomain: true,
		dataType: 'jsonp',
		jsonpCallback: 'subscribed'
	})
	return false
})

/*In feedback form*/
function submitFeedback (data){
	if (!data.status) {
		jQuery('#feedback form').get(0).submit()
		jQuery('#feedback').hide()
	}
		
}

jQuery('#feedback form').submit(function(){
	if (jQuery(this).find('input[name="get_newsletters"]').get(0).checked) {
		jQuery.ajax({
			//url: window.location.protocol+'//'+window.location.host+'/modules/mod_ajaxjnews/ajax.php?email='+value,
			url: 'http://test.intersogproducts.com/?r=index/subscribe&email='+jQuery(this).children('input[name="email"]').eq(0).val(),
			crossDomain: true,
			dataType: 'jsonp',
			jsonpCallback: 'submitFeedback'
		})
		return false
	} else {
		jQuery('#feedback').hide()
	}
})

;(function($){
	$('#iFeedback').bind('load', function(){
		console.log(this.contentWindow.document.body.innerHTML)
		if (this.contentWindow.document.body.innerHTML) console.log('submit')
	})
}(jQuery))
	






										/* Forms validation */
VF.options.position = 'top'

