
var formElem = $('.form-submit')
var inputElem = $('.input-message')
var messagesElen = $('.output-messages')
var userName = prompt('Enter your name')

function clearInput() {
	inputElem.val('')
}

function handleSubmit() {
	var messageText = inputElem.val()
	var message = {
		text: messageText,
		date: Date.now(),
		user: {
			name: userName
		}
	}
	messageController.sendMessage(message)
	clearInput()
	return false
}

function handleMessage(message) {
	var messageElem = $('<div class="message-item">\
		<strong>'+ message.user.name + '</strong>\
		<p>'+ message.text + '</p>\
	</div>')
	messagesElen.append(messageElem)
}

formElem.on('submit', handleSubmit)
messageController.onMessage(handleMessage)