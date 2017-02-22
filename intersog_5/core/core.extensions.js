
// Project Extensions
Core.extend(function (Core) {
	
    //Configure
    //Core.configure('{baseUrl}/digi.config.js')

	//libs
	if (!window.jQuery)
		Core.load('libs/jquery-1.7.2.min.js', {defer: true})

    //extensions
    Core.load('core/event.extension.core.js', {   defer: true  })
    Core.load('core/device.extension.core.js', { defer: true })
    Core.load('core/storage.core.js', { defer: true })



    //actions
    Core.load('core/actions.extention.core.js', { defer: true  })    



    //plugins

    if (!document.querySelector)
        Core.load('plugins/querySelector.js', {
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
