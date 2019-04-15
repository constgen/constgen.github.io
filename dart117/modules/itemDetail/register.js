Core.register('itemDetail', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {

			    if (!sandbox.hasFeature('css-border-radius')) root.className += ' no_border-radius'

				$('.input-block input').click(function(){
					$(this).select();
				});

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

				$(".btn").click(function () {
				    module.trackingData({
				        module: $(root),
				        title: 'h1',
				        price: '.value:first'
				    })
				});

                module.sideRightElement = document.querySelector('#sideRight');
                module.needHelpElement = document.querySelector('#needHelp');
                module.footerElement = document.querySelector('#footer');
                module.containerElement = document.querySelector('#container');

                module.needHelpFromTopPos = sandbox.get('offset', module.needHelpElement).top - 80;
                module.footerFromTopPos = sandbox.get('offset', module.footerElement).top - 370;

                module.offsetLeft = sandbox.get('offset', module.sideRightElement).left

                module.moveRequestBlock = function(){
                    var top = document.body.scrollTop || document.documentElement.scrollTop;
                    if (top >= module.needHelpFromTopPos && top<=module.footerFromTopPos) {
                        module.needHelpElement.className = 'needhelp fixed';
                        module.needHelpElement.style.left = (module.offsetLeft) + 'px';
                    } else if (top>=module.footerFromTopPos) {
                        module.needHelpElement.className = 'needhelp bottom';
                    } else {
                        module.needHelpElement.className = 'needhelp';
                        module.needHelpElement.style.left = '';
                    }
                }

                sandbox.Event.add(window, 'scroll', module.moveRequestBlock);
                sandbox.Event.add(window, 'resize', module.moveRequestBlock);
			}
		}
		return module
	}(document.querySelector('.itemDetail'))) //Node element
})
