Core.register('accordion', function (sandbox) {
	return (function (roots, $) {
		if (!roots.length || !$) return

		var module = {
			init: function () {
				
				var root, i = 0,
					SPEED = 400;
				while (root = roots[i++]) {
					//for every accordion
					(function(){
						var togglebutton = $(root).find('.toggle'),
							contentBody = $(root).find('.body');

						function closeOpened() {
							contentBody.slideUp(SPEED)
							togglebutton.removeClass('active')
						}

						function openThis(tglbtn) {
							$(tglbtn).parent().find('.body').slideDown(SPEED)
							$(tglbtn).addClass('active')

						}
					
						togglebutton.on('click', function () {
							
							if (!$(this).hasClass('active')) {
								closeOpened()//first close all
								openThis(this)//open current
							}
							else {
								closeOpened()//close all
							}
							return false
						})
					}())	
				}
			},

			listen: {
				
			}

		}
		return module
	}(document.querySelectorAll('.accordion'), window.jQuery)) //Node element
})
