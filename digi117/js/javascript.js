																/*Jquery tools plugin min*/
/*
 * jQuery Tools 1.2.5 - The missing UI library for the Web
 * 
 * [tabs, scrollable, toolbox.mousewheel]
 * 
 * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
 * 
 * http://flowplayer.org/tools/
 * 
 * File generated: Wed Sep 22 06:12:55 GMT 2010
 */
(function(c){function p(d,b,a){var e=this,l=d.add(this),h=d.find(a.tabs),i=b.jquery?b:d.children(b),j;h.length||(h=d.children());i.length||(i=d.parent().find(b));i.length||(i=c(b));c.extend(this,{click:function(f,g){var k=h.eq(f);if(typeof f=="string"&&f.replace("#","")){k=h.filter("[href*="+f.replace("#","")+"]");f=Math.max(h.index(k),0)}if(a.rotate){var n=h.length-1;if(f<0)return e.click(n,g);if(f>n)return e.click(0,g)}if(!k.length){if(j>=0)return e;f=a.initialIndex;k=h.eq(f)}if(f===j)return e;
g=g||c.Event();g.type="onBeforeClick";l.trigger(g,[f]);if(!g.isDefaultPrevented()){o[a.effect].call(e,f,function(){g.type="onClick";l.trigger(g,[f])});j=f;h.removeClass(a.current);k.addClass(a.current);return e}},getConf:function(){return a},getTabs:function(){return h},getPanes:function(){return i},getCurrentPane:function(){return i.eq(j)},getCurrentTab:function(){return h.eq(j)},getIndex:function(){return j},next:function(){return e.click(j+1)},prev:function(){return e.click(j-1)},destroy:function(){h.unbind(a.event).removeClass(a.current);
i.find("a[href^=#]").unbind("click.T");return e}});c.each("onBeforeClick,onClick".split(","),function(f,g){c.isFunction(a[g])&&c(e).bind(g,a[g]);e[g]=function(k){k&&c(e).bind(g,k);return e}});if(a.history&&c.fn.history){c.tools.history.init(h);a.event="history"}h.each(function(f){c(this).bind(a.event,function(g){e.click(f,g);return g.preventDefault()})});i.find("a[href^=#]").bind("click.T",function(f){e.click(c(this).attr("href"),f)});if(location.hash&&a.tabs=="a"&&d.find("[href="+location.hash+"]").length)e.click(location.hash);
else if(a.initialIndex===0||a.initialIndex>0)e.click(a.initialIndex)}c.tools=c.tools||{version:"1.2.5"};c.tools.tabs={conf:{tabs:"a",current:"current",onBeforeClick:null,onClick:null,effect:"default",initialIndex:0,event:"click",rotate:false,history:false},addEffect:function(d,b){o[d]=b}};var o={"default":function(d,b){this.getPanes().hide().eq(d).show();b.call()},fade:function(d,b){var a=this.getConf(),e=a.fadeOutSpeed,l=this.getPanes();e?l.fadeOut(e):l.hide();l.eq(d).fadeIn(a.fadeInSpeed,b)},slide:function(d,
b){this.getPanes().slideUp(200);this.getPanes().eq(d).slideDown(400,b)},ajax:function(d,b){this.getPanes().eq(0).load(this.getTabs().eq(d).attr("href"),b)}},m;c.tools.tabs.addEffect("horizontal",function(d,b){m||(m=this.getPanes().eq(0).width());this.getCurrentPane().animate({width:0},function(){c(this).hide()});this.getPanes().eq(d).animate({width:m},function(){c(this).show();b.call()})});c.fn.tabs=function(d,b){var a=this.data("tabs");if(a){a.destroy();this.removeData("tabs")}if(c.isFunction(b))b=
{onBeforeClick:b};b=c.extend({},c.tools.tabs.conf,b);this.each(function(){a=new p(c(this),d,b);c(this).data("tabs",a)});return b.api?a:this}})(jQuery);

(function(e){function p(f,c){var b=e(c);return b.length<2?b:f.parent().find(c)}function u(f,c){var b=this,n=f.add(b),g=f.children(),l=0,j=c.vertical;k||(k=b);if(g.length>1)g=e(c.items,f);e.extend(b,{getConf:function(){return c},getIndex:function(){return l},getSize:function(){return b.getItems().size()},getNaviButtons:function(){return o.add(q)},getRoot:function(){return f},getItemWrap:function(){return g},getItems:function(){return g.children(c.item).not("."+c.clonedClass)},move:function(a,d){return b.seekTo(l+
a,d)},next:function(a){return b.move(1,a)},prev:function(a){return b.move(-1,a)},begin:function(a){return b.seekTo(0,a)},end:function(a){return b.seekTo(b.getSize()-1,a)},focus:function(){return k=b},addItem:function(a){a=e(a);if(c.circular){g.children("."+c.clonedClass+":last").before(a);g.children("."+c.clonedClass+":first").replaceWith(a.clone().addClass(c.clonedClass))}else g.append(a);n.trigger("onAddItem",[a]);return b},seekTo:function(a,d,h){a.jquery||(a*=1);if(c.circular&&a===0&&l==-1&&d!==
0)return b;if(!c.circular&&a<0||a>b.getSize()||a<-1)return b;var i=a;if(a.jquery)a=b.getItems().index(a);else i=b.getItems().eq(a);var r=e.Event("onBeforeSeek");if(!h){n.trigger(r,[a,d]);if(r.isDefaultPrevented()||!i.length)return b}i=j?{top:-i.position().top}:{left:-i.position().left};l=a;k=b;if(d===undefined)d=c.speed;g.animate(i,d,c.easing,h||function(){n.trigger("onSeek",[a])});return b}});e.each(["onBeforeSeek","onSeek","onAddItem"],function(a,d){e.isFunction(c[d])&&e(b).bind(d,c[d]);b[d]=function(h){h&&
e(b).bind(d,h);return b}});if(c.circular){var s=b.getItems().slice(-1).clone().prependTo(g),t=b.getItems().eq(1).clone().appendTo(g);s.add(t).addClass(c.clonedClass);b.onBeforeSeek(function(a,d,h){if(!a.isDefaultPrevented())if(d==-1){b.seekTo(s,h,function(){b.end(0)});return a.preventDefault()}else d==b.getSize()&&b.seekTo(t,h,function(){b.begin(0)})});b.seekTo(0,0,function(){})}var o=p(f,c.prev).click(function(){b.prev()}),q=p(f,c.next).click(function(){b.next()});if(!c.circular&&b.getSize()>1){b.onBeforeSeek(function(a,
d){setTimeout(function(){if(!a.isDefaultPrevented()){o.toggleClass(c.disabledClass,d<=0);q.toggleClass(c.disabledClass,d>=b.getSize()-1)}},1)});c.initialIndex||o.addClass(c.disabledClass)}c.mousewheel&&e.fn.mousewheel&&f.mousewheel(function(a,d){if(c.mousewheel){b.move(d<0?1:-1,c.wheelSpeed||50);return false}});if(c.touch){var m={};g[0].ontouchstart=function(a){a=a.touches[0];m.x=a.clientX;m.y=a.clientY};g[0].ontouchmove=function(a){if(a.touches.length==1&&!g.is(":animated")){var d=a.touches[0],h=
m.x-d.clientX;d=m.y-d.clientY;b[j&&d>0||!j&&h>0?"next":"prev"]();a.preventDefault()}}}c.keyboard&&e(document).bind("keydown.scrollable",function(a){if(!(!c.keyboard||a.altKey||a.ctrlKey||e(a.target).is(":input")))if(!(c.keyboard!="static"&&k!=b)){var d=a.keyCode;if(j&&(d==38||d==40)){b.move(d==38?-1:1);return a.preventDefault()}if(!j&&(d==37||d==39)){b.move(d==37?-1:1);return a.preventDefault()}}});c.initialIndex&&b.seekTo(c.initialIndex,0,function(){})}e.tools=e.tools||{version:"1.2.5"};e.tools.scrollable=
{conf:{activeClass:"active",circular:false,clonedClass:"cloned",disabledClass:"disabled",easing:"swing",initialIndex:0,item:null,items:".items",keyboard:true,mousewheel:false,next:".next",prev:".prev",speed:400,vertical:false,touch:true,wheelSpeed:0}};var k;e.fn.scrollable=function(f){var c=this.data("scrollable");if(c)return c;f=e.extend({},e.tools.scrollable.conf,f);this.each(function(){c=new u(e(this),f);e(this).data("scrollable",c)});return f.api?c:this}})(jQuery);

