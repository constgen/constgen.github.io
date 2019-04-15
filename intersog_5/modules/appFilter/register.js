Core.register('appFilter', function (sandbox) {
	return (function (root, $) {
		if (!root) return
		var module = {

			init: function () {
				$(".filters a").each(function() {
					var tag = $(this).attr("href").split("#")[1];

					if (location.hash.toString().indexOf(tag) + 1) 
						{$(this).addClass("active")}

					if ((tag=="all") && (location.hash ==""))
						{$(this).addClass("active")}
				});
			},


			listen: {
				'app-load': function () {

				}
			}

		}
		return module
	}(document.querySelector('#appFilter'), window.jQuery)) //Node element
})