
														/*Detecting touch device*/
var touchdevice = 'createTouch' in document; //true or false
	


													/* Проверка на поддержку свойств CSS3 */

domPrefixes = 'Webkit Moz O ms Khtml'.split(' ')
testElem = document.createElement('test')
test_style = testElem.style
function test_props_all( prop ) { 
	var uc_prop = prop.charAt(0).toUpperCase() + prop.substr(1)
	props   = (prop + ' ' + domPrefixes.join(uc_prop + ' ') + uc_prop).split(' ')
	return !!test_props( props );
}
function test_props( props ) {
	for ( var i in props ) {if ( test_style[ props[i] ] !== undefined  ) {return true}}
}
//transitionProperty, backgroundsize, borderimage, boxShadow, animationName, columnCount, boxReflect
cssboxshadow = test_props_all( 'boxShadow' )

domPrefixes,testElem,test_style = null
//alert(cssboxshadow)	
	
	
	
	
													/*Устранение недостатков в ИЕ*/

if(jQuery.browser.msie){
(function($){
	
	/*Отмена обведения*/
	function rf(){return false}
	var selectors = $('.select-no, .prev, .next').get()
	var i = selectors.length
	while(i--){
		selectors[i].attachEvent( "onselectstart", rf);
	}
	
	/*Исправление двойных классов в ИЕ6*/
	if(jQuery.browser.version.slice(0,1)<=6){
		$('#process_image a:first-child').addClass($('#process_image a:first-child').attr('class')+'-active')
		$('#process_image a').mousedown(function(){ 
			$('#process_image a').removeClass('idea-active analysis-active development-active testing-active publishing-active')
			$(this).addClass($(this).attr('class')+'-active')		
		})
	}
}(jQuery))
}
	
	
	
	
								/*Устранение недостатков в браузерах, не поддерживающих box-shadow, но не ИЕ*/
if(cssboxshadow==false && -[1,]){
	jQuery('h1, h2').addClass('legacy')
}



													/*Скроллеры и табы*/

if(document.getElementById('scrollable') || document.getElementById('process_image')){
(function($){
	$("#scroller").scrollable({ 
		circular: false, 
		mousewheel: false,
		speed: 500,
		next: '.next',
		prev: '.prev'
	})
	
	var Scrollapi = $("#scroller").data("scrollable");
	$("#scroller").mousewheel(function(event, delta) {
		if(delta>0 && $("#scroller .items").is(":animated")!=true) Scrollapi.prev()
		if(delta<0 && $("#scroller .items").is(":animated")!=true) Scrollapi.next()
		return false
	})
	
	$('#scrollable > a').click(function(){return false})
	
	$(".tabs").tabs(".panes > div", {tabs: 'a', history: true, current:'active', event: 'mousedown',  effect: "fade" ,fadeInSpeed: 800, fadeOutSpeed:0})
	
	var i = $('#scroller .items a').index($('#scroller .items a.active').get(0));
	Scrollapi.seekTo(Math.floor(i/$('#scroller .items div:first-child').children('a').length),0);
	
	//$('.tabs a').click(function(){return false})
}(jQuery))
}



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
			//var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3; /*простая формула*/
			var avg = imgPixels.data[i]*0.299 + imgPixels.data[i + 1]*0.587 + imgPixels.data[i + 2]*0.114; /*формула телевидения*/
			imgPixels.data[i] = avg; 
			imgPixels.data[i + 1] = avg; 
			imgPixels.data[i + 2] = avg;
		}
	}
	
	ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
	
	var data = canvas.toDataURL('image/png')
	
	//для Anndroid, который не поддерживает toDataURL()
	if(data.indexOf('data:image/png')==-1) return imgObj.src
	
	return data;
}


