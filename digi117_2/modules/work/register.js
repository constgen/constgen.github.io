Core.register('work', function (sandbox) {
	return (function (root, $) {
		if (!root) return
		var module = {

			animOpacity:  500,
			animRestruct: 700,
			animHeight:   0,

			init: function () {

				$(".app").bind('click', function(e){
					if (!!$(this).hasClass("hidden")) {
						e.preventDefault();
						return false;
					}
				});
				
				var tagOnLoad = window.location.hash.substring(1);
				if (!!tagOnLoad) module.filter(tagOnLoad)
				else module.filter("all")

				module.repairBefores();

				setTimeout(function() {$(".apps").addClass("transitionHeight")}, 100);

				$(".apps").append("<p class='noresults'>No results found</p>");
			},




			filter: function (tag) {

				var   visibleTiles = [];
				var invisibleTiles = [];

				sandbox.action('pause-loopanimations', { initiator: 'crew'}) // We need to stop all animations on page

				
				$(".app").each(function(){
					var currentTags = $(this).attr("data-filter")

					if (currentTags.indexOf(tag) + 1) {
						visibleTiles.push($(this))
					} 
					else {
						invisibleTiles.push($(this))
					}
					$(this).show()
				});

				module.animateOpacity(visibleTiles, invisibleTiles);
				module.animateRestruct(visibleTiles, invisibleTiles);
				module.animateHeight(visibleTiles.length);
				module.noResults(visibleTiles.length)



				setTimeout(function() {
					sandbox.action('resume-loopanimations', { initiator: 'crew'})
				}, 3000) 		//resume another animations when current animation will end
				
			},

			animateOpacity: function (visibleTiles, invisibleTiles) {
				var animOpacity = module.animOpacity;
				if (module.heightDontChange(visibleTiles.length)) {
					console.log("heightDontChange");
					animOpacity = animOpacity - 500;
				}

				setTimeout(function() {
					$.each(visibleTiles, function() {
						$(this).removeClass("hidden");
					})
					$.each(invisibleTiles, function() {
						$(this).addClass("hidden");
					})
				}, animOpacity);
			},

			animateRestruct: function(visibleTiles, invisibleTiles) {
				i=0;

				var animRestruct = module.animRestruct;
				if (module.heightDontChange(visibleTiles.length)) {
					console.log("heightDontChange");
					animRestruct = animRestruct - 550;
				}

				$.each(visibleTiles, function() {
					module.moveTile($(this), i, animRestruct);
					i++;
				})
				$.each(invisibleTiles, function() {
					module.moveTile($(this), i, animRestruct);
					i++;
				})


			},

			animateHeight: function (count) {
				setTimeout(function(){

					if (count == 0) {
						$(".apps").css("height", 0);
					}
					else {
						count--;
						var appsHeight = ((count - count%3)/3 + 1)*254 + "px";
						$(".apps").css("height", appsHeight);
					}

				}, module.animHeight);
			},


			moveTile: function (tile, index, animRestruct) {
				

				setTimeout(function() { 
					var currentPos = /index[0-9]+/.exec(tile.attr("class"))[0]

					tile.removeClass(currentPos)	//restructure it 
					tile.addClass("index"+index);

					//z-index after
					setTimeout(function() {
						tile.css("z-index", index) //this made for restucturizing look better
					}, 1000);

				}, animRestruct);
			},



			noResults: function (index) {
				if (index==0) {
					setTimeout(function() {$(".apps .noresults").css({'opacity': '1', 'filter':'alpha(opacity=100)', 'top':'30px'});}, 500);
				} 
				else {
					$(".apps .noresults").css({'opacity': '0', 'filter':'alpha(opacity=0)'  , 'top':'0px' });
				}
			},


			heightDontChange: function(count) {
				count--;
				newHeight = ((count - count%4)/4 + 1)*292 + "px";

				if (newHeight == $(".apps").css("height")) return true;
				else return false;
			},




			repairBefores: function(){
				if (($.browser.msie) && ($.browser.version == '7.0')) {
					var filters = $(".filters li:not(:first-child) a")
					filters.before("<span style='padding-right:10px;color:#303030;'>/</span>")
				}
			},


			listen: {
				'app-load': function () {

				},
				'filter-apps': function (data) {
					if(!!data.tag) module.filter(data.tag);
				}
			}

		}
		return module
	}(document.querySelector('#work'), window.jQuery)) //Node element
})