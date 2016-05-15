Core.register('departmentMobileProcess', function(sandbox) {
    return (function(root, $) {
        if (!root || !$)
            return
        sandbox.load('{baseUrl}/plugins/jquery.tools.min.js');
        var module = {
            init: function() {
                module.navigationContainer = $(root).find('.navigation')
                module.background = $(root).find('.bg')
                module.indicator = module.navigationContainer.find('.indicator')//elemet, that slides to active tab
                module.SPEED = 700
                module.INTERVAL = 5000
                module.tabs = $(root).find('.tabs')

                // slide for tabs
                $(root).find('.scroller').scrollable();
                $(root).find('.scrollable > a').click(function() {
                    return false
                });

                //New effect

                $.tools.tabs.addEffect("slider", function(i, done) {
                    var pane = this.getCurrentPane(),
                            panes = this.getPanes(),
                            nextpane = panes.eq(i),
                            tabs = this.getTabs(),
                            nexttab = tabs.eq(i),
                            indicator = tabs.parent().find('.indicator'), //elemet, that slides to active tab
                            speed = this.getConf().speed;

                    if (!pane.length)
                        return

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

                module.tabs.tabs(".panes > div", {
                    tabs: 'a',
                    history: true,
                    current: 'active',
                    event: 'click',
                    effect: 'slider',
                    rotate: true,
                    speed: module.SPEED
                }).slideshow({
//                    autoplay: true,
                    interval: module.INTERVAL,
//                    autopause: true,
                    clickable: false
                })

                var slideShowApi = module.tabs.data('slideshow');


                module.tabs.find('a').click(function() {
                    slideShowApi.stop();

                    return false
                })

                var tabApi = module.tabs.data('tabs');

                sandbox.Event.add(root, 'slideright', function(e) {
                    tabApi.prev();
                    slideShowApi.stop();

                })
                sandbox.Event.add(root, 'slideleft', function(e) {
                    tabApi.next();
                    slideShowApi.stop();

                })


//                if (sandbox.get('device').browser == 'firefox' || sandbox.get('device').browser == 'chrome')
//                    return
//                //Canvas method for grayscale images in all browsers beside
//
//                function grayscaleImage(imgObj, w, h) {
//                    var canvas = document.createElement('canvas');
//                    var ctx = canvas.getContext('2d');
//
//                    var imgW = w || imgObj.width;
//                    var imgH = h || imgObj.height;
//                    canvas.width = imgW;
//                    canvas.height = imgH;
//
//                    ctx.drawImage(imgObj, 0, 0);
//                    var imgPixels = ctx.getImageData(0, 0, imgW, imgH);
//
//                    for (var y = 0; y < imgPixels.height; y++) {
//                        for (var x = 0; x < imgPixels.width; x++) {
//                            var i = (y * 4) * imgPixels.width + x * 4;
//                            var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3; /*������� �������*/
//                            /*var avg = imgPixels.data[i]*0.299 + imgPixels.data[i + 1]*0.587 + imgPixels.data[i + 2]*0.114;*/ /*������� �����������*/
//                            imgPixels.data[i] = avg;
//                            imgPixels.data[i + 1] = avg;
//                            imgPixels.data[i + 2] = avg;
//                        }
//                    }
//
//                    ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
//
//                    var data = canvas.toDataURL('image/png')
//
//                    //��� Anndroid, ������� �� ������������ toDataURL()
//                    if (data.indexOf('data:image/png') == -1)
//                        return imgObj.src.slice(0, imgObj.src.lastIndexOf('.')) + '-gray' + imgObj.src.slice(imgObj.src.lastIndexOf('.'))
//
//                    return data;
//                }
//
//                /*Gray Images*/
//                ;
//                (function($) {
//                    var i = 0,
//                            Img = [],
//                            imageElem;
//
//                    module.navigationContainer.find('a').each(function(i) {
//                        if (imageElem = $(this).find('img').get(0)) {
//                            if (!!document.createElement('canvas').getContext) {
//                                Img[i] = new Image()
//                                Img[i].src = imageElem.src
//                                if (Img[i].complete)
//                                    imageElem.src = grayscaleImage(Img[i])
//                                else {
//                                    Img[i].onload = (function(elem, image) {
//                                        return function(event) {
//                                            imageElem.src = grayscaleImage(image)
//                                        }
//                                    })(elem, Img[i])
//                                }
//                            }
//                        }
//                    })
//                }(jQuery))
            }
        }
        return module
    }(document.querySelector('.departmentMobileProcess'), window.jQuery)) //Node element
})