Core.register('serviceReview', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {
				$('.customerReviews .rating').rating({
					fx: "full",
					width: 14,
					stars: 5,
					titles: ['Rating','Ratings','Ratings'],
					readOnly: true
				})
				$('.leaveReview .rating').rating({
					fx: "full",
					width: 14,
					stars: 5,
					titles: ['Rating','Ratings','Ratings'],
					click: function (rate) {
						$("#rating").val(rate);
					}
				})
			},

			listen: {
				
			}

		}
		return module
	}(document.querySelector('#serviceReview')))
})
