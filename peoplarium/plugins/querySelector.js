/*
querySelector plugin ver. 0.7.0
Adds support of document.querySelector() and document.querySelectorAll() in old browsers
(IE7, Opera9, Safari4)


Supported selectors:

tag
tag childtag
tag.classname
.classname
#id
tag#id.classname
*
*.classname   ???????

:root
:nth-child(n/even/odd)  ???????
:nth-last-child(n/even/odd)  ???????
:nth-of-type(n/even/odd) 	???????
:nth-last-of-type(n/even/odd) ???????
:first-child 	
:last-child 	
:first-of-type 	
:last-of-type 	
:only-child 	
:only-of-type 
:empty 	
:link
:hover
:focus 	
:lang(en) 	
:enabled
:disabled 	
:checked 
//always null
:visited 	
:active
:target 
//pseudo elements are always null
::first-line 	
::first-letter 	
::before 	
::after 

tag[attr]
[attr="value"]
[attr~="value"]
[attr^="value"]
[attr*="value"]
[attr$="value"]
[attr|="value"]

:not(selector) 
tag > children 	???????
tag + nextsibling  ???????
tag ~ innertag  ???????

*/

if (!document.querySelector) (function (window, document) {
	

	function matchParentSelecors(el, selector) { //el - current checking element, selector - array of selectors, created from string
		if (!el) return false
		var selector = [].concat(selector)
			
		selector.pop()
		return (function loop(el) {

			if (!selector.length) return true
			if (el.nodeName=='HTML') return false
			
			var isParent, i = selector.length-1, len = selector[i].length-1
			
			/*switch (selector[i].charAt(0)) {
				case '#': isParent = (!/\.|:/.test(selector[i])) ? (selector[i] == '#'+el.parentNode.id) : checkMultipleSelector(el.parentNode, selector[i]); break
				case '.': isParent = checkMultipleSelector(el.parentNode, selector[i]);break //(selector[i] == '.'+el.parentNode.className); break
				case '*':  isParent = (!/#|\.|:/.test(selector[i])) ? true : checkMultipleSelector(el.parentNode, selector[i]); break
				default: isParent = (!/#|\.|:/.test(selector[i])) ? (selector[i].toUpperCase() == el.parentNode.nodeName) : checkMultipleSelector(el.parentNode, selector[i])
			}*/
			
			switch (selector[i].charAt(len)) {
				case '>': isParent = (function(){
						
					}()) ? checkMultipleSelector(el.parentNode, selector[i].substr(0,len)) : false; break
				case '+': isParent = ( checkMultipleSelector(previousObject(el), selector[i].substr(0,len)) ) ? checkMultipleSelector(el.parentNode, selector[i].substr(0,len)) : false; break 
				case '~': isParent = (function(){
						
					}()) ? checkMultipleSelector(el.parentNode, selector[i].substr(0,len)) : false; break
				default: isParent = checkMultipleSelector(el.parentNode, selector[i])
			}
			
			
			
			if (isParent) {selector.pop(); return loop(el.parentNode) }
			else return loop(el.parentNode)
		}(el))	
	}
	
	//Take previous sibling node
	function previousObject(el) {
		var p = el
		do p = p.previousSibling;
		while (p && p.nodeType != 1);
		return p
	}
	
	//Convert Node list to Array
	function nodeListToArray(nodeList){
		var Arr = [], i=0, el
		while (el = nodeList[i++])
			Arr.push(el)
		return Arr
	}
	
	//Convert Node list to Array of elements type:node only
	function childListToArray(nodeList){
		var Arr = [], i=0, el
		while (el = nodeList[i++])
			if (el.nodeType == 1) Arr.push(el)
		return Arr
	}
	
	//check if element is child of another element
	function isChild(el, parent) {
		//console.log('el: '+el+'  parent: '+parent)
		try{
			//if (el.nodeName=='HTML') return false
			if (el.parentNode == null && parent.parentNode == null) return true
			if (el.parentNode==parent) return true
			//if (!el.parentNode) return false
			return isChild(el.parentNode, parent)
		} catch(e){return false}
	}
	
	//Fix for some pseudo-classes
	var Pseudo = {
		hoverElements: (function(){
			if (!('onmouseenter' in document.documentElement)) return []
			
			var elems = document.getElementsByTagName('*'), el, i=0
			while (el = elems[i++]) {
				if (el.attachEvent) (function(el){ 
					el.attachEvent('onmouseenter', function(){
						var elem, i=0
						while (elem = Pseudo.hoverElements[i++])
							if (elem === el) return
						Pseudo.hoverElements.push(el)
					})
					el.attachEvent('onmouseleave', function(){
						var elem, i=0
						while (elem = Pseudo.hoverElements[i++])
							if (elem === el) { Pseudo.hoverElements.splice(i-1,1); return }
					})
				}(el))
			}
			return []
		}()),
		focusElement: (function(){
			var elems = document.getElementsByTagName('*'), el, i=0;
			while (el = elems[i++]) {
				if (el.attachEvent) (function(el){ 
					el.attachEvent('onfocus', function(){Pseudo.focusElement = el})
					el.attachEvent('onblur', function(){Pseudo.focusElement = null})
				}(el))
				else if (el.addEventListener) {
					el.addEventListener('focus', function(){Pseudo.focusElement = this}) 
					el.addEventListener('blur', function(){Pseudo.focusElement = null}) 
				}
			}
			return null
		}())
	}
	
	function checkMultipleSelector(elem, selStr) {
		if (!elem) return false
		var result = false, i, x, len,
			node = {
			id: ( /#/.test(selStr) ) ? (function(){
				var x = selStr.replace(/\[.*\]/, '')
				return x.substring(x.indexOf('#')+1, x.search(/\.|$/))
			}()) : '',
			tag: ( selStr.charAt(0) != '*' ) ? selStr.substr(0, selStr.search(/#|\.|\[/)).toUpperCase() : '*',
			classes: ( /\./.test(selStr.split(/:/)[0]) ) ? selStr.split(/:/)[0].substr(selStr.search(/\./)+1).split(/\./) : [],
			pseudo: ( /:/.test(selStr) ) ? selStr.replace(/:+/g,':').substr(selStr.search(/:/)+1).split(/:/) : [],
			combo: '',
			attr: ( /\[/.test(selStr) ) ? selStr.substring(selStr.indexOf('[')+1, selStr.lastIndexOf(']')).split('][') :[]
		}
		
		/*console.log(node)*/
		//check id
		result = (node.id) ? (node.id == elem.id) : true
		//check tag name
		if (result) result = (node.tag == '*') ? true : (node.tag) ? (node.tag == elem.nodeName) : true
		//check class
		if (result) {
			i = node.classes.length
			while (i--)
				if(elem.className.search('\\b'+node.classes[i]+'\\b')==-1) return false
			result = true
		}
		//check pseudo-class
		if (result) {
			i = node.pseudo.length
			while (i--)
				switch (node.pseudo[i]) {   
					case 'first-child': 
						x = nodeListToArray(elem.parentNode.childNodes)
						//remove all text and atribute nodes at the begining of the Array
						while (x[0].nodeType != 1) x.shift()
						//if element is first node
						if (elem !== x[0]) return false
						break
					case 'last-child':
						x = nodeListToArray(elem.parentNode.childNodes)
						//remove all text and atribute nodes at the end of the Array
						while (x[x.length-1].nodeType != 1)	x.pop()
						//if element is last node
						if (elem !== x[x.length-1]) return false
						break
					case 'first-of-type': if (elem !== elem.parentNode.getElementsByTagName(elem.nodeName)[0]) return false; break
					case 'last-of-type':
						x = elem.parentNode.getElementsByTagName(elem.nodeName)
						if (elem !== x[x.length-1]) return false
						break
					case 'only-child': if (childListToArray(elem.parentNode.childNodes).length != 1) return false; break
					case 'only-of-type': if (elem.parentNode.getElementsByTagName(elem.nodeName).length != 1 ) return false; break
					case 'root': if (elem !== document.firstChild) return false; break
					case 'empty': if (elem.hasChildNodes()) return false; break
					case 'link': if(elem.nodeName != 'A' || !elem.href) return false; break
					case 'hover': if( !function(elem){
							var el, i=0
							while (el = Pseudo.hoverElements[i++])
								if (el === elem) return true
							return false
						}(elem) ) return false; break
					case 'focus': if(elem !== Pseudo.focusElement) return false; break
					case 'enabled': if (elem.disabled) return false; break
					case 'disabled': if (!elem.disabled) return false; break
					case 'checked': if (!elem.checked) return false; break
					
					//not supported pseudo-classes that return null, because of browsers behavior
					case 'visited':
					case 'active': 
					case 'target': 
						/*x = window.location.hash.substr(1)
						if (elem === document.getElementById(x)) break
						var names = document.getElementsByName(x)
						if (!names.length) return false
						len = 0
						while (x = names[len++]) {
							if (elem === x) break
							if (!(x = names[len])) return false
						}
						break*/
					
					//pseudo-elements are always null
					case 'first-line': 
					case 'first-letter': 
					case 'before':
					case 'after': return false
					
					// lang(n), not(n),  nth-child(n), nth-last-child(n), nth-of-type(n), nth-last-of-type(n)
					default:
						if (/^lang\(/.test(node.pseudo[i])) {
							x = node.pseudo[i].replace(/lang\(|\)/g,'')
							x = (function loop(el, lng){
								if (el === document) return false
								var lang = el.getAttribute('lang')
								if (!lang || lang != lng) return loop(el.parentNode, lng)
								return true
							}(elem, x))
							if (!x) return false
							break
						}
						
						if (/^not\(/.test(node.pseudo[i])) {
							x = node.pseudo[i].replace(/not\(|\)/g,'')
							if (checkMultipleSelector(elem, x)) return false
							break
						}
						
						if (/^nth-/.test(node.pseudo[i])) {
							x = node.pseudo[i].substring(node.pseudo[i].indexOf('(')+1, node.pseudo[i].indexOf(')'))
							switch (node.pseudo[i].substr(0,node.pseudo[i].indexOf('('))) {
								case 'nth-child': return false; break
								case 'nth-last-child': return false; break
								case 'nth-of-type': return false; break
								case 'nth-last-of-type': return false; break
							}
						}
						
						throw new Error('An invalid or illegal string was specified')
				}
			result = true
		}
		
		//check attributes
		if (result) {
			i = node.attr.length
			while (i--) {
				x = node.attr[i].substring( node.attr[i].indexOf('"')+1, node.attr[i].lastIndexOf('"') ).replace(';', ' ')
				if ( !/=/.test(node.attr[i]) ) {
					if (elem.getAttribute(node.attr[i]) == null) return false
				} else if ( !/~=|\^=|\$=|\*=|\|=/.test(node.attr[i]) ){ 
					if ( elem.getAttribute( node.attr[i].substr( 0, node.attr[i].indexOf('=') ) ) != x ) return false
				} else if ( /~=/.test(node.attr[i]) ) {
					if ( elem.getAttribute( node.attr[i].substr( 0, node.attr[i].indexOf('~') ) ).search('\^'+x+'\\s\|\\s'+x+'\$\|'+'\^'+x+'\$'+'\|\\s'+x+'\\s') == -1) return false
				} else if ( /\^=/.test(node.attr[i]) ) { 
					if ( elem.getAttribute( node.attr[i].substr( 0, node.attr[i].indexOf('^') ) ).search('\^'+x) == -1) return false
				} else if ( /\$=/.test(node.attr[i]) ) { 
					if ( elem.getAttribute( node.attr[i].substr( 0, node.attr[i].indexOf('$') ) ).search(x+'\$') == -1) return false
				} else if ( /\*=/.test(node.attr[i]) ) {
					if ( elem.getAttribute( node.attr[i].substr( 0, node.attr[i].indexOf('*') ) ).search(x) == -1) return false
				} else if ( /\|=/.test(node.attr[i]) ) {
					if ( elem.getAttribute( node.attr[i].substr( 0, node.attr[i].indexOf('|') ) ).search('\^'+x+'\$\|\^'+x+'-') == -1) return false
				}
			}
			result = true
		}

		return result
	}
	
	
	
	
	
	
														/* querySelector() */	
														
	document.querySelector = querySelectorFunction
	
	function querySelectorFunction(selector) {
		if (!selector) return null
		
		selector = selector.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,'').replace(/\s*\+/g,'+ ').replace(/\s*>/g,'> ').replace(/\s*:\s*/g,':').replace(/\s*=\s*/g,'=').replace(/'/g,'"').replace(/\s*"\s*/g,'"').replace(/\[\s+/,'[').replace(/\\s+]/,']')
		if (/\[/.test(selector)) selector = selector.replace( /\[.*\]/.exec(selector)[0] , /\[.*\]/.exec(selector)[0].replace(/\s+/g, ';') )
		selector = selector.split(/\s+/)
		
		var elem = document
		
		function getElemById(elem,id) {
			//if (elem === document) return document.getElementById(id) //for fast selector
			var el = document.getElementById( /.+(?=\.)|.+$/.exec(id)[0] )
			if (isChild(el, elem) && checkMultipleSelector(el, '#'+id) && matchParentSelecors(el, selector)) return el
			return null
		}

		function getElementByClass(elem,classes) {
			var list, i=0, el, clss = classes.split(/\.|:/)[0]
			//if (!!document.getElementsByClassName) return elem.getElementsByClassName(clss)[0]
			
			if (!!document.getElementsByClassName) { 
				list = elem.getElementsByClassName(clss)
				while (el = list[i++])
					if (checkMultipleSelector(el, '.'+classes) && matchParentSelecors(el, selector)) return el
			}
			
			list = elem.getElementsByTagName('*')
			while (el = list[i++])
				if (el.className.search('\\b'+clss+'\\b')!=-1 && checkMultipleSelector(el, '.'+classes) && matchParentSelecors(el, selector)) return el
			return null	
		}
		
		function getElementByTag(elem,tag) {
			//if (elem === document) return document.getElementsByTagName(tag)[0] //for fast selector
			var list = elem.getElementsByTagName(( /[^A-z|\*]/.test(tag) ) ? tag.substr(0, tag.search(/[^A-z|\*]/)) : tag), 
				i=0, el
			while (el = list[i++])
				if (checkMultipleSelector(el, tag) && matchParentSelecors(el, selector)) return el
			return null
		}
		
		var sel = selector[selector.length-1]
		switch (sel.charAt(0)) {
			case '#': return getElemById(elem, sel.substr(1))
			case '.': return getElementByClass(elem, sel.substr(1))
			default: return getElementByTag(elem, sel)
		}
	}
	
	
	
	
														/* querySelectorAll() */
	
	document.querySelectorAll = querySelectorAllFunction

	
	function querySelectorAllFunction(selector) {
		if (!selector) return null
		
		selector = selector.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,'').replace(/\s*\+/g,'+ ').replace(/\s*>/g,'> ').replace(/\s*:\s*/g,':').replace(/\s*=\s*/g,'=').replace(/'/g,'"').replace(/\s*"\s*/g,'"').replace(/\[\s+/,'[').replace(/\\s+]/,']')
		if (/\[/.test(selector)) selector = selector.replace( /\[.*\]/.exec(selector)[0] , /\[.*\]/.exec(selector)[0].replace(/\s+/g, ';') )
		selector = selector.split(/\s+/)
		
		var elem = document
		
		function getElemsById(elem,id) {
			//if (elem === document) return [document.getElementById(id)] //for fast selector
			var result = document.getElementById( /.+(?=\.)|.+$/.exec(id)[0]  )
			if (isChild(result, elem) && checkMultipleSelector(result, '#'+id) && matchParentSelecors(result, selector)) return [result]
			return []
		}
		
		function getElementsByClass(elem,classes) {
			var list, result = [], i=0, el,
				clss = classes.split(/\.|:/)[0]
			
			if (!!document.getElementsByClassName) { 
				list = elem.getElementsByClassName(clss)
				while (el = list[i++])
					if (checkMultipleSelector(el, '.'+classes) && matchParentSelecors(el, selector)) result.push(el)
				return result
			}
			
			list = elem.getElementsByTagName('*') 
	        while (el = list[i++])
				if (el.className.search('\\b'+clss+'\\b') != -1 && checkMultipleSelector(el, '.'+classes) && matchParentSelecors(el, selector)) result.push(el)
	        return result	
		}
		
		function getElementsByTag(elem,tag) {
			//if (elem === document) return [document.getElementsByTagName(tag)] //for fast selector
			var list = elem.getElementsByTagName(( /[^a-zA-Z|\*]/.test(tag) ) ? tag.substr(0, tag.search(/[^a-zA-Z|\*]/)) : tag), 
				result=[], i=0, el
			while (el = list[i++])
				if (checkMultipleSelector(el, tag) && matchParentSelecors(el, selector)) result.push(el)
			return result
		}
		
		sel = selector[selector.length-1]
		switch (sel.charAt(0)) {
			case '#': return getElemsById( elem, sel.substr(1) ); break
			case '.': return getElementsByClass( elem, sel.substr(1) ); break
			default: return getElementsByTag( elem, sel )
		}
		
	}
}(window, document))
