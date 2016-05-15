(function($, window){
	
	var Sandbox = {
		event: {
			add: 	 function (elems, events, func) { $(elems).bind(events, func) },
			remove:  function (elems, events, func) { $(elems).unbind(events, func) },
			trigger: function (elems, events) 		{ $(elems).trigger(events) }
		},

		dom: function (selector, context) {
			(context || document).querySelectorAll(selector)
		},
		
		//Feature detection
		feature: {
			// SVG support (from Modernizr)
			SVGImage: (function(){
				return (!!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);
			}()),

			// Check input[type="range"] support (from Modernizr)
			inputTypeRange: (function(){
				inputElem = document.createElement('input')
				inputElem.setAttribute('type', 'range')
				if (inputElem.type == 'range') return true
				else return false
			}()),
			
			touchscreen: 'createTouch' in document //true or false
		},
		
		//Sanbox events
		action: function (event, data) {
			if (!event) return
			switch (event) {
				
				case 'basket-add': 
					Core.ajax({
						url: window.location.protocol+'//'+window.location.host+'/ajaxbasket?addItem='+data.id,
						dataType: 'json',
						success: function(json){
							if (json.error) return
							Core.action('basket-change', json)
						}
					})
					break
					
				case 'basket-remove': 
					Core.ajax({
						url: window.location.protocol+'//'+window.location.host+'/ajaxbasketdel?deleteItem='+data.deleteId+'&orderItem='+data.serviceId,
						dataType: 'json',
						success: function(json){
							if (json.error) return
							json.index = data.index
							json.service = data.service
							Core.action('basket-change', json)
						}
					})
					break
				
				default: break
			}
			return this
		}
	}
	

	
	var Core = {
		//Ajax library
		ajax: $.ajax,
		
		//Global events
		action: (!window.Module) ? 
			function () {}//empty function
			: function (event, data) {
				if (!event) return
				for (i in Module) {
					if (typeof Module[i] === 'function') {
						Module[i](event, data)
					}
				}
			}
		,
		
		Format: {
			//Format to money (456789.00 to 456,789.00)
			money: function (n, c, d, t){
				c = c || '.'
				d = d || '.'
				t = t || ','
				var m = (c = Math.abs(c) + 1 ? c : 2, d = d || ",", t = t || ".",  
					/(\d+)(?:(\.\d+)|)/.exec(n + "")), x = m[1].length > 3 ? m[1].length % 3 : 0;  
				return (x ? m[1].substr(0, x) + t : "") + m[1].substr(x).replace(/(\d{3})(?=\d)/g,  
					"$1" + t) + (c ? d + (+m[2] || 0).toFixed(c).substr(2) : "");  
			}
		}
	}
	
	
/*Functions*/
	
	

/*Global object*/	
	window.sandbox = Sandbox
})(jQuery, this);




/*Modules*/

var Module = {}

//Cart
Module.Cart = (function(cart){
	if (!cart) return
	var price = cart.getElementsByTagName('div')[0].getElementsByTagName('output')[0],
		quant = cart.getElementsByTagName('div')[1].getElementsByTagName('output')[0]
		wrapper = document.getElementById('wrapper') || {offsetLeft: 0};
	
	//moveing during scroll
	sandbox.event.add(window, 'scroll resize', moveCart)
	function moveCart(){
		var top = document.body.scrollTop || document.documentElement.scrollTop
		if (top >= 233) {
			cart.className = 'fixed'
			cart.style.left = wrapper.offsetLeft +'px'
		} else {
			cart.className = ''
			cart.style.left = ''
		}
	}

	//listener
	return function(event, data){
		switch (event) {
			case 'basket-change': 
				if (data.setupPrice)
					price.innerHTML = data.setupPrice
				if (data.itemNumber)
					quant.innerHTML = data.itemNumber
				break

		}
	}
}(document.getElementById('cart')))






