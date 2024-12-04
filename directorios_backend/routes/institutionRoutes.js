const express = require('express');
const router = express.Router();
const { createInstitution, getInstitutions } = require('../controllers/institutionController');

router.post('/', createInstitution);
router.get('/', getInstitutions);

module.exports = router;
