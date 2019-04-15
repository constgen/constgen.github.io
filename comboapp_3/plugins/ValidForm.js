/*
Form validation plugin v 0.6.6


							How does it work:

Include scrip filet in <head> or before close tag </body> and it works for all forms. It disables default browser validation.
	
Include css file in <head> or before close tag </body> or use its styles to customize errors and hilights of fields.

Error messages are setuped by [lang] attribute of <html> tag. Default is English.



							** Options **
1. There is Options-object, that can be initialized or modified anywhere and whenever you want, its changes make effect automaticly
	a. ValidForm.options = {
		
	   }
2. To redefine errors text, as you want, use object: 
	a. ValidForm.errors = {...}
	May be redefined only after initializtion of main script.

									** Events **
							
1. There are two callbacks every time some form is submited or is not valid while submiting:
	a. ValidForm.onsubmit = function(form){} - FORM has been successfully submited 
	b. ValidForm.oninvalid = function(form){} - FORM had validation error on submit
	form - is argument of current FORM, that initiate event
	oninvalid() callback automaticly cancels default behavior
	Use [return false] in onsubmit() callback to cancel default behavior of FORM (cancel form submit)

2. Every validation field/element triggers two methods every time validity state changes - oninvalid() and onvalid()
	a. [input,textarea,select,element].oninvalid = function(e){}
	b. [input,textarea,select,element].onvalid = function(e){}


									** Public methods **
							
1. Shows and hides error message for defined field/element and form
	a. ValidForm.Message.show(form, field)
	b. ValidForm.Message.hide(form)
	c. ValidForm.Message.hide() - If argument FORM is not defined, this-object is used.
		
		
2. To check validity of field/element there are methods
	a.	  ValidForm.validation.input(field)	- check validity of <input> element
	b. ValidForm.validation.textarea(field) - check validity of <textarea> element
	c.	   ValidForm.validation.list(field) - check validity of <select> element
	d.	   ValidForm.validation.node(field) - check validity of some not form element (div, fieldset, span, and etc.). It is for complicated validation										  
	e.	   ValidForm.validation.form(form) - check validity of whole <form>
	These methods will check validity of defined field and will push error message if it's not valid

3. Reinitializtion of all forms validation. It is used after adding new form elements into DOM. 
	ValidForm.init()


									** Additional **
1. Support of [maxlength] attribute for <input> and <textarea> in all browsers
2. Support of [autofocus] attribute for <input>, <textarea> and <select> in all browsers
3. Support of [accept="audio/*|video/*|image/*|MIME_type"] attribute for <input type="file"> with validation fallback

*/




