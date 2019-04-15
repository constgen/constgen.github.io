
/*
Navigation plugin v 0.9.3
*/
														
var Navi=(function(){
	var $={}
	
	function currentHash(){
		var anhor = window.location.hash
		if(anhor) anhor = anhor.split('#')[1]
		return anhor
	}
	
	$.options = {
		mode: 'default',//default or script(links of main menu will be rewrited to anchor view, "index.html" will become "#/index.html"
		history: true,
		onStart: true,
		menu: true,
		rootanchor: true//only root hash navigates thrue menu - rootanchor/childanchor1/childanchor2 = rootanchor
	}
	
	$.hash = currentHash();//location hash
	$.hashCheck = currentHash();//temporary hash for checking
	$.hashPrev = ''
	
	
//old IE hack for hashchange event, using iframe
	var ieframe = (function($){
		if(!-[1,]){
			if(document.getElementById('ieframe')==null){
				var iframe = document.createElement('iframe')
				iframe.id = 'ieframe'
				iframe.src = ''
				iframe.style.display='none'
				//iframe.style.width='100px';iframe.style.height='100px';iframe.style.position='fixed';
				//iframe.style.left='0';iframe.style.zIndex='1000';iframe.style.top='300px';iframe.style.background='#ccc'
				document.body.appendChild(iframe)
				document.getElementById('ieframe').contentWindow.document.open()
				document.getElementById('ieframe').contentWindow.document.write($.hash)
				document.getElementById('ieframe').contentWindow.document.close()
				return document.getElementById('ieframe').contentWindow.document
			}	
			return document.getElementById('ieframe').contentWindow.document	
		}
		else return false
	}($));
	
//DOM ready event for navigation (from jQuery, simplified)
	$.onReady = function(handler){
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
		if(window.addEventListener) window.addEventListener('load', ready, false)
		else if(window.attachEvent) window.attachEvent('onload', ready)
	};
	
	
//Mainmenu, content, logo interactions
	$.app = function(){		
		var app = {
			menu: document.getElementById('mainmenu')||document.getElementById('menu')||document.getElementsByTagName('menu')/*[0]*/, //link to mainmenu
			activeclass: 'active', //class of active item without dott
			content: document.getElementById('content') //link to content container
		}

		app.menuItems = (app.menu.length) ?
					(function(){
						var menu, Arr = [], i = 0, len, a
						while (menu = app.menu[i++]) {
							a = menu.getElementsByTagName('a')
							len = a.length
							while (len--)
								Arr.push(a[len])
						}
						return Arr
					}())
					:
					app.menu.getElementsByTagName('a')
		
		
		//if history=false, cancel hashchanging on click
		var a = app.menuItems, anhor;
		
		if(!$.options.history)
			for(var i=0,len=a.length;i<len;i++){
				anhor = a[i].href
				anhor = (/\.html|\.php/.test(anhor) && anhor.indexOf('#')==-1) ? anhor.substr(anhor.lastIndexOf('/')) : '/'+anhor.split(/#\/|#/)[1]
				if(window.addEventListener) a[i].addEventListener('click', (function(anhor){return function(e){$.openPage(anhor); e.preventDefault()}}(anhor)), false)
				else if(window.attachEvent) a[i].attachEvent('onclick', (function(anhor){return function(e){$.openPage(anhor); e.returnValue=false}}(anhor)))
			}
			
		if($.options.mode=='script' && app.menu) for(var i=0,len=a.length;i<len;i++)
			a[i].href = window.location.href.split('#')[0]+'#/'+a[i].href.substr(a[i].href.lastIndexOf('/')+1)
		else for(var i=0,len=a.length;i<len;i++)
			if(a[i].href.indexOf('#/')==-1)
				a[i].href = a[i].href.split('#')[0]+'#/'+a[i].href.split('#')[1]

		this.app = app
		return app
	};
	
	
//Open some page function
	$.onBeforeOpenPage = function(anhor){}// open page event, use Navi.onBeforeOpenPage = function(anhor){} to bind some handler
	$.onOpenPage = function(anhor){}// open page event, use Navi.onOpenPage = function(anhor){} to bind some handler
	$.openPage = function(anhor){
		anhor = anhor||$.hash
		if (anhor && anhor.charAt(0)!='/') return
		anhor = anhor.substr(1)
		if ($.options.mode=='script') anhor=anhor.replace(/\.html|\.php/,'')// for script mode
		$.onBeforeOpenPage(anhor)//event
		if (anhor) {
			//Menu
			if ($.options.menu && $.app.menu) {
				var a, root, separ, active = new RegExp('\\s*'+$.app.activeclass)
				
				a = $.app.menuItems
				separ = anhor.indexOf('/')
				root = ($.options.rootanchor && separ != -1) ? anhor.substr(0,separ) : anhor
				
				for (var i=0,len=a.length; i<len; i++) {
					a[i].className = a[i].className.replace(active,'')
					if (a[i].href.indexOf(root) != -1) { a[i].className+=' '+$.app.activeclass }
				}
			}
			//Content
			if ($.app.content) {
				var div = $.app.content.getElementsByTagName('div')
				for(var i=0,len=div.length;i<len;i++)
					if(div[i].parentNode==$.app.content) div[i].style.display='none'
				var block = document.getElementById(anhor)
				if(block && block.parentNode==$.app.content) block.style.display='block'
			}

			$.onOpenPage(anhor)//event			
		} else if (anhor == '') {//default page
			//Content
			if ($.app.content) {
				var div = $.app.content.getElementsByTagName('div')
				for(var i=0,len=div.length;i<len;i++)
					if(div[i].parentNode==$.app.content) div[i].style.display=''
			}
			
			$.onOpenPage(anhor)//event
		}
		$.pageSettings(anhor)//Special settings for every page, index page olways has an empty anhor
		return this //return Object
	}
	$.pageSettings = function(anhor){}//anhor = '' or hash without '/' at the begining
	
	$.onReady(function(){
		$.app()//init app options and set $.app object
		if($.options.onStart) $.openPage($.hash)//trigger opening on page ready, if allowed in options
	}) 
		
	
//Hashchange event
	$.onHashChange = function(e){}// hashchange event, use Navi.onHashChange = function(e){} to bind some handler
	
	var stopID=0,ieHash;
	function checkhash(){
		$.hash = currentHash()
		if($.hash != $.hashCheck){
			var e={
				type:'hashchange',
				newURL:window.location.pathname+'#'+$.hash,
				oldURL:window.location.pathname+'#'+$.hashCheck
			}
			$.hashPrev=$.hashCheck
			$.hashCheck = $.hash
			$.onHashChange(e)
			if($.options.history) $.openPage($.hash)
		}
	}	
	function checkhashIe(){
		$.hash = currentHash()
		ieHash = document.getElementById('ieframe').contentWindow.document.getElementsByTagName('body')[0].innerHTML
		//console.log('hash: '+$.hash+', hashCheck: '+$.hashCheck+', ieframe:'+ieHash)
		if($.hash != $.hashCheck){
			document.getElementById('ieframe').contentWindow.document.open()
			document.getElementById('ieframe').contentWindow.document.write($.hash)
			document.getElementById('ieframe').contentWindow.document.close()
			var e={
				type:'hashchange',
				newURL:window.location.href.split('#')[0]+'#'+$.hash,
				oldURL:window.location.href.split('#')[0]+'#'+$.hashCheck
			}
			$.hashPrev=$.hashCheck
			$.hashCheck = $.hash
			$.onHashChange(e)	
			if($.options.history) $.openPage($.hash)
		}
		else if(ieHash!=$.hashCheck){
			window.location.hash = ieHash
			$.hash = ieHash
			var e={
				type:'hashchange',
				newURL:window.location.href.split('#')[0]+'#'+$.hash,
				oldURL:window.location.href.split('#')[0]+'#'+$.hashCheck
			}
			$.hashPrev=$.hashCheck
			$.hashCheck = ieHash
			$.onHashChange(e)
			if($.options.history) $.openPage($.hash)
		}
	}
	
	
	if('onhashchange' in window && window.addEventListener) window.addEventListener('hashchange',function(e){
		$.hashPrev=$.hash
		$.hash=currentHash()
		e.newURL || (e.newURL=window.location.href.split('#')[0]+'#'+$.hash)
		e.oldURL || (e.oldURL=window.location.href.split('#')[0]+'#'+$.hashPrev)
		$.onHashChange(e)
		if($.options.history) $.openPage($.hash)
	},false)
	else stopID = window.setInterval(checkhash, 100)	
	if(ieframe){
		checkhash=null
		if(stopID!=0) clearInterval(stopID)
		stopID = window.setInterval(checkhashIe, 100)
	}	
	

//Return object
	return $
}());

//Navi.onHashChange = function(e){}
//Navi.pageSettings = function(anhor){}


//Navi.options = {
//	mode: 'default',
//	history: true,
//	onStart: true,
//	menu: true,
//	rootanchor: true
//}

//Navi.app = {
//	menu: document.getElementsByTagName('menu'), //link to menu(s)
//	activeclass: 'active', //class of active item without dott
//	content: document.getElementById('content') //link to content container
//}