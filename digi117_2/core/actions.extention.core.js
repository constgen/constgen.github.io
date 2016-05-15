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
            }

        }

    }
})

