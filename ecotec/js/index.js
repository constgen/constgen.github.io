//jQuery.noConflict();
//jQuery(function($){
//
//
//}) /*end of jQuery function*/




window.onload = function(){

	/*Flashvideo overlay*/
	var flashvideo = document.getElementsByTagName("object")
	if(flashvideo!=null) {
		i=flashvideo.length-1
		while(i>=0){	
			flashvideo[i].getElementsByTagName("embed")[0].setAttribute('wmode', 'transparent')
			var newParam = document.createElement('param')
			newParam.name = 'wmode'
			newParam.value = 'transparent'
			flashvideo[i].appendChild(newParam)
			i--
		}
	}
	

	/*Feedback & Contacts tabs*/
	var feedback = document.getElementById('feedback')
	var contacts = document.getElementById('contacts')
	if(feedback!=null && contacts!=null){
		feedback.getElementsByTagName("h2")[0].getElementsByTagName("a")[0].onclick=function(){feedback.style.display='none'; contacts.style.display='block'; return false}
		contacts.getElementsByTagName("h2")[0].getElementsByTagName("a")[0].onclick=function(){contacts.style.display='none'; feedback.style.display='block'; return false}
	}
	
	
	/*Textarea*/
	var textarea = document.getElementsByTagName("textarea")[0]
	if(textarea.parentNode.className!='textarea' && document.getElementsByTagName("textarea").length!=0){
		var newDiv = document.createElement('div')
		newDiv.className = 'textarea'
		textarea.parentNode.insertBefore(newDiv, textarea)
		newDiv.appendChild(textarea)
	}
	

}//window.onload