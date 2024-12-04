const mongoose = require('mongoose');

// Definir el esquema de la institución
const institutionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },  // El nombre debe ser único
  address: { type: String, required: false },
  federation: { type: mongoose.Schema.Types.ObjectId, ref: 'Federation', required: true }, // Referencia a la colección 'Federation'
}, { timestamps: true });

// Crear o usar el modelo 'Institution', si ya existe
module.exports = mongoose.models.Institution || mongoose.model('Institution', institutionSchema);
