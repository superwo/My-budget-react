const express = require('express');

const router = express.Router();

// @route GET api/entries
// @desc Get all users entries
// @access Private
router.get('/', (req, res) => {
  res.send('Get all entries');
});

// @route POST api/entries
// @desc Add new entry
// @access Private
router.post('/', (req, res) => {
  res.send('Add entry');
});

// @route PUT api/entries/:id
// @desc Update entry
// @access Private
router.put('/:id', (req, res) => {
  res.send('Update entry');
});

// @route DELETE api/entries/:id
// @desc Delete entry
// @access Private
router.delete('/:id', (req, res) => {
  res.send('Delete entry');
});

module.exports = router;
