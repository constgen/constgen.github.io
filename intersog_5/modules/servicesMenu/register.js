Core.register('servicesMenu', function (sandbox) {
	return (function (root, $) {
		if (!root) return
		var module = {
			init: function () {

				$("#servicesMenu a").click(function (e){

					e.preventDefault()

					var destId = $(this).attr("href");
					var destElement = $(destId).get(0);
					var dest = sandbox.get('offset', destElement).top

					module.scrollToDestination(dest);

					return false;
				});

				module.repairBefores();
			},

			scrollToDestination: function (dest) {
				if (!!($('html').scrollTop())) {
					$('html').animate({
						scrollTop: dest
					}, 500, 'swing');
				} else {
					$('html, body').animate({
						scrollTop: dest
					}, 500, 'swing');
				}
			},




			repairBefores: function(){
				if (($.browser.msie) && ($.browser.version == '7.0')) {
					var filters = $("#servicesMenu li:not(:first-child) a")
					filters.before("<span style='padding: 0 10px;color:#303030;'>/</span>")
				}
			},




			listen: {
				'app-load': function () {

				}
			}

		}
		return module
	}(document.querySelector('#servicesMenu'), window.jQuery)) //Node element
})
