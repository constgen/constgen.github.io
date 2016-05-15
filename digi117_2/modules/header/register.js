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
