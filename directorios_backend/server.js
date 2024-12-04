require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const institutionRoutes = require('./routes/institutionRoutes'); // Importa las rutas de Instituciones
const federationRoutes = require('./routes/federationRoutes'); // Importa las rutas de Federaciones

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors()); // Maneja solicitudes preflight.
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error.message);
  });

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/institutions', institutionRoutes); // Rutas para Instituciones
app.use('/api/federations', federationRoutes); // Rutas para Federaciones

// Ruta base
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});
