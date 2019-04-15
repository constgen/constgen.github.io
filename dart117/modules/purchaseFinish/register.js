Core.register('purchaseFinish', function (sandbox) {
	'use strict';
	var root, module;
	// root HTML element
	if (!(root = sandbox.root = document.querySelector && document.querySelector('.purchaseFinish'))) return;

	// return module object
	return module = {
		//switchable styles
		css: '',

		init: function () {
			//show module
		    root.style.display = ''
		    // track events
		    module.trackingData = function (detail) {

		        // get tracking data
		        var trackingData = {
		            action: window.location.pathname,
		            label: 'Buy'
		        }

		        if (detail.special) {
		            // send on special
		            sandbox.action('page-track', {
		                url: '/request_proposal'
		            })

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
		                var trackingValue = $(detail.module).find(detail.price).text().replace('$', '').replace(',', '').split('.')
		                trackingData.value = trackingValue[0];
		            }

		        }
		        // send tracking data
		        sandbox.action('event-track', trackingData)
		    }

		    $(root).find('.contact').click(function () {
		        sandbox.action('requestProposal-open')

		        module.trackingData({
		            module: $(root).find('.need_banner'),
		            title: 'Contact Us',
		            special: 'Order'
		        })
		        return false;
		    })

		},

		destroy: function () {
			//hide module
			root.style.display = 'none'
		},

		listen: {
			'app-load': function (detail) {
				if (!detail) return;
			}
		}
	}
})

