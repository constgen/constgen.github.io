window.onload = function(){

}

													/* Goggle Analitics */

//var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
//document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
//var pageTracker = _gat._getTracker("UA-829072-2");
//pageTracker._trackPageview();


													/* Проверка на поддержку свойств CSS3 */

	domPrefixes = 'Webkit Moz O ms Khtml'.split(' ')
	testElem = document.createElement('test')
	test_style = testElem.style
	//transitionProperty, backgroundsize, borderimage, boxShadow, animationName, columnCount, boxReflect
	csstransition = test_props_all( 'transitionProperty' )
	
	function test_props_all( prop ) { 
		var uc_prop = prop.charAt(0).toUpperCase() + prop.substr(1)
		props   = (prop + ' ' + domPrefixes.join(uc_prop + ' ') + uc_prop).split(' ')
		return !!test_props( props );
	}
	
	function test_props( props ) {
		for ( var i in props ) {if ( test_style[ props[i] ] !== undefined  ) {return true}}
	}
	
	domPrefixes,testElem,test_style = null
	//alert(csstransition)	
	
	
													/* Эффект меню без CSS3, пока только для IE */					

if(!csstransition){
	var menuitem = document.getElementById('mainmenu').getElementsByTagName('li')
	var len = menuitem.length
	function showitem (){
		$fx(this.getElementsByTagName('ul')[0])
		.fxAdd({type: 'opacity', from: 0, to: 100, step: 5, delay: 10})
		.fxAdd({type: 'width', from: 0, to: 265, step: 20, delay: 1})
		.fxAdd({type: 'left', from: 0, to: -133, step: -10, delay: 1})
		.fxRun()		
	}
	function hideitem (){
		//event = event || window.event
		//event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true
		$fx(this.getElementsByTagName('ul')[0])
		.fxAdd({type: 'opacity', from: 100, to: 0, step: -5, delay: 10})
		.fxAdd({type: 'width', from: 265, to: 0, step: -30, delay: 1})
		.fxAdd({type: 'left', from: -133, to: 0, step: 15, delay: 1})
		.fxRun()
	}
	var i=0; while(i<len){
		if(menuitem[i].getElementsByTagName('ul')[0]){
			menuitem[i].onmouseenter = showitem
			menuitem[i].onmouseleave = hideitem
			//menuitem[i].onmouseover = mouseEnterHandler
			//menuitem[i].onmousout = mouseLeaveHandler
			
		}//end if	
		i++
	}//end while
}

HTMLElement.prototype.mouseenter = function() {
	this.onmouseover = function(){alert(this.innerHTML)}
  	
};

HTMLElement.prototype.mouseleave = function() {
	
	this.onmousout = function(){
		alert('')
	}
  
};

document.getElementById('mainmenu').mouseleave()




/*

function mouseLeaveHandler (e) {
	if (mouse.leave(this, e)) {
		// do your stuff
		alert('')
	}
}
function mouseEnterHandler (e) {
	if (mouse.enter(this, e)) {
		// do your stuff
	}
}

var mouse =
{
	// returns true if c is child of p, or c is parent
	isChildOf: function (p, c)
	{
		while (c && c !== p) { c = c.parentNode; }
		return c === p;
	},
	// returns true only if mouse was in object and just left
	leave: function (o, e)
	{
		e = e || window.event;
		return !this.isChildOf(o, e.relatedTarget || e.toElement);
	},
	// returns true only if mouse was not in object and just entered
	enter: function (o, e)
	{
		e = e || window.event;
		return !this.isChildOf(o, e.relatedTarget || e.fromElement);
	}
}

*/

