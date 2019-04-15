Core.register('workFilter', function (sandbox) {
	return (function (root, $) {
		if (!root) return
		var module = {

			init: function () {
				$(".filters a").click(function(){
					var tag = $(this).attr("href").split("#")[1];
					sandbox.action('filter-apps', { tag: tag})	// sending to Core event 'filter-apps' with selected tag in params
					
				})

				var tagOnLoad = window.location.hash.substring(1);
				if (!!tagOnLoad) {
					$(".filters a").removeClass("active");
					$("." + tagOnLoad).addClass("active");
				}
			},


			listen: {
				'app-load': function () {

				},
				'filter-apps': function (data) {
					if(!!data.tag) {
						$(".filters a").each(function () {
							if ($(this).attr("href").indexOf(data.tag) + 1) {
								$(".filters a").removeClass("active");
								$(this).addClass("active");
							}
						});
						
					}
				}
			}

		}
		return module
	}(document.querySelector('#workFilter'), window.jQuery)) //Node element
})