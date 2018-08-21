var pubnub = new PubNub({
	publishKey : 'pub-c-be8b919e-2818-4fcb-a239-ba1cc61980d5',
	subscribeKey : 'sub-c-6465c2be-8dfd-11e6-a68c-0619f8945a4f'
})
     

pubnub.subscribe({
	channels: ['message'] 
})

var messageController = {
	sendMessage: function(message){
		var publishConfig = {
			channel : "message",
			message : message
		}
		pubnub.publish(publishConfig, function(status, response) {
			//console.log(status, response);
		})
	},
	onMessage: function(callback){
		pubnub.addListener({
			message: function(event) {
				callback(event.message)
			}
		}) 
	}
}