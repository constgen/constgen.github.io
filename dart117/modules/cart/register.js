Core.register('cart', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {
                module.timeout;
                module.count = parseInt($(root).find('.quant .val').html(), 10) || 0;
                
				/* Check SVG support */
                if (!sandbox.hasFeature('element-svg')) {
                	$(root).addClass('nosvg')
                }

			    // update cart with promocode
                module.updateCartPromo = function (detail) {
                    $(root).find('.cost .val').html(detail.cost)
                }

			},

			listen: {
				//on basket change (add/remove)
				'basket-update': function (detail) {
				    if (!detail) return
					//update cost
					if ('cost' in detail) 
						$(root).find('.cost .val').html(detail.cost)
					if ('count' in detail){
                        $(root).find('.quant .val').html(detail.count + ((detail.count == 1) ? ' service' : ' services'))
                        
                        if (detail.count > 0){
                            $(root).find('#cart').addClass('notempty')
                        }
                        else {
                            $(root).find('#cart').removeClass('notempty')
                        }

                        function addService() {
                            $(root).find('#cart .label').css({ display:'block' });
                            
                            clearTimeout(module.timeout);
                            
                            if ((detail.count - module.count) > 0) {
                                $(root).find('#cart .label').html('+' + (detail.count - module.count))
                            }
                            else {
                                $(root).find('#cart .label').html(detail.count - module.count)
                            }
                                
                            module.timeout = setTimeout(function(){
                                $(root).find('#cart .label').css({ top: '-30px' });
                                setTimeout(function(){
                                    $(root).find('#cart .label').css( {display:'none'} );
                                    $(root).find('#cart .label').css( { top: '4px' } );    
                                },500);
                                module.count = detail.count;
                            },5000)
                            
                        }
                        
                        addService();
                        
                        
                    }
						
                    
				},
				'promocode-update': function (detail) {
				    if (!detail) return
                    
				    module.updateCartPromo(detail)

				}
                
			}

		}
		return module
	}(document.querySelector('#toolbar'))) //Node element
})