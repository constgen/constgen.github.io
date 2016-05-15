
//site actions
Core.extend(function (Core) {
	'use strict';
	
	//Redirect not supported browsers
	if (Core.Device
		&& (
			(Core.Device.browser == 'ie' && parseInt(Core.Device.ver) <= 6) //no IE 6
			|| (Core.Device.browser == 'safari' && parseInt(Core.Device.ver) <= 4) //no Safari 4
		)
		&& !/oldBrowser/.test(window.location.href)
	) Core.navigate('{baseUrl}/oldBrowser')

    if (Core.Device.platform == 'ipad') {
        document.documentElement.className += " ipad";
    }



	return {

		actions: {
			'basket-add': function (detail) {

			},//Add services to basket

			'basket-remove': function (detail) {
				if (!detail) return

				Core.invoke('basket-update', {
					"deletedItemId": "4522",
					"groupDeletedItemId": "96",
					"itemTotal": 33333,
					"total": 88888,
					"countItem": 18
				})
			},//Remove services from basket

			'filter-apps': function(data){				// Filtering apps on
				Core.invoke('filter-apps', data)		// Work page
			},
            'requestProposal-open': function(data){
                Core.invoke('requestProposal-open', data)
            },
            'review-send': function (data) {
                Core.invoke('review-send', data)
            }
        }
	}
	
})
