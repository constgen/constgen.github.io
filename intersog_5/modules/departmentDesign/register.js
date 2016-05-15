Core.register('departmentDesign', function(sandbox) {
    var root, module;
    // root HTML element
    if (!(root = document.querySelector('.departmentDesign')))
        return;
    // module
    var module = {
        init: function() {
            $(root).find('.icon').click(function() {
                sandbox.action('design-video-popup', {
                    videoName: $(this).attr('data-name'),
                    videoUrl: $(this).attr('data-url'),
                    videoDescription: $(this).attr('data-description')
                });
                //prevent default behavior
                return false
            });

        },
        destroy: function() {

        },
        //switchable styles
        css: '',
        listen: {
            'app-load': function() {

            }
        }

    }
    // return module object
    return module;
})

