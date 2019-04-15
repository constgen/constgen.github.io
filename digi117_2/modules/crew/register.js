Core.register('crew', function (sandbox) {
	return (function (root, $) {
		if (!root) return
		var module = {
			popup: $("#personPopup"),
			overlay: $("#overlay"),

			animOpacity:  500,
			animRestruct: 700,
			animHeight:   0,

			init: function () {

				document.querySelector('#wrapper').appendChild(document.querySelector('#overlay'));

				if (!sandbox.hasFeature('css-border-radius')) module.overlay.className += ' no_border-radius';

				$(".vcard .linkedin, .vcard .twitter").each(function(){
					$(this).append("<span class='after'></span>");
				})


				$(".vcard").click(function() {
					if(!$(this).hasClass("hidden")){
						module.showPopup($(this));
					}
				});

				module.popupCloserInit();
				module.repairBefores();


				$(".filters a").click(function(){

					var tag = $(this).attr("href").split("#")[1]

					sandbox.action('filter-people', { tag: tag})	// sending to Core event 'filter-people' with selected tag in params

				})

				var tagOnLoad = window.location.hash.substring(1);
				if (tagOnLoad == "") {tagOnLoad="all"}
				setTimeout(function(){
					sandbox.action('filter-people', { tag: tagOnLoad})
					}, 50);
				setTimeout(function() {$(".people").addClass("transitionHeight")}, 100);

				$(".people").append("<p class='noresults'>No results found</p>");
			},

			parse: function(vcard) {
				var model = {};

				model.photo = vcard.find(".photo").getHtmlCode();
				model.fn = vcard.find(".fn").getHtmlCode();
				model.role = vcard.find(".role").getHtmlCode();
				model.photos = vcard.find(".photos").getHtmlCode();
				model.note = vcard.find(".note").getHtmlCode();
				model.email = vcard.find(".email").getHtmlCode();
				model.linkedin = vcard.find(".linkedin").getHtmlCode();
				model.twitter = vcard.find(".twitter").getHtmlCode();

				return model;
				
			},

			fillPopup: function(model) {
				module.popup.find(".left").html(model.photo + model.photos);
				module.popup.find(".right .head").html(model.fn + model.role);
				module.popup.find(".right .details").html(model.note + model.email + model.linkedin + model.twitter);
			},

			showPopup: function(vcard) {
				var model = module.parse(vcard);

				module.fillPopup(model);
				


				module.popup.css( "bottom" , "auto" )
				module.popup.css( "top", $(window).scrollTop() + 140 + 'px');

				setTimeout(function() {
					var offsetTop      =  sandbox.get('offset', module.popup.get(0)).top;
					var offsetHeight   =  module.popup.height()
					var documentHeight =  $(document).height()

					if (documentHeight < offsetTop + offsetHeight + 50) {
						module.popup.css( "top"    , "auto" )
						module.popup.css( "bottom" , "50px" )
					}
				}, 50);



				if (sandbox.hasFeature("css-transition")) {  //animation
					module.overlay.show()
					setTimeout(
						function() {
							module.overlay.css({ opacity: 1 })
						}, 50);
				}
				else {
					module.overlay.show()
					module.overlay.animate({
						opacity: 1
					}, 200);
				}				
			},

			popupCloserInit: function(){
				if (sandbox.hasFeature("css-transition")) {			// If bro supports CSS transitions
					module.popup.find(".close").click(function(){	// Binding on "close" 
						module.overlay.css({ opacity: 0 });
					});
					/*module.overlay.get(0).addEventListener("transitionend", function(){alert(1)}, true);*/
					sandbox.Event.add(module.overlay.get(0), 'transitionend', function(e){
						if(e.target == this) {
							if (module.overlay.hasClass("opened")) {
								module.overlay.hide()
							}
							module.overlay.toggleClass("opened");
						}
					})
				}
				else {
					module.popup.find(".close").click(function(){
						module.overlay.animate({
							opacity: 0
						  }, 200, function(){
							module.overlay.hide();
						});
					});
				};

				module.overlay.click(function(){
					module.popup.find(".close").trigger('click');
				})

				module.popup.click(function(e){
					e.stopPropagation();
				})
			},

			filter: function (tag) {

				var   visibleTiles = [];
				var invisibleTiles = [];

				sandbox.action('pause-loopanimations', { initiator: 'crew'}) // We need to stop all animations on page

				
				$(".vcard").each(function(){
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
						$(".people").css("height", 0);
					}
					else {
						count--;
						var appsHeight = ((count - count%4)/4 + 1)*292 + "px";
						$(".people").css("height", appsHeight);
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
					setTimeout(function() {$(".people .noresults").css({'opacity': '1', 'filter':'alpha(opacity=100)', 'top':'30px'});}, 500);
				} 
				else {
					$(".people .noresults").css({'opacity': '0', 'filter':'alpha(opacity=0)'  , 'top':'0px' });
				}
			},


			heightDontChange: function(count) {
				count--;
				newHeight = ((count - count%4)/4 + 1)*292 + "px";

				if (newHeight == $(".people").css("height")) return true;
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
				'filter-people': function (data) {
					if(!!data.tag) module.filter(data.tag);

					$(".filters a").removeClass("active");
					$(".filters a."+data.tag).addClass("active");
				}
			}

		}
		return module
	}(document.querySelector('#crew'), window.jQuery)) //Node element
})





jQuery.fn.getHtmlCode = function() { // This method will return given element as html code
	return $( $('<div></div>').html(this.clone()) ).html();
}