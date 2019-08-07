const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');
const Entry = require('../models/Entry');

// @route GET api/entries
// @desc Get all users entries
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user.id }).sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/entries
// @desc Add new entry
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('category', 'Category is required')
        .not()
        .isEmpty(),
      check('amount', 'Enter a valid amount')
        .not()
        .isEmpty()
        .isNumeric()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, type, amount } = req.body;

    try {
      const newEntry = new Entry({
        name,
        category,
        type,
        amount,
        user: req.user.id
      });

      const entry = await newEntry.save();
      res.json(entry);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

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
