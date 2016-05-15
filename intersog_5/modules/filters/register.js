Core.register('filters', function (sandbox) {
	return (function (root, $) {
		if (!root) return
		var module = {

			init: function () {
				$(".filters a, .subFilters a").click(function(){
					var tag = $(this).attr("href").split("#")[1];
					sandbox.action('filter-apps', { tag: tag})	// sending to Core event 'filter-apps' with selected tag in params
					
				})

				var tagOnLoad = window.location.hash.substring(1);
				if (!!tagOnLoad) {
					$(".filters a, .subFilters a").removeClass("active");
					$("." + tagOnLoad).addClass("active");
				}

			},


			listen: {
				'filter-apps': function () {
					
				},
				'filter-apps': function (data) {
					if(!!data.tag) {
						$(".filters a, .subFilters a").each(function () {
							if ($(this).attr("href").indexOf(data.tag) + 1) {
								$(".filters a, .subFilters a").removeClass("active");
								$(this).addClass("active");
							}
						});
						
					}
				}
			}

		}
		return module
	}(document.querySelector('#filters'), window.jQuery)) //Node element
})
