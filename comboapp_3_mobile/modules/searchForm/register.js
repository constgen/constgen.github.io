Core.register('searchForm', function (sandbox) {
	return (function (root, $) {
		if (!root) return
		var module = {
			init: function () {
				$("#overlay").click(module.closeForm)
				$("#searchForm .close").click(module.closeForm)
			},


			openForm: function () {
				$("#overlay, #searchForm").show()

				setTimeout(function() {
					$("#overlay").addClass("visible");
					$("#searchForm").addClass("visible");
				}, 50)

				setTimeout(function () {
					$("#searchForm input").focus();
				}, 550)
			},

			closeForm: function () {
				window.location.href = "#"
				$("#overlay").removeClass("visible");
				$("#searchForm").removeClass("visible");

				setTimeout(function() {
					$("#overlay, #searchForm").hide()
				}, 550)
			},


			listen: {
				'app-load': function () {

				},
				'search': function(detail) {
					switch (detail.action) {
						case "open":
							module.openForm();
							break;
						case "close":
							module.closeForm();
							break;
					}
				}
			}

		}
		return module
	}(document.querySelector('#searchForm'), window.jQuery)) //Node element
})
