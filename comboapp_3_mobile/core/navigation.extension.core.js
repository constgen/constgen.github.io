
// Navigation extension
Core.extend(function (Core) {
	// Hardware back button for Blackberry
	if (window.blackberry && window.blackberry.system)
		window.blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK, function () {
			window.history.back()
			return false
		})

	var location = window.location;

	return {
		//navigate: (function(){
		//	var $={}
			
		//	function currentHash(){
		//		var anhor = window.location.hash
		//		if(anhor) anhor = anhor.split('#')[1]
		//		return anhor
		//	}

		//	$.hash = currentHash();//location hash
		//	$.hashCheck = currentHash();//temporary hash for checking
		//	$.hashPrev = undefined
			
			
		////old IE hack for hashchange event, using iframe
		//	var ieframe = (function(){
		//		if(!-[1,]){
		//			if(document.getElementById('ieframe')==null){
		//				var iframe = document.createElement('iframe')
		//				iframe.id = 'ieframe'
		//				iframe.src = ''
		//				iframe.style.display='none'
		//				//iframe.style.width='100px';iframe.style.height='100px';iframe.style.position='fixed';
		//				//iframe.style.left='0';iframe.style.zIndex='1000';iframe.style.top='300px';iframe.style.background='#ccc'
		//				document.body.appendChild(iframe)
		//				document.getElementById('ieframe').contentWindow.document.open()
		//				document.getElementById('ieframe').contentWindow.document.write($.hash)
		//				document.getElementById('ieframe').contentWindow.document.close()
		//				return document.getElementById('ieframe').contentWindow.document
		//			}	
		//			return document.getElementById('ieframe').contentWindow.document	
		//		}
		//		else return false
		//	}());
			
		////DOM ready event for navigation (from jQuery, simplified)
		//	$.onReady = function(handler){
		//		var called = false
		//		function ready(){if(called) return;	called=true; handler()}
		//		if (document.addEventListener) document.addEventListener("DOMContentLoaded", ready, false) 
		//		else if(document.attachEvent){
		//			if (document.documentElement.doScroll && window == window.top){
		//				function tryScroll(){
		//					if (called) return
		//					if (!document.body) return
		//					try {document.documentElement.doScroll("left");	ready()} catch(e) {setTimeout(tryScroll, 0)}
		//				}
		//				tryScroll()
		//			}
		//			document.attachEvent("onreadystatechange", function(){if(document.readyState === "complete" ) ready()})
		//		}	
		//		if(window.addEventListener) window.addEventListener('load', ready, false)
		//		else if(window.attachEvent) window.attachEvent('onload', ready)
		//	};
			
		////Hashchange event
		//	$.onHashChange = function(e){}// hashchange event, use Navi.onHashChange = function(e){} to bind some handler
			
		//	$.onReady(function () {
		//		$.onHashChange({})//trigger hashchange on page ready
		//	})

		//	var stopID=0,ieHash;
		//	function checkhash(){
		//		$.hash = currentHash()
		//		if($.hash != $.hashCheck){
		//			var e={
		//				type:'hashchange',
		//				newURL:window.location.pathname+'#'+$.hash,
		//				oldURL:window.location.pathname+'#'+$.hashCheck
		//			}
		//			$.hashPrev=$.hashCheck
		//			$.hashCheck = $.hash
		//			$.onHashChange(e)
		//		}
		//	}	
		//	function checkhashIe(){
		//		$.hash = currentHash()
		//		ieHash = document.getElementById('ieframe').contentWindow.document.getElementsByTagName('body')[0].innerHTML
		//		//console.log('hash: '+$.hash+', hashCheck: '+$.hashCheck+', ieframe:'+ieHash)
		//		if($.hash != $.hashCheck){
		//			document.getElementById('ieframe').contentWindow.document.open()
		//			document.getElementById('ieframe').contentWindow.document.write($.hash)
		//			document.getElementById('ieframe').contentWindow.document.close()
		//			var e={
		//				type:'hashchange',
		//				newURL:window.location.href.split('#')[0]+'#'+$.hash,
		//				oldURL:window.location.href.split('#')[0]+'#'+$.hashCheck
		//			}
		//			$.hashPrev=$.hashCheck
		//			$.hashCheck = $.hash
		//			$.onHashChange(e)
		//		}
		//		else if(ieHash!=$.hashCheck){
		//			window.location.hash = ieHash
		//			$.hash = ieHash
		//			var e={
		//				type:'hashchange',
		//				newURL:window.location.href.split('#')[0]+'#'+$.hash,
		//				oldURL:window.location.href.split('#')[0]+'#'+$.hashCheck
		//			}
		//			$.hashPrev=$.hashCheck
		//			$.hashCheck = ieHash
		//			$.onHashChange(e)
		//		}
		//	}
			
			
		//	if('onhashchange' in window && window.addEventListener) window.addEventListener('hashchange',function(e){
		//		$.hashPrev=$.hash
		//		$.hash=currentHash()
		//		e.newURL || (e.newURL=window.location.href.split('#')[0]+'#'+$.hash)
		//		e.oldURL || (e.oldURL=window.location.href.split('#')[0]+'#'+$.hashPrev)
		//		$.onHashChange(e)
		//	},false)
		//	else stopID = window.setInterval(checkhash, 100)	
		//	if(ieframe){
		//		checkhash=null
		//		if(stopID!=0) clearInterval(stopID)
		//		stopID = window.setInterval(checkhashIe, 100)
		//	}	
			
		
		////Return object
		//	return $
		//}()),
		
		actions: {
			'navigate': [
				function (detail) {
					if (!detail || !detail.path) return
					location.href = Core.config.baseURL + '/' + encodeURI(detail.path) //+ '?lang=' + Core.config.lang
				}
			],
			'navigate-forward': [
				function () { window.history.forward() }
			],
			'navigate-back': [
				function () { window.history.back() }
			],
			'navigate-home': [
				function () { window.location.href = Core.config.baseURL + 'index.html?lang=' + Core.config.lang }
			]
		}

	
	}

})

//Core.extend(function(Core){
	
//	Core.navigate.openPage = function(anhor){
//		if (anhor && anhor.charAt(0)!='/') return
//		anhor = anhor.substr(1)
		
//		Core.invoke('page-change', {
//			prevpath: Core.navigate.hashPrev,
//			path: Core.navigate.hash,
//			direction: (
//						Core.navigate.hash.split('/').length /
//						(Core.navigate.hashPrev && Core.navigate.hashPrev.split('/').length || 1) >= 1
//						) ? 'forward' : 'back',
//			page: document.getElementById(Core.navigate.hash.substr(1)),
//			prevpage: (Core.navigate.hashPrev) ? document.getElementById(Core.navigate.hashPrev.substr(1)) : undefined
//		})
		
//		return
//	}
//})