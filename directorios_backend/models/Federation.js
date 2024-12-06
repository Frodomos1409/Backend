const mongoose = require('mongoose');

const federationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  email: { type: String, required: true },
  telefono: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.models.Federation || mongoose.model('Federation', federationSchema);
