													

/* Check SVG support (from Modernizr) */
var SVGImage = (function(){
    return (!!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);
}());
if (!SVGImage) {
    jQuery('img[src$=".svg"]').each(function(){
        this.src = this.src.replace('.svg', '')
    })
}


/* Check input[type="range"] support (from Modernizr) */
var inputTypeRange = (function(){
    inputElem = document.createElement('input')
    inputElem.setAttribute('type', 'range')
    if (inputElem.type == 'range') return true
    else return false
}());

(function(){
    var input = !!document.querySelector ? document.querySelectorAll('input[type="range"]') : []
    if(inputTypeRange && (document.getElementById('pricing') || document.getElementById('services')) && input.length) {
        var i=0, el, value;
        while (el = input[i++]) {
            value = el.parentNode.getElementsByTagName('output')[0]
            el.style.width = '47px'
            el.className+= ' range'
            value.style.display = 'inline-block'
            el.oninput = (function(val){
                return function(){
                    val.innerHTML = this.value
                }
            }(value))
        }
    }	
}());


											
/* Basket - moveing during scroll */
(function($){
    var cart = $('#cart').get(0),
    wrapper = $('#wrapper').get(0)

    function moveCart(){
        var top = document.body.scrollTop || document.documentElement.scrollTop || $(window).scrollTop()
        if (top>=233) {
            cart.className = 'fixed'
            cart.style.left = wrapper.offsetLeft+'px'
        } else {
            cart.className = ''
            cart.style.left = ''
        }
    }
	
    $(window).bind('scroll resize', moveCart)
}(jQuery));



/* BASKET - Table */
(function($){
    /*Delete from Basket*/
    if (!$('.basketform').length) return

    $('.basketform .remove').click(function(){
        var itemNumber = $(this).parent().parent().find('.remove').index($(this)),
        serviceItem = this

        jQuery.ajax({
            url: window.location.protocol+'//'+window.location.host+'/ajaxbasketdel?deleteItem='+serviceItem.getAttribute('data-deleteID')+'&orderItem='+serviceItem.parentNode.parentNode.parentNode.getAttribute('data-serviceID'),
            dataType: 'json',
            success: function(data){
                if (data.error) return
                updateTotalPrice(data, serviceItem)
                updateBasket(data)
                deleteFromBasket(serviceItem, itemNumber)
            }
        });
		
        return false
    });
	
    function updateTotalPrice(data, el){
        if (el) $(el).parent().parent().parent().find('td:last-child output').html(data.total)
        $('#total').html(data.setupPrice)
    }
	
    function deleteFromBasket(el, itemNumber){
        var tr = $(el).parent().parent().parent(),
        td = tr.children('td')

        td.eq(0).children('span').eq(itemNumber).remove()
        td.eq(1).children('span').eq(itemNumber).remove()
        td.eq(2).children('span').eq(itemNumber).remove()
		
        td.children('span:first-child').removeClass('additional')

        if (!td.children('span').length) {
            tr.remove()
            if (!-[1,]) {
                $('table tbody tr').removeClass('even')
                $('table tbody tr:odd').addClass('even')
            }
        }
    }
	
    /*Check Promocode*/
    var refreshicon = $('table .refresh').eq(0),
    promocode = document.getElementById('promocode'),
    discount = document.getElementById('discount').getElementsByTagName('output')[0];
	
    promocode.onvalid = function(e){
        refreshicon.addClass('processing')
        jQuery.ajax({
            url: window.location.protocol+'//'+window.location.host+'/ajaxbasketpromo?promoCode='+this.value,
            dataType: 'json',
            success: function(data){
                refreshDiscount(data)
            }
        });
    }
	
    var PromocodeLength = promocode.value.length //to prevent multiple AJAX send, caused by multiple events
    $(promocode).bind('cut paste input keyup', function(e){
        var ths = this
        setTimeout(function() {
            if (ths.value.length==16 && PromocodeLength == 0) promocode.onvalid()
            else if (ths.value.length==0 && PromocodeLength == 16) promocode.onvalid()
            PromocodeLength = ths.value.length//used to prevent multiple AJAX send
        } ,10)
    })
	
    function refreshDiscount(data){
        if (data.error) { 
            discount.innerHTML = data.error
            discount.parentNode.style.display = 'inline'
        } else {
            updateTotalPrice(data)
            discount.innerHTML = data.discount+'%'
            discount.parentNode.style.display = (data.discount)? 'inline' : 'none'
        }
        refreshicon.removeClass('processing')
    }

}(jQuery));