(function(b){function c(a){switch(a.type){case "mousemove":return b.extend(a.data,{clientX:a.clientX,clientY:a.clientY,pageX:a.pageX,pageY:a.pageY});case "DOMMouseScroll":b.extend(a,a.data);a.delta=-a.detail/3;break;case "mousewheel":a.delta=a.wheelDelta/120;break}a.type="wheel";return b.event.handle.call(this,a,a.delta)}b.fn.mousewheel=function(a){return this[a?"bind":"trigger"]("wheel",a)};b.event.special.wheel={setup:function(){b.event.add(this,d,c,{})},teardown:function(){b.event.remove(this,
d,c)}};var d=!b.browser.mozilla?"mousewheel":"DOMMouseScroll"+(b.browser.version<"1.9"?" mousemove":"")})(jQuery);




																/*Detecting touch device*/
var touchdevice = 'createTouch' in document; //true or false




																/*Навигация по сайту*/
														
// объект Navi для навигации по сайту, используется jQuery
var Navi = {
	//
	menu: '#mainmenu',//id или class
	activeclass: 'active',//class без точки
	content: '#content',//контейнер для контента, id или class
	logo: '#logo', //ссылка на логотип
	hiddenframe: function(){
		if(!-[1,]){
			if(document.getElementById('hiddenframe')==null){
				var iframe = document.createElement('iframe')
				iframe.id = 'hiddenframe'
				iframe.src = ''
				iframe.style.display='none'
				//iframe.style.width='100px';iframe.style.height='100px';iframe.style.position='fixed';
				//iframe.style.left='0';iframe.style.zIndex='1000';iframe.style.top='300px'
				document.getElementsByTagName('body')[0].appendChild(iframe)
				document.getElementById('hiddenframe').contentWindow.document.open()
				document.getElementById('hiddenframe').contentWindow.document.write(this.curPage())
				document.getElementById('hiddenframe').contentWindow.document.close()
				return document.getElementById('hiddenframe').contentWindow.document
			}	
			return document.getElementById('hiddenframe').contentWindow.document
		}
		else return false
	}, //iframe для хака истории <IE9
	
	//Переход на конкретную страницу
	openPage: function(anhor){
		//приведение к нижнему регистру
		anhor = anhor.toLowerCase()
		//можно передавать анхор как с"#" так и без, он убирается в любом случае и передаётся в setPage()
		//при клике на ссылку адрес в строке меняется сам, но надо сделать это только в том случае если он не совпадает с текущим
		if(anhor.indexOf('#')!=-1) {
			if(window.location.hash.toLowerCase() != anhor && this.hiddenframe()==false) window.location.hash = anhor;
			anhor = anhor.split('#')[1]
			
		}
		//или задаём анхор в адресе явно, т.к. он может быть изменён программно
		else if (anhor.length!=0 && this.curPage()!=anhor && this.hiddenframe()==false) window.location.hash = '#'+anhor
		//остальной код в Navi.setPage, т.к. он используется и для истории тоже
		this.setPage(anhor)
		
		this.extend.openPage() //вызов дополнительных функций
		
		return this //возвращает объект Navi
	},
	
	setPage: function(anhor){	
		// анхор уже должен быть без "#"
		if(anhor.length!=0){
			//Активация нужных пункта меню и страницы
			$(this.menu+' a').removeClass(this.activeclass)
			$(this.menu+' a[href="#'+anhor+'"]').addClass(this.activeclass)		
			$(this.content+' > div').hide()
			$('#'+anhor).show()
			$('#bg .wrapper > *').hide()
			$('#bg .wrapper .'+anhor).show()
			
			//iframe для хака истории <IE9
			if(this.hiddenframe()!=false){
				if(this.hiddenframe().getElementsByTagName('body').length!=0 && anhor!=this.hiddenframe().getElementsByTagName('body')[0].innerHTML){
					this.hiddenframe().open()
					this.hiddenframe().write(anhor)
					this.hiddenframe().close()
				}
			}	
		}
		this.specialPage(anhor)
		
		this.extend.setPage() //вызов дополнительных функций
	},
	
	//Уникальные свойства и действия для определённых страниц
	specialPage: function(anhor){
		
		
		//Убрать скроллер на страницах Solutions, Contact и About
		//Показать solutionbar на странице Solutions
		if(anhor=='home' || anhor=='partners' || anhor=='aboutisog' || anhor=='aboutdigi' || anhor=='services' || anhor=='zeniz' || anhor=='contact' || anhor=='solutions' || anhor=='about' || anhor=='ourteam' || 
			anhor=='marketingmanager' || anhor=='salesmanager') {
			$("#scroller, .scroll-prev, .scroll-next").hide()
			$('#wrapper').addClass('fixie')
			if (anhor=='solutions') {$(this.solutionbar).show(); fixSolutionList()}
			else $(this.solutionbar).hide()
			if (anhor=='about' || anhor=='services') {try {ScrollArea.update()} catch(err){}} 
			if (anhor=='marketingmanager' || anhor=='salesmanager') {
				Scrolling.jobsinit()
				$('#mainmenu span').addClass('active')
				$('#mainmenu .submenu').removeClass('hidden')
			} else {
				$('#mainmenu span').removeClass('active')
				$('#mainmenu .submenu').addClass('hidden')
			}
		}
		if(anhor!='work'){
			$("#scroller, .scroll-prev, .scroll-next").hide();
			$('#footer').addClass('mini');
		}
		else {
			$("#scroller, .scroll-prev, .scroll-next").show()
			$('#wrapper').removeClass('fixie')
			$(this.solutionbar).hide()
			$('#mainmenu span').removeClass('active')
			$('#mainmenu .submenu').addClass('hidden')
			$('#footer').removeClass('mini');
		}
		
		//if(anhor=='ourteam' && document.getElementById('ourteam').style.fontSize=='0px') ourteamsize()
		
		//На Главную
		if(anhor=='home' || anhor.length==0) {
			//Активация нужных пункта меню и страницы
			$(this.menu+' a').removeClass(this.activeclass)
			$(this.menu+' a[href="#home"]').addClass(this.activeclass)		
			$(this.content+' > div').hide()
			$('#home').show()
			$('#bg .wrapper > *').hide()
			$('#bg .wrapper .home').show()
			//На главной лого отсутствует
			$(this.logo).hide()
		}
		else $(this.logo).show()

		this.openSolutionbar(anhor) //прямые ссылки на Solutions
		this.openWork(anhor) //прямые ссылки на Work

		this.extend.specialPage() //вызов дополнительных функций
		return this //возвращает объект Navi
	},
	
	//открытие работ по прямой ссылке
	openWork: function(anhor){
		if(/morton|forest|michigan|o_reilly|carfax|bnw|raisethevillage|worldacademy|storm|trickyourride|igolf|enneagram|intersog|btp|3dcoloring_book/i.test(anhor)){
			this.setPage('work')
			$('#scroller a[href="#'+anhor+'"]').trigger('mousedown',[false])
			
			$("#scroller").data("scrollable").seekTo($('#scroller .items').find('div').index($('#scroller .items div:has(a[href="#'+anhor+'"])').get(0)),0)
			
			this.extend.openWork() //вызов дополнительных функций
			return this //возвращает объект Navi
		}
	},
	
	//Особая страница Solutions
	solutions: '#solutions',//id или class
	solutionbar: '#solutionbar',//id или class
	openSolutionbar: function(anhor){
		if(anhor.length!=0 && anhor!='null'){
			anhor = anhor.toLowerCase(); if(anhor.indexOf('#')!=-1) anhor = anhor.split('#')[1]	
			if(/typical|mobileapp|appmarketing|mobileweb|videoads|planing|messaging|consumer|coupons|location|googlemaps|socialgaming|viralvideo|cobranding|datacollection|tracking/i.test(anhor)){
				this.setPage('solutions')
				$(this.solutionbar+' a').removeClass(this.activeclass)
				$(this.solutionbar+' a[href="#'+anhor+'"]').addClass(this.activeclass).trigger('mousedown')
				$(this.solutions).hide()
			}
		}
		else if(anhor=='null'){ // Просто открывается Solutionbar как есть
			$(this.solutions).hide()
		}
		
		this.extend.openSolutionbar() //вызов дополнительных функций
		
		return this //возвращает объект Navi
	},
	
	//Узнать текущую страницу из адресной строки
	curPage: function(){
		var anhor = window.location.hash
		//убирается "#" и сбрасывается регистр
		if(anhor.indexOf('#')!=-1) anhor = anhor.split('#')[1].toLowerCase()
		return anhor
	},
	
	//Узнать текущий пункт меню
	curMenuItem: function(){
		var anhor = $(this.menu+' a.'+this.activeclass).attr('href')
		//убирается "#" и сбрасывается регистр
		if(anhor.indexOf('#')!=-1) anhor = anhor.split('#')[1].toLowerCase()
		return anhor
	},
	
	//История. True или пустая строка - включает, false - отключает
	stopID: 0, //для хранения id setInterval'а
	history: function(value){
		var api = this
		if(value==true){		
			function checkhash(){
				var curMenuItem = $(api.menu+' a.'+api.activeclass).attr('href')
				if(curMenuItem != '#'+api.curPage()) {api.setPage(api.curPage()); api.onHistoryChange()/*return true*/}
				/*return false*/
			}	
			function checkhashIe(){
				var curMenuItem = $(api.menu+' a.'+api.activeclass).attr('href')
				var curPageAnchor = api.hiddenframe().getElementsByTagName('body')[0].innerHTML			
				if(curMenuItem != '#'+curPageAnchor) {api.setPage(curPageAnchor); api.onHistoryChange()/*return true*/}
				/*return false*/
			}
			
			if('onhashchange' in window) window.onhashchange = function(){ api.setPage(api.curPage()); api.onHistoryChange()}
			else this.stopID = window.setInterval(checkhash, 100)	

			if(this.hiddenframe()!=false){ 
				window.onhashchange = null
				if(this.stopID!=0) clearInterval(this.stopID)
				this.stopID = window.setInterval(checkhashIe, 150)
			}
			
		}
		else if(value==false){
			if('onhashchange' in window) window.onhashchange = null;
			if(this.stopID!=0) clearInterval(this.stopID)
		}	
		
		this.extend.history() //вызов дополнительных функций
		
		return this //возвращает объект Navi
	},
	
	onHistoryChange: function(){
		
	},
	
	extend: {
		openPage: function(){},
		setPage: function(){},
		specialPage: function(){},
		openSolutionbar: function(){},
		openWork: function(){},
		history: function(){},
		init: function(){}
	},
	
	//Инициализация настроек поумолчанию
	init: function(){
		var api = this

		api.openPage(api.curPage()) //для загрузки нужной страницы из адресной строки
		api.history(true) //Включить историю переходов (false - отключить, любые другие значения или без значения - включить)

		api.extend.init()
	}

}
//Navi.init() - для активации
										




