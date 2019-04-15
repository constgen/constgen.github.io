

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
					
			i=input.length; while(i--){
			var inputSpan;

			/*File*/
			if(input[i].type=='file' && (/type="file"|\binput\b/.test(elements) || elements==null) ){
				inputSpan = document.createElement('span')
				inputSpan.className = 'file'
				/*стиль контейнера*/
				cssString = 
				getStyles(input[i],'margin, text-align, color, font, float')+
				 'width:'/*+input[i].offsetWidth*/+'215px;\
				 height:'/*+input[i].offsetHeight*/+'32px;\
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
					<button type="button" style="position:relative; *position:static; line-height:normal; vertical-align:top; *vertical-align: top; display:inline; margin-right:7px; font-size:14px;">Choose file</button>\
				</div>\
				<span style="line-height:normal; vertical-align:middle;">No file chosen</span>'
				input[i].parentNode.insertBefore(inputSpan,input[i])
				inputSpan.getElementsByTagName('div')[0].appendChild(input[i])
					
				cssString = 'width:auto; height:100px; cursor:'+getStyle(inputSpan.getElementsByTagName('button')[0],'cursor')+'; position:absolute; font-size:100px; top:-20px; right:-20px; padding:0; margin: 0; -moz-opacity: 0; -khtml-opacity: 0; opacity:0; filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0); zoom: 1; behavior:none;'
				//cssString = 'height:100px; cursor:pointer; position:absolute; font-size:1; top:0; right:7px; filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);'
				input[i].style.cssText = cssString
				input[i].setAttribute('style',cssString)

				if(input[i].value) inputSpan.getElementsByTagName('span')[0].innerHTML = input[i].value
				input[i].onchange = (function(input,inputSpan){ return function(e){
					inputSpan.getElementsByTagName('span')[0].innerHTML = input.value
				} })(input[i],inputSpan)				
			}

			else if(!/type="hidden"|type="image"/.test(elements)){ // text|password|search|email|number
				input[i].setAttribute('x-webkit-speech','')
			}
		}}
		

		return {}
	}//end if(form)
}
	
//StyleForm(document.getElementsByTagName('form')[0],'input[type="file"], select')










