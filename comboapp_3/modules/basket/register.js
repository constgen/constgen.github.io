Core.register('basketForm', function (sandbox) {
	return (function (root, $) {
		if (!root || !$) return
		var module = {
			init: function () {
                
                if (!sandbox.hasFeature('css-transform')) root.className += ' no-transform'
                
				module.totalCost = $(root).find('.total')
				module.removeButton = $(root).find('.remove')
				module.discount = $(root).find('#basket-discount')

				//discount: detail.discount,
				//discountCost: detail.discountCost,
				//discountTotal: detail.discountTotal
				module.updateTable = function (data) {
					
					
					if(!data.discount || data.discount==''){
						module.totalCost.html(data.total)
						module.discount.html('')
					}
					else{
						//update total cost
						module.totalCost.html(data.total+'<br/>'+data.discountCost+'<hr>'+data.discountTotal)
						module.discount.html(data.discount)
					}
					//update services summary prices
					$(data.items).each(function () {
						$(root).find('tr[data-serviceId="' + this.serviceId + '"] td:last-child output').html(this.summ)
					})
				}


				module.removeServiceFromBasket = function (serviceId, itemId) {
					var tr = $(root).find('tr[data-serviceId="' + serviceId + '"]'),
						td = tr.children('td'),
						index = td.find('.remove').index(td.find('.remove[data-deleteId="' + itemId + '"]'));
				
					//remove item according to delete index
					td.eq(0).children('input').eq(index).remove()
					td.eq(1).children('select').eq(index).remove()
					td.eq(2).children('span').eq(index).remove()

					//if all items in service are removed, remove service
					if (!td.children('span').length) {
						tr.remove()
					}
				}


//				module.removeButton.click(function () {
//					sandbox.action('basket-remove', {
//						deleteId: this.getAttribute('data-deleteId')
//					})
//					return false
//				});
				
				return


				/*Check Promocode*/
				var refreshicon = $('table .refresh').eq(0),
				promocode = document.getElementById('promocode'),
				discount = document.getElementById('discount').getElementsByTagName('output')[0];

				promocode.onvalid = function (e) {
					refreshicon.addClass('processing')
					jQuery.ajax({
						url: window.location.protocol + '//' + window.location.host + '/ajaxbasketpromo?promoCode=' + this.value,
						dataType: 'json',
						success: function (data) {
							refreshDiscount(data)
						}
					});
				}

				var PromocodeLength = promocode.value.length //to prevent multiple AJAX send, caused by multiple events
				$(promocode).bind('cut paste input keyup', function (e) {
					var ths = this
					setTimeout(function () {
						if (ths.value.length == 16 && PromocodeLength == 0) promocode.onvalid()
						else if (ths.value.length == 0 && PromocodeLength == 16) promocode.onvalid()
						PromocodeLength = ths.value.length//used to prevent multiple AJAX send
					}, 10)
				})

				function refreshDiscount(data) {
					if (data.error) {
						discount.innerHTML = data.error
						discount.parentNode.style.display = 'inline'
					} else {
						updateTotalPrice(data)
						discount.innerHTML = data.discount + '%'
						discount.parentNode.style.display = (data.discount) ? 'inline' : 'none'
					}
					refreshicon.removeClass('processing')
				}



			},

			listen: {
				//on basket change (add/remove)
				'basket-update': function (detail) {
					if (!detail) return
					
					//BAD CODE
					if(!detail.countItem){
						document.location.href = '/services'
					}
					//END BAD CODE
					
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
									summ: detail.itemTotal
								}
							],
							discount: detail.discount,
							discountCost: detail.discountCost,
							discountTotal: detail.discountTotal
						})
					}
				},

				'basket-empty': function () {
					
				}
			}

		}
		return module
	}(document.querySelector('.basket-table'), window.jQuery))
})
