const Institution = require('../models/Institution');

// Crear institución
exports.createInstitution = async (req, res) => {
  try {
    const institution = new Institution(req.body);
    await institution.save();
    res.status(201).json(institution);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las instituciones
exports.getInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.find().populate('federation');
    res.status(200).json(institutions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener institución por ID
exports.getInstitutionById = async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id).populate('federation');
    if (institution) {
      res.status(200).json(institution);
    } else {
      res.status(404).json({ message: 'Institución no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar institución
exports.updateInstitution = async (req, res) => {
  try {
    const institution = await Institution.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (institution) {
      res.status(200).json(institution);
    } else {
      res.status(404).json({ message: 'Institución no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar institución
exports.deleteInstitution = async (req, res) => {
  try {
    const institution = await Institution.findByIdAndDelete(req.params.id);
    if (institution) {
      res.status(200).json({ message: 'Institución eliminada correctamente' });
    } else {
      res.status(404).json({ message: 'Institución no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
