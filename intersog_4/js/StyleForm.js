

															/* Оформление формы */
var StyleForm = function(form,elements){
	elements = elements || null
	if(form){
		var input=form.getElementsByTagName('input'),
			textarea=form.getElementsByTagName('textarea'), 
			selectlist=form.getElementsByTagName('select'),

			Touchdevice = 'createTouch' in document, //true or false
			cssString,i,len;
		
		function getStyle(el, cssprop, pseudo){
			pseudo=pseudo||null
			
			function style(el, cssprop){
				if(document.defaultView && document.defaultView.getComputedStyle){
					if(cssprop=='background-image') return document.defaultView.getComputedStyle(el,pseudo).getPropertyValue(cssprop).replace(/"/g,'\'')
					return document.defaultView.getComputedStyle(el,pseudo).getPropertyValue(cssprop)
				}
				else if(pseudo) return ''
				else if(el.currentStyle){
					try{
						var re = /\-(\w)/g /*  /(\-([a-z]){1})/g    */
						cssprop = cssprop.replace(re, function (strMatch, p1){return p1.toUpperCase()})
						if(cssprop=='float') cssprop='styleFloat'
						var ret = el.currentStyle[cssprop]
						if(cssprop=='backgroundImage') ret=ret.replace(/"/g,'\'')
						if(cssprop=='backgroundPosition') ret||(ret=el.currentStyle.backgroundPositionX+' '+el.currentStyle.backgroundPositionY)||(ret='0 0')
						if(!-[1,]&&/border.+style/i.test(cssprop)&&ret=='none') ret='solid'
						return (ret)? ret : ''
					}
					catch(e){
						// Used to prevent an error in IE 5.0
					}
				}
				else return el.style[cssprop] //try and get inline style
			}
			
			function border(el){
				var b_t = style(el,'border-top-width')+' '+style(el,'border-top-style')+' '+style(el,'border-top-color'),
				b_r =style(el,'border-right-width')+' '+style(el,'border-right-style')+' '+style(el,'border-right-color'),
				b_b = style(el,'border-bottom-width')+' '+style(el,'border-bottom-style')+' '+style(el,'border-bottom-color'),
				b_l = style(el,'border-left-width')+' '+style(el,'border-left-style')+' '+style(el,'border-left-color');
				if(b_t==b_r && b_b==b_l && b_t==b_b) return b_t
				return b_t+';border-right:'+b_r+';border-bottom:'+b_b+';border-left:'+b_l
			}			
			
			function borderRadius(el){
				var b_t_l =  style(el,'border-top-left-radius') || style(el,'-webkit-border-top-left-radius') || style(el,'-moz-border-radius-topleft'),
				b_t_r = style(el,'border-top-right-radius') || style(el,'-webkit-border-top-right-radius') || style(el,'-moz-border-radius-topRight'),
				b_b_r = style(el,'border-bottom-right-radius') || style(el,'-webkit-border-bottom-right-radius') || style(el,'-moz-border-radius-bottomRight'),
				b_b_l = style(el,'border-bottom-left-radius') || style(el,'-webkit-border-bottom-left-radius') || style(el,'-moz-border-radius-topleft');
				if(b_t_l==b_t_r && b_b_r==b_b_l && b_t_l==b_b_r) return b_t_l+'; -webkit-border-radius:'+b_t_l+'; -moz-border-radius:'+b_t_l
				return b_t_l+' '+b_t_r+' '+b_b_r+' '+b_b_l+
				';-webkit-border-top-left-radius:'+b_t_l+
				';-webkit-border-top-right-radius:'+b_t_r+
				';-webkit-border-bottom-right-radius:'+b_b_r+
				';-webkit-border-bottom-left-radius:'+b_b_l+
				';-moz-border-radius:'+b_t_l+' '+b_t_r+' '+b_b_r+' '+b_b_l
			}

			function background(el){
				return style(el,'background-image')+' '+style(el,'background-repeat')+' '+style(el,'background-position')+' '+style(el,'background-color')
			}
			function outline(el){return style(el,'outline')||style(el,'outline-width')+' '+style(el,'outline-style')+' '+style(el,'outline-color')}
			function margin(el){return style(el,'margin')||style(el,'margin-top')+' '+style(el,'margin-right')+' '+style(el,'margin-bottom')+' '+style(el,'margin-left')}
			function padding(el){return style(el,'padding')||style(el,'padding-top')+' '+style(el,'padding-right')+' '+style(el,'padding-bottom')+' '+style(el,'padding-left')}	 
			function font(el){return style(el,'font-style')+' '+style(el,'font-weight')+' '+style(el,'font-variant')+' '+style(el,'font-size')+'/'+style(el,'line-height')+' '+style(el,'font-family')}
			
			switch(cssprop){
				case 'border': return border(el)
				case 'border-radius': return borderRadius(el)
				case 'background': return background(el)
				//case 'background-image': return style(el, cssprop).replace(/"/g,'\'')
				case 'outline': return outline(el)
				case 'margin': return margin(el)
				case 'padding': return padding(el)
				case 'font': return font(el)
				default: return style(el, cssprop)
			}
		}
		
		//get string of multiple styles
		function getStyles(el, cssprops, pseudo){
			var cssString='', style;
			cssprops = cssprops.replace(/(\s|\u00A0)+/g,'')
			cssprops = cssprops.split(',')
			for(var i=0,len=cssprops.length;i<len;i++){
				style = getStyle(el, cssprops[i], pseudo)
				if(style) cssString+=' '+cssprops[i]+':'+style+';'
			}
			return cssString
		}
		
		/*Input*/
		if(input && (elements==null || /input/.test(elements)) ){
			
			function checkElement(el){
				//if checked
				if(el.getElementsByTagName('input')[0].checked){
					el.className+=' checked';
					el.style.backgroundPosition='center bottom'
				}
				//if not checked
				else {
					el.className=el.className.replace(/\schecked|checked/,'')
					el.style.backgroundPosition='center top'
				}
			}
			
			i=input.length; while(i--){
			var inputSpan;
			
			/*Checkbox and Radio*/
			if((input[i].type=='checkbox' && (/type="checkbox"|input\s|\sinput\s/.test(elements) || elements==null)) || ( input[i].type=='radio' && (/type="radio"|input\s|\sinput\s,/.test(elements) || elements==null)) ){
				console.log(/\sinput\s/.test(elements))
				inputSpan = document.createElement('span')
				if(input[i].type=='checkbox') inputSpan.className = 'checkbox'
				else if(input[i].type=='radio')  inputSpan.className = 'radio'
				/*стиль контейнера*/
				cssString = 
				'position:relative; '+
				getStyles(input[i],'position, margin, background-color, background-image, border, box-shadow, border-radius, float')+
				'width:'+input[i].offsetWidth+'px;\
				 height:'+input[i].offsetHeight+'px;\
				 display:'+(function(){return (getStyle(input[i],'display')=='block' ? 'block' : 'inline-block')}())+';\
				 vertical-align: baseline; background-repeat:no-repeat; background-position:center top; zoom:1;\
				'
				inputSpan.style.cssText = cssString
				inputSpan.setAttribute('style',cssString)
				inputSpan.tabIndex=input[i].tabIndex
				input[i].tabIndex=-1
				
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
			else if(input[i].type=='file' && (/type="file"|\binput\b/.test(elements) || elements==null) ){
				inputSpan = document.createElement('span')
				inputSpan.className = 'file'
				/*стиль контейнера*/
				cssString = 
				getStyles(input[i],'margin, text-align, color, font, float')+
				'width:'+input[i].offsetWidth+'px;\
				 height:'+input[i].offsetHeight+'px;\
				 line-height:'+input[i].offsetHeight+'px;\
				 display:'+(function(){return (getStyle(input[i],'display')=='block' ? 'block' : 'inline-block')}())+';\
				 zoom:1;\
				'
				inputSpan.style.cssText = cssString
				inputSpan.setAttribute('style',cssString)
				inputSpan.tabIndex=input[i].tabIndex
				input[i].tabIndex=-1
				
				inputSpan.innerHTML = '\
				<div style="position:relative; height:100%; overflow:hidden; display:inline-block; *display:inline; zoom:1; vertical-align:middle; ">\
					<button type="button" style="position: relative; line-height:normal; vertical-align: baseline; *vertical-align: top; display:inline; margin-right:7px; font-size:14px;">Select file</button>\
				</div>\
				<span style="line-height:normal; vertical-align:middle;">File not selected</span>'
				input[i].parentNode.insertBefore(inputSpan,input[i])
				inputSpan.getElementsByTagName('div')[0].appendChild(input[i])
					
				cssString = 'width:auto; height:100px; cursor:'+getStyle(inputSpan.getElementsByTagName('button')[0],'cursor')+'; position:absolute; font-size:100px; top:-20px; right:-20px; -moz-opacity: 0; -khtml-opacity: 0; opacity:0; filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0); filter: alpha(opacity=0); zoom: 1; behavior:none;'
				//cssString = 'height:100px; cursor:pointer; position:absolute; font-size:1; top:0; right:7px; filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);'
				input[i].style.cssText = cssString
				input[i].setAttribute('style',cssString)

				if(input[i].value) inputSpan.getElementsByTagName('span')[0].innerHTML = input[i].value
				input[i].onchange = (function(input,inputSpan){ return function(e){
					inputSpan.getElementsByTagName('span')[0].innerHTML = input.value
				} })(input[i],inputSpan)				
			}
			
			else if(input[i].type=='range' && (/type="range"|\binput\b/.test(elements) || elements==null) ){}
			
			else if(!/type="hidden"|type="image"/.test(elements)){ // text|password|search|email|number
				input[i].setAttribute('x-webkit-speech','')
			}
		}}
		
		/*Select*/
		if(selectlist && (elements==null || /\bselect\b/.test(elements)) ) {
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
				getStyles(selectlist[i],'padding-left, padding-right, margin, text-align, color, font, background, border, box-shadow, border-radius, clear, float')+
				'width:'+(selectlist[i].offsetWidth-parseInt(getStyle(selectlist[i],'padding-left'),10)-parseInt(getStyle(selectlist[i],'padding-right'),10))+'px;\
				 height:'+selectlist[i].offsetHeight+'px;\
				 line-height:'+selectlist[i].offsetHeight+'px;\
				 display:'+(function(){return (getStyle(selectlist[i],'display')=='block' ? 'block' : 'inline-block')}())+';\
				 white-space:'+(function(){return (getStyle(selectlist[i],'white-space')=='nowrap' ? 'nowrap' : 'normal')}())+';\
				 *z-index:'+(100-i)+';\
				 overflow:visible; position:relative; zoom:1;\
				'//-moz-user-select: none; -webkit-user-select: none; user-select: none;
				selectSpan.style.cssText = cssString
				selectSpan.setAttribute('style',cssString)
				selectSpan.tabIndex=selectlist[i].tabIndex
				selectlist[i].tabIndex=-1
				
				//console.log(getStyle(selectlist[i],'background-image','after'))
				
				/*стиль пунктов списка*/
				cssString = '\
				padding:0; margin:0; background-image:none;\
				padding-left:'+selectSpan.style.paddingLeft+'; padding-right:'+selectSpan.style.paddingRight+';\
				white-space:'+(function(){return (getStyle(option[0],'white-space')=='nowrap' ? 'nowrap' : 'normal')}())+';\
				'+getStyles(option[0],'padding-top, padding-bottom, text-align, color, font, overflow')+
				'line-height:normal; *line-height:1.1;'
				
				var cursor = document.createElement('cursor')
				selectlist[i].appendChild(cursor)
				
				len=option.length; n=0; listString=''; while(n<len){ listString+='<li style="'+cssString+'">'+option[n].innerHTML+'</li>';n++ }
				
				selectSpan.innerHTML = '<div class="value" style="clear:both; height:100%; overflow:hidden">'+option[selectlist[i].selectedIndex].innerHTML+'</div>\
				<div class="cursor" style="position:absolute;'+
				getStyles(cursor,'top, left, right, bottom, background, height, width')+'"></div>\
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
						selct.getElementsByTagName('div')[0].innerHTML=this.innerHTML
						//selct.getElementsByTagName('select')[0].selectedIndex = index
						selct.getElementsByTagName('select')[0].value = option[index].value
						//selct.getElementsByTagName('select')[0].options[index].setAttribute('selected','selected')
						var i=selct.getElementsByTagName('li').length; while(i--){selct.getElementsByTagName('li')[i].className=''}
						selct.getElementsByTagName('li')[index].className='selected'
					} }(selectSpan,n))	
					
					//Наведение на пункты списка. Используется псевдо селектор :hover (#ID_OF_FORM .select li:hover)
					//selectSpan.getElementsByTagName('li')[n].onmouseover=function(){this.className+=' hover'}
					//selectSpan.getElementsByTagName('li')[n].onmouseout=function(){this.className=this.className.replace(/ hover|hover/,'')}
				}
				
				if(document.addEventListener){document.addEventListener('click', hideLists, false)}
				else if(document.attachEvent){document.attachEvent('onclick', hideLists)}
				else document.onclick=hideLists
				
				//selectSpan.onfocus=function(e){var f = this.getElementsByTagName('select')[0].onfocus; try{f(e)}catch(e){throw e}}

			}//end while
		}
		
		return {}
	}//end if(form)
}
	
StyleForm(document.getElementsByTagName('form')[0],'input[type="file"]')



