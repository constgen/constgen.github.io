Core.register('work', function (sandbox) {
	return (function (root, $) {
		if (!root) return
		var module = {

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

				$("#animationType").change(function() {
					module.filter(window.location.hash.substring(1));
				});
			},


			filter: function (tag) {
				var type = $("#animationType").val();
				switch (type) {
					case "opacity":
						module.filterOpacity(tag);
						break;
					case "absolute":
						module.filterAbsolute(tag);
						break;
					case "absoluteSegment":
						module.filterAbsoluteSegm(tag);
						break;

					case "absoluteSegmentTop":
						module.filterAbsoluteSegmTop(tag);
						break;
					case "translate":
						module.filterTranslate(tag);
						break;
					case "translateBot":
						module.filterTranslateBottom(tag);
						break;
					default:
						module.filterOpacity(tag);
						break;
				}
			},











			filterOpacity: function(tag) {
				$(".apps").removeClass("translateAnimation");
				$(".apps").removeClass("absoluteAnimation");
				$(".apps").addClass("opacityAnimation");

				$(".app").each(function(){
					$(this).removeClass("hidden");
					$(this).show;


					var currentTags = $(this).attr("data-filter")
					if (currentTags.indexOf(tag) + 1) {
						$(this).removeClass("halfHidden");

					} else {
						$(this).addClass("halfHidden");
					}

					var sourceHref = $(this).attr("href").split("#")[0]
					var newHref = sourceHref + '#' + tag;
					$(this).attr("href", newHref)
				})
			},










			filterAbsolute: function(tag) {
				$(".apps").removeClass("translateAnimation");
				$(".apps").removeClass("opacityAnimation");
				$(".apps").addClass("absoluteAnimation");

				var i=0;
				pos = function(i) {
					var row = (i - i%3)/3 + 1;
					var col = i%3 + 1;

					return "row" + row + "_col" + col
				}

				$(".app").each(function(){
					$(this).removeClass("halfHidden");
					$(this).show;

					var currentTags = $(this).attr("data-filter")
					var currentPos = /row[0-9]+_col[0-9]/.exec($(this).attr("class"))[0]


					if (currentTags.indexOf(tag) + 1) {
						$(this).removeClass("hidden")
						$(this).removeClass(currentPos)
						$(this).addClass(pos(i));
						i++;

					} else {
						$(this).addClass("hidden");
					}


					//change links under each app - add filter
					var sourceHref = $(this).attr("href").split("#")[0]
					var newHref = sourceHref + '#' + tag;
					$(this).attr("href", newHref)

					$(this).show();
				})

				i--;
				var appsHeight = ((i - i%3)/3 + 1)*254 + "px";
				$(".apps").css("height", appsHeight);
			},





			filterAbsoluteSegm: function(tag) {
				$(".apps").removeClass("translateAnimation");
				$(".apps").removeClass("opacityAnimation");
				$(".apps").addClass("absoluteAnimation");

				var i=0;
				var k=0;
				pos = function(i) {
					var row = (i - i%3)/3 + 1;
					var col = i%3 + 1;

					return "row" + row + "_col" + col
				}

				$(".app").each(function(){
					$(this).removeClass("halfHidden");
					$(this).show;

					var currentTags = $(this).attr("data-filter")
					var currentPos = /row[0-9]+_col[0-9]/.exec($(this).attr("class"))[0]



					if (currentTags.indexOf(tag) + 1) {
						$(this).removeClass("hidden")

						var a = function (element, curPos, newPos, index) {
							setTimeout(function() {
								element.removeClass(curPos)
								element.addClass(newPos);
							}, 500);
							setTimeout(function() {
								element.css("z-index", index)
							}, 1500);
						}($(this), currentPos, pos(i), i)
						
						i++;

					} else {
						$(this).addClass("hidden");
					}

					//change links under each app - add filter
					var sourceHref = $(this).attr("href").split("#")[0]
					var newHref = sourceHref + '#' + tag;
					$(this).attr("href", newHref)

					$(this).show();

				})

				i--;
				var appsHeight = ((i - i%3)/3 + 1)*254 + "px";
				$(".apps").css("height", appsHeight);
				i++


				$(".app.hidden").each(function(){
					var currentTags = $(this).attr("data-filter")
					var currentPos = /row[0-9]+_col[0-9]/.exec($(this).attr("class"))[0]
					
					var a = function (element, curPos, newPos, index) {
						setTimeout(function() {
							element.removeClass(curPos)
							element.addClass(newPos);
						}, 500);
						setTimeout(function() {
							element.css("z-index", index)
						}, 1500);
					}($(this), currentPos, pos(i), i)

					i++;
				});
			},









			filterAbsoluteSegmTop: function(tag) {
				$(".apps").removeClass("translateAnimation");
				$(".apps").removeClass("opacityAnimation");
				$(".apps").addClass("absoluteAnimation");

				var i=0;
				var k=0;
				pos = function(i) {
					var row = (i - i%3)/3 + 1;
					var col = i%3 + 1;

					return "row" + row + "_col" + col
				}

				$(".app").each(function(){
					$(this).removeClass("halfHidden");
					$(this).show;

					var currentTags = $(this).attr("data-filter")
					var currentPos = /row[0-9]+_col[0-9]/.exec($(this).attr("class"))[0]



					if (currentTags.indexOf(tag) + 1) {
						$(this).removeClass("hidden")

						var a = function (element, curPos, newPos, index) {
							setTimeout(function() {
								element.removeClass(curPos)
								element.addClass(newPos);
							}, 500);
							setTimeout(function() {
								element.css("z-index", index)
							}, 1500);
						}($(this), currentPos, pos(i), i)
						
						i++;

					} else {
						$(this).addClass("hidden");
					}

					//change links under each app - add filter
					var sourceHref = $(this).attr("href").split("#")[0]
					var newHref = sourceHref + '#' + tag;
					$(this).attr("href", newHref)

					$(this).show();

				})

				i--;
				var appsHeight = ((i - i%3)/3 + 1)*254 + "px";
				$(".apps").css("height", appsHeight);
				i++


				$(".app.hidden").each(function(){
					var currentTags = $(this).attr("data-filter")
					var currentPos = /row[0-9]+_col[0-9]/.exec($(this).attr("class"))[0]
					
					var a = function (element, curPos, index) {
						setTimeout(function() {
							element.removeClass(curPos)
							element.addClass("row0_col2");
						}, 500);
						setTimeout(function() {
							element.css("z-index", index)
						}, 1500);
					}($(this), currentPos, i)

					i++;
				});
			},








			filterTranslate: function(tag) {
				$(".apps").removeClass("opacityAnimation");
				$(".apps").removeClass("absoluteAnimation");
				$(".apps").addClass("translateAnimation");

				var i=0;
				pos = function(i) {
					var row = (i - i%3)/3 + 1;
					var col = i%3 + 1;

					return "row" + row + "_col" + col
				}

				$(".app").each(function(){
					$(this).removeClass("halfHidden");
					$(this).show;

					var currentTags = $(this).attr("data-filter")
					var currentPos = /row[0-9]+_col[0-9]/.exec($(this).attr("class"))[0]


					if (currentTags.indexOf(tag) + 1) {
						$(this).removeClass("hidden")
						$(this).removeClass(currentPos)
						$(this).addClass(pos(i));
						i++;

					} else {
						$(this).addClass("hidden");
					}


					//change links under each app - add filter
					var sourceHref = $(this).attr("href").split("#")[0]
					var newHref = sourceHref + '#' + tag;
					$(this).attr("href", newHref)

					$(this).show();
				})

				i--;
				var appsHeight = ((i - i%3)/3 + 1)*254 + "px";
				$(".apps").css("height", appsHeight);
			},






			filterTranslateBottom: function(tag) {
				$(".apps").removeClass("opacityAnimation");
				$(".apps").removeClass("absoluteAnimation");
				$(".apps").addClass("translateAnimation");

				var i=0;
				pos = function(i) {
					var row = (i - i%3)/3 + 1;
					var col = i%3 + 1;

					return "row" + row + "_col" + col
				}

				$(".app").each(function(){
					$(this).removeClass("halfHidden");
					$(this).show;

					var currentTags = $(this).attr("data-filter")
					var currentPos = /row[0-9]+_col[0-9]/.exec($(this).attr("class"))[0]


					if (currentTags.indexOf(tag) + 1) {
						$(this).removeClass("hidden")
						$(this).removeClass(currentPos)
						$(this).addClass(pos(i));
						i++;

					} else {
						$(this).addClass("hidden");
					}


					//change links under each app - add filter
					var sourceHref = $(this).attr("href").split("#")[0]
					var newHref = sourceHref + '#' + tag;
					$(this).attr("href", newHref)

					$(this).show();
				})

				i--;
				var appsHeight = ((i - i%3)/3 + 1)*254 + "px";
				$(".apps").css("height", appsHeight);
				i++


				$(".app.hidden").each(function(){
					var currentPos = /row[0-9]+_col[0-9]/.exec($(this).attr("class"))[0]
					
					$(this).removeClass(currentPos)
					$(this).addClass(pos(i));
					var a = function (element, index) {
						setTimeout(function() {
							element.css("z-index", index)
						}, 1000);
					}($(this), i)

					i++;
				});
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





jQuery.fn.getHtmlCode = function() { // This method will return given element as html code
	return $( $('<div></div>').html(this.clone()) ).html();
}