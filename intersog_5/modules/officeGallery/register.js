Core.register('officeGallery', function(sandbox) {
    return (function(root) {
        if (!root)
            return
        var module = {
            init: function() {
                $("#officeGallery a").each(function() {
                    if ($(this).attr("href").indexOf("#footer") + 1) {
                        $(this).bind('mousedown', function(e) {


                            e.preventDefault()

                            /*var destId = $(this).attr("href").toString().split("#")[1];*/
                            var destId = "footer";
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
    }(document.querySelector('#officeGallery'))) //Node element
})

