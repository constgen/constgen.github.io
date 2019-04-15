Core.register('noJavascript', function(sandbox) {
    return (function(root) {
        if (!root)
            return
        var module = {
            init: function() {
                //If Javascipt is enabled, navigate back
                window.location.href = sandbox.template('{baseUrl}')
            }
        }
        return module
    }(document.querySelector('.noJavascript'))) //Node element
})