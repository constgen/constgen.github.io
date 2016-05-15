Core.register('basketForm', function (sandbox) {
	return (function (root, $) {
		if (!root || !$) return
		var module = {
			init: function () {

			    // check if basket empty
			    module.empty = function () {

			        var allItems = $(root).find('.orderItem')
			        if (!allItems.length) {
			            window.location.href = window.location.protocol + '//' + window.location.host + '/shop'
			        }

			    }

			    // questions
			    var questionBlock = $(root).find('.questions'), questionControl = $(questionBlock).find('.control'), questionTarget = $(questionBlock).find('#question-list'), questionControlIcon = $(questionControl).find('#control-image');

			    $('.questions').click(function () {
			        if (questionTarget.attr('class') == 'closed') {
			            $(questionTarget).attr('class', 'opened')
			            $(questionControlIcon).attr('class', 'closed')
			        } else {
			            $(questionTarget).attr('class', 'closed')
			            $(questionControlIcon).attr('class', 'opened')
			        }
			        return false;
			    })

                // update total
			    module.totalCost = $(root).find('#totalBasket')
				module.removeButton = $(root).find('.btn_remove')

				module.updateTable = function (data) {
				    //update total cost
					module.totalCost.html(data.total)
				}

				module.removeServiceFromBasket = function (serviceId) {
				    var tr = $(root).find('[data-serviceid="' + serviceId + '"]')
				    if (tr) {

				        tr.remove()

				    }
				    module.empty()

				}

				module.removeButton.click(function (e) {
				    sandbox.action('basket-remove', {
				        deleteId: this.getAttribute('data-serviceid')
				    })
				    e.preventDefault()
				});
				
                // update with promo discount
				module.updateTablePromo = function (detail) {
				    if (detail.isValid) {
				        // update input
				        $('#promocode').removeClass().addClass('valid')
				    } else {
				        // update input
				        $('#promocode').removeClass().addClass('invalid')
				    }

				    // update cost
				    var cost = $(root).find('#totalBasket')
				    $(cost).text(detail.cost);

				    // update items
				    var i = 0;
				    while (i < detail.services.length) {

				        var data = detail.services[i],
                            item = $(root).find('.orderItem[data-serviceid=' + data.id + ']'),
                            itemDiscount = $(item).find('.serviceDiscount'),
                            itemTotal = $(item).find('.serviceTotal')

				        $(itemDiscount).text(data.discount);
				        $(itemTotal).text(data.total);

				        i++
				    }

				}

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

				    //remove service from basket
					if (detail.deletedItemId) {
					    module.removeServiceFromBasket(detail.deletedItemId)
					}

					//update prices
					if ('total' in detail) {
						module.updateTable({
							total: detail.total
						})
					}

				},

				'basket-empty': function () {

				},

				'promocode-update': function (detail) {
				    if (!detail) return
                    
				    module.updateTablePromo(detail)

				}
			}

		}
		return module
	}(document.querySelector('.basketform'), window.jQuery))
})
