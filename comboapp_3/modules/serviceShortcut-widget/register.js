Core.register('serviceShortcut', function (sandbox) {
	return (function (roots) {
		if (!roots.length) return
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
			            // toolbar specials
			            trackingData.label = special
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

			    $('.shortcuts .button').click(function () {
			        module.trackingData({
			            module: $(this).parent(), 
			            title: '.title a',
			            price: '.price'
			        })
			    })

			},

			listen: {
				
			}

		}
		return module
	}(document.querySelectorAll('.shortcuts'))) //Node element
})