//add Services to Cart by clickind to buttons "add to cart"
Module.addToCart = (function(){
	sandbox.event.add(sandbox.dom('#pricing .button, #services .button'), 'click', addToCart)
	
	function addToCart(){
		var parentBlock = this.parentNode,
			id = parentBlock.getAttribute('data-serviceID')
		
		//calculation widjet
		if (id == 'goto_option')
			id = sandbox.dom('.option')[0].parentNode.getAttribute('data-serviceID')
		
		//153:inputValue:selectValue
		else if (id == 153) {
			id += ':' + sandbox.dom('.option input', parentBlock)[0].value +':'+ sandbox.dom('.option select', parentBlock)[0].value
		}
		//436:selectValue:inputValue
		else if (id == 436) {
			id += ':' + sandbox.dom('.option select', parentBlock)[0].value +':'+ sandbox.dom('.option input', parentBlock)[0].value
		}
		else if (id == null) return false
		
		sandbox.action('basket-add', {'id': id})
	
		return false
	}
	
	//no listener
	return false
}())







//Basket Table
Module.BasketTable = (function(basket){
	if (!basket) return

	sandbox.event.add( sandbox.dom('.basketform .remove', basket) , 'click', removeService)
	function removeService(){
		var index = jQuery(this).parent().parent().find('.remove').index($(this)),
			service = this
		
		Snadbox.action('basket-remove', {
			deleteId: service.getAttribute('data-deleteID'),
			serviceId: service.parentNode.parentNode.parentNode.getAttribute('data-serviceID'),
			index: index,
			service: service
		})
		
		return false
	}
	
	
	//listener
	return function(event, data){
		switch (event) {
			
			case 'basket-change': 			
				//updateTotalPrice
				if (data.service) jQuery(data.service).parent().parent().parent().find('td:last-child output').html(data.total)
				jQuery('#total').html(data.setupPrice)
								
				//deleteFromBasket
				var tr = jQuery(data.service).parent().parent().parent(),
				td = tr.children('td')
		
				td.eq(0).children('span').eq(data.index).remove()
				td.eq(1).children('span').eq(data.index).remove()
				td.eq(2).children('span').eq(data.index).remove()
				
				td.children('span:first-child').removeClass('additional')
		
				if (!td.children('span').length) {
					tr.remove()
					if (!-[1,]) {
						$('table tbody tr').removeClass('even')
						$('table tbody tr:odd').addClass('even')
					}
				}

				break

		}
	}
}(document.getElementById('basket')))




//Pricing
Module.Pricing = (function(pricing){
	if (!pricing) return

	
	
	
	//listener
	return function(event, data){
		switch (event) {
			
			case 'basket-change': 			
				
				break

		}
	}
}(document.getElementById('pricing')))




//Clients
Module.BasketTable = (function(clients){
	if (!basket) return

	jQuery("#scroller").scrollable({ 
		circular: false, 
		mousewheel: false,
		speed: 500,
		next: '.next',
		prev: '.prev'
	})
	
	var Scrollapi = $("#scroller").data("scrollable");

	//var i = $('#scroller .items a').index($('#scroller .items a.active').get(0));
	
	//if few clients, hide arrows, else use mousewheel to scroll icons
	if (jQuery('#scroller .items > div').length <=1) 
		jQuery('#scrollable .prev, #scrollable .next').addClass('disabled')
	else {
		jQuery("#scroller").mousewheel(function(event, delta) {
			if(delta>0 && $("#scroller .items").is(":animated")!=true) Scrollapi.prev()
			if(delta<0 && $("#scroller .items").is(":animated")!=true) Scrollapi.next()
			return false
		})
	}
	
	jQuery('#scrollable > a').click(function(){return false})
	
	jQuery(".tabs").tabs(".panes > div", {
		tabs: 'a',
		history: true,
		current:'active',
		event: ($('#clients').hasClass('short')) ? 'click' : 'mouseup',
		effect: "fade" ,
		fadeInSpeed: 800,
		fadeOutSpeed:0
	})
	
}(document.getElementById('clients')))






//SVG images
Module.Images = (function(){

	if (!sandbox.feature.SVGImage) {
		jQuery('img[src$=".svg"]').each(function(){
			this.src = this.src.replace('.svg', '')
		})
	}
	
}())