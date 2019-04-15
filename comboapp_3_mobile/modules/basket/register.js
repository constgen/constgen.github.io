Core.register('basket', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {
				module.total = $(root).find('.total')

				module.updateTable = function (data) {
					//update total cost
					module.total.html(data.total)
				}

				module.removeServiceFromBasket = function (serviceId, itemId) {
					var tr = $(root).find('tr[data-serviceId="' + serviceId + '"]'),
						td = tr.children('td'),
						index = td.find('.remove').index(td.find('.remove[data-deleteId="' + itemId + '"]'));

					//remove item according to delete index
					td.find('.wrap').eq(index).remove()
					
					//if all items in service are removed, remove service
					if (!td.find('.wrap').length) {
						tr.remove()
					}
				}


			},

			listen: {
				'basket-update': function (detail) {
					if (!detail) return

					if (!detail) return

					//detail ={
					//	"deletedItemId": "4522",
					//	"groupDeletedItemId": "96",
					//	"itemTotal": 33333,
					//	"total": 88888,
					//	"countItem": 18
					//}

					//remove service from basket
					if (detail.groupDeletedItemId && detail.deletedItemId)
						module.removeServiceFromBasket(detail.groupDeletedItemId, detail.deletedItemId)

					//update prices
					if ('total' in detail) {
						module.updateTable({
							total: detail.total,
							items: [
								{
									serviceId: detail.groupDeletedItemId || detail.groupAddedItemId,
									price: detail.itemTotal
								}
							]
						})
					}
				}
			}

		}
		return module
	}(document.querySelector('.basket-table'))) //Node element
})