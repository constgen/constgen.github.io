
/*Menu*/
	items = document.getElementById('menu').getElementsByTagName('a') 
	items[0].className+=' first'
	items[items.length-1].className+=' last'
	string = items[0].className
	if (string.indexOf("active")!=-1) items[0].className+=' first_active'
	string = items[items.length-1].className
	if (string.indexOf("active")!=-1) items[items.length-1].className+=' last_active'
	string = null; items = null //очистка
	var i
	
	
/*Login form*/
	var username =  document.getElementsByName('login') 
	var password =  document.getElementsByName('password') 
	if (username.length /*&& password.length*/) {
		i=0; while(i<username.length /*|| i<password.length*/) {
			username[i].onfocus = function () { if(this.value=='contact email')this.value='' }
			username[i].onblur = function () { if(this.value=='')this.value='contact email' }
			//password[i].type='text'
			//password[i].onfocus = function () { if(this.value=='password'){this.value='';this.type='password'} }
			//password[i].onblur = function () { if(this.value==''){this.value='password';this.type='text'} }			
			i++
		}
	}
	username =  document.getElementById('username')
	password =  document.getElementById('password')
	if (username && password) {
		username.onfocus = function () { if(this.value=='contact email')this.value='' }
		username.onblur = function () { if(this.value=='')this.value='contact email' }
		if(-[1,])password.type='text'
		password.onfocus = function () { if(this.value=='password'){this.value='';if(-[1,])this.type='password'} }
		password.onblur = function () { if(this.value==''){this.value='password';if(-[1,])this.type='text'} }
		
	}
	
/*Textarea*/
//	var textarea = document.getElementsByTagName("textarea")[0]
//	if(document.getElementsByTagName("textarea border-radius").length!=0 && textarea.parentNode.className!='textarea'){
//		var newDiv = document.createElement('div')
//		newDiv.className = 'textarea border-radius'
//		textarea.style.border = 'none'
//		textarea.parentNode.insertBefore(newDiv, textarea)
//		newDiv.appendChild(textarea)
//	}

/*Круглые углы таблиц для ИЕ*/
	if('\v'=='v'){
		(function(){	
			var table = document.getElementById('content').getElementsByTagName('table')
			var cell
			var len = table.length
			if(len){
				var i=0; while(i<len){
					cell = table[i].getElementsByTagName('tr')[0].getElementsByTagName('th')
					cell[0].style.borderRadius = '10px 0 0 0'
					cell[cell.length-1].style.borderRadius = '0 10px 0 0'
					i++
				}
			}
		}())
	}
	

/*Mobile switch between Login and Submit */

	if(-[1,]){
		var content = document.getElementById('content')
		var sideLeft = document.getElementById('sideLeft')
		var login = document.getElementById('login')
		var badge = document.getElementById('badge')
		var tabs = document.getElementById('tabs')
		var login_button = document.getElementById('showlogin')
		var submit_button = document.getElementById('showsubmit')
		
		function mobile_init(){
				
			if((document.getElementById('loginform') || document.getElementById('forgot')) && getComputedStyle(login).getPropertyValue('position')=='static'){
				content.style.paddingTop = 0
				sideLeft.style.display = 'none'
				tabs.style.display = 'block'
			}
				
			else if(badge && getComputedStyle(login).getPropertyValue('position')=='static'){showsubmit()}
			
			else if(getComputedStyle(login).getPropertyValue('position')=='static'){tabs.style.display = 'block'; showsubmit()}
			
			else {
				login.style.display = 'block'
				sideLeft.style.display = 'block'
				content.style.paddingTop = 0
				tabs.style.display = 'none'
			}
			fiximg()
		}
		
		function showlogin(){
			login.style.display = 'block'
			sideLeft.style.display = 'none'
			content.style.paddingTop = 0
			login_button.className = 'active'
			submit_button.className = ''
			return false
		}

		function showsubmit(){
			login.style.display = 'none'
			sideLeft.style.display = 'block'
			content.style.paddingTop = getComputedStyle(sideLeft).getPropertyValue("height")
			submit_button.className = 'active'
			login_button.className = ''
			return false
		}
		
		/*сжатие картинок в контенте*/
		function fiximg(value){
			if(value!=false) value = true
			var image = content.getElementsByTagName('img')
			if(image[0] && getComputedStyle(image[0]).getPropertyValue('cursor')=='pointer' && value==true){ 			
				var imglen = image.length
				var i=0;while(i<imglen){image[i].onclick = function(){window.location=this.src};i++}
			}
		}
				
		mobile_init()
		window.onresize = mobile_init
		login_button.onclick = showlogin
		submit_button.onclick = showsubmit
		
		
	}
	
	
	
	
	
	
	