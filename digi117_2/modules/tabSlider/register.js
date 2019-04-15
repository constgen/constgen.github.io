Core.register('tabSlider', function (sandbox) {
	return (function (root,$) {
		if (!root || !$) return
		sandbox.load('plugins/jquery.tools.min.js');
        var module = {
			init: function () {
                module.navigationContainer = $(root).find('.navigation')
        		module.background = $(root).find('.bg')
        		module.indicator = module.navigationContainer.find('.indicator')//elemet, that slides to active tab
        		module.SPEED = 700
        		module.INTERVAL = 5000
                module.tabs = $(root).find('.tabs')
                
				//New effect
                
                $.tools.tabs.addEffect("slider", function (i, done) {
                	var pane = this.getCurrentPane(),
						panes = this.getPanes(),
                		nextpane = panes.eq(i),
						tabs = this.getTabs(),
                		nexttab = tabs.eq(i),
						indicator = tabs.parent().find('.indicator'), //elemet, that slides to active tab
						speed = this.getConf().speed;

                	if (!pane.length) return
                    
                    if (sandbox.hasFeature('css-transition')) {
                		pane.parent().css({ left: -i * (pane.outerWidth(true)) })
                	}
                	else {
                    	pane.parent().animate({ left: -i * (pane.outerWidth(true)) }, speed)
                	}
                    
                	//move indicator to position of current tab from left of parent
                	if (sandbox.hasFeature('css-transition')) {
                		indicator.css({ left: nexttab.offset().left - nexttab.parent().offset().left })
                	}
                	else {
                		indicator.animate({ left: nexttab.offset().left - nexttab.parent().offset().left }, speed)
                	}
                    
                    
                    
                	done.call();
                });
                
                module.tabs.tabs(".panes > div", {
                    tabs: 'a',
                    history: true,
                    current:'active',
                    event: 'click',
                    effect: 'slider',
                    rotate: true,
                    speed: module.SPEED
                }).slideshow({
                    autoplay: true,
                    interval: module.INTERVAL,
                    autopause: true,
                    clickable: false
                })

                var slideShowApi =  module.tabs.data('slideshow');
                
                
               module.tabs.find('a').click(function(){
                    slideShowApi.stop();
                    
                    return false
                })
                
                var tabApi =  module.tabs.data('tabs');
                
                sandbox.Event.add(root, 'slideright', function(e){
                    tabApi.prev();
                    slideShowApi.stop();
                    
                })
                sandbox.Event.add(root, 'slideleft', function(e){
                    tabApi.next();
                    slideShowApi.stop();
                    
                })
			}
		}
		return module
	}(document.querySelector('.tabSlider'),window.jQuery)) //Node element
})