//Google Analytics 
function GA(ACCOUNT){
	var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
	document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
	
	var hstname = document.location.hostname
	if(/digi117\.com/.test(hstname) && hstname.indexOf("test")==-1){
		$(document).ready(function(){
			//console.log(window.location.pathname+window.location.hash)
			try{_gat._getTracker(ACCOUNT)._trackEvent('Pages', 'Opened', window.location.pathname+window.location.hash)} catch(err) {}
		})
		
		Navi.onHistoryChange = function(){
			//console.log(window.location.pathname+window.location.hash)
			try{_gat._getTracker(ACCOUNT)._trackEvent('Pages', 'Opened', window.location.pathname+window.location.hash)} catch(err) {}
		}
		
		$('#scroller a').mousedown(function(){
			//console.log(this.href.split(window.location.host)[1]);
			try{_gat._getTracker(ACCOUNT)._trackEvent('Work', 'Reviewed', this.href.split(window.location.host)[1])} catch(err) {}
		})
		
		$('#solutionbar a').mousedown(function(){ 
			//console.log(this.href.split(window.location.host)[1]);
			try{_gat._getTracker(ACCOUNT)._trackEvent('Solutions', 'Reviewed', this.href.split(window.location.host)[1])} catch(err) {}
		})
	}
}






										/*Отложенная загрузка элементов страницы и обработка изображений*/
													
