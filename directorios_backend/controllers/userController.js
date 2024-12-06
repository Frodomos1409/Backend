const User = require('../models/User');
const Institution = require('../models/Institution'); // Asegúrate de que la ruta sea correcta

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { institutionName, email, password, name } = req.body;

    // Verificar si institutionName está presente
    if (!institutionName) {
      return res.status(400).json({ message: 'El nombre de la institución es requerido' });
    }

    // Normalizar el nombre de la institución (quitar espacios y poner todo en minúsculas)
    const institutionNameNormalized = institutionName.trim().toLowerCase();

    // Depuración: Imprime el nombre de la institución que estás buscando
    console.log("Buscando institución con nombre:", institutionNameNormalized);

    // Verificar si la institución existe en la base de datos
    const institution = await Institution.findOne({
      name: { $regex: new RegExp(`^${institutionNameNormalized}$`, 'i') }  // Usamos una expresión regular insensible a mayúsculas
    }).exec();

    // Depuración: Verifica si la institución fue encontrada
    console.log("Institución encontrada:", institution);

    if (!institution) {
      return res.status(400).json({ message: 'Institución no encontrada' });
    }

    // Crear el nuevo usuario y asociar la institución encontrada
    const user = new User({
      name,
      email,
      password,
      institution: institution._id,  // Asociar el ObjectId de la institución
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);  // Log para depuración
    res.status(500).json({ message: 'Error al crear el usuario: ' + error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('institution');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('institution');
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar usuario
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar usuario
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Asignar institución a usuario
exports.assignInstitutionToUser = async (req, res) => {
  try {
    const { userId, institutionId } = req.body;
    const user = await User.findByIdAndUpdate(userId, { institution: institutionId }, { new: true });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
