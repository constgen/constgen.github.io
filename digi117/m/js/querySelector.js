/*
querySelector plugin ver. 0.3.1
*/

if(!document.querySelector) {
	
	
	
	function matchParentSelecors(el, selector) { //el - current checking element, selector - array of selectors, created from string
		if (!el) return false
		var selector = [].concat(selector)
			
		selector.pop()
		return (function loop(el) {

			if (!selector.length) return true
			if (el.nodeName=='HTML') return false
			
			var isParent, i = selector.length-1
			
			switch (selector[i].charAt(0)) {
				case '#': isParent = (!/\./.test(selector[i])) ? (selector[i] == '#'+el.parentNode.id) : checkMultipleSelector(el.parentNode, selector[i]); break
				case '.': isParent = checkMultipleSelector(el.parentNode, selector[i]);break //(selector[i] == '.'+el.parentNode.className); break
				default: isParent = (!/#|\./.test(selector[i])) ? (selector[i].toUpperCase() == el.parentNode.nodeName) : checkMultipleSelector(el.parentNode, selector[i])
			}
			
			if (isParent) {selector.pop(); return loop(el.parentNode) }
			else return loop(el.parentNode)
		}(el))	
	}
	
	
	function checkMultipleSelector(elem, selStr) {
		if (!elem) return false
		var result = false, i
			node = {
			id: ( /#/.test(selStr) ) ? selStr.substring(selStr.search('#')+1, selStr.search(/\.|$/)) : '',
			tag: selStr.substr(0, selStr.search(/#|\./)).toUpperCase(),
			classes: ( /\./.test(selStr) ) ? selStr.substr(selStr.search(/\./)+1).split(/\./) : []
		}

		result = (node.id) ? (node.id == elem.id) : true
		
		if (result) result = (node.tag) ? (node.tag == elem.nodeName) : true

		if (result) {
			i = node.classes.length
			while (i--)
				if(elem.className.search('\\b'+node.classes[i]+'\\b')==-1) return false
			return true
		}

		return result
	}
	
	
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
	
	
	
														/* querySelector() */	
														
	document.querySelector = function(selector) {
		if (!selector) return null
		
		selector = selector.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,'').split(/\s+/)
		var elem = document
		
		function getElemById(elem,id) {
			//if (elem === document) return document.getElementById(id) //for fast selector
			var el = document.getElementById( /.+(?=\.)|.+$/.exec(id)[0] )
			if (isChild(el, elem) && checkMultipleSelector(el, '#'+id) && matchParentSelecors(el, selector)) return el
			return null
		}
		
		
		
		function getElementByClass(elem,classes) {
			var list, i=0, el, clss = classes.split('.')[0]
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
			var list = elem.getElementsByTagName(( /[^A-z]/.test(tag) ) ? tag.substr(0, tag.search(/[^A-z]/)) : tag), 
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
	
	document.querySelectorAll = function(selector) {
		if (!selector) return null
		
		selector = selector.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,'').split(/\s+/)
		var elem = document
		
		function getElemsById(elem,id) {
			//if (elem === document) return [document.getElementById(id)] //for fast selector
			var result = document.getElementById( /.+(?=\.)|.+$/.exec(id)[0]  )
			if (isChild(result, elem) && checkMultipleSelector(result, '#'+id) && matchParentSelecors(result, selector)) return [result]
			return []
		}
		
		function getElementsByClass(elem,classes) {
			var list, result = [], i=0, el,
				clss = classes.split('.')[0]
			
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
			var list = elem.getElementsByTagName(( /[^A-z]/.test(tag) ) ? tag.substr(0, tag.search(/[^A-z]/)) : tag), 
				result=[], i=0, el
			while (el = list[i++])
				if (checkMultipleSelector(el, tag) && matchParentSelecors(el, selector)) result.push(el)
			return result
		}
		
		sel = selector[selector.length-1]
		switch (sel.charAt(0)) {
			case '#': return getElemsById( elem, sel.substr(1) ); break
			case '.': return getElementsByClass( elem, sel.substr(1) ); break
			default: return getElementsByTag(elem, sel)
		}
		
	}
}
