/// <reference path="Core.js" />

// Project Extensions
Core.extend(function (Core) {
	
	//Configure
	//Core.configure('marketing.config.js')

	Core.DOMReady.then(function () {
		if (!-[1, ]) {
			Core.load('{baseURL}/plugins/mediaquery.js', { defer: 'true' })
		}
		Core.startAll()
	})

	//extensions
	Core.load('{baseURL}/core/device.core.js', { defer: 'true' })
	Core.load('{baseURL}/core/event.extension.js', { defer: 'true' })
	Core.load('{baseURL}/core/actions.core.js', { defer: 'true' })
	Core.load('{baseURL}/core/ganalytics.extension.js', { defer: 'true' })
	
	//libs
	if (!window.jQuery)
		Core.load('{baseURL}/libs/jquery-1.7.2.min.js', { defer: 'true' })

	//plugins
	if (!document.querySelector)
	    Core.load('{baseURL}/plugins/querySelector.js')
	if (!-[1,]) {
	    Core.load('{baseURL}/plugins/html5.js')
	}
	
})
