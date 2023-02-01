const io = require('socket.io')()
const user = require('./routes/models/users')
const socketapi = {
  io: io,
}
let loggedInUsers = {}
let loggedInUserBySocketId = {}
// Add your socket.io logic here!
io.on('connection', async function (socket) {
  // add loggedIn user to userList
  socket.on('login', async (username) => {
    let loggedInUser = await user.findOne({ username: username })
    if (loggedInUser !== null) {
      loggedInUsers[`${username}`] = socket.id
      loggedInUserBySocketId[`${socket.id}`] = `${username}`
    }
  })
  socket.on('disconnect', () => {
    var tempId = socket.id
    var tempUsername = loggedInUserBySocketId[tempId]
    delete loggedInUserBySocketId[tempId]
    delete loggedInUsers[tempUsername]
  })
  // add loggedIn user to userList

  socket.on('joinPrivateRoom', (roomId) => {
    socket.join(roomId)
  })
  socket.on('joinPrivateRoomOpposite', ({ username, roomId }) => {
    if (loggedInUsers[username] !== undefined)
      socket.to(loggedInUsers[username]).emit('joinPrivateRoom', roomId)
  })

  socket.on('message', async ({ msg, roomId }) => {
    socket.to(roomId).emit('message', msg)
    let toUser = await user.findOne({ username: msg.to })
    let fromUser = await user.findOne({ username: msg.user })

    let res = await user.updateOne(
      { _id: toUser._id },
      {
        $push: {
          [`chats.${fromUser.username}.chats`]: {
            from: fromUser.username,
            to: toUser.username,
            msg: msg.message,
          },
        },
      },
    )
    res = await user.updateOne(
      { _id: fromUser._id },
      {
        $push: {
          [`chats.${toUser.username}.chats`]: {
            from: fromUser.username,
            to: toUser.username,
            msg: msg.message,
          },
        },
      },
    )
    await fromUser.save()
    await toUser.save()
  })
})

// end of socket.io logic

module.exports = socketapi
