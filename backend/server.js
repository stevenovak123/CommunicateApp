const express = require('express')
const connectDb = require('./config/db')
const dotenv = require('dotenv').config()
const colors = require('colors')
const userRoutes = require('./routes/userRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

// initialize backend
const app = express()

// connect to db
connectDb()
app.use(express.json()) //accept json data from front end
app.get('/', (req, res) => {
	res.send('API')
})

app.use('/api/user', userRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Server started at ${PORT}`.yellow.bold))