//ValidForm or VF - global object
(function(document,window,$){
	
	// $ - internal vaeriable for global object
	var validate = false, //anable or disable validation of whole form
		autofocusElement, // element with [autofocus] attribute
		autofocused = false, //for autofocus support
		currenEvent = {type:'check'}, //variable for current event that trigered checkValidation()
		currentCheckOn = '', // for saving state of $.options.checkOn, it used for removing handlers in every initialization $.init()
		lastValidStatus = true, //variable for saving last validation status (true - valid, false - invalid), used for triggering element.onvalid() and element.oninvalid() events
		lastValue = ''
	
	$.onsubmit = $.onsubmit || function(form){} //submit event of a form, that has been successfully submited
	$.oninvalid = $.oninvalid || function(form){} //validation error event of a form, that has been unsuccessfully submited
	
	$.options = $.options || {}
	$.options = {
		behavior: $.options.behavior || 'default', // default, messagelist
		checkOn: $.options.checkOn || 'change input keyup blur', // 'change  input' //onpropertychange , keyup, blur
		position: $.options.position || 'bottom' //bottom, top
	}
	
	var behavior = function(){
		if ($.options.behavior=='default' || !$.options.behavior || !$.options) return 'default'
		else return $.options.behavior
	}
	
	$.init = function(){
		var f=0, form, forms = document.getElementsByTagName('form')
		while (form = forms[f++]) {
			if (form.getAttribute('novalidate')!=null) continue
			var i=0, el,
				field = form.getElementsByTagName('*')
				
			while (el = field[i++])	switch (el.nodeName) {
				case 'INPUT': 
					if (!el.checkValidation) {
						el.checkValidation = (function(form,field){return function(e){
							currenEvent = e || window.event || {type:'check'}
							if ($.validation.input(field)) $.validation.form(form)
							else $.Warning(form)
							
						}}(form,el))
						
						el.invalidMessage = ''
						
						addEvents(el, $.options.checkOn, el.checkValidation)

					}
					//for autofocus support
					if (el.getAttribute('autofocus')!=null) autofocusElement = el
					break
				case 'TEXTAREA':
					if (!el.checkValidation) {
						el.checkValidation = (function(form,field){return function(e){
							currenEvent = e || window.event || {type:'check'}
							if ($.validation.textarea(field)) $.validation.form(form)
							else $.Warning(form)
						}}(form,el))
						
						el.invalidMessage = ''
						
						addEvents(el, $.options.checkOn, el.checkValidation)
						//addEvents(el, 'textInput ', el.checkValidation)
						
					}	
					//for autofocus support
					if (el.getAttribute('autofocus')!=null) autofocusElement = el
					break
				case 'SELECT':
					if (el.getAttribute('autofocus')!=null) autofocusElement = el
					break
				case 'BUTTON': break
				case 'FIELDSET': 
				case 'OUTPUT': 
				case 'SECTION':
				case 'FIGURE': 
				case 'SPAN': 
				case 'DIV':
				case 'P': 
					if (el.getAttribute('value')!=null && !el.checkValidation) {
						el.checkValidation = (function(form,field){return function(e){
							currenEvent = e || window.event || {type:'check'}
							if ($.validation.node(field)) $.validation.form(form)
							else $.Warning(form)
						}}(form,el))
						
						el.invalidMessage = ''
						
						//addEvent(el, 'DOMAttrModified', el.checkValidation)
						//addEvent(el, 'keyup', el.checkValidation)
					}	
					break
			}
			
			if (behavior()=='default') { //tooltips are used
				if (!getElementsByClass(form, 'validationmessage').length) {
					var message = document.createElement('div')
					message.innerHTML = '<span></span>'
					message.className = 'validationmessage'
					var cssString = 'position:absolute; left:0; top:0; visibility:hidden'
					message.style.cssText = cssString
					message.setAttribute('style',cssString)
					form.appendChild(message)
					
					message.onclick = $.Message.hide
				}
			} else { //list of messages is used
				if (!getElementsByClass(form, 'listofmessages').length) {
					var list = document.createElement('div')
					list.innerHTML = '<ul></ul>'
					list.className = 'listofmessages'
					var cssString = 'visibility:hidden'
					list.style.cssText = cssString
					list.setAttribute('style',cssString)
					
					var place = form.getElementsByTagName('fieldset')[0] || form.getElementsByTagName('label')[0] || form.getElementsByTagName('input')[0] || form.firstChild
					place.parentNode.insertBefore(list, place );
				}
			} 
			//disable default brauser validation
			form.setAttribute('novalidate', 'true')
			
			//validate = true
			//$.validation.form(form)
			
			if (!form.checkValidation) {
				form.checkValidation = (function(form){return function(e){
					currenEvent = e || window.event || {type:'check'}
					validate = true
					if ( $.validation.form(form) ) {
						if ( $.onsubmit(form) !== false ) return
					} else
						$.oninvalid(form)
						
					// fill list of errors	
					if (behavior()=='messagelist') { 
						var i=0, el, field = nodedListToArray(form.getElementsByTagName('*'));
						$.Message.clearList(form)
						while (el = field[i++]) {
							if (el.invalidMessage) 
								$.Message.addToList(form, el)
						}
					}
					if (typeof e!=='object') return
					if (e.preventDefault) e.preventDefault()
					else window.event.returnValue = false
				}}(form))

				addEvents(form, 'submit', form.checkValidation)
			}	

		}
	}
	
	$.errors = $.errors || {}
	$.errors = (function(){
		switch (document.getElementsByTagName('html')[0].lang) {
			case 'ru': return {
				//general
				required: 'это поле не должно быть пустым',
				pattern: 'введите данные в указанном формате',
				min: { value: 'значение должно быть больше или равно ',
					  length: 'минимальная длина ' },
				max: { value: 'значение должно быть меньше или равно ',
					  length: 'максимальная длина ' },
				//type 
				password: 'введите верный пароль',
				email: 'введите верный email',
				url: 'введите верный URL',
				number: 'введите число',
				date: 'enter date in YYYY-MM-DD format',
				month: 'enter month in YYYY-MM format',
				week: 'enter week in YYYY-MM-DD format',
				time: 'enter time in HH:MM:SS format',
				datetime: 'enter date and time in YYYY-MM-DDTHH:MM:SS format',
				datetimeLocal: 'enter date in YYYY-MM-DDTHH:MM:SS format',
				color: 'choose color',
				//data-type 
				accept: function(val){return 'only '+val+' file types are allowed'},
				passwordMatch: $.errors.passwordMatch || 'пароли не совпадают',
				integer: 'must be integer number',
				username: 'must be user name',
				uuid: 'must be UUID',
				card: 'must be credit card number',
				icq: 'must be ICQ number',
				mac: 'must be MAC-address',
				ipv4: 'must be IP-address v4',
				ipv6: 'must be IP-address v6'
				
			}
			
			default: return {
				//general
				required: $.errors.required || 'this field is required',
				pattern: $.errors.pattern || 'enter a valid value',
				min: { value: 'min value is ',
					  length: 'min length is ',
					  filesize: 'min file size is ' },
				max: { value: 'max value is ',
					  length: 'max length is ',
					  filesize: 'max file size is ' },
				//type  
				password: $.errors.password || 'enter a valid password',
				email: $.errors.email || 'enter a valid email',
				url: $.errors.url || 'enter a valid URL',
				number: $.errors.number || 'enter a valid NUMBER',
				date: $.errors.date || 'enter date in YYYY-MM-DD format',
				month: $.errors.month || 'enter month in YYYY-MM format',
				week: $.errors.week || 'enter week in YYYY-MM-DD format',
				time: $.errors.time || 'enter time in HH:MM:SS format',
				datetime: $.errors.datetime || 'enter date and time in YYYY-MM-DDTHH:MM:SS format',
				datetimeLocal: $.errors.datetimeLocal || 'enter date in YYYY-MM-DDTHH:MM:SS format',
				color: $.errors.color || 'choose color',
				//data-type 
				accept: function(val){return 'only '+val+' file types are allowed'},
				passwordMatch: $.errors.passwordMatch || 'passwords do not match',
				integer: $.errors.integer || 'must be integer number',
				username: $.errors.username || 'must be user name',
				uuid: $.errors.uuid || 'must be UUID',
				card: $.errors.card || 'must be credit card number',
				icq: $.errors.icq || 'must be ICQ number',
				mac: $.errors.mac || 'must be MAC-address',
				ipv4: $.errors.ipv4 || 'must be IP-address v4',
				ipv6: $.errors.ipv6 || 'must be IP-address v6'
			}
		}
	}());
	
	$.validation = (function(){
		
		//function for checking general validation parameters
		function general(elem){
			var x, //temporary variable
				type = elem.getAttribute('type')
			
			//save validity status, used for triggering events
			lastValidStatus = (elem.invalidMessage) ? false : true
			
			//additional support of [maxlength] for all fields. Not linked with validation.
			//[maxlength=100]
			if (x = parseInt(elem.getAttribute('maxlength'),10))
				if (elem.value.length > x) elem.value = elem.value.substr(0,x)
			
			//[required]
			if (elem.getAttribute('required') != null && !elem.value) {
				elem.invalidMessage = $.errors.required
				return false
			}
			
			//[pattern="[A-z]"]
			if (x = elem.getAttribute('pattern'))
				if (elem.value && new RegExp(x).test(elem.value)==false) {
					elem.invalidMessage = elem.getAttribute('data-validation-message')||$.errors.pattern
					return false
				}

			
			//[min=1 max="10"]
			if ( (x = elem.getAttribute('min'))!=null && elem.value ) {
				if (type.search(/\bnumber\b|\brange\b/)!=-1) {
					if (parseInt(elem.value,10) < parseInt(x,10)) {
						if ( currenEvent.type.search(/\bchange\b|\bblur\b/)!=-1 ) elem.value = x
						else {
							if(/[a-zA-Z]/.test(elem.value)) elem.value = elem.value.replace(/[a-zA-Z]/g,'')
							elem.invalidMessage = $.errors.min.value+x
							return false
						}
					}
				} else if (type.search(/date|month|week|time|datetime|datetime-local/)!=-1) {
					if (elem.value < x) 0
				} else if (type=='file') {
					if (elem.files && elem.files[0] && (elem.files[0].size || elem.files[0].fileSize) < x*1048576) {
				 		elem.invalidMessage = $.errors.min.filesize+x+'MB'
						return false
					}
				}
			}
			if ( (x = elem.getAttribute('max'))!=null && elem.value ) {
				if (type.search(/\bnumber\b|\brange\b/)!=-1) {
					if (parseInt(elem.value,10) > parseInt(x,10)) {
						if ( currenEvent.type.search(/\bchange\b|\bblur\b/)!=-1 ) elem.value = x
						else {
							if(/[a-zA-Z]/.test(elem.value)) elem.value = elem.value.replace(/[a-zA-Z]/g,'')
							elem.invalidMessage = $.errors.max.value+x
							return false
						}
					}
				} else if (type.search(/date|month|week|time|datetime|datetime-local/)!=-1) {
					if (elem.value.length > x) {
						
					}
				} else if (type=='file') {
					if (elem.files && elem.files[0] && (elem.files[0].size || elem.files[0].fileSize) > x*1048576) {
				 		elem.invalidMessage = $.errors.max.filesize+x+'MB'
						return false
					}
				}
			}
			
			//[step=5]
			if ( currenEvent.type.search(/\bchange\b|\bblur\b/)!=-1 && (x = parseInt(elem.getAttribute('step'),10)) && x>0 && elem.value) {
				if (type.search(/\bnumber\b|\brange\b/)!=-1) {
					(elem.value%x==0)||(elem.value = parseInt(elem.value,10)+(elem.value%x))
				}
			}
				
			return true
		}
	
		return {
			input: function(input){
				var x //temporary variable
				
				//check general validity
				if (!general(input)) return false

				//check allowed MIME-type/files_extension [accept="audio/*|video/*|image/*|MIME_type"]
				// application/( pdf | xml | zip | rtf | rtx | json | javascript )
				// text/( csv | css | rtf | rtx | xml )
				// .doc - application/msword , .docx - application/vnd.openxmlformats-officedocument.wordprocessingml.document
				// .xls - application/vnd.ms-excel , xlsx - application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
				// .ppt, .pot, .pps, .ppa - application/vnd.ms-powerpoint , .pptx - application/vnd.openxmlformats-officedocument.presentationml.presentation
				// .pdf - application/pdf
				// .bin - application/octet-stream
				// .jar - application/java-archive
				// .js - application/x-javascript
				if ((x = input.getAttribute('accept')) && input.getAttribute('type')=='file' && input.value.length) {
					x = ((x.search('msword')!=-1) ? '.doc ' : '')+
						((x.search('wordprocessingml.document')!=-1) ? '.docx ' : '')+
						((x.search('vnd.ms-excel')!=-1) ? '.xls ' : '')+
						((x.search('spreadsheetml.sheet')!=-1) ? '.xlsx ' : '')+
						((x.search('vnd.ms-powerpoint')!=-1) ? '.ppt .pot .pps .ppa ' : '')+
						((x.search('presentationml.presentation')!=-1) ? '.pptx ' : '')+
						((x.search('application/pdf')!=-1) ? '.pdf ' : '')+
						((x.search('application/rtf')!=-1) ? '.rtf ' : '')+
						((x.search('application/zip')!=-1) ? '.zip ' : '')+
						((x.search('application/x-javascript')!=-1) ? '.js ' : '')
					if (x.search(input.value.substr(input.value.lastIndexOf('.')+1)) == -1) {
						x = x.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,'').replace(/\s+/g,', ')
						input.invalidMessage = (input.getAttribute('data-validation-message')) ? (input.getAttribute('data-validation-message')+' ('+x+')'):$.errors.accept(x)
						return false
					}
				}
				
				//password matching
				//<input data-match="field_name_to_match_by_value">
				if ((x = input.getAttribute('data-match')) && input.getAttribute('type')=='password' && input.value.length) {
					x = document.getElementsByName(x)[0]
					if (input.value != x.value) {
						input.invalidMessage = input.getAttribute('data-validation-message')||$.errors.passwordMatch
						x.invalidMessage = input.getAttribute('data-validation-message')||$.errors.passwordMatch
						return false
					}
					x.invalidMessage = ''
				}
				
				//check additional-type-specified validity
				if ((x = input.getAttribute('data-type')) && input.value.length) switch (x) {
					case 'integer':
						// /^[\-\+]?\d+$/
						if (/^[\-\+]?\d+$/.test(input.value)==false) {
							input.invalidMessage = input.getAttribute('data-validation-message')||$.errors.integer
							return false
						}
						break
					case 'username':
						if (/((^|:)([0-9a-fA-F]{0,4})){1,8}$/.test(input.value)==false) {
							input.invalidMessage = input.getAttribute('data-validation-message')||$.errors.ipv6
							return false
						}
						break
					case 'abc':
						if (/^[а-яА-ЯёЁa-zA-Z0-9]+$/.test(input.value)==false) {
							input.invalidMessage = input.getAttribute('data-validation-message')||$.errors.abc
							return false
						}
						break
					case 'uuid':
						if (/^[0-9A-Fa-f]{8}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]{4}\-[0-9A-Fa-f]{12}$/.test(input.value)==false) {
							input.invalidMessage = input.getAttribute('data-validation-message')||$.errors.uuid
							return false
						}
						break
					case 'card':
						if (/[0-9]{13,16}/.test(input.value)==false) {
							input.invalidMessage = input.getAttribute('data-validation-message')||$.errors.card
							return false
						}
						break
					case 'icq':
						if (/([1-9])+(?:-?\d){4,}/.test(input.value)==false) {
							input.invalidMessage = input.getAttribute('data-validation-message')||$.errors.icq
							return false
						}
						break
					case 'mac':
						if (/([0-9a-fA-F]{2}([:-]|$)){6}$|([0-9a-fA-F]{4}([.]|$)){3}/.test(input.value)==false) {
							input.invalidMessage = input.getAttribute('data-validation-message')||$.errors.mac
							return false
						}
						break
					case 'ipv4':
						// /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/
						// ((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?) 
						if (/^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/.test(input.value)==false) {
							input.invalidMessage = input.getAttribute('data-validation-message')||$.errors.ipv4
							return false
						}
						break
					case 'ipv6':
						// /^[\-\+]?\d+$/
						if (/((^|:)([0-9a-fA-F]{0,4})){1,8}$ /.test(input.value)==false) {
							input.invalidMessage = input.getAttribute('data-validation-message')||$.errors.ipv6
							return false
						}
						break
				}
				
				//check type-specified validity
				if (input.value.length && !input.getAttribute('pattern')) switch (input.getAttribute('type')) {
					case 'checkbox': break
					case 'radio': break
					case 'file': break
					case 'password':
						// /^[a-z0-9_-]{3,18}$/
						// /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
						// /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/
						// /^(?=.*\d)(?=.*([a-z]|[A-Z]))([\x20-\x7E]){3,40}$/
						if (/^[a-z0-9_-]{3,18}$/.test(input.value)==false) {
							input.invalidMessage = input.getAttribute('data-validation-message')||$.errors.password
							return false
						}
						break
					case 'email': 
						if (/^[a-zA-Z0-9_\+]+((-[a-zA-Z0-9_\+]+)|(\.[a-zA-Z0-9_\+]+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/i.test(input.value)==false) {
							input.invalidMessage = input.getAttribute('data-validation-message')||$.errors.email
							return false
						}
						break
					case 'url':
						if (/^((https?|ftp):\/\/)?(([0-9a-z_!~*'().&=+$%-]+:)?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})+[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)$/i.test(input.value)==false) {
							input.invalidMessage = input.getAttribute('data-validation-message')||$.errors.url
							return false
						}
						break
					case 'number':
					case 'range': 
						if(/[a-zA-Z]/.test(input.value)) input.value = input.value.replace(/[a-zA-Z]/g,'')
						if (/^[\-\+]?(([0-9]+)([\.,]([0-9]+))?|([\.,]([0-9]+))?)$/.test(input.value)==false) {
							input.invalidMessage = input.getAttribute('data-validation-message')||$.errors.number
							return false
						}
						break
					case 'tel': //
						if (/^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/.test(input.value)==false) {
							input.invalidMessage = input.getAttribute('data-validation-message')||$.errors.tel
							return false
						}
						break
					case 'date': //YYYY-MM-DD
						if (/(19|20)\d\d-((0[1-9]|1[012])-(0[1-9]|[12]\d)|(0[13-9]|1[012])-30|(0[13578]|1[02])-31)/.test(input.value)==false) {
							input.invalidMessage = input.getAttribute('data-validation-message')||$.errors.date
							return false
						}
						break
						// /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/ //YYYY-MM-DD
						// /(19|20)\d\d-((0[1-9]|1[012])-(0[1-9]|[12]\d)|(0[13-9]|1[012])-30|(0[13578]|1[02])-31)/  //YYYY-MM-DD
						// /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/  //DD/MM/YYYY
						// /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/
					case 'month': //YYYY-MM
					case 'week': //YYYY-WMM
						break
					case 'time': //HH:MM:SS 
						if (/^([0-1]\d|2[0-3])(:[0-5]\d){2}$/.test(input.value)==false) {
							input.invalidMessage = input.getAttribute('data-validation-message')||$.errors.time
							return false
						}
						break
					case 'datetime': 
						if (/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/.test(input.value)==false) {
							input.invalidMessage = input.getAttribute('data-validation-message')||$.errors.datetime
							return false
						}
						break
					case 'datetime-local': break
					//date: 1918-11-11
					//datetime: 1918-11-11T11:11:00+01
					//datetime-local: 1918-11-11T11:11:00
					//time: 11:11:00
					//month: 1918-11
					case 'color': 
						if (/^#?([a-f0-9]{6}|[a-f0-9]{3})$/.test(input.value)==false) {
							input.invalidMessage = input.getAttribute('data-validation-message')||$.errors.color
							return false
						}
						break
					default: break
				}
				input.invalidMessage = ''
				return true
			},
			
			textarea: function(textarea){
				//check general validity
				if (!general(textarea)) return false
				
				textarea.invalidMessage = ''
				return true
			},
			
			list: function(list){return true},
			
			node: function(node){
				//check general validity
				if (!general(node)) return false

				node.invalidMessage = ''
				return true
			},
			
			form: function(form){
				if (!validate) return $.Warning(form)
				
				var i=0, el,
					field = form.getElementsByTagName('*')
				
				while (el = field[i++])	switch (el.nodeName) {
					case 'INPUT': 
						$.validation.input(el)
						break
					case 'TEXTAREA':
						$.validation.textarea(el)
						break
					case 'SELECT':
						$.validation.list(el)
						break
					case 'BUTTON': break
					default: 
						if (!!el.checkValidation) $.validation.node(el)
				}
				
				return $.Warning(form)
			}
		}
	}());
	
	$.Warning = function(form){
		var i=0, el, alertStatus = 0,
			field = nodedListToArray(form.getElementsByTagName('*'))
			
		while (el = field[i++]) {
			if (el.invalidMessage) {
				if (behavior()=='default') {
					addClass(el,'invalid')
					if (!alertStatus) {
						$.Message.show(form, el)
						alertStatus = 1
					}
				} else {
					addClass(el,'invalid')
					alertStatus = 1
				}
				if (!!el.oninvalid && lastValidStatus) {
					el.oninvalid(currenEvent)
					lastValidStatus = false
				}
			} else {
				removeClass(el,'invalid')
				if (!!el.onvalid && !lastValidStatus) {
					el.onvalid(currenEvent)
					lastValidStatus = true
				}
			}
		}
		if (!alertStatus) {
			$.Message.hide(form)
			return true
		}
		return false
	}
	
	$.Message = {
		show: function(form, el){
			var message = getElementsByClass(form, 'validationmessage')[0]
			if (!message) return
			var pos = (el.type=='file' && (el.parentNode.parentNode.className.search('\\bfile\\b')!=-1 || parseInt(el.style.fontSize,10) > 50)) ? 
				getPosition(el.parentNode) : //for StyleForm script support
				getPosition(el)
			message.getElementsByTagName('span')[0].innerHTML = el.invalidMessage
			//option dependable position
			if ($.options.position == 'top')
				message.style.top = (pos.y - message.offsetHeight - 2) +'px'
			else
				message.style.top = (pos.y + el.offsetHeight + 2) +'px'
			message.style.left = pos.x +'px'
			message.style.visibility = ''
		},
		
		hide: function(form){
			//if first argument is not an event-object it is FORM an ELEMENT, atherwise it's THIS
			var message = (form && !form.type) ? getElementsByClass(form, 'validationmessage')[0] : this
			if (message) message.style.visibility = 'hidden'
		},
		
		addToList: function(form, el){
			var list = getElementsByClass(form, 'listofmessages')[0]
			if (el.invalidMessage != $.errors.required)	
				list.getElementsByTagName('ul')[0].innerHTML += '<li>'+el.invalidMessage+'</li>\n'
			list.style.visibility = ''
			
		},
		
		clearList: function(form){
			getElementsByClass(form, 'listofmessages')[0].getElementsByTagName('ul')[0].innerHTML = ''
		}
	}
	
/*necessary functions*/
	function getElementsByClass(elem,clss) {
		var list, result = [], i=0, el
		if (!!elem.getElementsByClassName) { 
			list = elem.getElementsByClassName(clss)
			while (el = list[i++])
				result.push(el)
			return result
		}
		list = elem.getElementsByTagName('*') 
		while (el = list[i++])
			if (el.className.search('\\b'+clss+'\\b') != -1) result.push(el)
		return result	
	}
	
	function addEvents(elem, evt, handler){
		evt = evt.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,'').split(/\s+/)
		var i=0, evt
		while (type = evt[i++]) {
			if (elem.addEventListener) {
				if (document.documentMode == 9 && /\binput\b/.test(type)) {
					elem.addEventListener('paste', function(e){ setTimeout(function(){handler(e)},10) }, false)
					elem.addEventListener(  'cut', function(e){ setTimeout(function(){handler(e)},10) }, false)
				}
				elem.addEventListener(type, handler, false)
			} else if (elem.attachEvent) {
				if (/\binput\b/.test(type))
					elem.attachEvent('onpropertychange', function(e){
						if( window.event && window.event.propertyName == 'value' ) return handler(e)
					})
				else 
					elem.attachEvent('on'+type, handler)
			}
			//else elem['on'+event] = handler
		}
		
    }
	
	function addClass(el,clss){
		el.className || (el.className = clss)
		if (el.className.indexOf(clss)==-1) el.className += ' '+clss
	}
	
	function removeClass(el,clss){
		if (/\binvalid\b/.test(el.className)) el.className = el.className.replace(/\binvalid\b\s|\s\binvalid\b|\binvalid\b/, '')
	}
	
	//Convert Node list to Array of elements type:node only
	function nodedListToArray(nodeList){
		var Arr = [], i=0, el
		while (el = nodeList[i++])
			if (el.nodeType == 1) Arr.push(el)
		return Arr
	}
	
	function getPosition(el){
		var left = 0
		var top  = 0
		while (el.offsetParent && el.offsetParent.nodeName != 'FORM'){
			left += el.offsetLeft
			top  += el.offsetTop
			el	 = el.offsetParent
		}	
		left += el.offsetLeft
		top  += el.offsetTop
		return {x:left, y:top}
	}
	
	function domReady (handler){
		//if (jQuery) { jQuery(document).ready(handler); return }
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
	
	//validation initialisation. Istant or after DOMready.
	(document.body) ? 
		(function(){
			$.init()
			domReady(function(){
				if (!autofocused && autofocusElement && !('autofocus' in document.createElement("input"))) {
					autofocusElement.focus()
					autofocused = true //disable autofocus after first initialization
				}	
			})
		}()) 
		: 
		domReady(function(){
			$.init()
			if (!autofocused && autofocusElement && !('autofocus' in document.createElement("input"))) {
				autofocusElement.focus()
				autofocused = true //disable autofocus after first initialization
			}
				
		})
	
	// Expose ValidForm to the global object
	window.ValidForm = window.VF = $;

	
}(document,window,window.ValidForm||window.VF||{}))