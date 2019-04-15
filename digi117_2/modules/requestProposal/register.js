Core.register('requestProposal', function(sandbox) {
    return (function(root, $) {
        if (!root)
            return
        var module = {
            form: $("#requestProposalContent"),
            init: function() {

                if (sandbox.hasFeature("css-transition")) {			// If bro supports CSS transitions
                    $("#requestButton").click(function() {	// Binding on "close" 
                        if (module.form.hasClass("opened")) {
                            module.form.css({ height: 0});
                        } else {
                            module.form.css({ height: $(root).find('form').height()});
                        }
                    });
                    sandbox.Event.add(module.form.get(0), 'transitionend', function(e) {
                        if (e.target == this)
                            module.form.toggleClass("opened");
                    });
                } else {
                    $("#requestButton").click(function() {
                        var toggleHeight = 0;

                        if (module.form.hasClass("opened")) {
                            toggleHeight = 0;
                        } else {
                            toggleHeight = $(root).find('form').height()
                        }

                        $("#requestProposalContent").animate({
                            height: toggleHeight
                        }, 500, 'swing', function() {
                            module.form.toggleClass("opened")
                        });

                    });
                }
                $("#requestButton").click(function() {
                    if (!module.form.hasClass("opened")) {
                        sandbox.action('trackEvent', {
                            category: 'Request Proposal Open Form',
                            action: 'click'
                        })
                    } 
                });
				$("#proposal-form .submit").click(function() {
					sandbox.action('trackEvent', {
						category: 'Request Proposal Submit Form',
						action: 'submit'
					}) 
                });
            },
            listen: {
                'app-load': function() {

                },
                'ajaxFormSent': function() {
                    console.log("catch!")
                    $(".ajaxStatus").html("<em>Sending</em> <img src='/images/loader.gif' />")
                },
                'ajaxFormComplete': function(status) {
                    setTimeout(function() {
                        if (status.data == "OK") {
                            $(".ajaxStatus").html("Your request has been sent. Thank you")
                            setTimeout(function() {
                                $("#requestProposal input, #requestProposal textarea").val('');
                                $("#requestProposal .success").removeClass("success")
                                $("#requestProposal .error").removeClass("error")
                            }, 5000)
                        }
                        else if (status.data == "FAIL")
                        {
                            $(".ajaxStatus").html("Your data is incorrect")
                        }
                    }, 2000);
                }
            }

        }
        return module
    }(document.querySelector('#requestProposal'), window.jQuery)) //Node element
})
