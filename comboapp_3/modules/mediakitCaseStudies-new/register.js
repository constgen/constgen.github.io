Core.register('mediakitCaseStudies-new', function (sandbox) {
		return (function (root,$) {
		if (!root || !$) return
		sandbox.load('{baseURL}/plugins/jquery.tools.min.js');
        var module = {
			init: function () {
                module.navigationContainer = $(root).find('.navigation')
        		module.background = $(root).find('.bg')
        		module.indicator = module.navigationContainer.find('.indicator')//elemet, that slides to active tab
        		module.SPEED = 700
        		module.INTERVAL = 5000
                module.tabs = $(root).find('.tabs')               
				
				// slide for tabs
				$(root).find('.scroller').scrollable();
				$(root).find('.scrollable > a').click(function(){return false});
				
				$('.scrollable .navigation .preview').click(function(){
                    $('.scrollable .navigation a').removeClass("active");
					$(this).addClass("active");
                })
				
				//New effect               
                $.tools.tabs.addEffect("slider", function (i, done) {
                	var pane = this.getCurrentPane(),
						//panes = this.getPanes(),
                		//nextpane = panes.eq(i),
						tabs = this.getTabs(),
                		nexttab = tabs.eq(i),
						indicator = tabs.parent().find('.indicator'), //elemet, that slides to active tab
						speed = this.getConf().speed;

                	if (!pane.length) return
                    
                    if (sandbox.hasFeature('css-transition')) {
                		pane.parent().css({left: -i * (pane.outerWidth(true))})
                	}
                	else {
                    	pane.parent().animate({left: -i * (pane.outerWidth(true))}, speed)
                	}
                    
                	//move indicator to position of current tab from left of parent
                	if (sandbox.hasFeature('css-transition')) {
                		indicator.css({left: nexttab.offset().left - nexttab.parent().offset().left})
                	}
                	else {
                		indicator.animate({left: nexttab.offset().left - nexttab.parent().offset().left}, speed)
                	}
                	done.call();
                });
				
				// Loading iframe
				function iframeLoad(jsonData) {
					
					jsonData = $.parseJSON(jsonData);
					
					$('.dynamic_content .title_description').html(jsonData.title);
					$('.dynamic_content .link_description a').html(jsonData.linkText);
					$('.dynamic_content .link_description a').attr('href', jsonData.linkHref);
					$('.dynamic_content iframe').attr('src', jsonData.iframeAddress);
				}
				
				iframeLoad($('.scrollable .navigation .preview').attr('data-casestudies'));
				
				$(root).find('.scrollable .navigation .preview').click(function(){					
					iframeLoad($(this).attr('data-casestudies'));
					return false
				});
			}
		}
		return module
	}(document.querySelector('#mediakitCaseStudies'),window.jQuery)) //Node element
})
