const express = require('express')
const router = express.Router()
const {
  getContact,
  createContact,
  getSingleContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController')

// GET
router.route('/').get(getContact).post(createContact)
// GET single contact
router.route('/:id').get(getSingleContact)
// CREATE
// router.route('/').post(createContact)
// UPDATE
router.route('/:id').put(updateContact)
// DELETE
router.route('/:id').delete(deleteContact)

module.exports = router
