	
//Navi.onHashChange = function(e){}
Navi.pageSettings = function(anhor){
	window.scrollTo(0,1)
	
	switch (anhor) {
		case 'home': 
			document.body.className = 'index'
			break
		case 'work':
			document.body.className = 'footer'
			break
		case 'solutions': 
			document.body.className = 'footer'
			break
		case 'contact': 
			document.body.className = 'footer'
			break
		case 'about':
			document.body.className = 'footer'
			break
		case 'ourteam': 
			document.body.className = 'footer'
			break
		default: 
			if (anhor && anhor.indexOf('work/') != -1) {
				document.body.className = 'work'
				document.getElementById('work-gallery').style.display = 'block'
				Gallery.show( anhor.substr( anhor.lastIndexOf('/') ) )
			} else {
				document.body.className = 'index'
			}
	}
};



														/*Application cache*/
if (window.applicationCache) window.applicationCache.addEventListener('updateready', function(){
	if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
		window.applicationCache.swapCache()
		//console.log('updated')
		//window.location.reload()
	}
});  


														/*Navigation with touches*/
(function(){
	var NaviLinks = document.querySelectorAll('menu a'),
		WorkLinks = document.querySelectorAll('#work a'),
		GalleryLinks = document.querySelectorAll('#scrollbar a'),
		a, i=0
	
	function menuClick(){
		if (!this.href) return
		window.location.hash = '#'+this.href.split('#')[1]
	}
	
	while (a = NaviLinks[i++]){
		Event.add(a,'tap',menuClick)
		Event.add(a,'click',function(){return false})
	}
	
	i=0
	while (a = WorkLinks[i++]){
		Event.add(a,'tap',menuClick)
		Event.add(a,'click',function(){return false})
	}
	
	a = document.querySelector('.allclients')
	Event.add(a,'tap',menuClick)
	Event.add(a,'click',function(){return false})
}());







															/*Accordion*/
(function(){										
	var accord_items = document.querySelectorAll('.accordion figure'), figure, i=0
	
	function OpenHide(e){
		var listitem = this.parentNode
		if (/\bactive\b/.test(listitem.className)) {
			listitem.getElementsByTagName('div')[0].style.height = 0
			listitem.className = listitem.className.replace(/active | active|active/, '')
		} else {
			HideAll()
			listitem.getElementsByTagName('div')[0].style.height =  listitem.getElementsByTagName('p')[0].offsetHeight+'px'	
			listitem.className += ' active'
		}
		
		return false
	}
	
	function HideAll(){
		var listitem, i=0
		while (listitem = accord_items[i++]) {
			listitem = listitem.parentNode
			if (/\bactive\b/.test(listitem.className)) {
				listitem.getElementsByTagName('div')[0].style.height = 0
				listitem.className = listitem.className.replace(/active | active|active/, '')
			}
		}
	}
	
	while (figure = accord_items[i++]) {
		Event.add(figure,'tap',OpenHide)
	}
}());



															/*Gallery*/						



