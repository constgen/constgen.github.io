
// Project Extensions
Core.extend(function (Core) {
	
	//Configure
	//Core.configure('marketing.mobile.config.js')

	//extensions
	Core.load('{baseURL}/core/device.extension.core.js', { defer: 'true' })
	Core.load('{baseURL}/core/actions.extension.core.js', { defer: 'true' })
	Core.load('{baseURL}/core/event.extension.core.js', { defer: 'true' })
	
	//libs
	if (!window.jQuery)
		Core.load('{baseURL}/libs/jquery-1.7.2.min.js', { defer: 'true' })

	//plugins

	if (!-[1, ]) {

		Core.load('{baseURL}/plugins/mediaquery.js', { defer: 'true' })
	}
})
