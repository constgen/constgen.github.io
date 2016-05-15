
var CONNECTIONSPEED = (function(){
	if(navigator.connection){
		switch(navigator.connection.type){
			case navigator.connection.UNKNOWN: return 'low';
			case navigator.connection.ETHERNET: return 'high';
			case navigator.connection.WIFI: return 'high';
			case navigator.connection.CELL_2G: return 'low';
			case navigator.connection.CELL_3G: return 'high';
			case navigator.connection.CELL_4G: return 'high';
			default: return 'high';
		}	
	}
	else if(window.blackberry && window.blackberry.network){
		switch(window.blackberry.network){
			case 'Wi-Fi': return 'high';
			default: return 'low';
		}
	}
}())


//alert(CONNECTIONSPEED)


													/* Проверка на поддержку свойств CSS3 (from Modernizr)*/

domPrefixes = 'Webkit Moz O ms Khtml'.split(' ')
testElem = document.createElement('test')
testStyle = testElem.style
function testPropsAll( prop ) { 
	var uc_prop = prop.charAt(0).toUpperCase() + prop.substr(1)
	props   = (prop + ' ' + domPrefixes.join(uc_prop + ' ') + uc_prop).split(' ')
	return !!testProps( props );
}
function testProps( props ) {
	for ( var i in props ) {if ( testStyle[ props[i] ] !== undefined  ) {return true}}
}
//transitionProperty, backgroundsize, borderimage, boxShadow, animationName, columnCount, boxReflect
var CSSTRANSITION = testPropsAll('transitionProperty')
var CSSOPACITY = (function(testStyle){testStyle.cssText='opacity:0.55';return /^0.55$/.test(testStyle.opacity)}(testStyle));
var CSSTRANSFORM = !!testProps(['transformProperty', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform'])

var CSSTRANSFORM3D = function() {
        var ret = !!testProps(['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective']);
        if ( ret && 'webkitPerspective' in document.documentElement.style ) {

          // Webkit allows this media query to succeed only if the feature is enabled.
          // `@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d),(modernizr){ ... }`
         // ret = Modernizr['csstransforms3d'];
        }
        return ret;
    }();

//CSSTRANSFORM3D = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix())

domPrefixes,testElem,testStyle = null

//alert(CSSOPACITY)	


    


															/*Show and hide content*/
$('.pushtoshow').live('click',function(e){
	var div = $(this).parent()
	if(div.hasClass('shown')==false) div.css({height:div.find('div').outerHeight(true)})
	else div.css({height:0})
	div.toggleClass('shown')
	e.preventDefault()
	e.stopPropagation()
	return false
});



																/*Snow animation*/



var pageTransition = (function(){
	var effDiv, cssString, Included= (CONNECTIONSPEED=='high' || location.search=='?snow')?true:false;
	var insertParent = document.getElementById('wrapper')||document.body
	insertParent.style.position='relative'

	if(!document.getElementById('effect')){
		effDiv = document.createElement('div')	
		effDiv.id = 'effect'
		cssString ='\
		visibility:hidden;\
		position:absolute;\
		left:0;\
		z-index:1000;\
		overflow:hidden;\
		-webkit-transform: translate3d(0,0,0);\
		-moz-transform: translate3d(0,0,0);\
		-o-transform: translate3d(0,0,0);\
		transform: translate3d(0,0,0);\
		'
		effDiv.style.cssText = cssString
		effDiv.setAttribute('style',cssString)
		if(!Included) effDiv.style.backgroundColor='#fff'
		//effDiv.style.top = 0
		//effDiv.style.bottom = 0
		
		//document.body.appendChild(effDiv)
		insertParent.appendChild(effDiv)
	}	
	else effDiv = document.getElementById('effect')
	
	var h=effDiv.offsetWidth/16*9
	window.onresize=function(){
		h=effDiv.offsetWidth/16*9
		effImg.style.width = effDiv.offsetWidth+'px'
	}
	
	//alert(document.getElementById('wrapper').offsetWidth)
	
	var effImg = document.createElement('img')
	effImg.src = (Included)? 'images/animation_sprite.png' : 'images/0.gif'
	var imageloaded=false//true or false
	if(effImg.complete) imageloaded=true
	else effImg.onload = function(){imageloaded=true}
	cssString ='\
		width:'+ effDiv.offsetWidth+'px;\
		height:auto;\
		position:absolute;\
		top:0;\
		left:0;\
		-webkit-transform: translate3d(0,0,0);\
		-moz-transform: translate3d(0,0,0);\
		-o-transform: translate3d(0,0,0);\
		transform: translate3d(0,0,0);\
	'
	effImg.style.cssText = cssString
	effImg.setAttribute('style',cssString)
	effDiv.appendChild(effImg)
	
	function noTouch(e) {e.preventDefault()}
	var speed = 40
	return {
		animate: function(func){
			var that=this
			if(imageloaded) that.animFadeIn(func,that.animFadeOut)
			else effImg.onload = function(){that.animFadeIn(func,that.animFadeOut)}
		},
		
		animFadeIn: function(func,callback){
			try {document.body.addEventListener('touchstart', noTouch, false)}
			catch(e){document.body.attachEvent("ontouchstart", noTouch)}
			func=func||function(){}	
			callback=callback||function(){}	
			var top=0, limit=effImg.offsetHeight/2-h, intervalId;

			function animationFastest(){
				effImg.style.WebkitTransform='translate3d(0,'+top+'px,0)'
				effImg.style.MozTransform='translate3d(0,'+top+'px,0)'
				effImg.style.msTransform='translate3d(0,'+top+'px,0)'
				effImg.style.OTransform='translate3d(0,'+top+'px,0)'
				effImg.style.Transform='translate3d(0,'+top+'px,0)'
				top-=h
				if(top<=-limit) { clearInterval(intervalId); func(); callback();}
			}	
			function animationFast(){
				effImg.style.WebkitTransform='translate(0,'+top+'px)'
				effImg.style.MozTransform='translate(0,'+top+'px)'
				effImg.style.msTransform='translate(0,'+top+'px)'
				effImg.style.OTransform='translate(0,'+top+'px)'
				effImg.style.Transform='translate(0,'+top+'px)'
				top-=h
				if(top<=-limit) { clearInterval(intervalId); func(); callback();}
			}	
			function animation(){ func(); callback();}	
			effDiv.style.visibility = 'visible'
			
			if(!Included){animation();return {stopWhen:function(){}} }
			else if(CSSTRANSFORM3D) intervalId = setInterval(animationFastest,speed);
			else if(CSSTRANSFORM) intervalId = setInterval(animationFast,speed);
			else animation();
			
			return {stopWhen:function(when){//when = true||false
				try{when=when()}
				catch(e){when=when}
				if(when){
					clearInterval(intervalId);
					top=-effImg.offsetHeight/2-h; 
					if(CSSTRANSFORM3D) animationFastest()
					else if(CSSTRANSFORM) animationFast()
					else animation()
					func(); callback();
				}
			}}
		},
	 
		animFadeOut: function(){
			var top=-effImg.offsetHeight/2,limit=effImg.offsetHeight-h,intervalId;
			function animationFastest(){
				effDiv.style.background='none'
				effImg.style.WebkitTransform='translate3d(0,'+top+'px,0)'
				effImg.style.MozTransform='translate3d(0,'+top+'px,0)'
				effImg.style.msTransform='translate3d(0,'+top+'px,0)'
				effImg.style.OTransform='translate3d(0,'+top+'px,0)'
				effImg.style.Transform='translate3d(0,'+top+'px,0)'
				top-=h
				if(top<=-limit) {
					clearInterval(intervalId);
					effDiv.style.visibility = 'hidden'
					try {document.body.removeEventListener('touchstart', noTouch, false)}
					catch(e){document.body.detachEvent("ontouchstart", noTouch)}
				}
			}	
			function animationFast(){
				effDiv.style.background='none'
				effImg.style.WebkitTransform='translate(0,'+top+'px)'
				effImg.style.MozTransform='translate(0,'+top+'px)'
				effImg.style.msTransform='translate(0,'+top+'px)'
				effImg.style.OTransform='translate(0,'+top+'px)'
				effImg.style.Transform='translate(0,'+top+'px)'
				top-=h
				if(top<=-limit) {
					clearInterval(intervalId);
					effDiv.style.visibility = 'hidden'
					try {document.body.removeEventListener('touchstart', noTouch, false)}
					catch(e){document.body.detachEvent("ontouchstart", noTouch)}
				}
			}	
			function animation(){
				effDiv.style.visibility = 'hidden'
				try {document.body.removeEventListener('touchstart', noTouch, false)}
				catch(e){document.body.detachEvent("ontouchstart", noTouch)}
			}
			effDiv.style.visibility = 'visible'
			
			if(!Included){animation();return {stopWhen:function(){}} }
			else if(CSSTRANSFORM3D) intervalId = setInterval(animationFastest,speed);
			else if(CSSTRANSFORM) intervalId = setInterval(animationFast,speed);
			else animation();
			
			return {stopWhen:function(when){//when = true||false
				try{when=when()}
				catch(e){when=when}
				if(when){
					clearInterval(intervalId)
					effDiv.style.visibility = 'hidden'
					try {document.body.removeEventListener('touchstart', noTouch, false)}
					catch(e){document.body.detachEvent("ontouchstart", noTouch)} 
				}
			}}
		}
	}
}());











														/*Отложенная загрузка элементов страницы*/
													
// объект Content для загрузки нужных элементов.
var Content = (function(){
	
	return {

		currentState: function(){
			var anhor = window.location.hash
			if(anhor) anhor = anhor.split('#')[1]
			return anhor	
		},
		
		data:DATA,
		
		sliderData:{
			petfriendly:[
				{imgSrc:'image11.jpg', description:'Apply deicer to ice and snow on concrete'},
				{imgSrc:'image12.jpg', description:'The moisture helps create a liquid brine'},
				{imgSrc:'image13.jpg', description:'The brine melts the ice and snow'},
				{imgSrc:'image14.jpg', description:'For best results remove any slush that forms on the concrete'}
			],
			ecosafe:[
				{imgSrc:'image21.jpg', description:'Brine can penetrade concrete and cause cracking and spalling'},
				{imgSrc:'image22.jpg', description:'The diecer\'s HEC begins to create a protective seal'},
				{imgSrc:'image23.jpg', description:'It travels into the concrete\'s chambers and capillaries'},
				{imgSrc:'image24.jpg', description:'Becoming a gellant that minimizes brine/water penetration'},
				{imgSrc:'image25.jpg', description:'As the brine dries, the HEC returns to powder form'},
				{imgSrc:'image26.jpg', description:'The HEC reactivates in the next freeze-thaw cycle'}
			],
			traditional:[
				{imgSrc:'image11.jpg', description:'Spread Morton Safe-T-Sult evenly over concrete (For easier removal, apply before ice and snow accumulate'},
				{imgSrc:'image12.jpg', description:'The diecer attracts moisture to form a liquid brine'},
				{imgSrc:'image13.jpg', description:'The brine melts the ice and snow because it has a lower melting point than rock salt alone'},
				{imgSrc:'image14.jpg', description:'For best results remove any slush that forms on the concrete'}
			],
			temp:[
				{imgSrc:'image11.jpg', description:'Spread Morton Safe-T-Sult evenly over concrete (For easier removal, apply before ice and snow accumulate'},
				{imgSrc:'image12.jpg', description:'The diecer attracts moisture to form a liquid brine'},
				{imgSrc:'image13.jpg', description:'Morton Safe-T-Power can melt in more extreme conditions because it is 100% Calcium Chloride'},
				{imgSrc:'image14.jpg', description:'For best results remove any slush that forms on the concrete'}
			],
			fastacting:[//petfriendly
				{imgSrc:'image11.jpg', description:'Apply deicer to ice and snow on concrete'},
				{imgSrc:'image12.jpg', description:'The moisture helps create a liquid brine'},
				{imgSrc:'image13.jpg', description:'The brine melts the ice and snow'},
				{imgSrc:'image14.jpg', description:'For best results remove any slush that forms on the concrete'}
			]
		},
		
		/*бинд для кнопок слайдера в HOW IT WORKS, вызывается каждый раз при изменениии контента*/	
		bindSlider: function(){
			var slider = $('#slider')
			var len = slider.find('.items div').length
			slider.find('.items div:first').addClass('active')		
			slider.children('.slide-prev').addClass('disabled')	
			
			slider.children('.slide-prev').click(function(){
				if(slider.find('.items div.active').length>1){	
					var thisItem = slider.children('.items div.active:last')
					thisItem.removeClass('active')
				}	
				slider.children('.slide-next').removeClass('disabled')
				if(slider.find('.items div.active').length<=1) $(this).addClass('disabled')	
			})
			
			slider.children('.slide-next').click(function(){		
				var thisItem = slider.children('.items div.active:last')
				thisItem.next().addClass('active')			
				slider.children('.slide-prev').removeClass('disabled')
				if(slider.find('.items div.active').length==len) $(this).addClass('disabled')
			})
			
			function fixHeight(){
				var maxH=0,deffH=0,h;
				$('#slider .items div').each(function(i){
					h=$(this).find('img')[0].offsetHeight+$(this).find('span')[0].offsetHeight
					//if(i==0) deffH=h
					if(h>=maxH) maxH=h
				})
				/*if(maxH>deffH)*/ $('#slider').height(maxH)
				return maxH
			}
			$('#slider .items div img').bind('load',fixHeight)
			$(window).resize(fixHeight)
		},
		
		loadProduct:function(anhor){
			anhor=anhor||null
			if(anhor==null) return
			if(anhor.charAt(0)=='/') anhor=anhor.substr(1)
			var pageHTML='',
				product=this.data.products,
				wintertip=this.data.winterTips,
				section,id,len,i,n,l,m,s;
			/Consumer/i.test(anhor)? section='consumerproducts' : section='commercialproducts'
			
			i=0; len=product[section].length; while(i<len){
				
				if(product[section][i].imgSrc==anhor){
					id=product[section][i].id
					pageHTML='<h2>'+product[section][i].title+'</h2>'//Title
					pageHTML+='<img src="gallery/img_'+product[section][i].imgSrc+'.jpg" alt="">'//Image
					pageHTML+='<span class="icon '+id+'"></span>'//Icon
					pageHTML+='<div class="description">'+product[section][i].subtitle+'</div>'
					pageHTML+='<p>'+product[section][i].text+'</p>'
					pageHTML+='<div class="text"><a class="pushtoshow" href="#"><span>'+product[section][i].learnmore.innerText+'</span></a><div class="hiddentext">'//learn more
					pageHTML+=''//Slider
					pageHTML+='<div id="slider"><div class="items">'
					for(n=0,l=Content.sliderData[id].length;n<l;n++){
						pageHTML+='<div>\
							<img src="gallery/'+Content.sliderData[id][n].imgSrc+'" width="auto" height="auto">\
							<span class="description">'+Content.sliderData[id][n].description+'</span>\
						</div>'
					}
					pageHTML+='</div><div class="slide-prev"></div><div class="slide-next"></div></div>'
					pageHTML+='<h3>'+product[section][i].learnmore.title+'</h3><hr>'//HOW IT WORKS
					pageHTML+=product[section][i].learnmore.text//learn more TEXT
					pageHTML+='</div></div>'
					 
					pageHTML+='<div class="details">\
						<div class="meltsto">'+(function(melts){return (melts<10)?'Melts to':'Works to'}(product[section][i].meltsto))+' <img src="images/icon_'+product[section][i].meltsto+'deg.png" alt="'+product[section][i].meltsto+'deg F"></div>'
					for(n=0,l=product[section][i].meltstoDetails.length;n<l;n++){
						pageHTML+='<h4>'+product[section][i].meltstoDetails[n].title+'</h4>'+product[section][i].meltstoDetails[n].text+'<br>'
						if(product[section][i].veterinarian && n==0){
							pageHTML+='<div class="text">\
							<a href="#" class="pushtoshow"><span>'+product[section][i].veterinarian.innerText+'</span></a>\
							<div class="hiddentext">\
							<h3>'+product[section][i].veterinarian.title+'</h3><hr>\
							'+product[section][i].veterinarian.text+'</div></div>'
						}
					}
					pageHTML+='</div>'//end details
				
					pageHTML+='<h3>'+product[section][i].sizes.title+'</h3><ul>'
					for(n=0,l=product[section][i].sizes.available.length;n<l;n++){
						pageHTML+='<li>'+product[section][i].sizes.available[n]+'</li>'
					}
					pageHTML+='</ul>'
					pageHTML+='<h3>WINTER TIPS</h3>'
					for(n=0,l=product[section][i].winterTips.length;n<l;n++){
					 	pageHTML+='<div class="text"><a class="pushtoshow" href="#"><span>'+product[section][i].winterTips[n].title+'</span></a><div class="hiddentext">'
						for(m=0,s=wintertip.length;m<s;m++){
							if(product[section][i].winterTips[n].title.toLowerCase()==wintertip[m].title.toLowerCase()){
								pageHTML+='<img src="gallery/wt_'+wintertip[m].id+'.jpg" width="auto" height="auto" alt="'+wintertip[m].title+'">'//Winter tip image
								pageHTML+=wintertip[m].text//Winter tip text
								break
							}
						}
						pageHTML+='</div></div>'
					}
					pageHTML+='<p>'+product[section][i].disclaimer+'</p>'
					break;
				}
				i++
			}
			
			$('#product').html(pageHTML)
			this.bindSlider()//bind Slider left/right arrows pushing
			return this
		},
		
		loadNews:function(anhor){
			anhor=anhor||null
			if(/news/.test(anhor)==false) return
			var newsHTML='',
				news=this.data.news,len,i;
				
			newsHTML='<h3>'+news.newsTitle+'</h3><hr><ul>'
			i=0; len=news.newsContent.length; while(i<len){
				newsHTML+='<li>\
					'+news.newsContent[i].title+'\
					'+news.newsContent[i].text+'\
				</li>'
				i++
			}
			newsHTML+='</ul>'
				
			$('#news').html(newsHTML)
			return this
		},
		
		loadComparison:function(){return this},
		
		
		onPageLoaded:function(handler){
			
			var anhor = this.currentState()
			var imgArr=[], img=new Image();
			
			function onLoad(){
				handler()
			};
			
			function checkImages(i,len){
				if(i<len){
					if(imgArr[i].complete) {i++; checkImages(i,len)}	
					else {
						imgArr[i].onload = (function(){
							return function(e){
								i++; checkImages(i,len)	
							}
						})()
					}
				}
				else onLoad()
			}

			/*product page*/if(/Consumer|Commercial/i.test(anhor)){	
				imgArr[imgArr.length]=new Image()
				imgArr[imgArr.length-1].src=window.location.pathname+'images/icon_'+$('#product .icon').get(0).className.replace('icon ','')+'.png'
				
				imgArr[imgArr.length]=new Image()
				imgArr[imgArr.length-1].src=window.location.pathname+'images/bg_slide-arrows.png'

				$('#product img').each(function(i){
					imgArr[imgArr.length]=new Image()
					imgArr[imgArr.length-1].src=this.src
				})
				
				checkImages(0,imgArr.length)
			}
			/*Comparison page*/else if(/compare/i.test(anhor)){
				imgArr[imgArr.length]=new Image()
				imgArr[imgArr.length-1].src=window.location.pathname+'images/bg_compare_bytemperature.png'
				
				imgArr[imgArr.length]=new Image()
				imgArr[imgArr.length-1].src=window.location.pathname+'images/bg_compare_byuse.png'
				
				imgArr[imgArr.length]=new Image()
				imgArr[imgArr.length-1].src=window.location.pathname+'images/bg_compare_bytemperature-active.png'
				
				imgArr[imgArr.length]=new Image()
				imgArr[imgArr.length-1].src=window.location.pathname+'images/bg_compare_byproduct-active.png'
				
				$('#compare img').each(function(i){
					imgArr[imgArr.length]=new Image()
					imgArr[imgArr.length-1].src=this.src
				})
				checkImages(0,imgArr.length)
			}
			else onLoad()	
		}		
		
	}
}());











																/*Навигация по сайту*/
														
var Navi=(function(){
	var api=this
	
	function currentHash(){
		var anhor = window.location.hash
		if(anhor) anhor = anhor.split('#')[1]
		return anhor
	}
	
	this.options={
		history:true,
		onStart:true,
		menu:true,
		ieHashPrefix:''
	}
	
	this.hash=currentHash();//location hash
	this.hashCheck=currentHash();//temporary hash for checking
	this.prevhash=''
	
	
//old IE hack for hashchange event, using iframe
	this.ieframe=(function(api){
		if(!-[1,]){
			if(document.getElementById('ieframe')==null){
				var iframe = document.createElement('iframe')
				iframe.id = 'ieframe'
				iframe.src = ''
				iframe.style.display='none'
				//iframe.style.width='100px';iframe.style.height='100px';iframe.style.position='fixed';
				//iframe.style.left='0';iframe.style.zIndex='1000';iframe.style.top='300px';iframe.style.background='#ccc'
				document.getElementsByTagName('body')[0].appendChild(iframe)
				document.getElementById('ieframe').contentWindow.document.open()
				document.getElementById('ieframe').contentWindow.document.write(api.hash)
				document.getElementById('ieframe').contentWindow.document.close()
				return document.getElementById('ieframe').contentWindow.document
			}	
			return document.getElementById('ieframe').contentWindow.document	
		}
		else return false
	}(api));
	
//DOM ready event for navigation (from jQuery, simplified)
	this.onReady = function(handler){
		var called = false
		function ready(){if(called) return;	called=true; handler()}
		if (document.addEventListener) document.addEventListener("DOMContentLoaded", ready, false) 
		else if(document.attachEvent){
			if (document.documentElement.doScroll && window == window.top){
				function tryScroll(){
					if (called) return
					if (!document.body) return
					try {document.documentElement.doScroll("left");	ready()} catch(e) {setTimeout(tryScroll, 0)}
				}
				tryScroll()
			}
			document.attachEvent("onreadystatechange", function(){if(document.readyState === "complete" ) ready()})
		}	
		if (window.addEventListener) window.addEventListener('load', ready, false)
		else if (window.attachEvent) window.attachEvent('onload', ready)
		else window.onload=ready
	}
	
	
//Mainmenu, content, logo interactions
	this.app=(function(){
		
		return{
			menu: document.getElementById('mainmenu'), //link to mainmenu
			activeclass: 'active', //class of active item without dott
			content: document.getElementById('content'), //link to content container
			logo: document.getElementById('logo') //link to logo
		}

	}());
	
	
//Open some page function
	this.onBeforeOpenPage=function(anhor){}// before open page event, use Navi.onBeforeOpenPage=function(anhor){} to bind some handler
	this.onOpenPage=function(anhor){}// open page event, use Navi.onOpenPage=function(anhor){} to bind some handler
	this.openPage=function(anhor){
		anhor=anhor||api.hash
		if(api.ieframe && anhor.charAt(0)==api.options.ieHashPrefix) anhor=anhor.substr(1)//because of hack in old IE
		api.onBeforeOpenPage(anhor)
		pageTransition.animFadeIn(function(){
			if(anhor){
	
				//Menu
				if(options.menu && app.menu){
					var a = app.menu.getElementsByTagName('a')
					for(var i=0,len=a.length;i<len;i++){
						a[i].className=a[i].className.replace(app.activeclass,'')
						if(a[i].href.indexOf(anhor)!=-1){a[i].className+=' '+app.activeclass}
					}
				}
				//Content
				if(app.content){
					var div = app.content.getElementsByTagName('div')
					for(var i=0,len=div.length;i<len;i++){
						if(div[i].parentNode==app.content) div[i].style.display='none'
					}
					var content=document.getElementById(anhor)||document.getElementById(anhor.substr(1))
					if(content) content.style.display='block'
				}
	
				api.onOpenPage(anhor)//event			
			}
			api.pageSettings(anhor)//Special settings for every page
		}).stopWhen(function(){
			if(api.prevhash=='' || api.prevhash=='index') {return true}
			else return false
		});
		
		//return this //return Object
	}
	this.pageSettings=function(anhor){}//anhor = '' or hash
	api.onReady(function(){if(api.options.onStart) api.openPage(api.hash)}) //open event on page ready, if allowed in options
		
	
//Hashchange event
	this.onHashChange=function(e){}// hashchange event, use Navi.onHashChange=function(e){} to bind some handler
	this.hashChange = (function(api){
		var stopID=0,ieHash;
		function checkhash(){
			api.hash = currentHash()
			if(api.hash != api.hashCheck){
				var e={
					type:'hashchange',
					newURL:window.location.pathname+'#'+api.hash,
					oldURL:window.location.pathname+'#'+api.hashCheck
				}
				api.hashCheck = api.hash
				api.prevhash = (e.oldURL.indexOf('#')!=-1)? e.oldURL.substr(e.oldURL.lastIndexOf('#')+1) : ''
				api.onHashChange(e)
				if(api.options.history) api.openPage(api.hash)
			}
		}	
		function checkhashIe(){
			api.hash = currentHash()
			ieHash = document.getElementById('ieframe').contentWindow.document.getElementsByTagName('body')[0].innerHTML
			//console.log('hash: '+api.hash+', hashCheck: '+api.hashCheck+', ieframe:'+ieHash)
			if(api.hash != api.hashCheck){
				document.getElementById('ieframe').contentWindow.document.open()
				document.getElementById('ieframe').contentWindow.document.write(api.hash)
				document.getElementById('ieframe').contentWindow.document.close()
				var e={
					type:'hashchange',
					newURL:window.location.pathname+'#'+api.hash,
					oldURL:window.location.pathname+'#'+api.hashCheck
				}
				api.hashCheck = api.hash
				api.prevhash = (e.oldURL.indexOf('#')!=-1)? e.oldURL.substr(e.oldURL.lastIndexOf('#')+1) : ''
				api.onHashChange(e)	
				if(api.options.history) api.openPage(api.hash)
			}
			else if(ieHash!=api.hashCheck){
				window.location.hash = ieHash
				api.hash = ieHash
				var e={
					type:'hashchange',
					newURL:window.location.pathname+'#'+api.hash,
					oldURL:window.location.pathname+'#'+api.hashCheck
				}
				api.hashCheck = ieHash
				api.prevhash = (e.oldURL.indexOf('#')!=-1)? e.oldURL.substr(e.oldURL.lastIndexOf('#')+1) : ''
				api.onHashChange(e)
				if(api.options.history) api.openPage(api.hash)
			}
		}
		
		if('onhashchange' in window) window.onhashchange = function(e){
			api.hash=currentHash()
			if(e.oldURL) api.prevhash = (e.oldURL.indexOf('#')!=-1)? e.oldURL.substr(e.oldURL.lastIndexOf('#')+1) : ''
			api.onHashChange(e)
			if(api.options.history) api.openPage(api.hash)
			if(!e.oldURL) api.prevhash = api.hash 
		}
		else stopID = window.setInterval(checkhash, 100)	
		if(api.ieframe){
			window.onhashchange = null
			if(stopID!=0) clearInterval(stopID)
			if(api.hash && api.hash.charAt(0)!=api.options.ieHashPrefix){
				api.ieframe.getElementsByTagName('body')[0].innerHTML=api.options.ieHashPrefix+api.hash
			}
			stopID = window.setInterval(checkhashIe, 150)
		}	
	}(api));
	//Prevent IE scrolling to hash element by modifying hash
	if(api.ieframe && document.attachEvent) document.attachEvent('onclick', function(e){
		e=e||window.event
		var target=e.target||e.srcElement
		function checkA(target){
			if(target.nodeName=='HTML') return
			else if(target.nodeName=='A'){
				if(target.href.indexOf('#')!=-1 && target.href.charAt(target.href.length-1)!='#'){
					e.preventDefault ? e.preventDefault() : (e.returnValue=false)
					window.location.hash=api.options.ieHashPrefix+target.href.split('#')[1] //Modifying
				}
			}
			else checkA(target.parentNode)
		}
		checkA(target)
	});
	

//Return object
	return this
}());



Navi.onHashChange=function(e){}

Navi.pageSettings = function(anhor){

	Content.loadProduct(anhor)
	Content.loadNews(anhor)
	Content.onPageLoaded(function(){pageTransition.animFadeOut().stopWhen(false)})
	
	var menu='#'+Navi.app.menu.id
	
	$(menu).removeClass()
	if(/\bhome\b|\bbusiness\b/.test(anhor)) $(menu).addClass('productmenu') //изменять вид главного меню на стартовой странице
	else if(/Consumer|Commercial/.test(anhor)) $('#product').show() //показывать какой-либо продукт
	
	if(!-[1,]){
		if($(menu).get(0).className=='productmenu'){$(menu+' a').each(function(){this.innerHTML = this.innerHTML.replace(/<span><br><\/span>/i,' ')})}
		else $(menu+' a').each(function(){this.innerHTML = this.innerHTML.replace(/(pet|eco|fast) (friendly|choice|acting)/i,'$1<span><br></span>$2')})	
	}
	
	//when to hide mainmenu
	if(/\bcompare\b|\bnews\b/.test(anhor)) $(menu).hide()
	else $(menu).show()
	
	if(/\bhome\b|Consumer/.test(anhor)){		
		$('#indexmenu a').removeClass(Navi.app.activeclass)
		$('#indexmenu a[href="#/home"]').addClass(Navi.app.activeclass)
		$(menu+' > div').hide()
		$(menu+' #home').show()
		$('.compare').show()
		$('.calculator').hide()
	}
	else if(/\bbusiness\b|Commercial/.test(anhor)){
		$('#indexmenu a').removeClass(Navi.app.activeclass)
		$('#indexmenu a[href="#/business"]').addClass(Navi.app.activeclass)
		$(menu+' > div').hide()
		$(menu+' #business').show()	
		$('.compare').hide()
		$('.calculator').show()
	}
	else $('#indexmenu a').removeClass(Navi.app.activeclass)
	
	if(/\bcompare\b/.test(anhor)){
		$('.compare').addClass(Navi.app.activeclass)//делает ссылку Compare активной если это текущая страница
		$('#indexmenu a').removeClass(Navi.app.activeclass)
		$('#indexmenu a[href="#/home"]').addClass(Navi.app.activeclass)
	}
	else $('.compare').removeClass(Navi.app.activeclass)//делает ссылку Compare не активной
	
	//На Главную
	if(anhor=='/index' || anhor=='' || anhor=='/') {
		//Активация нужных пункта меню и страницы
		$('#content').hide()
		$('#index').show()
	}
	else{
		$('#content').show()
		$('#index').css({opacity:0});
		(function(){
			var loaddelay = setInterval(function(){
				clearInterval(loaddelay)
				$('#index').hide().css({opacity:1})
			} ,1000)
		}());
	}
	
	//Fix for Opera mini homemenu on screen <320px
	if(window.operamini){
		if(document.getElementById('mainmenu').className=='productmenu') document.getElementById('home').insertBefore(document.createElement('br'),document.getElementById('home').getElementsByTagName('a')[2])
		else if(document.getElementById('home').getElementsByTagName('br')[1]) document.getElementById('home').removeChild(document.getElementById('home').getElementsByTagName('br')[0])
	}
};

Navi.options.onStart=false;
$(window).load(function(){ Navi.openPage()});

//Navi.onOpenPage=function(anhor){alert('open page '+anhor)};

		

		










															/*Loadingscreen*/														

(function($){
	
	var img=new Image()
	img.src=$('#index .logo img').prop('src')
	img.onload=openLogo
	if(img.comlete) openLogo()
	
	function openLogo(){
		if(CSSTRANSITION) $('#preloader').addClass('load')
		else $('#preloader').css({visibility:'hidden'}) 
		$('#index .logo').addClass('opened')
	}
	
	$(window).load(showChooseone);
	function showChooseone(){
		window.scrollTo(0,1)
		if(CSSTRANSITION) $('#preloader').addClass('loaded')
		$('#index .chooseone').addClass('show')
	}
	
}(jQuery));






															/*Compare and select*/	
//Data
var Compare = {
	
	data:{
		SafeTPetConsumer:{
			id:'SafeTPetConsumer',
			name:'Safe-T-Pet<sup>&reg;</sup>',
			temp:15,
			use:[
				'Safer for pets',
				'safer for plants',
				'melts both ice and snow',
				'wheel traction',
				'spreading visibility',
				'chloride free',
				'available in jugs'
			]
		},
		SafeTPlusConsumer:{
			id:'SafeTPlusConsumer',
			name:'Safe-T-Plus<sup>&reg;</sup> EcoSafe Ice Melt',
			temp:5,
			use:[
				'safer for plants',
				'safer for concerete',
				'melts both ice and snow',
				'wheel traction',
				'available in jugs'
			]
		},
		SafeTSaltConsumer:{
			id:'SafeTSaltConsumer',
			name:'Safe-T-Salt<sup>&reg;</sup>',
			temp:5,
			use:[
				'melts both ice and snow',
				'wheel traction',
				'economical'
			]
		},
		ActionMeltConsumer:{
			id:'ActionMeltConsumer',
			name:'Action Melt<sup>&reg;</sup> Blend',
			temp:-15,
			use:[
				'fast ice melting',
				'extreme temperatures',
				'melts both ice and snow',
				'wheel traction',
				'economical',
				'available in jugs'
			]
		},
		SafeTPowerConsumer:{
			id:'SafeTPowerConsumer',
			name:'Safe-T-Power<sup>&reg;</sup> Calcium Chloride',
			temp:-25,
			use:[
				'fast ice melting',
				'extreme temperatures',
				'melts both ice and snow',
				'wheel traction',
				'available in jugs'
			]
		}
	},
	
	properties:{},
	
	byTemperature:function(t){
		var i,IDs=[]
		for (i in this.data){ if(this.data[i].temp<=t) IDs.push(this.data[i].id) }
		return IDs		
	},//returns ID of Product
	
	byProduct:function(prodID){
		var i
		for (i in this.data){ 
			if(this.data[i].id==prodID) return {name:this.data[i].name, temp:this.data[i].temp, use:this.data[i].use} 
		}	
	},//returns object: name, temp (temperature), use (array of properties) of Product
	
	byUse:function(prop){
		var i,n,len,prod=[];
		prop = prop.toLowerCase()
		for (i in this.data){ 
			for(n=0,len=this.data[i].use.length;n<len;n++){
				if(this.data[i].use[n].toLowerCase().indexOf(prop)!=-1) {prod.push(this.data[i].id); break}
			}
		}	
		return prod
	}//returns array of ID of Products
	
}



function compareByTemperature(target){
	var i,len,
	prod = Compare.byTemperature(target.prop('id').replace('deg',''))
	//temperature
	$('#bytemperature div').removeClass('active')
	target.addClass('active')
	//product and usage
	$('.productname').html('')
	$('#byproduct div').removeClass('active')
	$('#byuse div').removeClass('active')
	for(i=0,len=prod.length;i<len;i++){
		//product
		$('#byproduct div[id="'+prod[i]+'"]').addClass('active')
		//usage
		$('#byuse div').each(function(){	
			if(Compare.byProduct(prod[i]).use.join(',').toLowerCase().indexOf($(this).find('span')[0].innerHTML.toLowerCase())!=-1) $(this).addClass('active')
		})
	}
}

function compareByProduct(target){
	var prod = Compare.byProduct(target.prop('id'))
	//temperature
	$('#bytemperature div').removeClass('active')
	$('#bytemperature div[id="deg'+prod.temp+'"]').addClass('active')
	//product
	$('.productname').html(prod.name)
	$('#byproduct div').removeClass('active')
	target.addClass('active')
	//usage
	$('#byuse div').removeClass('active')
	$('#byuse div').each(function(){	
		if(prod.use.join(',').toLowerCase().indexOf($(this).find('span')[0].innerHTML.toLowerCase())!=-1) $(this).addClass('active')
	})
}

function compareByUse(target){
	var i,len,	
	prod = Compare.byUse(target.find('span')[0].innerHTML)
	//temperature
	$('#bytemperature div').removeClass('active')
	//product 
	$('.productname').html('')
	$('#byproduct div').removeClass('active')
	for(i=0,len=prod.length;i<len;i++){
		$('#byproduct div[id="'+prod[i]+'"]').addClass('active')
	}
	//usage
	$('#byuse div').removeClass('active')
	target.addClass('active')
}


$('#bytemperature div').click(function(){compareByTemperature($(this))});
$('#byproduct div').click(function(){compareByProduct($(this))});
$('#byuse div').click(function(){compareByUse($(this))});




//For touch device, canceling spotlight
$('#bytemperature div').each(function(){
	this.ontouchstart=function(e){
		$('#bytemperature div').unbind('click')
		this.ontouchend=function(e){compareByTemperature($(this))}
	}
	this.ontouchmove=function(){this.ontouchend=null}
});

$('#byproduct div').each(function(){
	this.ontouchstart=function(e){
		$('#byproduct div').unbind('click')
		this.ontouchend=function(e){compareByProduct($(this)); return false }
		if(this.className!='active') $(this).find('a')[0].onclick=function(){return false}
		else{$(this).find('a')[0].onclick=null}
	}

	this.ontouchmove=function(){this.ontouchend=null}
});

$('#byuse div').each(function(){
	$(this).get(0).ontouchstart=function(e){
		$('#byuse div').unbind('click')
		this.ontouchend=function(e){compareByUse($(this))}
	}
	$(this).get(0).ontouchmove=function(){this.ontouchend=null}
});




