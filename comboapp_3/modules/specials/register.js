Core.register('specials', function(sandbox) {
    return (function(root, $) {
        if (!root || !$)
            return

        //Load jQuery Plugin
        sandbox.load('{baseURL}/plugins/jquery.tools.min.js')

        var module = {
            init: function() {
                module.saveLabel = $("#saveLabel .text .val")

                if (!sandbox.hasFeature('css-transform'))
                    root.className += ' no-transform'

                $(".slidetabs").html(//create pagination
                        (function() {
                            var result = "";
                            for (var i = 0; i < $(".slider .slide-item").length; i++) {
                                result = result + '<a href="#"></a>';
                            }
                            return result
                        })()
                        )
                //Customize plugin
                $(root).find(".slidetabs").tabs(".slider .slidecontent .slide-item", {
                    // enable "cross-fading" effect
                    effect: 'fade',
                    fadeOutSpeed: "slow",
                    // start from the beginning after the last tab
                    rotate: true,
                    onBeforeClick: function(e, index) {
                        var comingSlide = $(root).find(".slider .slide-item:not(.cloned)").eq(index)

                        module.saveLabel.html(comingSlide.attr('data-save'))
                    }
                }).slideshow({// use the slideshow plugin. It accepts its own configuration
                    next: '.next',
                    prev: '.prev',
                    autoplay: false,
                    clickable: false
                });


                //module.saveLabel.html($(root).find(".slider .slide-item:not(.cloned)").eq(0).attr('data-save'))

                $(".slide-item").each(function() {
                    var tabs = $(this).find(".packList"),
                            pans = $(this).find(".packLiDesc > li");

                    tabs.tabs(pans, {
                        effect: 'fade',
                        fadeOutSpeed: "fast",
                        tabs: 'li'
                    }).slideshow({// use the slideshow plugin. It accepts its own configuration
                        autoplay: false,
                        clickable: false
                    })
                })


                $(root).find(".slider").children('a').click(function() {
                    return false
                });


            },
            destroy: function() {
                $("#offers-list").empty();
                $(".slidetabs").empty();
            }

        }
        return module
    }(document.querySelector('.specials'), window.jQuery))
})

