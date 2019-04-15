Core.register('formApplyForPosition', function(sandbox) {
    return (function(root, $) {
        if (!root)
            return;
        var module = {
            overlay: $("#formApplyForPositionOverlay"),
            uploadinfo: $(".uploadInfo"),
            attachbutton: $(".attachButton"),
            init: function() {

                module.open = function() {
                    //if opened, do nothing
                    if (module.overlay.hasClass("opened")) {
                        return;
                    }

                    toggleHeight = '100%';
                    module.overlay.css({display: 'block'});

                    //toggle animation
                    $("#formApplyForPositionOverlay").animate({
                        height: '100%'//opened height of form
                    }, 500, 'swing', function() {
                        module.overlay.addClass("opened");
                    });

                    $("#formApplyForPositionForm").css({ display: 'block' }).animate({
                        opacity: 1,
                        top: '50%'
                    }, 500);

                    $("html, body").animate({scrollTop: 0}, "slow");
                };

                module.close = function() {
                    //if closed, do nothing
                    if (!module.overlay.hasClass("opened")) {
                        return;
                    }

                    //toggle animation
                    $("#formApplyForPositionOverlay").animate({
                        height: 0 //base height of form
                    }, 500, 'swing', function() {
                        module.overlay.css({display: 'none'});
                        module.overlay.removeClass("opened");
                    });

                    $("#formApplyForPositionForm").animate({
                        opacity: 0
                    }, 500, function () {
                        $(this).css({ display: 'none', top: 0 })
                    });
                };

                $(root).find('#formApplyForPositionCloseButton a').click(function() {
                    module.close();
                    //prevent default behaviour
                    return false;
                });
            
                $(function() {
                    //Send click() to hidden file-input from button
//                    $('.attachButton').click(function() {
//                        $('.uploadInput').click();
//                    });
                    //Send click() to hidden file-input from text input
//                    $('.fileName').click(function() {
//                        $('.uploadInput').click();
//                    });                
                    //bind file name to text input and button
//                    $('.uploadInput').change(function() {
//                        if (module.attachbutton.text('')) {
//                             $('.attachButton').html('Please choose right file type.');
//                            return;
//                        }                    
//                        $('.attachButton').text($(this).val());                        
//                    
//                    });
//                    $('.attachButton').change(function() {
//                      var check = $('.attachButton').val();
//                        if(check === '')
//                            {
//                                $(this).parent().html('Attach resume').removeClass('fileAdded');
//                                $(this).parent().removeClass('show');                            
//                            };
//                    });
                        
                    //Delete file name from text input and bring back button name.
                    
                    $('.delFile').click(function() {
                        if (module.uploadinfo.hasClass("error")) {
                            $(root).find('.uploadInfo').html('');
                            $(root).find('.attachButton').html('Attach resume').removeClass('fileAdded');
                            $(root).find('.delFile').removeClass('show');
                            return;
                        }
                        $(root).find('.uploadInfo').removeClass('success');
                        $(root).find('.attachButton').html('Attach resume').removeClass('fileAdded');
                        $(root).find('.delFile').removeClass('show');
                    });
                    
                });

                $(root).find('#uploadIframe').load(function() {
                    var callbackString = $(this).contents().text();
                    if (callbackString) {
                        var callback = jQuery.parseJSON(callbackString);
                        if (callback.Success) {
                            $(root).find('.uploadInfo').removeClass('error');
                            //$(root).find('.uploadInfo').addClass('success').html(callback.Success)
                            $(root).find('.uploadInfo').addClass('success').html('');
                            $(root).find('.resume').val(callback.Success);
                            $(root).find('.delFile').addClass('show');
                            $(root).find('.attachButton').addClass('fileAdded');
                            $('.attachButton').text($('.uploadInput').val());
                        } else if (callback.Error) {
                            $(root).find('.uploadInfo').removeClass('success');
                            $(root).find('.uploadInfo').addClass('error').html(callback.Error);
                            $(root).find('.delFile').addClass('show');
                            $(root).find('.attachButton').addClass('fileAdded').html('Please choose right file type.');
                        }
                    }
                    //prevent default behavior
                    return false;
                });


            },
            listen: {
                'apply-for-position': function(detail) {
                    if (detail)
                        $(root).find('.vacancyId').val(detail.vacancyId);
                    module.open();
                },
                'send-form-success': function() {
                    module.close();
                }
            }

        };
        return module;
    }(document.querySelector('#formApplyForPosition'), window.jQuery)); //Node element
});
