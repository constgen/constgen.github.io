Core.register('header', function(sandbox) {
    return (function(root) {
        if (!root)
            return
        var module = {
            init: function() {
                $("#header a").each(function() {
                    if ($(this).attr("href").indexOf("#contact") + 1) {
                        $(this).bind('mousedown', function(e) {


                            e.preventDefault()

                            /*var destId = $(this).attr("href").toString().split("#")[1];*/
                            var destId = "contacts";
                            var destElement = $("#" + destId).get(0);
                            var dest = sandbox.get('offset', destElement).top

                            module.scrollToDestination(dest);
                            sandbox.action('trackEvent', {
                                category: 'View Contact Data',
                                action: 'click'
                            })

                            return false;
                        });
                    }
                });
                $(function() {
                    if (navigator.appVersion.indexOf("MSIE 7.") !== -1)                        
                        $('#header .main_menu ul li a').not(':first').before('<span class="slash">/</span>');                        

                });
                
//                $('#header a img').bind('mouseenter mouseleave', function() {
//                    $(this).attr({
//                        src: $(this).attr('data-hover-src') 
//                        , 'data-hover-src': $(this).attr('src') 
//                    })
//                });
                
                var img_src = "";
                var new_src = "";

                $("#header a img.rollOver").hover(function() {
                    //mouseover

                    img_src = $(this).attr('src'); //grab original image
                    new_src = $(this).attr('data-hover-src'); //grab rollover image
                    $(this).attr('src', new_src); //swap images
                    $(this).attr('data-hover-src', img_src); //swap images

                },
                        function() {
                            //mouse out

                            $(this).attr('src', img_src); //swap images
                            $(this).attr('data-hover-src', new_src); //swap images
                        });

                //preload images
                var cache = new Array();
                //cycle through all rollover elements and add rollover img src to cache array
                $("#header a img.rollOver").each(function() {
                    var cacheImage = document.createElement('img');
                    cacheImage.src = $(this).attr('data-hover-src');
                    cache.push(cacheImage);
                });

            },
            scrollToDestination: function(dest) {
                if (!!($('html').scrollTop())) {
                    $('html').animate({
                        scrollTop: dest
                    }, 700, 'swing');
                } else {
                    $('html, body').animate({
                        scrollTop: dest
                    }, 700, 'swing');
                }
            },
            listen: {
                'app-load': function() {

                }
            }

        }
        return module
    }(document.querySelector('#header'))) //Node element
})