/* BASKET - Add to Basket */

function addToBasket(){
    var parentBlock = jQuery(this).parent(),
    id = parentBlock.get(0).getAttribute('data-serviceID')
	
    if (id == 'goto_option') {
        parentBlock = jQuery('.option').eq(0).parent()
        id = parentBlock.get(0).getAttribute('data-serviceID')
    }
	
    //153:inputValue:selectValue
    if(id == 153) {
        id += ':' + parentBlock.find('.option input').get(0).value +':'+ parentBlock.find('.option select').get(0).value
    }
    //436:selectValue:inputValue
    else if(id == 436) {
        id += ':' + parentBlock.find('.option select').get(0).value +':'+ parentBlock.find('.option input').get(0).value
    }
    else if (id == null) return false
	
    jQuery.ajax({
        url: window.location.protocol+'//'+window.location.host+'/ajaxbasket?addItem='+id,
        dataType: 'json',
        success: function(data){
            if (data.error) return
            updateBasket(data)
        }
    });

    return false
}

function updateBasket(data){
    var cart = document.getElementById('cart')
    jQuery(cart).addClass('highlight')
    if (data.setupPrice) cart.getElementsByTagName('div')[0].getElementsByTagName('span')[0].innerHTML = data.setupPrice
    if (data.itemNumber) cart.getElementsByTagName('div')[1].getElementsByTagName('span')[0].innerHTML = data.itemNumber
    setTimeout(function(){
        jQuery(cart).removeClass('highlight')
    }, 1000)
}

jQuery('#pricing .button, #services .button').click(addToBasket);





/* PRICING show-hide blocks */

(function($){
    var service = $('#pricing .service')
	
    service.find('.name').click(toggleService)
	
    function toggleService(){
        var block = $(this).parent()
        if (block.height() <= 70) {
            closeServices()//close opened service
            block.animate({
                height:(block.children('.shortdescription').eq(0).outerHeight(true)+64)
            },300)
            block.addClass('active')
        } else {
            block.animate({
                height:64
            },300)
            block.removeClass('active')
        }
    }
	
    function closeServices(){
        service.each(function(){
            if ($(this).hasClass('active')) {
                $(this).animate({
                    height:64
                },300)
                $(this).removeClass('active')
            }
        })
    }
}(jQuery));




