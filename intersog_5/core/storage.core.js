
/*
	Storages:
	- local/session
	- cookie
*/

Core.extend(function(Core){

	var Storage = (function(){
		
		function empty () {}
		
		var Support = {
			WebStorage:(function(){
			  try {return ('localStorage' in window) && window['localStorage'] !== null} 
			  catch(e) {return false}
			}()),
			
			indexedDB:{},
			
			webSQL:{},
			
			SQLite:{}
		}
		
		//multiple function for Session Storage and Local Storage 
		function WebStorage(prefix){
			if(Support.WebStorage && prefix) return{
				// set('key','value') or 
				// set({name:'value',name2:'value2'})
				set: function(key,value){
					if(typeof key==='object')
						for(i in key){ window[prefix+'Storage'][i] = JSON.stringify(key[i]) }
					else window[prefix+'Storage'][key] = JSON.stringify(value)
					return this //return object Storage
				},
				
				// get('key') or 
				// get(['key1', 'key2', 'key3']), returns object of key-value pares
				get: function(key){
					function getStorage(key){
						if(key==null) return window[prefix+'Storage']
						try{ return JSON.parse(window[prefix+'Storage'][key]) } 
						catch(e){return undefined/*window[prefix+'Storage'][key]*/} 
					}
					
					if(typeof key==='object'){
						return (function(Arr){
							var Obj={}
							for(var i=0,len=Arr.length;i<len;i++) Obj[Arr[i]] = getStorage(Arr[i])
							return Obj
						}(key))
					}
					else return getStorage(key)
				},
				
				remove: function(key){	
					if(typeof key==='object') for(var i=0,len=key.length;i<len;i++) window[prefix+'Storage'].removeItem(key[i])
					else window[prefix+'Storage'].removeItem(key)	
					return this //return object Storage
				},
				
				clear: function(){window[prefix+'Storage'].clear()},
				
				onchange: function(func){
					function handler(e){//e.key, e.oldValue, e.newValue, e.url
						e=e||window.event
						e.url||(e.url=e.uri)
						if(func) func(e)
					}
					if (window.addEventListener) window.addEventListener('storage', handler, false)	  
					else window.attachEvent('onstorage', handler)
				}  
			}
			else return {
				set: empty,
				get: empty,
				remove: empty,
				clear: empty,
				onchange: empty
			}
		}
	
		return {
			Session: (function(){return WebStorage('session')}()),
			Local: (function(){return WebStorage('local')}()),
			
			IndexedDB: {},
			
			Cookie: {
				// set('name','value',days) or 
				// set({name:'value',name2:'value2'}) or 
				// set({name:'value',name2:'value2'}, daysForAll) or 
				// set({name:['value',days],name2:['value2',days2]}) or even
				// set({name:'value',name2:['value2',days2]}, daysForAllBesideName2)
				set: function(name,value,days){
					function createCookie(name,value,days){
						if(days){
							var date = new Date()
							date.setTime(date.getTime()+(days*24*60*60*1000))
							var expires = '; expires='+date.toGMTString()
						}
						else var expires = ''
						document.cookie = name+'='+escape(value)+expires+'; path=/'
					}
					if(typeof name === 'object'){
						for(i in name){
							if(typeof name[i] === 'object')	createCookie(i,name[i][0],name[i][1])
							else createCookie(i,name[i],value)
						}
					}
					else createCookie(name,value,days)
					return this //return cookie object
				},
				
				// get('name') or 
				// get(['name1', 'name2', 'name3']), returns object of name-value pares
				get: function(name){
					function readCookie(name){
						var nameEQ = name+'='
						var ca = document.cookie.split(';')
						for(var i=0,len=ca.length;i<len;i++){
							var c = ca[i]
							while (c.charAt(0)==' ') c = c.substring(1,c.length)
							if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length,c.length))
						}
						return null
					}
					if(typeof name==='object'){
						return (function(Arr){
							var Obj={}
							for(var i=0,len=Arr.length;i<len;i++) Obj[Arr[i]] = readCookie(Arr[i])
							return Obj
						}(name))
					}
					else return readCookie(name)
					
				},
				
				// remove('name') or 
				// remove(['name1', 'name2', 'name3'])
				remove: function(name) {	
					if(typeof name === 'object'){
						this.set((function(Arr){
							var Obj={}
							for(var i=0,len=Arr.length;i<len;i++) Obj[Arr[i]]=''
							return Obj
						}(name)),-1)
					}
					else this.set(name,"",-1)
					return this
				},
				
				clear: function () {
					var cookies = document.cookie.split(";"),
						cookie,
						i = 0;
					while (cookie = cookies[i++])
						this.remove(cookie.split('=')[0]);
				}
			},
			
			SQLite: {}
			
		}
		
	}())

	
	return {
		Storage: Storage
	}
})














