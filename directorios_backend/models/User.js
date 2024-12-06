const mongoose = require("mongoose");

// Modelo de usuario con referencia a la institución
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  institution: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },  // Referencia a la institución
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
