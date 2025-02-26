const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  cost: { type: Number, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Invoice', invoiceSchema);