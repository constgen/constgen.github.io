/// <reference path="Core.js" />

Core.extend(function (Core) {
	
	Core.load('{baseUrl}/core/device.core.js', 'defer')
	Core.load('{baseUrl}/core/event.extension.js', 'defer')
	Core.load('{baseUrl}/core/actions.extension.js', 'defer')
    Core.load('{baseUrl}/plugins/share.js', 'defer')

	//libs
    Core.load('{baseUrl}/libs/jquery-1.7.2.min.js', 'defer')
    Core.load('{baseUrl}/libs/limit.js', 'defer')

    Core.DOMLoaded.then(function () { Core.startAll() })
})
