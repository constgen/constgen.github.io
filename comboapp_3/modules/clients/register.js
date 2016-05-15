Core.register('clients', function (sandbox) {
	return (function (root, $) {
		if (!root) return
		var module = {
			init: function(){
					if ($('#scroller .items > div').length <=1) 
						$('#scrollable .prev, #scrollable .next').addClass('disabled')
					else
						$('#scrollable .prev, #scrollable .next').removeClass('disabled')
					
					$("#scroller").scrollable({ 
						circular: false, 
						mousewheel: false,
						speed: 500,
						next: '.next',
						prev: '.prev'
					})
				
					var Scrollapi = $("#scroller").data("scrollable");

					//var i = $('#scroller .items a').index($('#scroller .items a.active').get(0));
				
					//if few clients, hide arrows, else use mousewheel to scroll icons

					/*else {
						$("#scroller").mousewheel(function(event, delta) {
							if(delta>0 && $("#scroller .items").is(":animated")!=true) Scrollapi.prev()
							if(delta<0 && $("#scroller .items").is(":animated")!=true) Scrollapi.next()
							return false
						})
					}*/
				
					$('#scrollable > a').click(function(){
						return false
					})
				
					$(".tabs").tabs(".panes > article", {
						tabs: 'a',
						history: true,
						current:'active',
						event: ($('#clients').hasClass('short')) ? 'click' : 'mouseup',
						effect: "fade" ,
						fadeInSpeed: 800,
						fadeOutSpeed:0
					})

			},

			listen: {
				
			}

			/* CLIENTS slide-show */
				
		}
		return module
	}(document.querySelector('#clients'), window.jQuery))
})







