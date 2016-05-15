Core.register('header', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {

			    

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

			    $('#contacts-btn, [href=#contacts], [href=#contact]').click(function () {
			        sandbox.action('requestProposal-open')

			        module.trackingData({
			            module: $(root).find('.need_banner'),
			            title: 'Contact Us',
			            special: 'Header'
			        })
			        return false;
			    });

			},

			scrollToDestination: function (dest) {
				if (!!($('html').scrollTop())) {
					$('html').animate({
						scrollTop: dest
					}, 700, 'swing');
				} else {
					$('html, body').animate({
						scrollTop: dest
					}, 700, 'swing');
				}
			},
			listen: {
				'app-load': function () {

				}
			}

		}
		return module
	}(document.querySelector('#header'))) //Node element
})
