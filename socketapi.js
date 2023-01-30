const io = require('socket.io')()
const socketapi = {
  io: io,
}

// Add your socket.io logic here!
io.on('connection', async function (socket) {
  let users = await io.fetchSockets()
  console.log('A user connected')
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg)
  })
})
// end of socket.io logic

module.exports = socketapi
