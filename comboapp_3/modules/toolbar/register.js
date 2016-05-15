Core.register('toolbar', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {
                
				module.wrapperElement = document.querySelector('#wrapper');
				module.toolbarElement = document.querySelector('#toolbar');
				module.toolbarFromTopPos = sandbox.get('offset', module.toolbarElement).top - 10 /*padding*/;

				module.moveToolbar = function(){
					var top = document.body.scrollTop || document.documentElement.scrollTop;
					if (top>=module.toolbarFromTopPos) {
						module.toolbarElement.className = 'fixed'
						module.toolbarElement.style.left = (module.wrapperElement.offsetLeft - 4) + 'px'
					} else {
						module.toolbarElement.className = ''
						module.toolbarElement.style.left = ''
					}
				}

				sandbox.Event.add(window, 'scroll', module.moveToolbar);
				sandbox.Event.add(window, 'resize', module.moveToolbar);

			    // track events
				module.trackingData = function (detail) {

				    // get tracking data
				    var trackingData = {
				        action: window.location.pathname,
				        label: 'Buy'
				    }

				    if (detail.special) {
				        // toolbar specials
				        trackingData.label = detail.special
				        if (detail.title) {
				            trackingData.category = detail.title
				        }

				    } else {

				        // send on buy button
				        sandbox.action('page-track', {
				            url: '/add_to_cart'
				        })
				        // get title
				        if (detail.title) {
				            trackingData.category = $(detail.module).find(detail.title).text()
				        }
				        // get price
				        if (detail.price) {
				            trackingData.value = $(detail.module).find(detail.price).text()
				        }

				    }

				    // send tracking data
				    sandbox.action('event-track', trackingData)
				}

				$('.buy_banner .button').click(function () {
				    module.trackingData({
				        module: $(root).find('.buy_banner'), 
				        title: '.tb_url',
				        price: '.tb_cost'
				    })

				})
				$('#cart .button').click(function () {
				    module.trackingData({
				        module: $(root).find('#cart'), 
				        title: 'Open Basket', 
				        special: 'Open Basket'
				    })

				})
				$('.need_banner .button').click(function () {
				    module.trackingData({
				        module: $(root).find('.need_banner'), 
				        title: 'Request a Proposal', 
				        special: 'Request a Proposal'
				    })

				})
				
			},

			destroy: function () {
				
			},

			listen: {
				//on basket change (add/remove)
				'basket-update': function (detail) {
					if (!detail) return

					//update cost
					if ('discountTotal' in detail) {
						$(root).find('.cost .val').html('<span>' + detail.discountTotal + '</span>')
					}
					else if ('total' in detail)
						$(root).find('.cost .val').html('<span>' + detail.total + '</span>')
					if ('countItem' in detail) {
                        $(root).find('.quant .val').html('<span>' + detail.countItem + ((detail.countItem == 1) ? '</span>' + ' service' : '</span>' + ' services'));
                        
                        if (detail.countItem <= 0){
                            $(root).find('#cart').removeClass('full')
                        }
                    }
						
				}
			}

		}
		return module
	}(document.querySelector('#toolbar'))) //Node element
})