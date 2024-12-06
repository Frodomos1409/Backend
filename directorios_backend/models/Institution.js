const mongoose = require('mongoose');

// Define the Institution schema
const institutionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },  // Name must be unique
  address: { type: String, required: false },
  latitud: { type: Number, required: false },  // Latitude of the institution
  longitud: { type: Number, required: false }, // Longitude of the institution
  paginaWeb: { type: String, required: false },  // Website URL of the institution
  federation: { type: mongoose.Schema.Types.ObjectId, ref: 'Federation', required: true }, // Reference to the 'Federation' collection
}, { timestamps: true });

// Create or use the 'Institution' model if it already exists
module.exports = mongoose.models.Institution || mongoose.model('Institution', institutionSchema);
