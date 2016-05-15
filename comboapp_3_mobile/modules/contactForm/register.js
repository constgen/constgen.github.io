Core.register('contact-form', function (sandbox) {
	return (function (root, $) {
		if (!root) return
		var module = {
			init: function () {	
				var cb_emu = root.querySelector('.cb_emulator');

				
				sandbox.Event.add(cb_emu, 'tap', function() {console.log("tap")
					if (module.isFrozen(cb_emu)) return

					$(cb_emu).toggleClass("off");

					if ($(cb_emu).hasClass("off")) {
						$(root).find(".nda input").attr('checked', false);
					} else {
						$(root).find(".nda input").attr('checked', true);
					}
				})
				

				sandbox.Event.add(cb_emu, 'slideleft', function() {
					if (module.isFrozen(cb_emu)) return

					module.freeze(cb_emu);
					$(root).find(".nda input").attr('checked', false);
					$(cb_emu).addClass("off")
				})

				sandbox.Event.add(cb_emu, 'slideright', function () {
					if (module.isFrozen(cb_emu)) return

					module.freeze(cb_emu);
					$(root).find(".nda input").attr('checked', true);
					$(cb_emu).removeClass("off")
				})

				sandbox.Event.add(document, 'mouseup', function() {module.unfreeze(cb_emu)});
				sandbox.Event.add(document, 'touchend', function() {module.unfreeze(cb_emu)});
			},

			isFrozen: function (el) {
				return $(el).hasClass("frozen")
			},

			freeze: function (el) {
				$(el).addClass("frozen")
				setTimeout(function() {
					$(el).removeClass("frozen")
				}, 1000) 
			},

			unfreeze: function(el) {
				if (!$(el).hasClass("frozen")) return
				setTimeout(function() {
					$(el).removeClass("frozen")
				}, 50) 
			},

			listen: {
				'app-load': function () {

				}
			}

		}
		return module
	}(document.querySelector('#contact-form'), window.jQuery)) //Node element
})
