Core.register('contactsAndForm', function (sandbox) {
	return (function (root) {
		if (!root) return
		var module = {
			init: function () {
				$('input[data-save], select[data-save]').change(function(){	
					var formdata = {};
					var string = $(this).attr('name');

					if (/\[.*?\]/.test(string)) {
						formdata[string.substring((string.lastIndexOf("[") + 1), (string.lastIndexOf("]")))] = $(this).val();
					} else {
						formdata[string] = $(this).val();
					}
					sandbox.action('formdata-change', formdata);
				})
			},

			destroy: function () {
				return false
			},

			listen: {
				'formdata-update': function (detail) {
					for (i in detail) {
						$(root).find('input, select').each(function () {
							if ($(this).val() == '') {
								var string = $(this).attr('name');

								if (/\[.*?\]/.test(string)) {
									if (string.substring((string.lastIndexOf("[") + 1), (string.lastIndexOf("]"))) == i) {
										$(this).val(detail[i]);
									}
								} else 
								if (string == i) {
									$(this).val(detail[i]);
								}
							}							
						})
					}
				}
			}

		}
		return module
	}(document.querySelector('#contacts-and-form'))) //Node element
})
