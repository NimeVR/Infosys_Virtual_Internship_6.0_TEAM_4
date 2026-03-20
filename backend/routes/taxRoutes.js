const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  getTaxPayments,
  createTaxPayment,
  deleteTaxPayment,
} = require('../controllers/taxController');

router.get('/', auth, getTaxPayments);
router.post('/', auth, createTaxPayment);
router.delete('/:id', auth, deleteTaxPayment);
const authMiddleware = require('../middleware/authMiddleware'); 
const { saveTaxEstimate } = require('../controllers/taxController'); 

router.post('/save', authMiddleware, saveTaxEstimate);

module.exports = router;