// объект Content для загрузки нужных элементов. Переделывание картинок работает только на сервере, в локальной папке не работает, будет пустая картинка (защита безопасности браузеров)
var Content = {
	
	q: 5, //количество иконок на одной странице скроллинга
	
	currentState: function(){
		return Navi.curPage()
	},
	
	//Если зашли с прямой ссылки, то загружается фон нужного объекта
	loadThisPage: function(){
		var anhor = this.currentState()
		/*work page*/if(/morton|forest|michigan|o_reilly|carfax|bnw|raisethevillage|worldacademy|storm|trickyourride|igolf|enneagram|intersog|btp|3dcoloring_book/i.test(anhor)){
			var i = $('#scroller .items a').index($('#scroller .items a[href="#'+anhor+'"]').get(0))
			$('#'+this.workImages[0]+' img').get(i).src = this.workImages[1][i]
			//загрузка миниатюр для текущего экрана
			i = i-i%this.q
			this.loadThumbs(this.workThumbs,i,i+this.q)
		}
		/*solution page*/else if(/typical|mobileapp|appmarketing|mobileweb|videoads|planing|messaging|consumer|coupons|location|googlemaps|socialgaming|viralvideo|cobranding|datacollection|tracking/i.test(anhor)){
			var i = $('#solutionbar a').index($('#solutionbar a[href="#'+anhor+'"]').get(0))
			$('#'+this.solutionImages[0]+' img').get(i).src = this.solutionImages[1][i]
		}
		return {callback: function(func){func()}}
	},
	
	loadInstant: function(anhor){
		var anhor = anhor || null
		/*work page*/if(/morton|forest|michigan|o_reilly|carfax|bnw|raisethevillage|worldacademy|storm|trickyourride|igolf|enneagram|intersog|btp|3dcoloring_book/i.test(anhor)){
			var i = $('#scroller .items a').index($('#scroller .items a[href="'+anhor+'"]').get(0))
			$('#'+this.workImages[0]+' img').get(i).src = this.workImages[1][i]
		}
		/*solution page*/else if(/typical|mobileapp|appmarketing|mobileweb|videoads|planing|messaging|consumer|coupons|location|googlemaps|socialgaming|viralvideo|cobranding|datacollection|tracking/i.test(anhor)){
			var i = $('#solutionbar a').index($('#solutionbar a[href="'+anhor+'"]').get(0))
			$('#'+this.solutionImages[0]+' img').get(i).src = this.solutionImages[1][i]
		}
		return {callback: function(func){func()}}
	},
	
	loadBg: function(request,from,to){//from,to (1;inf)
		var i,
			p=0,
			elem = document.getElementById(request[0]).getElementsByTagName('img'),
			len = elem.length;
		from = from-1 || 0; if(from < 1) from = 0; if(from > len) from=len-1
		to = to || len; if(to < 1) to=1; if(to > len) to=len
		i = from; len = to	
		loadloop(i)
		
		function loadloop(i){
			if(i<len){
				elem[i].onload = (function(){
					return function(event) {	
						i++; loadloop(i)	
					}
				})()
				if(	
					/index.html|preloader.gif|0.gif|#/i.test(elem[i].src) ||
					elem[i].src==''||
					elem[i].src.lastIndexOf('/')+1==elem[i].src.length 
				) elem[i].src=request[1][i];
				else {i++; loadloop(i)}
				//console.log(elem[i].src)
			}
		}
		
		return {callback: function(func){func()}}
	},
	
	loadThumbs: function(request,from,to){//from,to (1;inf)
		var i,
			img = new Array(),
			elem = document.getElementById('scroller').getElementsByTagName('div')[0].getElementsByTagName('a'),
			len = elem.length,
			pthname = window.location.pathname;
		from = from-1 || 0; if(from < 1) from = 0; if(from > len) from=len-1
		to = to || len; if(to < 1) to=1; if(to > len) to=len
		i = from; len = to	
		while (i<len){
			if(/\/tab|\/m/.test(pthname)) request[i]='../'+request[i] //для других версий сайта
			if(
				/index.html|preloader.gif|0.gif|#/i.test(elem[i].getElementsByTagName('img')[0].src) ||
				elem[i].getElementsByTagName('img')[0].src=='' ||
				elem[i].getElementsByTagName('img')[0].src.lastIndexOf('/')+1==elem[i].getElementsByTagName('img')[0].src.length
			){
				/*mozilla natively, use same image*/ if($.browser.mozilla){
					elem[i].getElementsByTagName('img')[0].src = request[i] 
				}
				/*or use canvas*/else  if(!!document.createElement('canvas').getContext){
					img[i] = new Image()
					img[i].onload = (function(elem,image){
						return function(event) {	
							elem.getElementsByTagName('img')[0].src = grayscaleImage(image)
						}
					})(elem[i],img[i])
					img[i].src = request[i] 
				}   
				/*or use images*/ else{ 
					elem[i].getElementsByTagName('img')[0].src = request[i].slice(0,request[i].lastIndexOf('.'))+'-gray'+request[i].slice(request[i].lastIndexOf('.'))
				} 
			}

			if(
				/index.html|preloader.gif|0.gif|#/i.test(elem[i].getElementsByTagName('img')[1].src) ||
				elem[i].getElementsByTagName('img')[1].src=='' ||
				elem[i].getElementsByTagName('img')[1].src.lastIndexOf('/')+1==elem[i].getElementsByTagName('img')[1].src.length
			) elem[i].getElementsByTagName('img')[1].src = request[i] 
			
			i++
		}
		return {callback: function(func){func()}}
	},
	
	insertAnchors: function(request){
		var i=0,
			elem = document.getElementById('scroller').getElementsByTagName('div')[0].getElementsByTagName('a'),
			len=elem.length;
		while (i<len){
			if(elem[i].href.lastIndexOf('#')+1==elem[i].href.length||elem[i].href=='') elem[i].href='#'+request[i].replace(/gallery\/work\/thumb_/, "").replace(/\.png/, "") 
			i++
		}
		return {callback: function(func){func()}}
	},
	
	//Чёрно-белые картинки на главной
	grayIndexImages: function(){
		var i=0,
			img = new Array(),
			elem = document.getElementById('scroller').getElementsByTagName('div')[0].getElementsByTagName('div')[0].getElementsByTagName('a'),
			len=elem.length;
		while (i<len){
			/*mozilla natively, use same image*/ if( $.browser.mozilla){}
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
				elem[i].getElementsByTagName('img')[0].src = elem[i].getElementsByTagName('img')[0].src.slice(0,elem[i].getElementsByTagName('img')[0].src.lastIndexOf('.'))+'-gray'+elem[i].getElementsByTagName('img')[0].src.slice(elem[i].getElementsByTagName('img')[0].src.lastIndexOf('.'))
			}
			
			i++  
		}
		return {callback: function(func){func()}}
	},
	
	//Чёрно-белые картинки контактов
	grayContactImages: function(){
		var i=0,
			img = new Array(),
			elem = document.getElementById('contact').getElementsByTagName('img'),
			len=elem.length;
		while (i<len){
			/*use canvas*/ if(!!document.createElement('canvas').getContext){	
				if(elem[i].complete) elem[i].src = grayscaleImage(elem[i],690,679)
				else{
					img[i] = new Image()
					img[i].src = elem[i].src
					img[i].onload = (function(elem,image){
						return function(event) { elem.src = grayscaleImage(image,690,679) }
					})(elem[i],img[i])
				}
			}
			/*or use images*/else{
				elem[i].src = elem[i].src.slice(0,elem[i].src.lastIndexOf('.'))+'-gray'+elem[i].src.slice(elem[i].src.lastIndexOf('.'))
			}
			i+=2  
		}
		return {callback: function(func){func()}}
	},	
	
	//Чёрно-белые картинки в OUR TEAM
	grayOurteam: function(){
		var i=0,
		img = new Array(),
		elem = document.getElementById('ourteam').getElementsByTagName('img'),
		len=elem.length;
		if($.browser.mozilla){}/*mozilla natively use same image*/ 
		else while (i<len){
			/*or use canvas*/ if(!!document.createElement('canvas').getContext && elem[i].className=='gray'){	
				img[i] = new Image()
				img[i].src = elem[i].src	
				if(img[i].complete) elem[i].src = grayscaleImage(img[i])
				else{
					img[i].onload = (function(elem,image){
						return function(event) { elem.src = grayscaleImage(image) }
					})(elem[i],img[i])
				}
			}
			/*or use images*/else if(elem[i].className=='gray'){
				var imagesrc = elem[i].src
				elem[i].src = imagesrc.slice(0,imagesrc.lastIndexOf('.'))+'-gray'+imagesrc.slice(imagesrc.lastIndexOf('.'))	
			}
			i++ 
		}

		return {callback: function(func){func()}}
	},	
	
	workImages: [
		'work-gallery',
		[
			'gallery/work/img_morton.jpg',
			'gallery/work/img_forest.jpg',
			'gallery/work/img_michigan.jpg',
			'gallery/work/img_o_reilly.jpg',
			'gallery/work/img_carfax.jpg',
			'gallery/work/img_bnw.jpg',
			'gallery/work/img_raisethevillage.jpg',
			'gallery/work/img_worldacademy.jpg',
			'gallery/work/img_storm.jpg',
			'gallery/work/img_trickyourride.jpg',
			'gallery/work/img_enneagram.jpg',
			'gallery/work/img_intersog.jpg',
			'gallery/work/img_btp.jpg',
			'gallery/work/img_3dcoloring_book.jpg',
			'gallery/work/img_hippie.jpg'
		]
	],
	
	workThumbs: [
		'gallery/work/thumb_morton.png',
		'gallery/work/thumb_forest.png',
		'gallery/work/thumb_michigan.png',
		'gallery/work/thumb_o_reilly.png',
		'gallery/work/thumb_carfax.png',
		'gallery/work/thumb_bnw.png',
		'gallery/work/thumb_raisethevillage.png',
		'gallery/work/thumb_worldacademy.png',
		'gallery/work/thumb_storm.png',
		'gallery/work/thumb_trickyourride.png',
		'gallery/work/thumb_enneagram.png',
		'gallery/work/thumb_intersog.png',
		'gallery/work/thumb_btp.png',
		'gallery/work/thumb_3dcoloring_book.png',
		'gallery/work/thumb_hippie.png'
	],
	
	solutionImages: [
		'solutions-gallery',
		[
			'gallery/solutions/img_typical.jpg',
			'gallery/solutions/img_mobileapp.jpg',
			'gallery/solutions/img_appmarketing.jpg',
			'gallery/solutions/img_mobileweb.jpg',
			'gallery/solutions/img_videoads.jpg',
			'gallery/solutions/img_planing.jpg',
			'gallery/solutions/img_messaging.jpg',
			'gallery/solutions/img_consumer.jpg',
			'gallery/solutions/img_coupons.jpg',
			'gallery/solutions/img_location.jpg',
			'gallery/solutions/img_googlemaps.jpg',
			'gallery/solutions/img_socialgaming.jpg',
			'gallery/solutions/img_viralvideo.jpg',
			'gallery/solutions/img_cobranding.jpg',			
			'gallery/solutions/img_datacollection.jpg',
			'gallery/solutions/img_tracking.jpg'	
		]
	],
	
	solutionIcons: [
		'gallery/solutions/icon_typical.png',
		'gallery/solutions/icon_mobileapp.png',
		'gallery/solutions/icon_appmarketing.png',
		'gallery/solutions/icon_mobileweb.png',
		'gallery/solutions/icon_videoads.png',
		'gallery/solutions/icon_planing.png',
		'gallery/solutions/icon_messaging.png',
		'gallery/solutions/icon_consumer.png',
		'gallery/solutions/icon_coupons.png',
		'gallery/solutions/icon_location.png',
		'gallery/solutions/icon_googlemaps.png',
		'gallery/solutions/icon_socialgaming.png',
		'gallery/solutions/icon_viralvideo.png',
		'gallery/solutions/icon_cobranding.png',			
		'gallery/solutions/icon_datacollection.png',
		'gallery/solutions/icon_tracking.png'	
	]
	
	
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







											/*Задание положения ссылок на фоне страницы Solutions*/				
