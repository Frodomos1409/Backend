const Federation = require('../models/Federation');

// **Crear federación**
exports.createFederation = async (req, res) => {
  try {
    const federation = new Federation(req.body);
    await federation.save();
    res.status(201).json(federation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// **Obtener todas las federaciones**
exports.getFederations = async (req, res) => {
  try {
    const federations = await Federation.find();
    res.status(200).json(federations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **Obtener federación por ID**
exports.getFederationById = async (req, res) => {
  try {
    const federation = await Federation.findById(req.params.id);
    if (federation) {
      res.status(200).json(federation);
    } else {
      res.status(404).json({ message: 'Federación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// **Actualizar federación**
exports.updateFederation = async (req, res) => {
  try {
    const federation = await Federation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(federation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// **Eliminar federación**
exports.deleteFederation = async (req, res) => {
  try {
    await Federation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Federación eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
