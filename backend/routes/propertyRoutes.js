const express = require('express');
const propertyController = require('../controllers/propertyController');
const router = express.Router();

router.get('/', propertyController.getAllProperties);  // Get all properties
router.get('/:id', propertyController.getPropertyById);  // Get property by ID

module.exports = router;