const Federation = require('../models/Federation'); // Asegúrate de que la ruta del modelo Federation sea correcta
const Institution = require('../models/Institution'); // Asegúrate de que la ruta sea correcta

// Crear una nueva institución
exports.createInstitution = async (req, res) => {
  try {
    const { name, address, latitud, longitud, paginaWeb, federationName } = req.body;

    // Verificar si federationName está presente
    if (!federationName) {
      return res.status(400).json({ message: 'El nombre de la federación es requerido' });
    }

    // Normalizar el nombre de la federación (quitar espacios y poner todo en minúsculas)
    const federationNameNormalized = federationName.trim().toLowerCase();

    // Depuración: Imprime el nombre de la federación que estás buscando
    console.log("Buscando federación con nombre:", federationNameNormalized);

    // Verificar si la federación existe en la base de datos
    const federation = await Federation.findOne({
      name: { $regex: new RegExp(`^${federationNameNormalized}$`, 'i') }  // Usamos una expresión regular insensible a mayúsculas
    }).exec();

    // Depuración: Verifica si la federación fue encontrada
    console.log("Federación encontrada:", federation);

    if (!federation) {
      return res.status(400).json({ message: 'Federación no encontrada' });
    }

    // Crear la nueva institución y asociar la federación encontrada
    const institution = new Institution({
      name,
      address,
      latitud,
      longitud,
      paginaWeb,
      federation: federation._id,  // Asociar el ObjectId de la federación
    });

    await institution.save();
    res.status(201).json(institution);
  } catch (error) {
    console.error(error);  // Log para depuración
    res.status(500).json({ message: 'Error al crear la institución: ' + error.message });
  }
};

// Obtener todas las instituciones
exports.getInstitutions = async (req, res) => {
  try {
    // Obtener las instituciones con la información de la federación populada
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
    // Actualizar la institución con los nuevos datos
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
