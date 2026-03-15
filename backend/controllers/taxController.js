const TaxPayment = require('../models/TaxPayment');

// GET /api/tax-payments
exports.getTaxPayments = async (req, res) => {
  try {
    const payments = await TaxPayment.find({ user: req.user.id }).sort({ date: -1 });
    res.json({ payments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST /api/tax-payments
exports.createTaxPayment = async (req, res) => {
  const { quarter, amount, country, description } = req.body;
  if (!quarter || !amount || !country) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const payment = new TaxPayment({
      user: req.user.id,
      quarter,
      amount,
      country,
      description: description || '',
    });

    await payment.save();
    res.status(201).json({ payment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE /api/tax-payments/:id
exports.deleteTaxPayment = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await TaxPayment.findById(id);
    if (!payment) return res.status(404).json({ message: 'Tax payment not found' });
    if (payment.user.toString() !== req.user.id)
      return res.status(401).json({ message: 'Not authorized' });

    await payment.remove();
    res.json({ message: 'Tax payment deleted', id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};