const express = require('express')
const dotenv = require('dotenv').config()
const app = express()

app.get('/', (req, res) => {
	res.send('API is active')
})

app.get('/api/chat', (req, res) => {
	res.send('Chat')
})

app.get('/api/chat/:id', (req, res) => {
	const singleChat = chats.find((c) => c._id === req.params.id)
	res.send(singleChat)
})
const PORT = process.env.PORT || 8000
app.listen(PORT, console.log(`Server started at ${PORT}`))
