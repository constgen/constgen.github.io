Core.register('requestProposal', function (sandbox) {
    'use strict';

    return (function(root, $) {
        if (!root)
            return
        var module = {
            form: $("#requestProposalContent"),
            init: function() {

                var formElements = $(module.form).find("[data-save]"),
                    formData = {};

                formElements.change(function () {

                    if ($(this).attr("data-save") !== null) {
                        
                        var fieldName = $(this).attr('name');
                        // check if there is "[...]" in "name" attribute
                        if (/\[.*?\]/.test(fieldName)) {
                            var formData = {};
                            formData[fieldName.substring((fieldName.lastIndexOf("[") + 1), (fieldName.lastIndexOf("]")))] = $(this).val();
                            sandbox.action('formdata-change', formData)
                            
                        } else {
                            var formData = {};
                            formData[fieldName] = $(this).val();
                            sandbox.action('formdata-change', formData)

                        }
                        
                    }
                    
                })
                
                module.formDataUpdate = function (detail) {

                    if (!detail) return

                    var formElements = $(module.form).find("input[data-save], select[data-save], textarea[data-save]"),
                        formData = {},
                        i;

                        $(formElements).each(function () {

                            if (
                                $(this).is('select')
                                ||  (
                                        $(this).val() == ''
                                        && $(this).attr("data-save") !== null
                                    )
                            ) {
                                var fieldName = $(this).attr('name');
                                for (i in detail) {
                                    // check if there is "[...]" in "name" attribute
                                    if (/\[.*?\]/.test(fieldName)) {
                                        if (fieldName.substring((fieldName.lastIndexOf("[") + 1), (fieldName.lastIndexOf("]"))) == i) {
                                            $(this).val(detail[i]);
                                        }
                                    } else {
                                        if (fieldName == i) {  $(this).val(detail[i]) }
                                    }
                                }
                            }

                        });

                }

                if (sandbox.hasFeature("css-transition")) {	// If bro supports CSS transitions
                    $("#requestButton").click(function() {	// Binding on "close"
                        if (module.form.hasClass("opened")) {
                            module.form.css({height: 0});
                        } else {
                            module.form.css({height: $(root).find('form').height()});
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
                $("#requestProposal .bottom .button").click(function() {
                    sandbox.action('trackEvent', {
                        category: 'Request Proposal Submit Form',
                        action: 'submit'
                    })
                });
            },
            listen: {
                'app-load': function() {

                },
                'send-form-success': function () {
                    module.close()
                },
                'formdata-update': function (detail) {
                    if (detail) {
                        module.formDataUpdate(detail)
                    }

                }
            }

        }
        return module
    }(document.querySelector('#requestProposal'), window.jQuery)) //Node element
})
