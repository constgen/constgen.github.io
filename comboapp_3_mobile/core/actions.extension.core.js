
//site actions
Core.extend(function (Core) {
	'use strict';
	
	//Utils
	function wait(ms) {
		return new Core.Promise().wait(ms)
	}




	//Redirect not supported browsers
	if (Core.Device
		&& (
			(Core.Device.browser == 'ie' && parseInt(Core.Device.ver) <= 6) //no IE 6
			|| (Core.Device.browser == 'safari' && parseInt(Core.Device.ver) <= 4) //no Safari 4
		)
		&& !/oldBrowser.html/.test(window.location.href)
	) Core.navigate('{baseUrl}/oldBrowser.html')

	//Switch view for high resolution displays
	if (Core.Features['retina'])
		document.documentElement.className += ' retina'

	//Switch hardware acceleration
	if (Core.Features['css-transform3d'])
		document.documentElement.className += ' accelerationAllowed'
    

	//Add and remove services in basket
	function addToBasket(detail) { }

	function removeFromBasket(detail) {
		if (!detail) return

		//Core.invoke('basket-update', {
		//	"deletedItemId": "4522",
		//	"groupDeletedItemId": "96",
		//	"itemTotal": 33333,
		//	"total": 88888,
		//	"countItem": 18
		//})
	}

	return {

		actions: {
			'basket-add': [addToBasket],
			'basket-remove': [removeFromBasket],
			'pageInfo-update': function(detail) {
				Core.invoke('pageInfo-update', detail)
			},
			'search': function (detail) {
				Core.invoke('search', detail)
			}
		}
	}
	
})
