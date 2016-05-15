Core.register('reserve', function (sandbox) {
	'use strict';
	var root, module;
	// root HTML element
	if (!(root = sandbox.root = document.querySelector && document.querySelector('.reserve'))) return;

    sandbox.load([
        'plugins/jquery-ui/css/jquery-ui.css',
        'plugins/jquery-ui/css/jquery.ui.datepicker.css'
    ], 'async')
	var datepickerReady = sandbox.load([
		'plugins/jquery-ui/jquery.ui.core.min.js',
        'plugins/jquery-ui/jquery.ui.widget.min.js',
        'plugins/jquery-ui/jquery.ui.datepicker.min.js',
        'plugins/jquery-ui/jquery.ui.datepicker-ru.min.js'
	], 'defer')

	// return module object
	return module = {
		//switchable styles
		css: '',

		init: function () {
			//show module
		    root.style.display = ''

		    //datepicker
		    $(".start-date input, .end-date input").datepicker();

		    $(".datepicker-icon").click(function () {
		        $(this).parent().find("input").datepicker("show");
		    });

		    // custom select
		    $('select').each(function () {

		        var thisValue = $(this).find('option:selected').val();
		        $('.select-wrap p').text(thisValue);

		        $(this).change(function () {
		            thisValue = $(this).find('option:selected').val();
		            $('.select-wrap p').text(thisValue);
		        });

		    });

		},

		destroy: function () {
			//hide module
			root.style.display = 'none'
		},

		listen: {
			'app-load': function (detail) {
				if (!detail) return;
			}
		}
	}
})

