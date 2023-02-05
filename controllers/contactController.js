const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')
// @desc get all contacts
// @route GET /api/contacts
// @access public

const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find()
  res.status(200).json({ data: contacts })
})

// @desc create new contact
// @route POST /api/contacts
// @access public

const createContact = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { name, email, phone } = req.body
  if (!name || !email || !phone) {
    res.status(400)
    throw new Error('all fields are mandotary')
  }
  const contact = await Contact.create({
    name: name,
    email: email,
    phone: phone,
  })
  res.status(201).json({ msg: 'contact created', data: contact })
})
// @desc get single contact
// @route GET /api/contacts/:id
// @access public

const getSingleContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error('Contact not Found')
  }
  res.status(200).json({ data: contact })
})
// @desc update single contact
// @route PUT /api/contacts/:id
// @access public

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error('Contact not Found')
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  // console.log(req.params.id)
  // console.log(req.body)
  res.status(200).json({ data: updatedContact })
})
// @desc delete single contact
// @route DELETE /api/contacts/:id
// @access public

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error('Contact not Found')
  }
  await Contact.deleteOne()
  res.status(200).json({ data: contact })
})
module.exports = {
  getContact,
  createContact,
  getSingleContact,
  updateContact,
  deleteContact,
}
