function backToChats() {
  if (window.innerWidth <= 500) {
    document.querySelector('.chats').style.display = 'inline-block'
    document.querySelector('.message_area').style.display = 'none'
    document.querySelector('.navbar').style.display = 'inline-block'
  }
}
function addNewMessage(msg, type) {
  let message = document.createElement('div')
  msg = `<p class='p-0 m-0' > ${msg.message} </p> `
  message.innerHTML = msg
  message.classList.add('message', type)
  document.querySelector('.messages').appendChild(message)
  document.querySelector('.messages').scrollTop = document.querySelector(
    '.messages',
  ).scrollHeight
}
