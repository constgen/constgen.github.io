Core.register('searchForm', function (sandbox) {
    return (function (root) {
        if (!root) return
        var module = {
            send: $(".searchButton"),
            init: function () {
                $('input[type="search"]').focus(function() {
                    this_search = $(this);
                    minlength = this_search.attr('minlength');

                    // var submit = $('input[type="submit"]').attr("disabled");
                    // submit_val = $(submit.attr('disabled'));


                    if  (minlength != 0 && minlength > 0 && this_search.val().length < minlength) {
                        this_search.after( '<span class="searchLabel">' + 'Minimum ' + minlength + ' characters required.</label>');
                        }

                    });

                    $('input[type="search"]').keyup(function() {
                        if (this_search.val().length >= minlength) {
                            this_search.next().remove();
                            module.send.removeAttr("disabled");
                        } else {
                            this_search.next().remove();
                            this_search.after( '<span class="searchLabel">' + 'Minimum ' + minlength + ' characters required.</label>');
                        }
                    });


                    $('input[type="search"]').blur(function() {
                        this_search.val('');
                        this_search.next().remove();
                        module.send.attr("disabled", "disabled");
                    });
            },

            listen: {
                'app-load': function () {

                }
            }

        }
        return module
    }(document.querySelector('.searchForm'))) //Node element
})
