const mongoose = require('mongoose');

const TaxPaymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quarter: { type: String, required: true }, // e.g., "Q1-2025"
    amount: { type: Number, required: true },
    country: { type: String, required: true },
    description: { type: String, default: '' },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TaxPayment', TaxPaymentSchema);