/*Gray Images*/
if(document.getElementById('scrollable')){
(function($){
	var i=0,
		img = new Array(),
		elem = document.getElementById('scroller').getElementsByTagName('div')[0].getElementsByTagName('a'),
		imagesrc,
		len=elem.length;
	while (i<len){
		if(elem[i].getElementsByTagName('img')[0]){
			/*mozilla natively, use same image*/ if($.browser.mozilla){}
			/*or use canvas*/ else if(!!document.createElement('canvas').getContext){	
				img[i] = new Image()
				img[i].src = elem[i].getElementsByTagName('img')[0].src	
				if(img[i].complete) elem[i].getElementsByTagName('img')[0].src = grayscaleImage(img[i])
				else{
					img[i].onload = (function(elem,image){
						return function(event) {	
							elem.getElementsByTagName('img')[0].src = grayscaleImage(image)
						}
					})(elem[i],img[i])
				}
			}
			/*or use images*/else{
				var imagesrc = elem[i].getElementsByTagName('img')[0].src
				elem[i].getElementsByTagName('img')[0].src = imagesrc.slice(0,imagesrc.lastIndexOf('.'))+'-gray'+imagesrc.slice(imagesrc.lastIndexOf('.'))
			}
		}
		else if( elem[i].getElementsByTagName('span')[0]){
			/*mozilla natively, use same image*/ if($.browser.mozilla){}
			/*or use canvas*/ else if(!!document.createElement('canvas').getContext){	
				img[i] = new Image()
				imagesrc = elem[i].getElementsByTagName('span')[0].style.backgroundImage
				img[i].src = imagesrc.slice(imagesrc.indexOf('http'),imagesrc.lastIndexOf('"'))
				if(img[i].complete) elem[i].getElementsByTagName('span')[0].style.backgroundImage = 'url('+grayscaleImage(img[i])+')'
				else{
					img[i].onload = (function(elem,image){
						return function(event) {	
							elem.getElementsByTagName('span')[0].style.backgroundImage = 'url('+grayscaleImage(image)+')'
						}
					})(elem[i],img[i])
				}
			}
			/*or use images*/else{
				imagesrc = elem[i].getElementsByTagName('span')[0].style.backgroundImage
				elem[i].getElementsByTagName('span')[0].style.backgroundImage = imagesrc.slice(0,imagesrc.lastIndexOf('.'))+'-gray'+imagesrc.slice(imagesrc.lastIndexOf('.'))
			}
		}
		i++  
	}
}(jQuery))
}





															/* Accordion */

//New effects
jQuery.tools.tabs.addEffect("leader-slide", function(i, done) {
	//this.getPanes().slideUp(200);
	//this.getPanes().eq(i).slideDown(400, done);
	this.getPanes().slideUp(200).parent().animate({'paddingBottom':'0'},200).find('.more').html('read more');
	this.getPanes().eq(i).slideDown(400).parent().animate({'paddingBottom':'20px'},400).find('.more').html('hide');
	done.call();
	
})
													
jQuery("#accordion").tabs("#accordion div.pane", {tabs: 'h5', effect: 'slide', initialIndex: null});

jQuery("#leadership").tabs("#leadership div.description", {tabs: '.more', effect: 'leader-slide', initialIndex: null});

//Click to hide (Accordion fix)
(function($){
	$('#accordion h5').mouseup(function(){
		var api = $("#accordion").data("tabs");
		if(/current|active/.test(this.className)){
			api.getCurrentPane().slideUp(200)
			api.getCurrentTab().removeClass('current').addClass('togled')
		}
		else if(/togled/.test(this.className)){
			api.getCurrentPane().slideDown(400)
			api.getCurrentTab().addClass('current').removeClass('togled')
		}
	})
		
	$('#leadership .leader .more').mouseup(function(){
		var api = $("#leadership").data("tabs");
		if(/current|active/.test(this.className))
			api.getCurrentPane().slideUp(200).parent().animate({'paddingBottom':'0'},200).find('.more').html('read more').removeClass('current').addClass('togled');
		else if(/togled/.test(this.className))
			api.getCurrentPane().slideDown(400).parent().animate({'paddingBottom':'20px'},400).find('.more').html('hide').addClass('current').removeClass('togled');		
	})
}(jQuery))



															/* Оформление формы */

