Core.register('appToolbar', function (sandbox) {
	return (function (root, $) {
		if (!root || !$) return
		var module = {
			init: function () {
				if (/\#search/.test(window.location.hash)) 
					window.location.hash = ""
/*

				$(window).bind('hash-change', function() {
					var curPage = $(this).attr("href").split("/")[1]
					sandbox.action('pageInfo-update', {
						flags: {
							currentPage: curPage
						}
					})

				})
*/



				sandbox.Event.add(window, 'hashchange', function(){
					if (/\#search/.test(window.location.hash)) {
						sandbox.action('search', {action: "open"});
					} else {
						sandbox.action('search', {action: "close"});
					}

				})
			},









			listen: {
				'app-load': function () {

				},
				'basket-update': function(detail) {
					if (!detail) return

					//detail ={
					//	"deletedItemId": "4522",
					//	"groupDeletedItemId": "96",
					//	"itemTotal": 33333,
					//	"total": 88888,
					//	"countItem": 18
					//}
					if (parseInt(detail.countItem)) {
						$(root).find('#cart_tab').removeClass('empty').attr('data-count', detail.countItem)
					} else {
						$(root).find('#cart_tab').addClass('empty').removeAttr('data-count')
						
					}
				}
			}

		}
		return module
	}(document.querySelector('#appToolbar'), window.jQuery)) //Node element!
})
