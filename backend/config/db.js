const mongoose = require('mongoose')

const connectDb = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI)
		console.log(`MongoDb connected ${conn.connection.host}`.cyan.underline)
	} catch (error) {
		console.log(`error is ${error.message}`.red.bold)
	}
}

module.exports = connectDb
