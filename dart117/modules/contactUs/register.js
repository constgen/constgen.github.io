Core.register('contactUs', function (sandbox) {
	'use strict';
	var root, module;
	// root HTML element
	if (!(root = sandbox.root = document.querySelector && document.querySelector('#contactUs'))) return;

	// return module object
	return module = {
		//switchable styles
		css: '',

		init: function () {

		    //show module
		    //root.style.display = ''

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
		        console.log(trackingData)
		        // send tracking data
		        sandbox.action('event-track', trackingData)
		    }
		    module.showForm = function () {

		        $(root).addClass('vis')
		        $(root).find('.form-close-button a').click(function () {
		            module.hideForm()
		            return false
		        })
		        //trackEventOpenForm()

		    }
		    module.hideForm = function () {

		        $(root).attr('class', 'hid')

                // reset message with delay to let animation end
		        setTimeout(function () {

		            // reset message
		            $(root).find('.success-message').removeClass('visible').addClass('hidden')
		            $(root).find('form').removeClass('hidden').addClass('visible')

		            // reset popup height
		            $(root).find('#contactUsWrapper').removeClass('smallHeight').addClass('largeHeight')

		        }, 300)
		        
		    }
		    module.sendingFormStart = function () {

		        // change buttons
		        $(root).find('.button').removeClass('vis').addClass('hid')
		        $(root).find('.process-button').removeClass('hid').addClass('vis')

		        // prevent button action
		        $(root).find('.process-button').click(function () {
		            return false;
		        })

		    }
		    module.sendingFormSuccess = function () {

		        // hide form, show message
		        $(root).find('.success-message').removeClass('hidden').addClass('visible')
		        $(root).find('form').removeClass('visible').addClass('hidden')

		        // change popup height
		        $(root).find('#contactUsWrapper').removeClass('largeHeight').addClass('smallHeight')

		        // change buttons
		        $(root).find('.button').removeClass('hid').addClass('vis')
		        $(root).find('.process-button').removeClass('vis').addClass('hid')

                // track form submit
		        module.trackingData({
		            title: 'Contact Us',
		            special: 'Submit Form'
		        })

		    }

		    // Google Analytics Track Event
		    //function trackEventOpenForm() {
		    //    sandbox.action('trackEvent', {
		    //		category: 'Request Proposal Open Form',
		    //		action: 'click'
		    //	})
		    //};

		},

		destroy: function () {
			//hide module
			root.style.display = 'none'
		},

		listen: {
			'app-load': function (detail) {
				if (!detail) return;
			},
            'requestProposal-open': function(){
	            module.showForm();
            },
            'sendform-start': function () {
                module.sendingFormStart();
            },
            'sendform-success': function(){
                module.sendingFormSuccess();
            }
		}
	}
})

