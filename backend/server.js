const express = require('express')
const connectDb = require('./config/db')
const dotenv = require('dotenv').config()
const colors = require('colors')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const cors = require('cors')

// initialize backend
const app = express()

// connect to db
connectDb()
app.use(express.json())
app.get('/', (req, res) => {
	res.send('API')
})

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)

app.use(notFound)

app.use(errorHandler)
app.use(cors())

const PORT = process.env.PORT || 8000

const server = app.listen(
	PORT,
	console.log(`Server started at ${PORT}`.yellow.bold)
)

const io = require('socket.io')(server, {
	pingTimeout: 60000,
	cors: {
		origin: 'http://localhost:3000',
	},
})

io.on('connection', (socket) => {
	console.log(`connected to socket`)

	socket.on('setup', (userData) => {
		socket.join(userData._id)
		socket.emit('users connected')
	})
	socket.on('join chat', (room) => {
		socket.join(room)
		console.log(`room ${room}`)
	})
	socket.on('typing', (room) => socket.in(room).emit('typing'))
	socket.on('typing stopped', (room) => socket.in(room).emit('typing stopped'))
	socket.on('new message', (newMessageRecieved) => {
		let chat = newMessageRecieved.chat
		if (!chat.users) return console.log(`user is not defined`)

		chat.users.forEach((user) => {
			if (user._id === newMessageRecieved.sender._id) return
			socket.in(user._id).emit('message recieved', newMessageRecieved)
		})
	})
	socket.off('setup', () => {
		console.log(`User Disconnected`)
		socket.leave(userData._id)
	})
})
// * video calling functionality

io.on('videoConnection', (socket) => {
	socket.emit('me', socket.id)
	socket.on('videoDisconnect', () => {
		socket.broadcast.emit('Call Ended')
	})
	socket.on('callUser', ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit('callUser', {
			signal: signalData,
			from,
			name,
		})
		socket.on('answerCall', (data) => {
			io.to(data.to).emit('callaccepted', data.signal)
		})
	})
})
