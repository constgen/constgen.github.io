
Core.extend(function (Core) {
    //Redirect not supported browsers
	//if (
	//	!(
	//		document.querySelector //query selector feature
	//	)
	//	&& !/oldBrowser.html/.test(window.location.href)
	//) Core.navigate('oldBrowser.html')

	//define if it is webkit browser and insert class to <html> for specific styling
	var isWebkit = (function () {
		return /webkit/.test(navigator.userAgent.toLowerCase() || navigator.vendor.toLowerCase())
	}())
	if (isWebkit) { document.documentElement.className += ' webkit' }

	return {
		actions: {
			
		}
	}
   
})