//вертикально положение задано в css
function fixSolutionList(){
//вычисление ширины и горизонтального положения
	var w //ширина изображение
	if($('#solutions-bg').width()!=0) w = $('#solutions-bg').width() 
	else { //альтернативный способ вычисления высоты
		var ratio //соотношение сторон изображения, если атрибуты картинки не указаны то используется коеф. 1,969057665260197
		ratio = ($('#solutions-bg').attr('width'))? ($('#solutions-bg').attr('width')/$('#solutions-bg').attr('height')) : 1,969057665260197
		w = $('#solutions-bg').height()*ratio
	}
	
	var w2 = $('#solutions .bg').width() //ширина контейнера изображения
	var width = w*0.24714
	var left = (w2-w)/2+w*0.40928                
	$('#solutions .list').css({width:width, left:left})
	width = w*0.10714
	left = (w2-w)/2+w*0.18214 
	$('#solutions .typical').css({width:width, left:left})
//исправление вертикального подложения в браузерах Opera, Safari и ИЕ<8
	if($.browser.opera || $.browser.safari || ($.browser.msie && $.browser.version.slice(0,1)<=7)){
		function fixHeight(objArr, percent, full100){
			var height = Math.floor(full100*percent)	
			var i=objArr.length
			var ost = full100-height*i //лишние пикселы , которые надо распределить	
			$.each(objArr, function(i, value) {
				var h
				h = (ost>=i-1)?(height+1):height
				objArr[i].style.height = h+'px'
			})
		}

		if($.browser.msie && $.browser.version.slice(0,1)<=6) { //ИЕ6 не умеет считать высоту в %
			$('#solutions .bg .list').height( $('#solutions .bg').height()*0.51858 )
			$('#solutions .bg .typical').height( $('#solutions .bg').height()*0.20675 )
		}
		fixHeight($('#solutions .bg .list').find('a')/*массив ссылок*/, 0.066/*высота ссылки относительно списка*/, $('#solutions .bg .list').height()/* высота списка*/)	
	}
	
}

