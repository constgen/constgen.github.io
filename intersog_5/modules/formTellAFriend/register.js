Core.register('formTellAFriend', function(sandbox) {
    return (function(root, $) {
        if (!root)
            return;
        var module = {
            overlay: $("#formTellAFriendOverlay"),
            init: function() {
                module.open = function() {
                    //if opened, do nothing
                    if (module.overlay.hasClass("opened")) {
                        return;
                    }

                    toggleHeight = '100%';
                    module.overlay.css({display: 'block'});

                    //toggle animation
                    $("#formTellAFriendOverlay").animate({
                        height: '100%'//opened height of form
                    }, 500, 'swing', function() {
                        module.overlay.addClass("opened");
                    });
                    
                    $("#formTellAFriendForm").css({ display: 'block' }).animate({
                        opacity: 1,
                        top: '50%'
                    }, 500, 'swing');

                };

                module.close = function() {
                    //if closed, do nothing
                    if (!module.overlay.hasClass("opened")) {
                        return;
                    }

                    //toggle animation
                    $("#formTellAFriendOverlay").animate({
                        height: 0 //base height of form
                    }, 500, 'swing', function() {
                        module.overlay.css({display: 'none'});
                        module.overlay.removeClass("opened");
                    });

                    //toggle animation
                    $("#formTellAFriendForm").animate({
                        opacity: 0
                    }, 500, function () {
                        $(this).css({ display: 'none', top: 0 })
                    });
                };

                $(root).find('#formTellAFriendCloseButton a').click(function() {
                    module.close();
                    //prevent default behaviour
                    return false;
                });
                $("#formTellAFriend .row .button").click(function() {
                    sandbox.action('trackEvent', {
                        category: 'Request Tell A Friens Submit Form',
                        action: 'submit'
                    });
                });


                /* FACEBOOOK Initialization */

                window.fbAsyncInit = function() {
                    // init the FB JS SDK                    
                    FB.init({
                        appId: '521765727876082', // App ID from the App Dashboard
                        channelUrl: '//intersog.com/channel.html', // Channel File for x-domain communication
                        status: true, // check the login status upon init?
                        cookie: true, // set sessions cookies to allow your server to access the session?
                        xfbml: true  // parse XFBML tags on this page?
                    });

                    // Additional initialization code such as adding Event Listeners goes here

                };

                // Load the SDK's source Asynchronously
                // Note that the debug version is being actively developed and might 
                // contain some type checks that are overly strict. 
                // Please report such bugs using the bugs tool.
                (function(d, debug) {
                    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
                    if (d.getElementById(id)) {
                        return;
                    }
                    js = d.createElement('script');
                    js.id = id;
                    js.async = true;
                    js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
                    ref.parentNode.insertBefore(js, ref);
                }(document, /*debug*/false));

                /* FACEBOOOK Initialization - END */

                /* FACEBOOOK Share */
                module.vacancyTitle;
                module.vacancyUrl;
                module.facebookShare = function() {
                    FB.ui({
                        method: 'send',
                        name: module.vacancyTitle,
                        link: module.vacancyUrl
                    });
                    return false;
                };
                /* FACEBOOOK Share - END */


                $(root).find('.shareOnFacebook').click(module.facebookShare);
            },
            listen: {
                'tell-a-friend': function(detail) {
                    if (detail) {
                        $(root).find('.vacancyId').val(detail.vacancyId);
                        module.vacancyTitle = detail.vacancyTitle;
                        module.vacancyUrl = detail.vacancyUrl;
                    }
                    module.open();
                },
                'send-form-success': function() {
                    module.close();
                }
            }

        };
        return module;
    }(document.querySelector('#formTellAFriend'), window.jQuery)); //Node element
});
