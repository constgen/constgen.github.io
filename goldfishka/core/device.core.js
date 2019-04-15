
Core.extend(function (Core) {
	var Device, formfactor;

	//detect formfactor from user-agent (from http://detectmobilebrowsers.com/)
	formfactor = (function (a) {
		if (/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
			return 'phone'
		}
		else if (/ipad|playbook|tablet|kindle|android\s3/i.test(a)) {
			return 'tablet'
		}
		else {
			return 'desktop'
		}
	})(navigator.userAgent || navigator.vendor || window.opera);



	//device info object
	Device = (function(){
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
			type: formfactor, //detected earlier
			platform: navigator.platform.toLowerCase()
		}
	}())


	//extend
	return {
		Device: Device,

		accessor: {
			'device': {
				get: function () { return Core.Device }
			}
		}
	}
})


// var isOpera = !!(window.opera && window.opera.version);  // Opera 8.0+
// var isFirefox = testCSS('MozBoxSizing');                 // FF 0.8+
// var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
//    // At least Safari 3+: "[object HTMLElementConstructor]"
// var isChrome = !isSafari && testCSS('WebkitTransform');  // Chrome 1+
// var isIE = /*@cc_on!@*/false || testCSS('msTransform');  // At least IE6

// function testCSS(prop) {
//	return prop in document.documentElement.style;
// }

// var isChrome = !!(window.chrome && chrome.webstore && chrome.webstore.install); //Chrome 15+

//https://gist.github.com/358029 - IE
// 