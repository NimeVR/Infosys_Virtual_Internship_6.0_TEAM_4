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

module.exports = router;