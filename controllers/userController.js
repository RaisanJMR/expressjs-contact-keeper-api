const asyncHandler = require('express-async-handler')

// @desc register a user
// @route POST /api/users/register
// @access public

const registerUser = asyncHandler(async (req, res) => {
  res.json({ msg: 'register user' })
})

// @desc login a user
// @route POST /api/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
  res.json({ msg: 'login user' })
})

// @desc current user
// @route POST /api/users/current
// @access private
 
const currentUser = asyncHandler(async (req, res) => {
  res.json({ msg: 'current user' })
})

module.exports = { registerUser, loginUser, currentUser }
