Core.register('requestProposal', function (sandbox) {
	return (function (root, $) {
		if (!root) return
		var module = {
			form: $("#requestProposalContent"),

			init: function () {
                var hasTransition = false;
                
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

                $("#requestButton .btn").click(function () {
                    sandbox.action('requestProposal-open')

                    module.trackingData({
                        module: $(root).find('.need_banner'),
                        title: 'Contact Us',
                        special: 'Footer'
                    })
                    return false;
                })
                ////for transition handler
                //if (hasTransition) {
                //    sandbox.Event.add(module.form.get(0), 'transitionend', function(e){
				//		if (e.target === this){
                //            module.form.toggleClass("opened");
                //            if (module.form.hasClass("opened")) {
                //                module.form.css({height:"auto"})
                //            }
                //        }
				//	});
                //};
                
                //module.openForm = 
                //    (hasTransition) ? 
                //        //handler with transition
                //        function() {
                //            module.form.css({height: $(root).find('form').height()});
                //            module.scrollToDestination();
				//			trackEventOpenForm();
                //        }
                //        //handler with animation
                //        : function() {
                //            module.form.animate({
                //                height: $(root).find('form').height()
                //            }, 500, 'swing', function(){
                //                module.form.addClass("opened")
                //                module.form.css({height:"auto"})
                //            })
                //            module.scrollToDestination();
				//			trackEventOpenForm();
                //        }
				
				
                                    
				//if (hasTransition) {			// If bro supports CSS transitions
                //    $("#requestButton .btn").click(function(){	// Binding on "close" 
				//		if (module.form.hasClass("opened")) {
                //            module.form.css({height: $(root).find('form').height()});
				//			setTimeout(function(){module.form.css({height: 0});},100)
				//		}
				//		else {
				//			module.form.css({height: $(root).find('form').height()});
                //            module.scrollToDestination();
				//			trackEventOpenForm();
				//		}
				//	});
					
				//}
				//else {
				//	$("#requestButton .btn").click(function(){
				//		var toggleHeight = 0;

				//		if (module.form.hasClass("opened"))  {
				//			toggleHeight=0;
				//		}
				//		else {
                //            toggleHeight = $(root).find('form').height()
                //            module.scrollToDestination();
				//			trackEventOpenForm();
                //        }

				//		$("#requestProposalContent").animate({
				//			height: toggleHeight
				//		}, 500, 'swing', function(){
                //            if (toggleHeight) {
                //                module.form.css({height:"auto"})
                //            }                            
				//			module.form.toggleClass("opened")
				//		});

				//	});
					
				//};
				
				//// Google Analytics Track Event
				//function trackEventOpenForm() {
				//	sandbox.action('trackEvent', {
				//		category: 'Request Proposal Open Form',
				//		action: 'click'
				//	})
				//};
								
				//$("#submit_proposal").click(function() {
				//	sandbox.action('trackEvent', {
				//		category: 'Request Proposal Submit Form',
				//		action: 'submit'
				//	}) 
                //});
				
//				$("#proposal-form").submit(function() {
//					sandbox.action('trackEvent', {
//						category: 'Request Proposal Submit Form',
//						action: 'submit'
//					}) 
//                });
                
			},

            scrollToDestination: function () {
                var dest = sandbox.get('offset', root).top;
                
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

				},

				'ajaxFormSent': function () {
					console.log("catch!")
					$(".ajaxStatus").html("<em>Sending</em> <img src='/images/loader.gif' />")
				},

				'ajaxFormComplete': function (status) {
					setTimeout(function() {
						if (status.data == "OK") {
							$(".ajaxStatus").html("Your proposal has been sent. Thank you")
							setTimeout(function() {
								$("#requestProposal input, #requestProposal textarea").val('');
								$("#requestProposal .success").removeClass("success")
								$("#requestProposal .error").removeClass("error")
							}, 5000)
						}
						else if (status.data == "FAIL")
							{$(".ajaxStatus").html("Your data is incorrect")}
					}, 2000);
				}
                //'requestProposal-open': function(){
                //    module.openForm();
                //}
			}

		}
		return module
	}(document.querySelector('#requestProposal'), window.jQuery)) //Node element
})