var StyleForm = function(form,elements){
	elements = elements || null
	if(form){
		var input=form.getElementsByTagName('input'),
			textarea=form.getElementsByTagName('textarea'), 
			selectlist=form.getElementsByTagName('select'),
			touchdevice = 'createTouch' in document, //true or false
			cssString,i,len;
		
		function getStyle(el, cssprop){
			
			function style(el, cssprop){
				if(document.defaultView && document.defaultView.getComputedStyle){
					return document.defaultView.getComputedStyle(el,null).getPropertyValue(cssprop)
				}
				else if(el.currentStyle){
					try{
						var re = /\-(\w)/g /*  /(\-([a-z]){1})/g    */
						cssprop = cssprop.replace(re, function (strMatch, p1){	return p1.toUpperCase()	})
						if(cssprop=='float') cssprop='styleFloat'
						return el.currentStyle[cssprop]
					}
					catch(e){
						// Used to prevent an error in IE 5.0
					}
				}
				else return el.style[cssprop] //try and get inline style
			}
			
			function border(el){
				var border_top = style(el,'border-top-width')+' '+style(el,'border-top-style')+' '+style(el,'border-top-color'),
				border_right =style(el,'border-right-width')+' '+style(el,'border-right-style')+' '+style(el,'border-right-color'),
				border_bottom = style(el,'border-bottom-width')+' '+style(el,'border-bottom-style')+' '+style(el,'border-bottom-color'),
				border_left = style(el,'border-left-width')+' '+style(el,'border-left-style')+' '+style(el,'border-left-color');
				if(border_top==border_right && border_bottom==border_left && border_top==border_bottom) return border_top
				return border_top+';border-right:'+border_right+';border-bottom:'+border_bottom+';border-left:'+border_left
			}
				
			function borderRadius(el){
				var border_top_left =  style(el,'border-top-left-radius') || style(el,'-webkit-border-top-left-radius') || style(el,'-moz-border-radius-topleft'),
				border_top_right = style(el,'border-top-right-radius') || style(el,'-webkit-border-top-right-radius') || style(el,'-moz-border-radius-topRight'),
				border_bottom_right = style(el,'border-bottom-right-radius') || style(el,'-webkit-border-bottom-right-radius') || style(el,'-moz-border-radius-bottomRight'),
				border_bottom_left = style(el,'border-bottom-left-radius') || style(el,'-webkit-border-bottom-left-radius') || style(el,'-moz-border-radius-topleft');
				
				return border_top_left+' '+border_top_right+' '+border_bottom_right+' '+border_bottom_left+
				';-webkit-border-top-left-radius:'+border_top_left+
				';-webkit-border-top-right-radius:'+border_top_right+
				';-webkit-border-bottom-right-radius:'+border_bottom_right+
				';-webkit-border-bottom-left-radius:'+border_bottom_left+
				';-moz-border-radius:'+border_top_left+' '+border_top_right+' '+border_bottom_right+' '+border_bottom_left
			 }
				 

			if(cssprop=='border') return border(el)
			if(cssprop=='border-radius') return borderRadius(el)
			return style(el, cssprop)
			
		}
		
		/*Input*/
		if(input && (elements==null || /input/.test(elements)) ) {
			
			function checkElement(el){
				//if checked
				if(el.getElementsByTagName('input')[0].checked){
					el.className+=' checked';
					el.style.backgroundPosition='center bottom'
				}
				//if not checked
				else {
					el.className=el.className.replace(/ checked|checked/,'')
					el.style.backgroundPosition='center top'
				}
			}
			
			i=input.length; while(i--){
			var inputSpan;
			
			/*Checkbox and Radio*/
			if((input[i].type=='checkbox' && (/type="checkbox"|input |input,/.test(elements) || elements==null)) || ( input[i].type=='radio' && (/type="radio"|input |input,/.test(elements) || elements==null)) ){
				inputSpan = document.createElement('span')
				if(input[i].type=='checkbox') inputSpan.className = 'checkbox'
				else if(input[i].type=='radio')  inputSpan.className = 'radio'
				/*стиль контейнера*/
				cssString = 
				'width:'+input[i].offsetWidth+'px;\
				 height:'+input[i].offsetHeight+'px;\
				 margin-top:'+getStyle(input[i],'margin-top')+';\
				 margin-right:'+getStyle(input[i],'margin-right')+';\
				 margin-bottom:'+getStyle(input[i],'margin-bottom')+';\
				 margin-left:'+getStyle(input[i],'margin-left')+';\
				 border:'+getStyle(input[i],'border')+';\
				 display:'+(function(){return (getStyle(input[i],'display')=='block' ? 'block' : 'inline-block')}())+';\
				 background-color:'+getStyle(input[i],'background-color')+';\
				 background-image:'+getStyle(input[i],'background-image')+';\
				 vertical-align: baseline; background-repeat:no-repeat; background-position:center top; zoom:1;\
				'
				inputSpan.style.cssText = cssString
				inputSpan.setAttribute('style',cssString)
				
				//alert(getStyle(input[i],'border'))
				
				input[i].parentNode.insertBefore(inputSpan,input[i])
				inputSpan.appendChild(input[i])
				cssString='height:0; overflow:hidden; visibility:hidden; position:absolute; left:0; top:0;'
				input[i].style.cssText = cssString
				input[i].setAttribute('style',cssString)
				checkElement(inputSpan)
				
				/*События*/
				input[i].onclick=function(e){e = e || window.event;e.stopPropagation ? e.stopPropagation() : (e.cancelBubble=true)}	
				
				inputSpan.onclick = (function(span,input){ return function(e){
					input.click()
					if(input.type=='checkbox') checkElement(span)
					else if(input.type=='radio'){
						var radio = document.getElementsByName(input.name)
						var i=radio.length;while(i--){
							checkElement(radio[i].parentNode)
						}
					}
				} })(inputSpan,input[i])
				
				//inputSpan.getElementsByTagName('input')[0].onchange=(function(span){ alert('changed');return function(e){checkElement(span)} })(inputSpan)

			}
			
			
			/*File*/
			else if(input[i].type=='file' && (/type="file"|input |input,/.test(elements) || elements==null) ){
				inputSpan = document.createElement('span')
				inputSpan.className = 'file'
				/*стиль контейнера*/
				cssString = 
				'width:'+input[i].offsetWidth+'px;\
				 height:'+input[i].offsetHeight+'px;\
				 line-height:'+input[i].offsetHeight+'px;\
				 margin-top:'+getStyle(input[i],'margin-top')+';\
				 margin-right:'+getStyle(input[i],'margin-right')+';\
				 margin-bottom:'+getStyle(input[i],'margin-bottom')+';\
				 margin-left:'+getStyle(input[i],'margin-left')+';\
				 color:'+getStyle(input[i],'color')+';\
				 font-size:'+getStyle(input[i],'font-size')+';\
				 display:'+(function(){return (getStyle(input[i],'display')=='block' ? 'block' : 'inline-block')}())+';\
				 zoom:1;\
				'
				inputSpan.style.cssText = cssString
				inputSpan.setAttribute('style',cssString)
				
				inputSpan.innerHTML = '\
				<div style="position:relative; height:100%; overflow:hidden; display:inline-block; *display:inline; zoom:1; vertical-align:middle; ">\
					<button type="button" style="position: relative; line-height:normal; vertical-align: baseline; *vertical-align: top; display:inline; margin-right:7px; font-size:14px;">Select file</button>\
				</div>\
				<span style="line-height:normal; vertical-align:middle;">File not selected</span>'
				input[i].parentNode.insertBefore(inputSpan,input[i])
				inputSpan.getElementsByTagName('div')[0].appendChild(input[i])
					
				cssString = 'width:auto; height:100px; cursor:'+getStyle(inputSpan.getElementsByTagName('button')[0],'cursor')+'; position:absolute; font-size:100px; top:-20px; right:-20px; -moz-opacity: 0; -khtml-opacity: 0; opacity:0; filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0); filter: alpha(opacity=0); zoom: 1;'
				//cssString = 'height:100px; cursor:pointer; position:absolute; font-size:1; top:0; right:7px; filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);'
				input[i].style.cssText = cssString
				input[i].setAttribute('style',cssString)

				if(input[i].value) inputSpan.getElementsByTagName('span')[0].innerHTML = input[i].value
				input[i].onchange = (function(input,inputSpan){ return function(e){
					inputSpan.getElementsByTagName('span')[0].innerHTML = input.value
				} })(input[i],inputSpan)				
			}
			
			else{ // text|password|search|email|number
				
			}
		}}
		
		/*Select*/
		if(selectlist && (elements==null || /select/.test(elements)) ) {
			var listString = '', n, selectSpan,option;
			
			function hideLists(){
				var list=document.getElementsByTagName('select'), i=list.length;
				while(i--){ list[i].parentNode.getElementsByTagName('ul')[0].style.height=0 }
			}
		
			i=selectlist.length; while(i--){
				option = selectlist[i].options;
				
				selectSpan = document.createElement('span')
				selectSpan.className = 'select pie'
				/*стиль контейнера*/
				cssString = 
				'padding-left:'+getStyle(selectlist[i],'padding-left')+';\
				 padding-right:'+getStyle(selectlist[i],'padding-right')+';\
				 width:'+(selectlist[i].offsetWidth-parseInt(getStyle(selectlist[i],'padding-left'),10)-parseInt(getStyle(selectlist[i],'padding-right'),10))+'px;\
				 height:'+selectlist[i].offsetHeight+'px;\
				 line-height:'+selectlist[i].offsetHeight+'px;\
				 margin-top:'+getStyle(selectlist[i],'margin-top')+';\
				 margin-right:'+getStyle(selectlist[i],'margin-right')+';\
				 margin-bottom:'+getStyle(selectlist[i],'margin-bottom')+';\
				 margin-left:'+getStyle(selectlist[i],'margin-left')+';\
				 color:'+getStyle(selectlist[i],'color')+';\
				 font-size:'+getStyle(selectlist[i],'font-size')+';\
				 display:'+(function(){return (getStyle(selectlist[i],'display')=='block' ? 'block' : 'inline-block')}())+';\
				 background-color:'+getStyle(selectlist[i],'background-color')+';\
				 background-image:'+getStyle(selectlist[i],'background-image')+';\
				 background-position:'+getStyle(selectlist[i],'background-position')+';\
				 background-repeat:'+getStyle(selectlist[i],'background-repeat')+';\
				 box-shadow:'+getStyle(selectlist[i],'box-shadow')+';\
				 border:'+getStyle(selectlist[i],'border')+';\
				 border-radius:'+getStyle(selectlist[i],'border-radius')+';\
				 *z-index:'+(100-i)+';\
				 clear:both;\
				 position:relative; zoom:1;  \
				'//-moz-user-select: none; -webkit-user-select: none; user-select: none;
				selectSpan.style.cssText = cssString
				selectSpan.setAttribute('style',cssString)
				
				//alert(getStyle(selectlist[i],'border'))
				
				/*стиль пунктов списка*/
				cssString = 'padding:0; margin:0; background-image:none; padding-left:'+selectSpan.style.paddingLeft+'; padding-right:'+selectSpan.style.paddingRight+';'
				len=option.length; n=0; listString=''; while(n<len){ listString+='<li style="'+cssString+'">'+option[n].innerHTML+'</li>';n++ }
				
				selectSpan.innerHTML = '<span class="value">'+option[selectlist[i].selectedIndex].innerHTML+'</span>\
				<div class="bgIcon after" style="position:absolute; right:0; top:0; background-repeat:no-repeat; background-position: center center; height:100%; width:'+selectlist[i].offsetHeight+'px;"></div>\
				<ul style="position:absolute; z-index:'+(200-i)+'; margin:0; list-style: none; overflow:auto; top:100%; left:0; right:0; background-color: '+selectSpan.style.backgroundColor+'; max-height:400px; height:0;">'+listString+'</ul>'
				selectlist[i].parentNode.insertBefore(selectSpan,selectlist[i])
				selectSpan.appendChild(selectlist[i])	
				cssString='height:0; overflow:hidden; visibility:hidden; position:absolute; left:0; top:0;'
				selectlist[i].style.cssText = cssString
				selectlist[i].setAttribute('style',cssString)		
				
				
				/*События*/
				selectSpan.onclick = (function(list){ return function(e){	
					if(parseInt(list.style.height,10)==0) {hideLists(); list.style.height='auto'}
					else hideLists()
					e = e || window.event
					e.stopPropagation ? e.stopPropagation() : (e.cancelBubble=true)
				} })(selectSpan.getElementsByTagName('ul')[0])	
				
				n=option.length;while(n--){ 
					selectSpan.getElementsByTagName('li')[n].onclick=(function(selct,index){ return function(e){
						selct.getElementsByTagName('span')[0].innerHTML=this.innerHTML
						//selct.getElementsByTagName('select')[0].selectedIndex = index
						selct.getElementsByTagName('select')[0].value = option[index].value
						//selct.getElementsByTagName('select')[0].options[index].setAttribute('selected','selected')
						var i=selct.getElementsByTagName('li').length; while(i--){selct.getElementsByTagName('li')[i].className=''}
						selct.getElementsByTagName('li')[index].className='selected'
					} })(selectSpan,n)	
					
					//Наведение на пункты списка. Используется псевдо селектор :hover (#ID_OF_FORM .select li:hover)
					//selectSpan.getElementsByTagName('li')[n].onmouseover=function(){this.className+=' hover'}
					//selectSpan.getElementsByTagName('li')[n].onmouseout=function(){this.className=this.className.replace(/ hover|hover/,'')}
				}
				
				try{document.body.addEventListener('click', hideLists, false)}
				catch(e){document.body.attachEvent("onclick", hideLists)}
	
			}//end while
		}

		return {}
	}//end if(form)
}
	
StyleForm(document.getElementsByTagName('form')[0],'input[type="file"], select')