Core.register('departmentDesignPopup', function(sandbox) {
    return (function(root, $) {
        if (!root)
            return
        var module = {
            overlay: $("#departmentDesignPopupOverlay"),
            init: function() {
                module.open = function() {
                    //if opened, do nothing
                    if (module.overlay.hasClass("opened")) {
                        return
                    }

                    toggleHeight = '100%'
                    module.overlay.css({display: 'block'});

                    //toggle animation
                    $("#departmentDesignPopupOverlay").animate({
                        height: '100%'//opened height of form
                    }, 500, 'swing', function() {
                        module.overlay.addClass("opened")
                    });
                }

                module.close = function() {
                    //if closed, do nothing
                    if (!module.overlay.hasClass("opened")) {
                        return
                    }

                    //toggle animation
                    $("#departmentDesignPopupOverlay").animate({
                        height: 0 //base height of form
                    }, 500, 'swing', function() {
                        module.overlay.css({display: 'none'});
                        module.overlay.removeClass("opened")
                    });
                }


                $(root).find('#departmentDesignPopupCloseButton a').click(function() {                    
                    module.close();
                    $(root).find('.video iframe').attr('src', '');
                    //prevent default behaviour
                    return false
                });                
            
            },
            listen: {
                'design-video-popup': function(detail) {
                    if (detail) {
                        $(root).find('.name').html(detail.videoName);
                        $(root).find('.video iframe').attr('src', detail.videoUrl);
                        $(root).find('.description').html(detail.videoDescription);
                    }
                    module.open()
                }
            }

        }
        return module
    }(document.querySelector('#departmentDesignPopup'), window.jQuery)) //Node element
})
