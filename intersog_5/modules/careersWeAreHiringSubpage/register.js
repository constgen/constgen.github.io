Core.register('careersWeAreHiringSubpage', function (sandbox) {
	var root, module;
	// root HTML element
	if (!(root = document.querySelector('.careersWeAreHiringSubpage'))) return;
	// module
	var module = {
		init: function () {

                $(root).find('.applyForThePosition').click(function() {
                    sandbox.action('apply-for-position', {
                        vacancyId: $(this).attr('data-vacancyId')
                    })
                    //prevent default behavior
                    return false
                })

                $(root).find('.tellAFriendAboutPosition').click(function() {
                    sandbox.action('tell-a-friend', {
                        vacancyId: $(this).attr('data-vacancyId'),
                        vacancyUrl: $(this).attr('data-vacancyUrl'),
                        vacancyTitle: $(this).attr('data-vacancyTitle'),
                    })
                    //prevent default behavior
                    return false
                })

		},

		destroy: function () {

		},

		//switchable styles
		css: '',

		listen: {
			'app-load': function () {

			}
		}

	}
	// return module object
	return module;
})