var Gallery = (function(){
	
	var nav_items = document.querySelectorAll('#scrollbar a'),
		gall_images = document.querySelectorAll('#gallery img')
	
	return {
		next: function(){
			var i, len = nav_items.length

			i = 0
			while (i < len) {
				if(nav_items[i].className == 'left')  {
					nav_items[i+1].className = 'left'
					break
				}
				i++
			}
			try { document.querySelector('#scrollbar .left').className = '' }
			catch(e){ nav_items[0].className = 'left' }
			
			if( document.querySelector('#scrollbar .right') !== nav_items[len-1] ) {
				i = 0
				while (i < len) {
					if(nav_items[i].className == 'right') {
						nav_items[i+1].className = 'right'
						break
					}
					i++
				}
			}
			document.querySelector('#scrollbar .right').className = ''
			
			i = 0, len = gall_images.length
			while (i < len) {
				if( !/active/.test(gall_images[i].className) ) {
					gall_images[i].className = 'active'
					break
				}
				i++
			}
		},
		
		prev: function(){
			var i, len = nav_items.length
			
			if( document.querySelector('#scrollbar .left') !== nav_items[0] ) {
				i = 0
				while (i < len) {
					if(nav_items[i].className == 'left') {
						nav_items[i-1].className = 'left'
						break
					}
					i++
				}
				document.querySelectorAll('#scrollbar .left')[1].className = ''
			} else document.querySelector('#scrollbar .left').className = ''
				
			i = 0
			while (i < len) {
				if(nav_items[i].className == 'right') {
					nav_items[i-1].className = 'right'
					break
				}
				i++
			}
			try { document.querySelectorAll('#scrollbar .right')[1].className = '' }
			catch(e){ nav_items[len-1].className = 'right' }
			
			i = 0, len = gall_images.length	
			while (i < len) {
				if( !/active/.test(gall_images[i].className) ) {
					gall_images[i-1].className = ''
					break
				} else if (i == len-1) {gall_images[len-1].className = ''}
				i++
			}
		},
		
		show: function(picture){

			var i = len = nav_items.length, listitem
			
			if (picture<=0 || picture>len) return
			
			while (i--) {
				nav_items[i].className = ''
				gall_images[i].className = ''
			}
			gall_images[0].className = 'first-child active'
			
			
				
			function isMatch(i,picture){
				
				switch (typeof picture) {
					case 'number': 
						if (i+1 == picture) return true
					case 'string': 
						if (nav_items[i].href.indexOf(picture) != -1) return true
					default: return false
				}
			}
			
			
			i = 0
			while (i<picture || i<len) {
				if (i!=0) gall_images[i].className = 'active'
				if (isMatch(i,picture)) {
					if (nav_items[i+1]) {
						nav_items[i+1].className = 'right'
						if (i>0) nav_items[i-1].className = 'left'
					}
					else nav_items[i-1].className = 'left'
					break
				}
				i++
			}
			
		}
	}
	
}());

(function(){
	var nav_items = document.querySelectorAll('#scrollbar a'),
		a, i=0
	
	function ScrollRightLeft(e){
		if (this.className == 'right') Gallery.next()
		else if (this.className == 'left') Gallery.prev()
	}
	
	while (a = nav_items[i++]) {
		Event.add(a,'tap',ScrollRightLeft)
		Event.add(a,'click',function(){return false})
	}
}());





														/*Gray images in WORK gallery*/
(function(){
	var i=0,
	img = new Array(),
	elem = document.getElementById('scrollbar').getElementsByTagName('img'),
	len = elem.length;
	//if($.browser.mozilla){}/*mozilla natively use same image*/ 
	/*else */while (i<len){
		/*or use canvas*/ if(!!document.createElement('canvas').getContext){	
			img[i] = new Image()
			img[i].src = elem[i].src	
			if(img[i].complete) elem[i].src = grayscaleImage(img[i])
			else{
				img[i].onload = (function(elem,image){
					return function(e) { elem.src = grayscaleImage(image) }
				})(elem[i],img[i])
			}
		}
		/*or use images*/else {
			var imagesrc = elem[i].src
			elem[i].src = imagesrc.slice(0,imagesrc.lastIndexOf('.'))+'-gray'+imagesrc.slice(imagesrc.lastIndexOf('.'))	
		}
		i++ 
	}
}())




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






															/*Loadscreen*/

(function(){
	window.scrollTo(0,1)
	function noScroll(e){ e.preventDefault()}
	Event.add(document,'touchstart',noScroll)
	//Event.add(document,'ready',function(){document.querySelector('.preloader').className += ' load'})
	
	var overlay = document.querySelector('#overlay')
	Event.add(window,'load',function(){
		window.scrollTo(0,1)
		document.querySelector('#preloader').style.display = 'none'

		overlay.style.opacity = 0
		overlay.style.zIndex = -10
		var loadingdelay = window.setInterval(function(){
			Event.remove(document,'touchstart',noScroll)
			clearInterval(loadingdelay)
		}, 1000)
	})
}());