/* Option service widjet price recount */
(function($){
    var optionForm = $('form.option')
    if (!optionForm.length) return
	
    var fields = optionForm.find('input, select')
    fields.bind('change keyup', recountPrice)
    fields.trigger('change')
	
    function recountPrice(e){
        var output = ($('#services').length) ? $('.price output') : $(this).parent().parent().find('.price output'),
        currentPrice = 8.5,
        appPrice = 		parseFloat(($(this).parent().find('[name="appPrice"]').eq(0).val()||''		).replace(/,/g, '.')),
        numberReviews = parseFloat(($(this).parent().find('[name="numberReviews"]').eq(0).val()||''	).replace(/,/g, '.')),
        country = ($(this).parent().find('[name="country"]').eq(0).val()||'')

        if (!isNaN(appPrice))
            output.html( toMoney(Math.round(100 * (appPrice + currentPrice) * parseInt(numberReviews,10))/100) )
        else if (country) {
            currentPrice = 0
            var rest = numberReviews % 10,
            price = 0;
				
            if(country == 'USA' || country == 'Canada' || country == 'UK' || country == 'Australia') {
                price = 9.8;
                if (numberReviews >=10) {
                    currentPrice += Math.round(100*(10*price))/100;
                    price = 9;
                }
                if (numberReviews >=20) {
                    currentPrice += Math.round(100*(10*price))/100;
                    price = 8;
                }
                if (numberReviews >=30) {
                    currentPrice += Math.round(100*(10*price))/100;
                    price = 7.5;
                }
                if (numberReviews >=40) {
                    currentPrice += Math.round(100*(10*price))/100;
                    price = 7.5;
                }
                if (numberReviews >=50) {
                    currentPrice += Math.round(100*(10*price))/100;
                }
            } else {
                price = 15;
                if (numberReviews >=10) {
                    currentPrice += Math.round(100*(10*price))/100;
                    price = 13;
                }
                if (numberReviews >=20) {
                    currentPrice += Math.round(100*(10*price))/100;
                    price = 12;
                }
                if (numberReviews >=30) {
                    currentPrice += Math.round(100*(10*price))/100;
                    price = 10.5;
                }
                if (numberReviews >=40) {
                    currentPrice += Math.round(100*(10*price))/100;
                    price = 10.5;
                }
                if (numberReviews >=50) {
                    currentPrice += Math.round(100*(10*price))/100;
                }
            }

            output.html( toMoney(currentPrice + Math.round(100*(rest*price))/100) )

        }
    }
	
	
}(jQuery));








/* Toggle-block */

(function($){
    var togglebutton = $('.toggleblock .top, .toggleblock .bottom')
	
    $('#order .toggleblock .top, #order .toggleblock .bottom').click(closeOpenedBlocksInOrder)
    togglebutton.click(toggleBlock)
	
    function toggleBlock(){
        var content = $(this).parent().children('.middle')
        if (content.height() == 0) {
            content.animate({
                height:content.children().eq(0).outerHeight(true)
            },400)
            $(this).parent().addClass('opened')
        } else {
            content.animate({
                height:0
            },400)
            $(this).parent().removeClass('opened')
        }
    }
	
    function closeOpenedBlocksInOrder() {
        var content = $('#order .toggleblock.opened .middle')
        content.animate({
            height:0
        },400)
        content.parent().removeClass('opened')
    }
	
}(jQuery));


(function($){ //checkbox "Send me an invoice"
 
    $('#order #payment input[type="checkbox"][name="sendInvoice"]').change(function(){
        if ($(this).is(':checked')) {
            $('#order #payment .invoice').show();
            $('#order #payment .invoice input').each(function(index) {
                $(this).attr('required', 'required');
            });
            $('#order #payment .invoice input[name="invoice"]').val("1");
        } else {
            $('#order #payment .invoice').hide();
            $('#order #payment .invoice input').each(function(index) {
                $(this).removeAttr('required');
            });
            $('#order #payment .invoice input[name="invoice"]').val("0");
        }
    });
 
}(jQuery));

/* CLIENTS slide-show */
if(document.getElementById('scrollable')){
    (function($){
        $("#scroller").scrollable({ 
            circular: false, 
            mousewheel: false,
            speed: 500,
            next: '.next',
            prev: '.prev'
        })
	
        var Scrollapi = $("#scroller").data("scrollable");

        //var i = $('#scroller .items a').index($('#scroller .items a.active').get(0));
	
        //if few clients, hide arrows, else use mousewheel to scroll icons
        if ($('#scroller .items > div').length <=1) 
            $('#scrollable .prev, #scrollable .next').addClass('disabled')
        else {
            $("#scroller").mousewheel(function(event, delta) {
                if(delta>0 && $("#scroller .items").is(":animated")!=true) Scrollapi.prev()
                if(delta<0 && $("#scroller .items").is(":animated")!=true) Scrollapi.next()
                return false
            })
        }
	
        $('#scrollable > a').click(function(){
            return false
        })
	
        $(".tabs").tabs(".panes > div", {
            tabs: 'a',
            history: true,
            current:'active',
            event: ($('#clients').hasClass('short')) ? 'click' : 'mouseup',
            effect: "fade" ,
            fadeInSpeed: 800,
            fadeOutSpeed:0
        })
	

	
    }(jQuery));
}




