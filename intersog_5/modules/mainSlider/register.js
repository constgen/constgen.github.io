Core.register('mainSlider', function (sandbox) {
    return (function (root, $) {
        if (!root || !$) return

        //Load jQuery Plugin
        sandbox.load('{baseURL}/plugins/jquery.tools.min.js')

        var module = {
            init: function () {
				
                module.tabs = $(root).find('.slidetabs')
				
                //New effect
                
                $.tools.tabs.addEffect("slider", function (i, done) {
                    var pane = this.getCurrentPane(),
                    speed = this.getConf().speed;

                    if (!pane.length) return
                    
                    if (sandbox.hasFeature('css-transition')) {
                        pane.parent().css({
                            left: -i * (pane.outerWidth(true))
                        })
                    }
                    else {
                        pane.parent().animate({
                            left: -i * (pane.outerWidth(true))
                        }, speed)
                    }

                    done.call();
                });

                //Customize plugin
                $(root).find(".slidetabs-image").tabs(".slide-image .slide-item", {
                    // enable "cross-fading" effect
                    current:'active',
                    effect:'slider',
                    // start from the beginning after the last tab
                    rotate: true,
                    speed: 700
                }).slideshow({// use the slideshow plugin. It accepts its own configuration
                    autoplay: true,
                    interval: 5000,
                    autopause: true,
                    clickable: false,
                    next: '.next',
                    prev: '.prev'
                });
				
                $(root).find(".slidetabs-content").tabs(".slide-content .slide-item", {
                    // enable "cross-fading" effect
                    effect: 'fade',
                    current:'active',
                    // start from the beginning after the last tab
                    rotate: true,
                    speed: 700
                }).slideshow({// use the slideshow plugin. It accepts its own configuration
                    clickable: false,
                    next: '.next',
                    prev: '.prev'
                });

                $(root).children('a').click(function () {
                    return false
                })

            }

        }
        return module
    }(document.querySelector('.mainSlider'), window.jQuery))
})

