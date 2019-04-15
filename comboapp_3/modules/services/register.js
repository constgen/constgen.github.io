Core.register('services', function (sandbox) {
	return (function (root, $) {
		if (!root || !$) return
		var module = {
			init: function () {
				var SPEED = 400

				//Open/close service package description
				$('#container').delegate('.service.pack .buy .button', 'click', function () {
					$(this).toggleClass('expanded').parent().parent().find('.details').slideToggle(SPEED)
					return false
				})
                
                //Open/close service description full information
				$('#container').delegate('.service .more_info', 'click', function () {
					$(this).parents('.service.short_description').removeClass('short_description')
					return false
				})

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

				        // send page tracking on buy button
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

			    // track event
				$('.services .button').click(function () {
				    module.trackingData({
				        module: $(this).parent().parent(),
				        title: '.title a',
                        price: '.price'
				    })
				})

			},
			listen: {			
				'servicedetails-update': function (detail) {
					var formId = detail.formId, data = detail.data;
					$("#" + formId + " input, #" + this.formId + " select").removeClass("invalid");
					if (typeof data !== "object") {
						$("#" + formId).parents(".service").find("a.button").removeClass("hidden");
						$("#" + formId).parents(".service").find("span.button").addClass("hidden");
						$("#" + formId).parents(".service").find("span.price").html(data);
					} else {
						$("#" + formId).parents(".service").find("a.button").addClass("hidden");
						$("#" + formId).parents(".service").find("span.button").removeClass("hidden");
						for (id in data) {
							$("#" + formId + " #" + id).addClass("invalid");
						}
					}
				}
			}
		}
		return module
	}(document.querySelector('.services'), window.jQuery)) //Node element
})
