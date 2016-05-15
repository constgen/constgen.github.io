Core.register('needHelp', function (sandbox) {
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

                $("#needHelp .btn").bind('mousedown',function (e){
                    if (/#requestproposal/i.test(this.href.toLowerCase())) {
                        e.preventDefault()
                        sandbox.action('requestProposal-open');

                        module.trackingData({
                            module: $(root).find('.need_banner'),
                            title: 'Contact Us',
                            special: 'Need Help Widget'
                        })
                        return false;
                    }
                });

                module.sideRightElement = document.querySelector('#sideRight');
				module.needHelpElement = document.querySelector('#needHelp');
				module.footerElement = document.querySelector('#footer');
				module.containerElement = document.querySelector('#container');

				module.needHelpFromTopPos = sandbox.get('offset', module.needHelpElement).top - 80;
				module.footerFromTopPos = sandbox.get('offset', module.footerElement).top - 370;

//				module.offsetLeft = sandbox.get('offset', module.sideRightElement).left;

                module.moveRequestBlock = function(){

					module.offsetLeft = sandbox.get('offset', module.sideRightElement).left;

					var top = document.body.scrollTop || document.documentElement.scrollTop;
					if (top >= module.needHelpFromTopPos && top <= module.footerFromTopPos) {
						module.needHelpElement.className = 'needhelp fixed';
						module.needHelpElement.style.left = (module.offsetLeft) + 'px';
					} else if (top >= module.footerFromTopPos) {
						module.needHelpElement.className = 'needhelp bottom';
					} else {
						module.needHelpElement.className = 'needhelp';
                    	module.needHelpElement.style.left = '';
                    }
                }

                $(window).scroll(module.moveRequestBlock);
                $(window).resize(module.moveRequestBlock);
			},

			listen: {

			}
		}
		return module
	}(document.querySelector('#needHelp')))
})