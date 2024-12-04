const mongoose = require('mongoose');

const federationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.models.Federation || mongoose.model('Federation', federationSchema);
