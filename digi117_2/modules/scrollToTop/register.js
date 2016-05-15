Core.register('scrollToTop', function (sandbox) {
	return (function (root, $) {
		if (!root) return
		var module = {
			init: function () {
				$(window).scroll(module.checkVisibility);
				$("#scrollToTop").show();
				$("#scrollToTop").click(module.scrollToTop);


			},

			checkVisibility: function () {
				if ($(this).scrollTop() > 600) {
					$('#scrollToTop').addClass("visible");
				} else {
					$('#scrollToTop').removeClass("visible");
				}
			},

			scrollToTop: function () {
				if ($('html').scrollTop() > 0) {
					$('html').animate({
						scrollTop: 0
					}, 500, 'swing');
				} else {
					$('html, body').animate({
						scrollTop: 0
					}, 500, 'swing');
				}

				
				return false;
			},

			listen: {
				'app-load': function () {

				}
			}

		}
		return module
	}(document.querySelector('#scrollToTop'), window.jQuery)) //Node element
})