//исправление ширины иконок Solutions для маленьких разрешений в Opera
if($.browser.opera && $(window).width()<1000){
	function fixIconWidth(objArr, percent, full100){
		var width = Math.floor(full100*percent)	
		var i=objArr.length
		var ost = full100-width*i //лишние пикселы , которые надо распределить	
		$.each(objArr, function(i, value) {
			var w
			w = (ost>=i-1)?(width+1):width
			objArr[i].style.width = w+'px'
		})
	}
	
	function fixOperaIcons(){ fixIconWidth($('#solutionbar').find('a'), 0.0625, $('#solutionbar').width()) }
	$(window).resize(fixOperaIcons)
}

$(window).resize(fixSolutionList)




											/*Cмещение подсказок, выпирающих за экран*/


function fixTooltip(a){
	var tooltip = a.getElementsByTagName('h5')[0]

	function offsetPosition(elm){
		var left = 0, top  = 0;
		var right = elm.offsetWidth, bottom = elm.offsetHeight;
		while (elm.offsetParent){
			left += elm.offsetLeft
			top  += elm.offsetTop
			elm	 = elm.offsetParent
		}	
		left += elm.offsetLeft
		top  += elm.offsetTop
		right = (window.innerWidth||document.body.clientWidth)-right-left
		bottom = (window.innerHeight||document.body.clientHeight)-bottom-top
		return {x:left, y:top, x2: right, y2: bottom}
	}
	
	offset = offsetPosition(tooltip)
	if(offset.x<0) {
		if (!tooltip.getElementsByTagName('span')[0]) tooltip.innerHTML += '<span class="after"></span>'
		var span = tooltip.getElementsByTagName('span')[0]
		span.style.marginLeft=offset.x-span.offsetWidth/2+'px'
		tooltip.className = 'fixed'
		tooltip.style.right = offset.x+'px'
	}
	if(offset.x2<0) {
		if (!tooltip.getElementsByTagName('span')[0]) tooltip.innerHTML += '<span class="after"></span>'
		var span = tooltip.getElementsByTagName('span')[0]
		span.style.marginLeft=-offset.x2-span.offsetWidth/2+'px'
		tooltip.className = 'fixed'
		tooltip.style.left = offset.x2+'px'
	}
}






													/*Javascript scrolling*/

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