/* ORDER Submit form */

(function($, ValidForm){
    if (!ValidForm) return
	
    var submitbutton = $('#ordersubmit')
    if (!submitbutton.length) return
	
    submitbutton.click(Submit)
	
    ValidForm.onsubmit = function(form){
        form.submit()
    }
	
    function Submit(){
        var form = $('#order .formBlock.opened form').get(0) || $('#order .formBlock form').get(0);

        if (!!form.checkValidation) form.checkValidation()//it trigers or not ValidForm.onsubmit()
        else form.submit()
		
        return false
    }
	
}(jQuery, window.ValidForm));




/*Form validation*/

(function($, ValidForm){
    if (!ValidForm) return
	
    //Dinamicly add circles after fields
    var field = $('tfoot input, #order input[required=""], #order select[required=""], #contactform input[required=""], #contactform textarea[required=""]')
    field.each(function(){
        $('<span class="validationicon"></span>').insertAfter($(this))
    })
	
    field.bind('change blur', function(){
        if ($(this).is('.invalid') != true)
            $(this).next('.validationicon').removeClass('invalidicon').addClass('validicon')
    })
	
    //Settings for validation
    ValidForm.oninvalid = function(){
        $('input, textarea, select').each(function(){
            if ($(this).is('.invalid') == true)
                $(this).next('.validationicon').removeClass('validicon').addClass('invalidicon')
        })
    }
	
    ValidForm.errors.min.value = 'Minimum is '
    ValidForm.errors.max.value = 'Maximum is '
	
    var showValidationMessage = (function($){
        return $.Message.show
    }(ValidForm))
    var hideValidationMessage = (function($){
        return $.Message.hide
    }(ValidForm))
	
    ValidForm.Message.show = function(form, el){
		
        showValidationMessage(form, el)
		
        $('input, textarea, select').each(function(){
            if ($(this).is('.invalid') == true)
                $(this).next('.validationicon').removeClass('validicon').addClass('invalidicon')
            else if ($(this).is('.invalid') != true)
                $(this).next('.validationicon.invalidicon').removeClass('invalidicon').addClass('validicon')
        })
		
        if (!el.invalidMessage) $(el).next('.validationicon').removeClass('invalidicon').addClass('validicon')
    }
	
    ValidForm.Message.hide = function(form){
		
        hideValidationMessage(form)
		
        $('input, textarea, select').each(function(){
            if ($(this).is('.invalid') != true)
                $(this).next('.validationicon.invalidicon').removeClass('invalidicon').addClass('validicon')
        })	
    }

	
}(jQuery, window.ValidForm));






/*Number money format*/
														
function toMoney(n, c, d, t){ //456789.00 to 456,789.00
    c = c || '.'
    d = d || '.'
    t = t || ','
    var m = (c = Math.abs(c) + 1 ? c : 2, d = d || ",", t = t || ".", 
        /(\d+)(?:(\.\d+)|)/.exec(n + "")), x = m[1].length > 3 ? m[1].length % 3 : 0; 
    return (x ? m[1].substr(0, x) + t : "") + m[1].substr(x).replace(/(\d{3})(?=\d)/g, 
        "$1" + t) + (c ? d + (+m[2] || 0).toFixed(c).substr(2) : ""); 
}







/*Устранение недостатков в ИЕ*/
												
if (!-[1,]){
    (function($){
        /*Tables*/
        $('table tbody tr:odd').addClass('even')
        $('table tr td:last-child').addClass('last-child')
	
        /*Pricing list*/
        $('#pricing .service:odd, #servicelist .service:odd').addClass('even')
	
        /*Our Team*/
        $('#ourteam .member:nth-child(2n+1)').addClass('odd')
	
        /*button :active bug*/
        if (parseInt($.browser.version)==7) {
            $('button, .button').bind('mousedown', function(){
                this.className+=' pushed'
            })
            $('button, .button').bind('mouseup mouseleave', function(){
                this.className = this.className.replace(/\spushed/g,'')
                this.blur()
            })
        }
    }(jQuery));	
}




