Core.register('departmentOutsource', function(sandbox) {
    var root, module;
    // root HTML element
    if (!(root = document.querySelector('.departmentOutsource')))
        return;
    // module
    var module = {
        init: function() {
            $(root).find('.orderservice').click(function() {                
                sandbox.action('service-order', {
                    departmentId: $(this).attr('data-departmentId')
                })
                //prevent default behavior
                return false
            })

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

