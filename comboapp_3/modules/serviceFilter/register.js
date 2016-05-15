Core.register('serviceFilter', function (sandbox) { 
	return (function (root, $) {
		if (!root || !$) {return}

		var module = {
			model: new Array(),
			criteria: new Array(new Array, new Array, new Array),				/*  = [ [paid, free], [ipad], [] ] */
			

			init: function () {
				module.model.push(['someService', 'paid', 				'mac ipad android',				'preRelease update'					]);
				module.model.push(['someService', 'paid', 				'ipad mac',						'idea postRelease update'			]);
				module.model.push(['someService', 'paid', 				'android mac',					'update'							]);
				module.model.push(['someService', 'paid', 				'iphone mac',					'preRelease postRelease'			]);
				module.model.push(['someService', 'paid', 				'mac',							'idea'								]);
				module.model.push(['someService', 'paid', 				'ipad',				 			'preRelease postRelease update'		]);
				module.model.push(['someService', 'paid', 				'android mac',			 		'preRelease update'					]);
				module.model.push(['someService', 'paid', 				'iphone ipad android',			'idea postRelease'					]);
				module.model.push(['someService', 'paid', 				'iphone ipad mac',				'update'							]);
				module.model.push(['someService', 'paid', 				'iphone',			 			'idea update'						]);
				module.model.push(['someService', 'paid', 				'mac',						 	'preRelease'						]);
				module.model.push(['someService', 'paid', 				'ipad mac android',				'idea postRelease update'			]);
				module.model.push(['someService', 'paid', 				'android',					 	'update'							]);
				module.model.push(['someService', 'paid', 				'iphone android',				'idea'								]);
				module.model.push(['someService', 'free', 				'mac android',					'idea update'						]);
				module.model.push(['someService', 'free', 				'ipad',						 	'preRelease update'					]);
				module.model.push(['someService', 'free', 				'android ipad mac',				'idea postRelease'					]);
				module.model.push(['someService', 'free', 				'iphone',			 			'update'							]);
				module.model.push(['someService', 'free', 				'iphone ipad mac',				'idea'								]);
				module.model.push(['someService', 'free', 				'mac',						 	'preRelease update'					]);
				module.model.push(['someService', 'free', 				'ipad android',					'idea postRelease'					]);
				module.model.push(['someService', 'free', 				'android',						'update'							]);
				module.model.push(['someService', 'free', 				'iphone',						'idea update'						]);
				module.model.push(['someService', 'free', 				'mac',							'preRelease postRelease'			]);
				module.model.push(['someService', 'free', 				'ipad',							'preRelease'						]);
				module.model.push(['someService', 'free', 				'android mac',					'idea postRelease update'			]);
				module.model.push(['someService', 'free', 				'mac',							'update'							]);
				module.model.push(['someService', 'free', 				'ipad mac android',				'idea update'						]);
				module.model.push(['someService', 'free', 				'android',						'preRelease update'					]);
				module.model.push(['someService', 'free', 				'iphone ipad mac',				'idea postRelease update'			]);
				module.model.push(['someService', 'free', 				'iphone ipad android',			'update'							]);
				module.model.push(['someService', 'free', 				'iphone ipad android',			'idea'								]);
				module.model.push(['someService', 'free', 				'iphone',			 			'idea'								]);
				module.model.push(['someService', 'free', 				'iphone mac android',			'preRelease update'					]);
				module.model.push(['someService', 'free', 				'iphone android',				'idea postRelease update'			]);
				module.model.push(['someService', 'inApp',				'iphone android',				'update'							]);
				module.model.push(['someService', 'inApp',				'mac android',					'idea'								]);
				module.model.push(['someService', 'inApp',				'ipad android',					'preRelease postRelease update'		]);
				module.model.push(['someService', 'inApp',				'android ipad',					'idepreRelease postRelease'			]);
				module.model.push(['someService', 'inApp',				'iphone',			 			'preRelease postRelease'			]);
				module.model.push(['someService', 'inApp',				'iphone mac android',			'preRelease'						]);
				module.model.push(['someService', 'inApp',				'iphone',			 			'idea postRelease update'			]);
				module.model.push(['someService', 'inApp',				'iphone android',				'update'							]);
				module.model.push(['someService', 'inApp',				'mac android',					'idea update'						]);
				module.model.push(['someService', 'inApp',				'ipad',				 			'preRelease'						]);
				module.model.push(['someService', 'inApp',				'android ipad mac',				'idea postRelease update'			]);
				module.model.push(['someService', 'inApp',				'iphone',			 			'update'							]);
				module.model.push(['someService', 'inApp',				'iphone ipad',					'idea'								]);
				module.model.push(['someService', 'inApp',				'iphone mac',					'preRelease'						]);
				module.model.push(['someService', 'paid inApp', 		'iphone ipad mac android',		'idea postRelease update'			]);
				module.model.push(['someService', 'paid inApp', 		'mac',							'update'							]);
				module.model.push(['someService', 'paid inApp', 		'ipad mac',						'idea'								]);
				module.model.push(['someService', 'paid inApp', 		'android',						'preRelease postRelease update'		]);
				module.model.push(['someService', 'paid inApp', 		'mac',							'preRelease'						]);
				module.model.push(['someService', 'paid inApp', 		'ipad',							'idea postRelease'					]);
				module.model.push(['someService', 'paid inApp', 		'android',						'update'							]);
				module.model.push(['someService', 'paid inApp free', 	'iphone ipad mac android',		'idea'								]);
				module.model.push(['someService', 'paid inApp free', 	'mac',							'preRelease update'					]);
				module.model.push(['someService', 'paid inApp free', 	'ipad',							'idea postRelease'					]);
				module.model.push(['someService', 'paid inApp free', 	'android ipad mac',				'update'							]);
				module.model.push(['someService', 'paid inApp free', 	'iphone android',				'idea'								]);
				module.model.push(['someService', 'paid inApp free', 	'mac',							'preRelease update'					]);
				module.model.push(['someService', 'paid inApp free', 	'ipad android',					'idea postRelease update'			]);
				module.model.push(['someService', 'paid inApp free', 	'android mac',					'update'							]);




				$("form input").change(function() {
					module.criteria = module.getRealCriteria();

					$("form input").each(function() {
						var destination = $(this).attr('name');
						var value = $(this).val();


						var extCount = module.getCountExtend(destination, value);

						if (extCount != 0){
							$(this).next().next().html("(" + extCount + ")")
						}
						else {
							$(this).next().next().html("")
						}
					});

				});

				

			},

			getCountExtend: function (destination, value) {
				extCriteria = module.extendCriteria(destination, value);
				extCount = module.getTotalCount(extCriteria);

				return extCount;
			},

			extendCriteria: function(destination, value) {
				var criteria = new Array();
				for (i in module.criteria){
					criteria.push(module.criteria[i]);
				}
				switch (destination) {
					case 'businessModel':
						if (criteria[0].length == 3) {
							criteria[0] = new Array(value);
						}
						else if (isIn(value, criteria[0])) {delete criteria[0][criteria[0].indexOf(value)];}
						else {criteria[0].push(value);}
						break;
					case 'platform':
						if (criteria[1].length == 4) {
							criteria[1] = new Array(value);
						}
						else if (isIn(value, criteria[1])) {delete criteria[1][criteria[1].indexOf(value)];}
						else {criteria[1].push(value);}
						break;
					case 'lifeCycle':
						if (criteria[2].length == 4) {
							criteria[2] = new Array(value);
						}
						else if (isIn(value, criteria[2])) {delete criteria[2][criteria[2].indexOf(value)];}
						else {criteria[2].push(value);}
						break;
					default: break;
				}

				return criteria;
			},

			getRealCriteria: function () {
				var criteria = new Array(new Array(), new Array(), new Array());
				
				if ($("form .businessModel input:checked").length > 0) {
					$("form .businessModel input:checked").each(function() { criteria[0].push($(this).val()); });
				} else {
					criteria[0] = new Array();
					criteria[0].push('paid');	criteria[0].push('inApp');	criteria[0].push('free');
				}

				if ($("form .platform input:checked").length > 0) {
					$("form .platform input:checked").each(function() { criteria[1].push($(this).val()); });
				} else {
					criteria[1] = new Array();
					criteria[1].push('iphone');	criteria[1].push('ipad');	criteria[1].push('mac');	criteria[1].push('android');
				}

				if ($("form .lifeCycle input:checked").length > 0) {
					$("form .lifeCycle input:checked").each(function() { criteria[2].push($(this).val()); });
				} else {
					criteria[2] = new Array();
					criteria[2].push('idea');	criteria[2].push('preRelease');	criteria[2].push('postRelease');	criteria[2].push('update');
				}

				return criteria;

			},

			getTotalCount: function(criteria){
				var selected = new Array();
				cr = DP(criteria[0], criteria[1], criteria[2]);


				selected = new Array();
				for (n=0; n<=module.model.length - 1; n++){
					var modelBusyness = module.model[n][1];
					var modelPlatform = module.model[n][2];
					var modelCycle    = module.model[n][3];
					for (i=0; i<=cr.length-1; i++) {
						if(modelBusyness.indexOf(cr[i][0]) + 1){
							if(modelPlatform.indexOf(cr[i][1]) + 1){
								if(modelCycle.indexOf(cr[i][2]) + 1){
									selected.push(module.model[n]); break;
								}
							}
						}

					}

				}


				return selected.length;
			},

			listen: {
				
			}

		}
		return module
	}(document.querySelector('#serviceFilter'), window.jQuery))
})


function DP(a1,a2,a3){	// декартово произведение 3 array
	var arez=new Array();
	var i=0, j=0, k=0, x;
	while (i<a1.length)	{
		j=0;
		while (j<a2.length) {
			k=0;
				while (k<a3.length){
				x=new Array(a1[i], a2[j], a3[k]);
				arez.push(x);
				k++;
			}
			j++
		}
		i++
	}
	return arez
}

function isIn(looking_for, list){
    for(i in list){
        if(looking_for == list[i]){
            return true;
        }
    }
    return false;
}