/*Our Team*/

;
(function($){
    var Height = $('#ourteam').height()
    $('#ourteam .member').each(function(){
        if (this.offsetTop + $(this).find('.description').get(0).offsetHeight > Height)
            $(this).addClass('invert')
    })
	
    /*Careers open/close*/
    $('#career .switch .button:not(.send)').click(function(){
        var article = $(this).parents('article')
        article.addClass('opened').find('.fulldescription').slideDown(400)
        $('html, body').animate({
            scrollTop: article.offset().top+2
        }, 1000)
        return false
    })
	
    var descriptiontext = $('.descriptiontext'), delay
    $('#ourteam .member').mouseenter(function(){
        if (descriptiontext.is(":animated")!=true) {
            clearTimeout(delay)
            descriptiontext.fadeOut(100)
        }
    }).mouseleave(function(){
        if (descriptiontext.is(":animated")!=true)
            delay = setTimeout(function(){
                descriptiontext.fadeIn(100)	
            }, 200)
		
    })
}(jQuery))




/*Grayscale images (чёрно-белые картинки)*/
function grayscaleImageIE(imgObj){
    imgObj.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(grayScale=1)';
}

function grayscaleImageFF(imgObj){
    imgObj.style.filter = 'url(../css/filters.svg#gray)';
}

function grayscaleImage(imgObj,w,h)
{
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
	
    var imgW = w || imgObj.width;
    var imgH = h || imgObj.height;
    canvas.width = imgW;
    canvas.height = imgH;

    ctx.drawImage(imgObj, 0, 0);
    var imgPixels = ctx.getImageData(0, 0, imgW, imgH);
	
    for(var y = 0; y < imgPixels.height; y++){
        for(var x = 0; x < imgPixels.width; x++){
            var i = (y * 4) * imgPixels.width + x * 4;
            var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3; /*простая формула*/
            /*var avg = imgPixels.data[i]*0.299 + imgPixels.data[i + 1]*0.587 + imgPixels.data[i + 2]*0.114;*/ /*формула телевидения*/
            imgPixels.data[i] = avg; 
            imgPixels.data[i + 1] = avg; 
            imgPixels.data[i + 2] = avg;
        }
    }
	
    ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
	
    var data = canvas.toDataURL('image/png')
	
    //для Anndroid, который не поддерживает toDataURL()
    if(data.indexOf('data:image/png')==-1) return imgObj.src.slice(0,imgObj.src.lastIndexOf('.'))+'-gray'+imgObj.src.slice(imgObj.src.lastIndexOf('.'))
	
    return data;
}

/*Gray Images*/
if(document.getElementById('ourteam')){
    (function($){
        var i=0,
        img = new Array(),
        div = document.getElementById('ourteam').getElementsByTagName('div'),
        elem,
        imagesrc;
        while (elem = div[i++]){
            if(elem.getElementsByTagName('img')[0]){
                /*mozilla natively, use same image*/ if($.browser.mozilla){}
                /*or use canvas*/ else if(!!document.createElement('canvas').getContext){	
                    img[i] = new Image()
                    img[i].src = elem.getElementsByTagName('img')[0].src	
                    if(img[i].complete) elem.getElementsByTagName('img')[0].src = grayscaleImage(img[i])
                    else{
                        img[i].onload = (function(elem,image){
                            return function(event) {	
                                elem.getElementsByTagName('img')[0].src = grayscaleImage(image)
                            }
                        })(elem,img[i])
                    }
                }
                /*IE natively, use same image*/else{}
            }
        }
    }(jQuery))
}






