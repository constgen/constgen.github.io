															
															/*Detecting touch device*/
var TOUCHDEVICE = 'createTouch' in document; //true or false

				
										/* Проверка на поддержку свойств CSS3 (from Modernizr)*/

domPrefixes = 'Webkit Moz O ms Khtml'.split(' ')
testElem = document.createElement('test')
testStyle = testElem.style
function testPropsAll( prop ) { 
	var uc_prop = prop.charAt(0).toUpperCase() + prop.substr(1)
	props   = (prop + ' ' + domPrefixes.join(uc_prop + ' ') + uc_prop).split(' ')
	return !!testProps( props );
}
function testProps( props ) {
	for ( var i in props ) {if ( testStyle[ props[i] ] !== undefined  ) {return true}}
}
//transitionProperty, backgroundsize, borderimage, boxShadow, animationName, columnCount, boxReflect
var CSSTRANSITION = testPropsAll('transitionProperty');
var CSSTRANSFORM = !!testProps(['transformProperty', 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform']);

domPrefixes,testElem,testStyle = null



														/*Prevent page scrolling*/
function noScroll(e) {e.preventDefault()}
/*try{document.body.addEventListener('touchmove', noScroll, false)}
catch(e){document.body.attachEvent("ontouchmove", noScroll)}*/

																/*Data*/


var Data = {
	products:{
		1:'Morton&reg; Safe-T-Salt&reg;', 
		2:'Morton&reg; EcoSafe Ice Melter',
		3:'Morton&reg; Ice Melter Blend', 
		4:'Morton&reg; Ice Melter Blend',
		5:'Morton&reg; Calcium Chloride',
		6:'Morton&reg; Magnesium Chloride'
	},
	
	table:{
		set1:[
			{name:3, valueFrom:40, valueTo:60, recom:''},
			{name:4, valueFrom:40, valueTo:60, recom:''},
			{name:5, valueFrom:20, valueTo:60, recom:'true'}
		],
		set2:[
			{name:3, valueFrom:18, valueTo:60, recom:'true'},
			{name:4, valueFrom:18, valueTo:60, recom:'true'},
			{name:5, valueFrom:16, valueTo:65, recom:''}
		],
		set3:[
			{name:1, valueFrom:30, valueTo:60, recom:''},
			{name:2, valueFrom:30, valueTo:60, recom:''},
			{name:3, valueFrom:18, valueTo:60, recom:'true'},
			{name:4, valueFrom:18, valueTo:60, recom:'true'},
			{name:5, valueFrom:16, valueTo:65, recom:''}
		],
		set4:[
			{name:1, valueFrom:23, valueTo:60, recom:''},
			{name:2, valueFrom:23, valueTo:60, recom:''},
			{name:3, valueFrom:16, valueTo:60, recom:'true'},
			{name:4, valueFrom:16, valueTo:60, recom:'true'},
			{name:5, valueFrom:16, valueTo:60, recom:''},
		],
		set5:[
			{name:1, valueFrom:13, valueTo:60, recom:'true'},
			{name:2, valueFrom:13, valueTo:60, recom:'true'},
			{name:3, valueFrom:15, valueTo:60, recom:'true'},
			{name:4, valueFrom:15, valueTo:60, recom:'true'},
			{name:5, valueFrom:15, valueTo:60, recom:''},
			{name:6, valueFrom:15, valueTo:60, recom:''}
		]
	}
}




														/*Calculator object*/
var Calculator=(function(){
	var Calculator={}
	
	check = function(e){
		var checkbox = this.getElementsByTagName('span')
		e=e||window.event
		var target = e.target || e.srcElement 
		if(!target && e.changedTouches) target = e.changedTouches[0].target
		if(target.nodeName=='SPAN' && !/active/.test(target.className)){
			for(var i=0,len=checkbox.length;i<len;i++) 
				checkbox[i].className=checkbox[i].className.replace(/active | active|active/, '')
			target.className+=' active'
			Calculator[this.id.replace('-type','')].type=target.innerHTML
		}
		else if(target.nodeName=='#text' && !/active/.test(target.parentNode.className)){
			for(var i=0,len=checkbox.length;i<len;i++) 
				checkbox[i].className=checkbox[i].className.replace(/active | active|active/, '')
			target.parentNode.className+=' active'
			Calculator[this.id.replace('-type','')].type=target.parentNode.innerHTML
		}
	}
	
	function switchdegree(){
		var degree = document.getElementById('degree'), elem = degree.getElementsByTagName('span'), i=elem.length, value=degree.getAttribute('data-value');
		while(i--){
			if(/active/.test(elem[i].className)) elem[i].className = elem[i].className.replace(/active | active|active/, '')
			else elem[i].className +=' active'
		}
		degree.setAttribute('data-value',(value=='f')?'c':'f')
		Calculator.degree = degree.getAttribute('data-value')
	}

	Calculator.temperature={
		input: document.getElementsByName('temperature')[0].value,
		type:(function(check){// air / surface
			var tempType=document.getElementById('temperature-type')
			tempType.onclick=check
			//bind for touch device
			tempType.ontouchstart=function(){
				this.onclick=null
				this.ontouchend=check				
			}	
			tempType.ontouchmove=function(){this.ontouchend=null}
			
			var checkbox = document.getElementById('temperature-type').getElementsByTagName('span')
			for(var i=0,len=checkbox.length;i<len;i++)
				if(/active/.test(checkbox[i].className)) return checkbox[i].innerHTML
		}(check))
	}
	
	Calculator.area={
		input: document.getElementsByName('area')[0].value,
		type:(function(check){// sq feet / acres
			var areaType=document.getElementById('area-type')
			areaType.onclick=check
			//bind for touch device
			areaType.ontouchstart=function(){
				this.onclick=null
				this.ontouchend=check
			}	
			areaType.ontouchmove=function(){this.ontouchend=null}
			
			var checkbox = document.getElementById('area-type').getElementsByTagName('span')
			for(var i=0,len=checkbox.length;i<len;i++)
				if(/active/.test(checkbox[i].className)) return checkbox[i].innerHTML
		}(check))	
	}
	
	Calculator.degree = (function(switchdegree){
		var degree = document.getElementById('degree')
		degree.onclick=switchdegree
		//bind for touch device
		degree.ontouchstart=function(){
			this.onclick=null
			this.ontouchend=switchdegree
		}	
		degree.ontouchmove=function(){this.ontouchend=null}

		return degree.getAttribute('data-value')
	}(switchdegree))
	
	//input update
	document.getElementsByName('temperature')[0].onclick = function(){Calculator.temperature.input=(this.value)}
	document.getElementsByName('temperature')[0].onchange = function(){
		this.value=this.value.replace(/[^0-9|\-\.,]|\s+/g,'').replace(/,/g,'.')
		Calculator.temperature.input=this.value
	}
	document.getElementsByName('temperature')[0].onkeyup = function(){
		if(this.value.length>3) this.value=this.value.substr(0,(/\-/.test(this.value))?4:3)
		Calculator.temperature.input = this.value
	}

	document.getElementsByName('area')[0].onclick = function(){Calculator.area.input=(this.value)}
	document.getElementsByName('area')[0].onchange = function(){
		this.value=this.value.replace(/[^0-9|\.,]|\s+/g,'').replace(/,/g,'.')
		Calculator.area.input=this.value
	}
	document.getElementsByName('area')[0].onkeyup = function(){
		//if(this.value.length>10) this.value = this.value.substr(0,10)
		Calculator.area.input = this.value
	}
	
	//IE7 fix для учёта сохранённых значений инпутов при обновлении страницы
	window.onload=function(){
		document.getElementsByTagName('input')[0].click()
		document.getElementsByTagName('input')[1].click()
	}
	
	return Calculator

}());





														/*Calculate and back buttons*/
														
/*document.getElementsByTagName('form')[0].onsubmit=function(){
	var input = document.getElementsByTagName('input')
	input[0].blur(); input[1].blur()
	return false
}*/

if(CSSTRANSITION){
	var result=document.getElementById('result')
	result.style.position='absolute'
	result.style.left='100%'
	result.style.top=0
	result.style.display='block'
	var wrapper = document.getElementById('wrapper')
}

function backtoindex(){
	this.className=''
	if(CSSTRANSITION){
		wrapper.style.WebkitTransform='translate(0,0)'
		wrapper.style.MozTransform='translate(0,0)'
		wrapper.style.msTransform='translate(0,0)'
		wrapper.style.OTransform='translate(0,0)'
		wrapper.style.Transform='translate(0,0)'
		document.body.style.minHeight=''
	}
	else{
		document.getElementById('index').style.display='block'
		document.getElementById('result').style.display='none'
		document.body.style.minHeight=''
	}
	return false
}
function forwardtoresult(){
	if(CSSTRANSITION){
		wrapper.style.WebkitTransform = 'translate(-100%,0)'
		wrapper.style.MozTransform = 'translate(-100%,0)'
		wrapper.style.msTransform = 'translate(-100%,0)'
		wrapper.style.OTransform = 'translate(-100%,0)'
		wrapper.style.Transform = 'translate(-100%,0)'
		document.body.style.minHeight = document.getElementById('result').offsetHeight+'px'
	}
	else{
		document.getElementById('index').style.display = 'none'
		document.getElementById('result').style.display = 'block';
		document.body.style.minHeight = document.getElementById('result').offsetHeight+'px'
	}
	return false
}


function calculate(){
	this.className=''
	
	if(!Calculator.temperature.input){
		if(!Calculator.area.input) alert('Please, Enter Temperature and Surface Area')
		else alert('Please, Enter Temperature')
		return
	}
	else if(!Calculator.area.input){alert('Please, Enter Surface Area'); return}
	else if(Number(Calculator.temperature.input)!=Calculator.temperature.input || Number(Calculator.area.input)!=Calculator.area.input){alert('Please, Enter a Valid NUMBER'); return}
	
	var temp = Calculator.temperature.input, 
	area = Calculator.area.input,
	tempType = Calculator.temperature.type,
	areaType = Calculator.area.type;
	
	
	
	function updateResult(data){
		var from, to, bags, lbs, min, max
		SaltBlock = document.getElementById('salt')
		BlendBlock = document.getElementById('blend')
		CalciumBlock = document.getElementById('calcium')
		MagnesiumBlock = document.getElementById('magnesium')
		//reset visibilyty
		SaltBlock.style.display = 'none'
		SaltBlock.getElementsByTagName('div')[0].style.display = 'none'
		SaltBlock.getElementsByTagName('div')[3].style.display = 'none'
		BlendBlock.style.display = 'none'
		BlendBlock.style.visibility = 'hidden'
		CalciumBlock.style.display = 'none'
		MagnesiumBlock.style.display = 'none'

		//reset recomendation
		SaltBlock.getElementsByTagName('div')[0].className = SaltBlock.getElementsByTagName('div')[0].className.replace(/recom | recom|recom/g, '')
		SaltBlock.getElementsByTagName('div')[3].className = SaltBlock.getElementsByTagName('div')[3].className.replace(/recom | recom|recom/g, '')
		BlendBlock.className = BlendBlock.className.replace(/recom | recom|recom/g, '')
		CalciumBlock.getElementsByTagName('div')[0].className = CalciumBlock.getElementsByTagName('div')[0].className.replace(/recom | recom|recom/g, '')
		MagnesiumBlock.getElementsByTagName('div')[0].className = MagnesiumBlock.getElementsByTagName('div')[0].className.replace(/recom | recom|recom/g, '')
		
		if(!-[1,]){
			SaltBlock.getElementsByTagName('img')[1].style.visibility='hidden'
			SaltBlock.getElementsByTagName('img')[3].style.visibility='hidden'
			BlendBlock.getElementsByTagName('img')[1].style.visibility='hidden'
			BlendBlock.getElementsByTagName('img')[3].style.visibility='hidden'
			CalciumBlock.getElementsByTagName('img')[1].style.visibility='hidden'
			MagnesiumBlock.getElementsByTagName('img')[1].style.visibility='hidden'
		}
		
		for(var i=0,len=data.length;i<len;i++){

			from = Math.ceil(data[i].valueFrom*((areaType=='acres')? (area*43560) : area)/1000)
			if(from>2147483647) from=2147483647
			to = (data[i].valueTo=='+')? '+' : Math.ceil(data[i].valueTo*((areaType=='acres')? (area*43560) : area)/1000)
			if(to>2147483647) to=2147483647
			
			
			//lbs = (to=='+')? numberFormat(from)+'+' : (from==to || from==0)? numberFormat(to) : numberFormat(from)+' - '+numberFormat(to)
			//bags = (to=='+')? numberFormat(Math.ceil(from/50))+'+'  : (from==to || from==0)? numberFormat(Math.ceil(to/50)) : numberFormat(Math.ceil(from/50))+' - '+numberFormat(Math.ceil(to/50))
			//bags += (typeof bags==='number' && parseInt(bags,10)<=1)? ' bag' : ' bags'
			
			min = (to=='+') ? '' : numberFormat(Math.ceil(from/50))+((typeof Math.ceil(from/50)==='number' && parseInt(Math.ceil(from/50),10)<=1)? ' bag' : ' bags')+' ('+numberFormat(from)+' lbs)'

			max = (to=='+') ? 
			/*use min*/numberFormat(Math.ceil(from/50))+((typeof Math.ceil(from/50)==='number' && parseInt(Math.ceil(from/50),10)<=1)? ' bag' : ' bags')+' ('+numberFormat(from)+' lbs)'
			: 
			/*use max as default*/numberFormat(Math.ceil(to/50))+((typeof Math.ceil(to/50)==='number' && parseInt(Math.ceil(to/50),10)<=1)? ' bag' : ' bags')+' ('+numberFormat(to)+' lbs)'
			
			if(data[i].name==1 || data[i].name==2){
				SaltBlock.style.display = 'block'
				SaltBlock.className+=' alone'
				/*min*/SaltBlock.getElementsByTagName('div')[6].innerHTML = min
				/*max*/SaltBlock.getElementsByTagName('div')[7].innerHTML = max
				Scale(SaltBlock.getElementsByTagName('div')[8]).set(from,to)
				
				if(data[i].name==1){
					SaltBlock.getElementsByTagName('div')[0].style.display = 'block'
					if(data[i].recom){
						SaltBlock.getElementsByTagName('div')[0].className+=' recom'
						if(!-[1,]) SaltBlock.getElementsByTagName('img')[1].style.visibility = 'visible'
					}
				}
				else if(data[i].name==2){
					SaltBlock.getElementsByTagName('div')[3].style.display = 'block'
					SaltBlock.className = SaltBlock.className.replace(/alone | alone|alone/g, '')
					if(data[i].recom){
						SaltBlock.getElementsByTagName('div')[3].className+=' recom'
						if(!-[1,]) SaltBlock.getElementsByTagName('img')[3].style.visibility = 'visible'
					}
				}
					 
			}
			
			if(data[i].name==3 || data[i].name==4){	
				BlendBlock.style.display = 'block'
				BlendBlock.style.visibility = 'visible'
				/*min*/BlendBlock.getElementsByTagName('div')[3].innerHTML = min
				/*max*/BlendBlock.getElementsByTagName('div')[4].innerHTML = max
				Scale(BlendBlock.getElementsByTagName('div')[5]).set(from,to)
				
				if(data[i].recom){
					BlendBlock.className+=' recom'
					if(!-[1,]) BlendBlock.getElementsByTagName('img')[1].style.visibility='visible'
					if(!-[1,]) BlendBlock.getElementsByTagName('img')[3].style.visibility='visible'
				}
			}
			
			if(data[i].name==5) {
				CalciumBlock.style.display='block'
				/*min*/CalciumBlock.getElementsByTagName('div')[3].innerHTML = min
				/*max*/CalciumBlock.getElementsByTagName('div')[4].innerHTML = max
				Scale(CalciumBlock.getElementsByTagName('div')[5]).set(from,to)
				
				if(data[i].recom) {
					CalciumBlock.getElementsByTagName('div')[0].className+=' recom'
					if(!-[1,]) CalciumBlock.getElementsByTagName('img')[1].style.visibility='visible'
				}


			}
			
			
			if(data[i].name==6) {
				MagnesiumBlock.style.display='block';
				/*min*/MagnesiumBlock.getElementsByTagName('div')[3].innerHTML = min
				/*max*/MagnesiumBlock.getElementsByTagName('div')[4].innerHTML = max
				Scale(MagnesiumBlock.getElementsByTagName('div')[5]).set(from,to)

				if(data[i].recom){
					MagnesiumBlock.getElementsByTagName('div')[4].className+=' recom'
					if(!-[1,]) MagnesiumBlock.getElementsByTagName('img')[3].style.visibility='visible'
				}
			}
			
		}
		
		
	}
	
	if(Calculator.degree=='c') temp=(temp*9/5)+32
	
	/*if(tempType=='air'){
		
	} else if(tempType=='surface'){
		
	}*/
	temp = Math.round(temp)
	if(temp < 0) updateResult(Data.table.set1)	
	else if(temp >= 0 && temp <=  5) updateResult(Data.table.set2)	
	else if(temp >  5 && temp <= 10) updateResult(Data.table.set3)		
	else if(temp > 10 && temp <= 20) updateResult(Data.table.set4)
	else if(temp > 20) updateResult(Data.table.set5)
	
	forwardtoresult()// switch to result screen
	return false
}

var Button=document.getElementById('button'),
	Backbutton=document.getElementById('backbutton'),
	Homebutton=document.getElementById('homebutton');

Button.onclick=calculate
//bind for touch device
Button.ontouchstart=function(){
	this.className='pushed'
	Button.onclick=null
	Homebutton.onclick=null
	Backbutton.onclick=null
	Button.ontouchend=calculate
	//document.getElementById('homebutton').onclick=function(){return false}
}
Button.ontouchmove=function(){
	this.className=''
	Button.ontouchend=null
}

Backbutton.onclick=backtoindex
//bind for touch device
Backbutton.ontouchstart=function(){
	this.className='pushed'
	Backbutton.onclick=null
	Backbutton.ontouchend=backtoindex
}
Backbutton.ontouchmove=function(){
	this.className=''
	Backbutton.ontouchend=null
}


function gohome(){location.pathname='/'}
Homebutton.onclick=gohome
//bind for touch device
Homebutton.ontouchstart=function(){
	this.className='pushed'
	Homebutton.onclick=null
	Homebutton.ontouchend=function(){gohome();this.ontouchend=null}
}
Homebutton.ontouchmove=function(){
	this.className=''
	Homebutton.ontouchend=null
}


															/*Scale object*/

var Scale = function(scale){
	
	return {
		set: function(from, to){
			var cursor = scale.getElementsByTagName('span')[0],
			leftpointer = (function(){
				var p = scale;
				do p = p.previousSibling;
				while (p && p.nodeType != 1);
				return p;
			}()).getElementsByTagName('div')[0];
			if (from == undefined || from == null) return scale
			if (!to || to == '+') {
				cursor.style.left = '80%'
				cursor.style.right = '-10px'
				return scale
			}		
			from = from/(to/0.8)*100
			cursor.style.left = from + '%'
			cursor.style.right = '20%'
			from = 50 - from 
			if (from>=20) {
				leftpointer.style.width = 49-from+20 + '%'
				leftpointer.style.paddingRight = from-20 + '%'
			}
			if (leftpointer.offsetHeight > 25) leftpointer.style.textAlign = 'center'
			else leftpointer.style.textAlign = ''
			return scale
		}
	}	
}

//Scale(document.getElementsByClassName('scale')[0]).set(10,20)

															/*Format of number*/
var Format = function(n, c, d, t){ //v1.0  
	var m = (c = Math.abs(c) + 1 ? c : 2, d = d || ",", t = t || ".",  
		/(\d+)(?:(\.\d+)|)/.exec(n + "")), x = m[1].length > 3 ? m[1].length % 3 : 0;  
	return (x ? m[1].substr(0, x) + t : "") + m[1].substr(x).replace(/(\d{3})(?=\d)/g,  
		"$1" + t) + (c ? d + (+m[2] || 0).toFixed(c).substr(2) : "");  
}
//Format(456789.00, "."," ",",") //456,789 00
var numberFormat = function(n){return Format(n, "","",",")}


