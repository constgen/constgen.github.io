Core.register('clients', function(sandbox) {
    return (function(root) {
        if (!root)
            return
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
            listen: {
                'app-load': function() {

                }
            }

        }
        return module
    }(document.querySelector('#clients'))) //Node element
})