/*Javascript scrolling*/
(function($){
    function fixEvent(e) {
        // получить объект событие для IE
        e = e || window.event
        // добавить pageX/pageY для IE
        if ( e.pageX == null && e.clientX != null ) {
            var html = document.documentElement
            var body = document.body
            e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
            e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
        }	
        // добавить which для IE
        if (!e.which && e.button) {
            e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) )
        }
        return e
    }
	
    var touchdevice = 'createTouch' in document; //true or false
	
    var Scrolling = {
		
        dragMaster: function(textscroller, coef, topspace){
            var mouseOffset
            var api = this
			
            // получить сдвиг target относительно курсора мыши
            function getMouseOffset(target, e) {
                var docPos	= api.getPosition(target)
                // TouchOffset
                if (e.touches) {
                    var touch = e.touches[0] || e.changedTouches[0] || e.targetTouches[0]
                    return {
                        x:touch.pageX - docPos.x, 
                        y:touch.pageY - docPos.y
                    }
                }
                // or MouseOffset
                return {
                    x:e.pageX - docPos.x, 
                    y:e.pageY - docPos.y
                }
            }
			
	
            function mouseUp(){
                // очистить обработчики, т.к перенос закончен
                removeDocumentEventHandlers()
            }
	
            function mouseMove(e){
                e = fixEvent(e)	
                textscroller.scrollTop = (e.pageY-mouseOffset.y-topspace)*coef
                return false
            }
			
            function touchMove(e){
                e.preventDefault()
                var touch = e.touches[0] || e.changedTouches[0] || e.targetTouches[0]
                textscroller.scrollTop = (touch.pageY-mouseOffset.y-topspace)*coef
            //return false
            }
		
            function mouseDown(e) {
                e = fixEvent(e)
                if (e.which!=1) return	
                // получить сдвиг элемента относительно курсора мыши
                mouseOffset = getMouseOffset(this, e)
                addDocumentEventHandlers()
                return false
            }
			
            function touchDown(e) {
                //if(e.touches.length!=1) return	
                // получить сдвиг элемента относительно курсора мыши
                mouseOffset = getMouseOffset(this, e)
                addDocumentEventHandlers()
                //if (!e.changedTouches) document.ontouchmove = mouseMove
                return false
            }
			
            function addDocumentEventHandlers() {
                document.onmousemove = mouseMove
                document.ontouchmove = touchMove //for touch device
                document.onmouseup = mouseUp
                document.ontouchend = mouseUp //for touch device
                document.ondragstart = document.body.onselectstart = function() {
                    return false
                }
            }
            function removeDocumentEventHandlers() {
                document.onmousemove = document.onmouseup = document.ondragstart = document.body.onselectstart = document.ontouchmove = document.ontouchend = null
            }
			
            //textscroller.ontouchmove = function(e){ return false }	
            //Прокрутка с помощью жестов над текстом
            var touchOffset
            var topOffset
            textscroller.ontouchstart = function(e){ 
                touchOffset = (function(target, e){
                    var touch = e.touches[0] || e.changedTouches[0] || e.targetTouches[0] 
                    return {
                        x:touch.pageX + target.scrollLeft, 
                        y:touch.pageY + target.scrollTop
                    } 
                }(this, e))
                textscroller.ontouchmove = scrollerMove
                return false
            }	
            function scrollerMove(e){
                var touch = e.touches[0] || e.changedTouches[0] || e.targetTouches[0]
                textscroller.scrollTop = touchOffset.y-touch.pageY
                return false
            }
            textscroller.ontouchend = function(){
                textscroller.ontouchmove = textscroller.ontouchend = null
            }
			
            jQuery(textscroller).find('a').each(function(){	
                this.ontouchstart = function () {
                    this.ontouchend = function(){
                        try {
                            this.click()
                        }
                        catch (err) {
                            var e = document.createEvent('MouseEvent')
                            e.initMouseEvent('click', true, true, window, 0, 
                                0, 0, 0, 0, 
                                false, false, false, false, 
                                0, this)
                            this.dispatchEvent(e)
                        }
                    }
							
                }
                this.ontouchmove = function () {
                    this.ontouchend = null
                }
            })
			
            return {
                makeDraggable: function(element){
                    element.onmousedown = mouseDown
                    element.ontouchstart = touchDown //for touch device
                }
            }
		
        },
		
        getPosition: function(e){
            var left = 0
            var top = 0
            while (e.offsetParent){
                left += e.offsetLeft
                top += e.offsetTop
                e	 = e.offsetParent
            }	
            left += e.offsetLeft
            top += e.offsetTop
            return {
                x:left, 
                y:top
            }
        },
	
        init: function(textscroller, scrollbar, dragger){
            var textscroller_height = $(textscroller).height() //высота блока с прокруткой
            var textscroller_innerHeight = $(textscroller).children('div').eq(0).css({
                paddingBottom:1
            }).outerHeight(true) //высота контента в блоке с прокруткой
			
            if(
                /auto|scroll/i.test($(textscroller).css('overflow-y')) && 
                textscroller_height<textscroller_innerHeight
                ){
                scrollbar.style.display = 'block'
            }
            else {
                scrollbar.style.display = 'none';
                dragger.style.top=0
            }
	
            //try catch ,т.к. может быть деление на 0
            try {
                dragger.style.height=(textscroller_height/textscroller_innerHeight*100+'%')
            } 
            catch (e){}
            //коеффициент ускорения проерутки при передвижении скроллбара курсором
            var coef = textscroller_innerHeight/$(scrollbar).height()
            //отступ сверху, необходима для правильной прокрутки
            var topspace = this.getPosition(scrollbar).y
			
			
			
            textscroller.onscroll = moveScroll
            function moveScroll(e){
                dragger.style.top = parseInt(textscroller.scrollTop)/textscroller_innerHeight*100+'%'
            }
			
            this.dragMaster(textscroller, coef, topspace).makeDraggable(dragger) //привязка Drag & Drop к скроллеру
			
            if(textscroller_height==textscroller_innerHeight) {
                scrollbar.style.display = 'none'
                textscroller.ontouchstart = function(){
                    document.body.removeEventListener('touchmove', noScroll, false)
                }
                textscroller.ontouchend = function(){
                    document.body.addEventListener('touchmove', noScroll, false)
                }
                textscroller.style.padding=0; 
                $('#about .wrapper').get(0).style.overflow='visible'
            }
			
            //Прокрутка стрелками вверх/вниз
            $('.arrow-up').mousedown(function(){
                textscroller.scrollTop+=-55
            })
            $('.arrow-down').mousedown(function(){
                textscroller.scrollTop+=55
            })
            if(touchdevice){
                document.getElementsByClassName('arrow-up')[0].ontouchstart = function(){
                    textscroller.scrollTop+=-55;
                    return false
                }
                document.getElementsByClassName('arrow-down')[0].ontouchstart = function(){
                    textscroller.scrollTop+=55;
                    return false
                }
            }
			
            //Prevent page scrolling
            if (!touchdevice) $(textscroller).bind('DOMMouseScroll mousewheel',wheel) 
			
            function wheel(e){
                e.preventDefault()
				
                var delta // Направление скролла: 1 - скролл вверх, -1 - скролл вниз
                if (e.wheelDelta) {
                    delta = e.wheelDelta/120
                //if(window.opera) delta=-delta
                } else if (e.detail)
                    delta = -e.detail/3
                else if (e.deltaY)
                    delta = -1*Math.round(e.deltaY/100)
                e.delta = delta
				
                this.scrollTop = (delta<0)? this.scrollTop+40 : this.scrollTop-40
				
            //$(this).stop(true,true)
            //this.scrollTop = (delta<0)? $(this).animate({scrollTop: (this.scrollTop+40)}, 200) : $(this).animate({scrollTop: (this.scrollTop-40)}, 200);

            }
        }
    };


    var scrollbar = $('.scrollbar').get(0),
    dragger = $('.dragger').get(0),
    textscroller = $('.textscroller').get(0);
    if (scrollbar) Scrolling.init(textscroller, scrollbar, dragger)
	
}(jQuery));
