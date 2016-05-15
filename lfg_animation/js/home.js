require(['require-config'], function () {

	require(['jquery', 'js/modules-buckets-animation/buckets', 'js/modules-buckets-animation/buckets-export'], function ($, buckets, exportBuckets) {
    	var range = $('#range'),
    		amount = $('#amount');



    	range.on('change', function () {
    		amount.html(this.value)
    		buckets.setValue({
    			amount: this.value,
    			reimbursements: this.value * 1.5 + 50000,
    			benefit: this.value * 1.25 + 25000,
				animate: true //default true (optional)
    		})
    	})

    	//Experiment
    	if (!!document.querySelector && !!document.addEventListener) {
    		document.querySelector('#superrange').addEventListener('input', function () {
    			amount.html(this.value)
    			buckets.setAmount(this.value)
    		}, false)
    	}

    	//Export as image
    	$('.export').click(function () {
    		exportBuckets.asImage(function (dataURL) {
 
    			var image = new Image()
    			image.src = dataURL
    			$(image).css({
    				border: '1px dotted #333',
    				margin: '10px auto',
					display: 'block'
    			})
    			document.body.appendChild(image)


    		})
    	})
    	
	});
});