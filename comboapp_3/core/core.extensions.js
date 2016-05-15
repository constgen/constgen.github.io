
// Project Extensions
Core.extend(function (Core) {
	
	//Configure
	//Core.configure('marketing.config.js')

	//extensions
	Core.load('{baseURL}/core/device.extension.core.js', { defer: 'true' })
	Core.load('{baseURL}/core/storage.core.js', { defer: 'true' })
	Core.load('{baseURL}/core/actions.extension.core.js', { defer: 'true' })
	Core.load('{baseURL}/core/ganalitics.extension.js', { defer: 'true' })
	
	//libs
	if (!window.jQuery)
		Core.load('{baseURL}/libs/jquery-1.7.2.min.js', { defer: 'true' })

	//plugins
	if (!document.querySelector)
		Core.load('{baseURL}/plugins/querySelector.js', { defer: 'true' })

	Core.load('{baseURL}/plugins/jquery.rating-2.0.min.js', { defer: 'true' })
	
	if (!-[1, ]) {
		Core.load('http://html5shiv.googlecode.com/svn/trunk/html5.js', { defer: 'true' })
		Core.load('{baseURL}/plugins/mediaquery.js', { defer: 'true' })
	}
    
    Core.load('{baseUrl}/plugins/colorbox/jquery.colorbox.js', {
        defer: true
    })
    Core.load('{baseUrl}/plugins/colorbox/colorbox.css', {
        defer: true
    })
})