var Scrolling = {
	
	dragMaster: function(textscroller, coef, topspace){
		var mouseOffset
		var api = this
		
		// получить сдвиг target относительно курсора мыши
		function getMouseOffset(target, e) {
			var docPos	= api.getPosition(target)
			// TouchOffset
			if (e.touches) {
				var touch =  e.touches[0] || e.changedTouches[0] || e.targetTouches[0]
				return {x:touch.pageX - docPos.x, y:touch.pageY - docPos.y}
			}
			// or MouseOffset
			return {x:e.pageX - docPos.x, y:e.pageY - docPos.y}
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
			document.ondragstart = document.body.onselectstart = function() {return false}
		}
		function removeDocumentEventHandlers() {
			document.onmousemove = document.onmouseup = document.ondragstart = document.body.onselectstart = document.ontouchmove = document.ontouchend = null
		}
		
		//Прокрутка с помощью жестов над текстом
		var touchOffset
		var topOffset
		textscroller.ontouchstart = function(e){ 
			touchOffset = (function(target, e){
				var touch = e.touches[0] || e.changedTouches[0] || e.targetTouches[0] 
				return {x:touch.pageX + target.scrollLeft, y:touch.pageY + target.scrollTop} 
			}(this, e))
			textscroller.ontouchmove = scrollerMove
			return false
		}	
		function scrollerMove(e){
			var touch = e.touches[0] || e.changedTouches[0] || e.targetTouches[0]
			textscroller.scrollTop = touchOffset.y-touch.pageY
			return false
		}
		textscroller.ontouchend = function(){textscroller.ontouchmove = textscroller.ontouchend = null}

		return {
			makeDraggable: function(element){
				element.onmousedown = mouseDown
				element.ontouchstart = touchDown //for touch device
			}
		}
	
	},
	
	 getPosition: function(e){
		var left = 0
		var top  = 0
		while (e.offsetParent){
			left += e.offsetLeft
			top  += e.offsetTop
			e	 = e.offsetParent
		}	
		left += e.offsetLeft
		top  += e.offsetTop
		return {x:left, y:top}
	},

	init: function(textscroller, scrollbar, dragger){
		if (!textscroller) return
		var textscroller_height = $(textscroller).height() //высота блока с прокруткой
		var textscroller_innerHeight = $(textscroller.getElementsByTagName('article')[0]).outerHeight() //высота контента в блоке с прокруткой
		
		if(
			/auto|scroll/i.test($(textscroller).css('overflow-y')) && 
			textscroller_height<textscroller_innerHeight
		){scrollbar.style.display = 'block'}
		else {scrollbar.style.display = 'none'; dragger.style.top=0}

		//try catch ,т.к. может быть деление на 0
		try {dragger.style.height=(textscroller_height/textscroller_innerHeight*100+'%')} 
		catch (e){}
		//коеффициент ускорения проерутки при передвижении скроллбара курсором
		var coef = textscroller_innerHeight/$(scrollbar).height()
		//отступ сверху, необходима для правильной прокрутки
		var topspace = this.getPosition(scrollbar).y
		
		textscroller.onscroll = moveScroll
		function moveScroll(){dragger.style.top=parseInt(textscroller.scrollTop)/textscroller_innerHeight*100+'%'}
		
		this.dragMaster(textscroller, coef, topspace).makeDraggable(dragger) //привязка Drag & Drop к скроллеру
		
		if(textscroller_height==textscroller_innerHeight) {
			scrollbar.style.display = 'none'
			textscroller.ontouchstart = function(){document.body.removeEventListener('touchmove', noScroll, false)}
			textscroller.ontouchend = function(){document.body.addEventListener('touchmove', noScroll, false)}
			textscroller.style.padding=0; 
			$('#about .wrapper').get(0).style.overflow='visible'
		}
		
		//Прокрутка стрелками вверх/вниз
		$('.arrow-up').mousedown(function(){textscroller.scrollTop+=-40})
		$('.arrow-down').mousedown(function(){textscroller.scrollTop+=40})
		if(touchdevice){
			document.getElementsByClassName('arrow-up')[0].ontouchstart = function(){textscroller.scrollTop+=-40; return false}
			document.getElementsByClassName('arrow-down')[0].ontouchstart = function(){textscroller.scrollTop+=40; return false}
		}
			
		$(textscroller).mousewheel(function(e){e.stopPropagation()}) 
				
		$(document).mousewheel(wheel) 
		
		 	
		function wheel(e,delta) {
			e.preventDefault();
			if(delta>0) textscroller.scrollTop+=-30
			else textscroller.scrollTop+=30
			/*if(delta>0) scroll_top(textscroller,-40)
			else scroll_top(textscroller,40)*/
		}
		
	},
	
	jobsinit: function(){
		
		var Jobs = [
			 {
				textscroller: $('#marketingmanager .textscroller').get(0),
				scrollbar: $('#marketingmanager .scrollbar').get(0),
			 	dragger: $('#marketingmanager .dragger').get(0)
			 },
			 {
				textscroller: $('#salesmanager .textscroller').get(0),
				scrollbar: $('#salesmanager .scrollbar').get(0),
			 	dragger: $('#salesmanager .dragger').get(0)
			 }

		]
		
		var i=0, job, textscroller, scrollbar, dragger
		while (job = Jobs[i++]) {
			textscroller = job.textscroller
			scrollbar = job.scrollbar
			dragger = job.dragger
			
			if (!textscroller) continue
			var textscroller_height = $(textscroller).height() //высота блока с прокруткой
			var textscroller_innerHeight = $(textscroller.getElementsByTagName('article')[0]).outerHeight() //высота контента в блоке с прокруткой
			
			if(
				/auto|scroll/i.test($(textscroller).css('overflow-y')) && 
				textscroller_height<textscroller_innerHeight
			){scrollbar.style.display = 'block'}
			else {scrollbar.style.display = 'none'; dragger.style.top=0}
	
			//try catch ,т.к. может быть деление на 0
			try {dragger.style.height=(textscroller_height/textscroller_innerHeight*100+'%')} 
			catch (e){}
			//коеффициент ускорения проерутки при передвижении скроллбара курсором
			var coef = textscroller_innerHeight/$(scrollbar).height()
			//отступ сверху, необходима для правильной прокрутки
			var topspace = this.getPosition(scrollbar).y
			
			var moveScroll = (function(dragger, textscroller, textscroller_innerHeight){ return function(){dragger.style.top=parseInt(textscroller.scrollTop)/textscroller_innerHeight*100+'%'} }(dragger, textscroller, textscroller_innerHeight))
			textscroller.onscroll = moveScroll
			
			this.dragMaster(textscroller, coef, topspace).makeDraggable(dragger) //привязка Drag & Drop к скроллеру
			
			if(textscroller_height==textscroller_innerHeight) {
				scrollbar.style.display = 'none'
				textscroller.ontouchstart = function(){document.body.removeEventListener('touchmove', noScroll, false)}
				textscroller.ontouchend = function(){document.body.addEventListener('touchmove', noScroll, false)}
				textscroller.style.padding=0; 
				$('#about .wrapper').get(0).style.overflow='visible'
			}
			
			//Прокрутка стрелками вверх/вниз
			$('.arrow-up').mousedown(function(){textscroller.scrollTop+=-40})
			$('.arrow-down').mousedown(function(){textscroller.scrollTop+=40})
			if(touchdevice){
				document.getElementsByClassName('arrow-up')[0].ontouchstart = function(){textscroller.scrollTop+=-40; return false}
				document.getElementsByClassName('arrow-down')[0].ontouchstart = function(){textscroller.scrollTop+=40; return false}
			}
				
			$(textscroller).mousewheel(function(e){e.stopPropagation()}) 
			
			var wheel = (function(textscroller){ return function (e,delta) {
				e.preventDefault();
				if(delta>0) textscroller.scrollTop+=-30
				else textscroller.scrollTop+=30
				/*if(delta>0) scroll_top(textscroller,-40)
				else scroll_top(textscroller,40)*/
			} }(textscroller))
			//$(document).mousewheel(wheel) 
			
				
			
		}//end while
	}

};





												/*OUR TEAM resizable layout*/


$(document).ready(function(){
	var leader = $('#ourteam .teamleader')
	var photo = $('#ourteam .teamleader .photo')
	
	function activateTeamleader(e){
		if(e) e.preventDefault();
		leader.removeClass('active')
		$(this).parent().addClass('active')
	}
	
	photo.each(function(){
		this.onclick = activateTeamleader
		//bind for touch device
		this.ontouchstart = activateTeamleader	
	})
	ourteamsize()
})

function ourteamsize(){
	var ourteam = document.getElementById('ourteam'), homelay = document.getElementById('home'), zeniz = document.getElementById('zeniz'), partners = document.getElementById('partners'), partisog = document.getElementById('aboutisog'), aboutcombo = document.getElementById('aboutcomboapp'), content = document.getElementById('content'), aboutdigi = document.getElementById('aboutdigi')
		h = content.offsetHeight
		w = content.offsetWidth
		//console.log(h)
	if(h<650 || w<1000){
		//ourteam.style.fontSize=h/660*10+'px'
		//ourteam.style.fontSize=w/1000*10+'px'
		homelay.style.fontSize= ( (document.body.offsetWidth-100>document.body.offsetHeight)?(h/654):(w/1000) )*9+'px';
		zeniz.style.fontSize= ( (document.body.offsetWidth-100>document.body.offsetHeight)?(h/654):(w/1000) )*10+'px';
		partisog.style.fontSize= ( (document.body.offsetWidth-100>document.body.offsetHeight)?(h/654):(w/1000) )*11+'px';
		aboutdigi.style.fontSize= ( (document.body.offsetWidth-100>document.body.offsetHeight)?(h/654):(w/1000) )*10+'px';
		aboutcombo.style.fontSize= ( (document.body.offsetWidth-100>document.body.offsetHeight)?(h/654):(w/1000) )*10+'px';
	} else{ 
		homelay.style.fontSize='9px';
		zeniz.style.fontSize='';
		partisog.style.fontSize='';
		aboutdigi.style.fontSize='';
		aboutcombo.style.fontSize='';
	}
	
	if(h<650 || document.body.offsetWidth<1150){
		ourteam.style.fontSize= ( (document.body.offsetWidth-100>document.body.offsetHeight)?(h/654):(w/1150) )*9+'px';
	} else {
		ourteam.style.fontSize='9px';
	}
	
	if(h<650 || w<1000) {
	    partners.style.fontSize = Math.pow((h/650)*(w/1100), 0.3)*10+'px';    // Высота отрисовки блока текста квадратно пропорциональна fontSize и обратно пр. ширине.
	}                                                                         // Но степень не 0.5 а 0.3 для красоты - чем больше экран тем просторнее, больше воздуха. 
	else {
		partners.style.fontSize='10px';
	}
}

$(window).resize(ourteamsize);








												/*JOBS form*/

