
// Project Extensions
Core.extend(function (Core) {
	
    //Configure
    //Core.configure('{baseUrl}/digi.config.js')

	//libs
	if (!window.jQuery)
		Core.load('{baseUrl}/libs/jquery-1.7.2.min.js', {defer: true})

    //extensions
    Core.load('{baseUrl}/core/event.extension.core.js', {   defer: true  })
    Core.load('{baseUrl}/core/device.extension.core.js', { defer: true })
    Core.load('{baseUrl}/core/storage.core.js', { defer: true })



    //actions
    Core.load('{baseUrl}/core/actions.extention.core.js', { defer: true  })    



    //plugins

    if (!document.querySelector)
        Core.load('{baseUrl}/plugins/querySelector.js', {
            defer: 'true'
        })
    if (!-[1, ]) {
        Core.load('http://html5shiv.googlecode.com/svn/trunk/html5.js', {
            defer: 'true'
        })
        //Core.load('{baseUrl}/plugins/mediaquery.js', {
        //    defer: 'true'
        //})
    }
})
