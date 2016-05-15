/// <reference path="Core.js" />

Core.extend(function (Core) {
	var location = window.location;
	//if mobile phone browser, redirect to phone version
	//if (Core.Device.type == 'phone' && !/\/phone\//i.test(window.location.href))
		//Core.navigate('{baseUrl}/phone/index.html')

	//if iOS device, detect OS version using User Agent
	var iOSMatch = /(iphone.+?os|ipod.+?os|ipad.+?os)\s([\w])/i.exec(navigator.userAgent.toLowerCase() || navigator.vendor.toLowerCase());
	iOSversion = iOSMatch ? iOSMatch[2] : 0
	//alert(Core.Device.os)
	//alert(Core.Device.ver)
	//Redirect not supported browsers
	if (Core.Device
		&& !(
			(Core.Device.os == 'ios' && parseFloat(iOSversion) >= 5)
			|| (Core.Device.browser == 'android' && parseFloat(Core.Device.ver) >= 2.2)
			|| (Core.Device.browser == 'firefox')
			|| (Core.Device.browser == 'ie' && parseFloat(Core.Device.ver) >= 9)
		)
		&& !/oldBrowser.html/.test(window.location.href)

	) {
		Core.DOMReady.cancel()
		Core.navigate('oldBrowser.html')
	}
	if (Core.Features.touch) {
		document.documentElement.className += ' touchdevice'

		Core.DOMLoaded.then(function () {
			window.scrollTo(0, 0)
		})
	}




	return {

		actions: {

		    'playPopup-open': function (detail) {
		        Core.invoke('playPopup-open', detail)
		    },

		    'socialButtons-open': function (detail) {
		        Core.invoke('socialButtons-open', detail)
		    }

		}
	}

})
