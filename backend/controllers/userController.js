const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	})
}
// register the user

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, picture } = req.body
	// checking if fields are empty
	if (!name || !email || !password) {
		res.status(400)
		throw new Error('Enter all Fields')
	}
	// checking if the user email exists
	const userExists = await User.findOne({ email })
	if (userExists) {
		res.status(400)
		throw new Error('User already exists')
	}
	// query and create a new user
	const user = await User.create({
		name,
		email,
		password,
		picture,
	})

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			picture: user.picture,
			token: generateToken(user._id),
		})
	} else {
		res.status(400)
		throw new Error('failed to create user')
	}
})

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({ email })

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			picture: user.picture,
			token: generateToken(user._id),
		})
	} else {
		res.status(401)
		throw new Error()
	}
})

module.exports = { registerUser, authUser }
