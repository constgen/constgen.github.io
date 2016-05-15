Core.register('reviewForm', function(sandbox) {
    return (function(root) {
        if (!root)
            return
        var module = {
            init: function() {
                if (!sandbox.hasFeature('css-border-radius'))
                    root.className += ' no_border-radius'

                module.formValidation = function(detail) {
                    for (item in detail) {

                        $(root).find('#' + item).parent().addClass('error')

                    }
                }
                module.commentSubmit = function(detail) {

                    var template = '<div class="field"><p class="data"><span class="name">' + detail.name + ' on </span>' + detail.created + '<span class="moderation">Waiting for moderation...</span></p><p class="desc">' + detail.comment + '</p></div>'
                    
                    // insert new comment
                    $('.comments').show()
                    $('.comments h3').after(template)

                    // clear form fields
                    $(root).find('textarea, input:not([type=submit])').val('')

                }

            },
            listen: {
                'review-send': function(detail) {
                    if (detail.success) {
                        module.commentSubmit(detail)
                    } else {
                        module.formValidation(detail)
                    }

                }
            }
        }
        return module
    }(document.querySelector('.reviewForm'))) //Node element
})
