const express = require('express');
const { createQuery, getQueries, updateQuery, addNote } = require('../controllers/queryController');
const router = express.Router();

router.post('/', createQuery);
router.get('/', getQueries);
router.put('/:id', updateQuery);
router.post('/:id/note', addNote);

module.exports = router;