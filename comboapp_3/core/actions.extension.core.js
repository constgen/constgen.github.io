
//site actions
Core.extend(function (Core) {
	'use strict';
	
	//Redirect not supported browsers
	if (Core.Device
		&& (
			(Core.Device.browser == 'ie' && parseInt(Core.Device.ver) <= 6) //no IE 6
			|| (Core.Device.browser == 'safari' && parseInt(Core.Device.ver) <= 4) //no Safari 4
		)
		&& !/oldBrowser.html/.test(window.location.href)
	) Core.navigate('{baseUrl}/oldBrowser.html')




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

	//retrieve form fields data
	Core.Event.add(window, 'load', function () {
		Core.invoke('formdata-update', Core.Storage.Local.get('formData'))
	})

	

	return {

		actions: {
			'basket-add': [addToBasket],
			'basket-remove': [removeFromBasket],

			'formdata-change': function (detail) {
				var formData, i;
				//retrieve old data
				formData = Core.Storage.Local.get('formData') || {}//make shure `formData` is object
				for (i in detail) {
					formData[i] = detail[i]
				}
				//save new data
				Core.Storage.Local.set('formData', formData)
				//generate event
				Core.invoke('formdata-update', formData)
			}
		}
	}
	
})
