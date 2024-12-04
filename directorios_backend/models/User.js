const mongoose = require("mongoose");

<<<<<<< HEAD
const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, maxlength: 100 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    estadoCredencial: { type: String, maxlength: 50, default: "Activo" },
    cargo: { type: String, maxlength: 100, default: "Sin definir" },
    fechaEmisionCredencial: { type: Date, required: false },
  },
  { timestamps: true } // Manejo automático de `createdAt` y `updatedAt`
);
=======
// Modelo de usuario con referencia a la institución
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  institution: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },  // Referencia a la institución
}, { timestamps: true });
>>>>>>> 8979238 (Trabajen)

module.exports = mongoose.model("User", userSchema);
