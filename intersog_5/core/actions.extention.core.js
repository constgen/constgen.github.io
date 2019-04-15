Core.extend(function(Core) {

    //Redirect not supported browsers
    if (Core.Device
            && (
            (Core.Device.browser == 'ie' && parseInt(Core.Device.ver) <= 6) //no IE 6
            || (Core.Device.browser == 'safari' && parseInt(Core.Device.ver) <= 4) //no Safari 4
            || (Core.Device.browser == 'opera' && parseInt(Core.Device.ver) <= 9) //no Opera 9
            )
            && !/oldBrowser.html/.test(window.location.href)
            )
        Core.navigate('{baseUrl}/oldBrowser.html')


    //Switch view for high resolution displays
    if (Core.feature['retina'])
        document.documentElement.className += ' retina'

    //Switch hardware acceleration
    if (Core.feature['css-transform3d'])
        document.documentElement.className += ' accelerationAllowed'

	// Add class for select
	if (Core.Device && (
		Core.Device.browser == 'safari'
		|| Core.Device.browser == 'chrome'
		|| (Core.Device.browser == 'ie' && parseInt(Core.Device.ver) > 9) )) {
		document.documentElement.className += ' styledSelect';
	}

	//define if it is webkit browser and insert class to <html> for specific styling
	var isWebkit = (function () {
		return /webkit/.test(navigator.userAgent.toLowerCase() || navigator.vendor.toLowerCase())
	}())
	if (isWebkit) { document.documentElement.className += ' webkit' }

    /*ANOTHER BAD CODE*/
    $(function () {
        $('.careersADayInTheLifePopupVideo').click(function () {
            Core.invoke('careers-video-popup')
            //prevent default behavior
            return false
        })
    })
    $(function () {
        $('.sendFormSuccessButton').click(function () {
            Core.invoke('send-form-success')
            //prevent default behavior
            return false
        })
    })
	/*END BAD CODE*/

	//retrieve form fields data
    Core.Event.add(window, 'load', function () {
    	Core.invoke('formdata-update', Core.Storage.Local.get('formData'))
    })


    return {
        actions: {
            'filter-people': function(data) {			// Filtering people on
                Core.invoke('filter-people', data)		// Crew page
            },
            'filter-apps': function(data) {				// Filtering apps on
                Core.invoke('filter-apps', data)		// Work page
            },
            //when colors of current brand changed
            'brandcolor-setup': function(detail) {
                //if no details, reset to default
                detail || (detail = {
                    background: '',
                    borderLight: '',
                    borderDark: ''
                })

                Core.invoke('brandcolor-change', detail)
            },
            //Open or close gallery
            'gallery-open': function(detail) {
                Core.invoke('gallery-show', detail)
            },
            'gallery-request': function() {
                var apiUrl = '';
                if (location.href.toString().indexOf("test.") != -1) {
                    apiUrl = "http://test.digi117.com/crew?gallery";
                }
                else {
                    apiUrl = "http://digi117.com/crew?gallery";
                }
                apiUrl = Core.template('{baseUrl}/content/ajaxPeoplariumJson')

                var request = $.ajax({
                    type: "GET",
                    url: apiUrl,
                    dataType: "json",
                    success: function(data) {
                        $(data.thumbs).each(function(i) {
                            data.thumbs[i] = this
                        })
                        $(data.images).each(function(i) {
                            data.images[i] = this
                        })
                        Core.invoke('content-update', { photos: data})
                    },
                    error: function(errThrown, data) {
                        console.error(errThrown.state());
                        console.error(data);
						Core.invoke('content-update', { photos: {thumbs:[], images:[]}})
                    }
                });

            },
            'pause-loopanimations': function(detail) {
                Core.invoke('pause-loopanimations', detail)  // {initiator:''}
            },
            'resume-loopanimations': function(detail) {
                Core.invoke('resume-loopanimations', detail) // {initiator:''}
            },
            // Google Analytics Track Event
            'trackEvent': function(detail) {
                window._gaq && _gaq.push(['_trackEvent', detail.category, detail.action, '']);
            },
            'service-order': function (detail) {
            	Core.invoke('service-order', detail)
            },
            'apply-for-position': function (detail) {
                Core.invoke('apply-for-position', detail)
            },
            'tell-a-friend': function (detail) {
                Core.invoke('tell-a-friend', detail);
            },
            'design-video-popup': function (detail) {
                Core.invoke('design-video-popup', detail)
            },
            'careers-video-popup': function (detail) {
                Core.invoke('careers-video-popup', detail)
            },
            'send-form-success': function (detail) {
                Core.invoke('send-form-success', detail)
            },

            'formdata-change': function (detail) {
            	var formData, i;
            	//retrieve old data
            	formData = Core.Storage.Local.get('formData') || {}//make shure `formData` is object
            	for (i in detail) {
            		formData[i] = detail[i]
            	}
            	//save new data
            	Core.Storage.Local.set('formData', formData)
            	//generate event
            	Core.invoke('formdata-update', formData)
            }

        }

    }
})