$(document).ready(function(){
	
	$('.jobs .applyjob').click(function(form){
		var top = $(this).parents('.jobs').find('form').eq(0).position().top ;
		$(this).parents('.textscroller').eq(0).animate({scrollTop:  top}, 800);
		return false
	})
	
	/*Max charecters for textarea*/
	function updateChar(){ 
		if (this.value.length > 150) this.value = this.value.substr(0,150)
		$(this).next('.characters').children('span').html(this.value.length)
	}
	$('.maxcharacters').each(updateChar)
	$('.maxcharacters').bind('change keyup', updateChar)
	
	/*Style input[type="file"]*/
	$('form').each(function(){
		StyleForm(this,'input[type="file"]')	
	})
	
	/*Hover effect on input[type="file"]*/
	$('.file input[type="file"]')
	.mouseenter(function(){$(this).prev('button').addClass('hover')})
	.mouseleave(function(){$(this).prev('button').removeClass('hover')})
	
	/*Checking validity of Resume field. Must fill textarea or choose file. Must be switch between them*/
	function checkResumeValidity(){
		var resume = $(this).parents('.resume').get(0)
		if (!resume.value) resume.value = this.value
		resume.checkValidation()
	}
	
	$('.resume').each(function(){
		$(this).find('textarea').bind('change keyup', checkResumeValidity)
		$(this).find('input[type="file"]').bind('change', checkResumeValidity)
		
		$(this).find('.switchtopaste, .attach .button').click(function(){
			$(this).parent().css({height: 0}).parent().find('.paste').css({height: ''})
			if (!-[1,]) $(this).parent().parent().find('.attach .file div').css({visibility: 'hidden'}).next().css({visibility: 'hidden'})
			Scrolling.jobsinit()
		})	
		$(this).find('.switchtoattach, .paste .button').click(function(){
			$(this).parent().css({height: 0}).parent().find('.attach').css({height: ''})
			if (!-[1,]) $(this).parent().parent().find('.attach .file div').css({visibility: 'visible'}).next().css({visibility: 'visible'})
			Scrolling.jobsinit()
		})
		
	})
	
	/*Apply width LinkedIN*/
	$('.linkedin_button').click(function(){
		var a = $('.IN-widget a').get(0)
		if (a) {
			try { a.click() }
			catch (err) {
				var e = document.createEvent('MouseEvent')
				e.initMouseEvent('click', true, true, window, 0, 
								0, 0, 0, 0, 
								false, false, false, false, 
								0, a)
				a.dispatchEvent(e)
			}
		} else if (LinkedInData.firstName)
			fillFormFields()
		
		return false
	})
	
	
	/*Scroll to error*/
	ValidForm.oninvalid = function(form){
		var f = $(form),
			top = f.eq(0).position().top + f.find('h2').eq(0).position().top +f.find('h2').eq(0).outerHeight()+3
		f.parents('.textscroller').eq(0).animate({scrollTop:  top}, 800);
	}
	
	
	
	/*Sucsess alert*/
	var frame = $('#formframe'),
		alertmessage = $('#submitsuccess'),
		status = ''
		
	alertmessage.children('.close').click(function(){alertmessage.hide()})
	
	frame.bind('load', function(){
		if (frame.get(0).contentWindow.document.body.innerHTML == '1') {
			alertmessage.children('.alert').html('Thank you!')
			alertmessage.children('p').html('Your resume has been sent successfully!\n Our manager will check your CV and will  contact you if you are right for this position.')
			alertmessage.removeClass('error')
			alertmessage.show()
		} else if (frame.get(0).contentWindow.document.body.innerHTML == '0') {
			alertmessage.children('.alert').html('Something went wrong')
			alertmessage.children('p').html('We could not send your form data. Please check the fields again and submit the form.')
			alertmessage.addClass('error')
			alertmessage.show()
		} 

	})
});

/*Validation style*/
ValidForm.options = {behavior: 'messagelist'}



															/*LinkedIN*/
function LinkedInLoad(){
	//console.log('LinkedIn loaded')
	IN.Event.on(IN, "auth", function(){
		//console.log('LinkedIn Auth')
		$('.linkedin_button').addClass('loading').children('span').get(0).innerHTML = '&nbsp;Loading...'
		IN.API.Profile('me').fields(
			"first-name",
			"last-name",
			"id",
			"phone-numbers",
			"member-url-resources:(url)",
			"public-profile-url"
		).result(LinkedInApply)
	});
	//IN.Event.on(IN, "logout", function() { console.log('logout') })
	//IN.User.logout()
	
}

var LinkedInData = {}

function fillFormFields(){
	$('[name="firstname"]').each(function(){ this.value = LinkedInData.firstName })
	$('[name="lastname"]').each(function(){ this.value = LinkedInData.lastName })
	//$('[name="email"]').each(function(){ this.value = LinkedInData.email })
	//$('[name="phone"]').each(function(){ this.value = LinkedInData.phone })
	$('[name="linkedin"]').each(function(){ this.value = LinkedInData.url })
	//$('[name="resumetext"]').each(function(){ this.value = LinkedInData.resume })
	$('[name="sites"]').each(function(){ this.value = LinkedInData.sites })
}

function LinkedInApply(profiles){
	//console.log('LinkedIn apply')
	LinkedInData = {
		firstName: profiles.values[0].firstName || '',
		lastName: profiles.values[0].lastName || '',
		email: '',
		phone: profiles.values[0].phoneNumbers._total || '',
		url: profiles.values[0].publicProfileUrl || '',
		resume: '',
		sites: (function(){
			if(profiles.values[0].memberUrlResources.values) { 
				return (profiles.values[0].memberUrlResources.values[0] ? profiles.values[0].memberUrlResources.values[0].url : '')+
				(profiles.values[0].memberUrlResources.values[1] ? ', '+ profiles.values[0].memberUrlResources.values[1].url : '')+
				(profiles.values[0].memberUrlResources.values[2] ? ', '+ profiles.values[0].memberUrlResources.values[2].url : '')
			} else return ''
		}())
	}
	
	$('.linkedin_button.loading').removeClass('loading').children('span').eq(0).html('Apply width') 
	
	fillFormFields()
}
	
	


													/*Tabs*/
var Tab = {
	options: {
		activeClass: 'current',
		events: 'click'
	},
	onafterswitch: function () {
		if (window.ScrollArea) ScrollArea.update()
	}
}

//reset casestudies on portfolio switch
jQuery(document).ready(function(){
	jQuery('#scroller').mousedown(function(){
		Tab.reset($('#casestudies > .current').get(0))
	})
})




$(window).resize(function(){
	try {ScrollArea.update()} catch(err){}
})


//My Shit
jQuery(document).ready(function(){
  $('.appslist').delegate('img:not(.current)', 'click', function() {
    $(this).addClass('current').siblings().removeClass('current')
      .parents('div#apps-tabs').find('div.comboapp-tab').hide().eq($(this).index()).fadeIn(250);
  })
})