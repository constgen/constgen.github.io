Core.register('formOrderService', function(sandbox) {
    return (function(root, $) {
        if (!root)
            return
        var module = {
            overlay: $("#formOrderServiceOverlay"),
            init: function() {
                $("#formOrderServiceOverlay").scroll(function() {
                    console.log('scroll')
                });

                module.open = function() {
                    //if opened, do nothing
                    if (module.overlay.hasClass("opened")) {
                        return
                    }

                    toggleHeight = '100%'
                    module.overlay.css({display: 'block'});

                    //toggle animation
                    $("#formOrderServiceOverlay").animate({
                        height: '100%'//opened height of form
                    }, 500, 'swing', function() {
                        module.overlay.addClass("opened")
                    });

                    $("#formOrderServiceForm").css({display: 'block'}).animate({
                        opacity: 1,
                        top: '50%'
                    }, 500, 'swing');

                }

                module.close = function() {
                    //if closed, do nothing
                    if (!module.overlay.hasClass("opened")) {
                        return
                    }

                    //toggle animation
                    $("#formOrderServiceOverlay").animate({
                        height: 0 //base height of form
                    }, 500, 'swing', function() {
                        module.overlay.css({display: 'none'});
                        module.overlay.removeClass("opened")
                    });

                    //toggle animation
                    $("#formOrderServiceForm").animate({
                        opacity: 0
                    }, 500, function() {
                        $(this).css({display: 'none', top: 0})
                    });
                }

                $(root).find('#formOrderServiceCloseButton a').click(function() {
                    module.close()
                    //prevent default behaviour
                    return false
                })
                $("#formOrderService .bottom .button").click(function() {
                    sandbox.action('trackEvent', {
                        category: 'Request Order Service Submit Form',
                        action: 'submit'
                    })
                });
            },
            listen: {
                'service-order': function(detail) {
                    //clear form errors
                    $('#formOrderService .error').removeClass('error');
                    module.open()
                    if (detail) {
                        if (detail.departmentId)
                            $(root).find('.department').val(detail.departmentId).attr('disabled', 'disabled');
                        else
                            $(root).find('.department').prop('selectedIndex', 0).removeAttr('disabled');
                    }
                    module.open()
                },
                'send-form-success': function() {
                    module.close()
                }
            }

        }
        return module
    }(document.querySelector('#formOrderService'), window.jQuery)) //Node element
})
