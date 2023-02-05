const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const { JsonWebTokenError } = require('jsonwebtoken')
// @desc register a user
// @route POST /api/users/register
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    res.status(400)
    throw new Error('All fields are mandatory')
  }
  const userAvailable = await User.findOne({ email })
  if (userAvailable) {
    res.status(400)
    throw new Error('User already exist')
  }
  // !Hash password
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({
    username: username,
    email: email,
    password: hashedPassword,
  })
  // console.log(user)
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email })
  } else {
    res.status(400)
    throw new Error('User data not valid')
  }
  // res.json({ msg: 'register user' })
})

// @desc login a user
// @route POST /api/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
  // * when a client send a email address & password
  // * match password
  // * provide user a <ACCESS TOKEN>
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('all fields mandatory')
  }
  const user = await User.findOne({ email })
  console.log(user)
  // * compare password === hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    // * provode access <ACCESS TOKEN>
    const token = jwt.sign(
      // < PAYLOAD
      // < user object as payload
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      // < ACCESS TOKEN SECRET
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '4h' }
    )
    res.status(200).json({ token })
  } else {
    res.status(401)
    throw new Error('password or email not valid')
  }
  // res.json({ msg: 'login user' })
})

// @desc current user info
// @route POST /api/users/current
// @access private

const currentUser = asyncHandler(async (req, res) => {
  res.json({ curr_user: req.user })
})

module.exports = { registerUser, loginUser, currentUser }
