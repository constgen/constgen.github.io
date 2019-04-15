
Core.extend(function(Core){
	//create device info object
	Core.Device = (function(){
		// Useragent RegExp
		var apple = /(iphone|ipod|ipad)(?:.*version)?[ \/]([\w.]+)/,
			bb = /(blackberry)(?:.*version|[\w]+)?[ \/]([\w.]+)/,
			operamini = /(opera mini)[ \/]([\w.]+)/,
			operamobile = /(opera mobi)(?:.*version)?[ \/]([\w.]+)/,
			opera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
			msie = /(msie) ([\w.]+)/,
			firefox = /(firefox)[ \/]([\w.]+)/,
			//mozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
			chrome = /(chrome)[ \/]([\w.]+)/,
			android = /(android)[ \/]([\w.]+)/,
			safari = /(safari)/,
			//webkit = /(webkit)[ \/]([\w.]+)/,
			konqueror = /(konqueror)[ \/]([\w.]+)/,
			ua = navigator.userAgent.toLowerCase() || navigator.vendor.toLowerCase(),
			//match = webkit.exec(ua) ||  operamobile.exec(ua) || opera.exec(ua) || msie.exec(ua) || ua.indexOf("compatible") < 0 && mozilla.exec(ua) || [];
			match = apple.exec(ua) || bb.exec(ua) || operamini.exec(ua) || operamobile.exec(ua) || opera.exec(ua) || msie.exec(ua) || firefox.exec(ua) || chrome.exec(ua) || android.exec(ua) || safari.exec(ua) || [];
			
			// Detect OS
			OS = (function(){
				if 		(/ipad|ipod|iphone/i.test(ua)) 	return 'ios'
				else if (/blackberry/i.test(ua)) 		return 'blackberry'
				else if (/windows/i.test(ua)) 			return 'windows'
				else if (/android/i.test(ua)) 			return 'android'
				else if (/linux/i.test(ua)) 			return 'linux'
				else if (/mac/i.test(ua)) 				return 'mac'
				else if (/freebsd/i.test(ua)) 			return 'freebsd'
				else if (/sunos/i.test(ua)) 			return 'sunos'
				else return
			}())
			
		if (match[1] == 'opera mobi') match[1] = 'opera mobile'// fix name of opera mobile
		
		return { 
			browser: (match[1] == 'msie') ? 'ie' : (match[1] || "unknown"),
			ver:     match[2] || /(?:.*version)?[ \/]([\w.]+)/.exec(ua)[1] || "0",
			version: match[2] || /(?:.*version)?[ \/]([\w.]+)/.exec(ua)[1] || "0",
			os: OS || 'unknown',
			type: '' || 'desktop',
			platform: navigator.platform.toLowerCase()
		}
	}())

	return {
		accessor: {
			'device': {
				get: function () { return Core.Device }
			}
		}
	}
})
