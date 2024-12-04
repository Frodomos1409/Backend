const express = require('express');
const router = express.Router();
const { 
  createFederation, 
  getFederations, 
  getFederationById, 
  updateFederation, 
  deleteFederation 
} = require('../controllers/federationController');

// Endpoints para federaciones
router.post('/', createFederation); // Crear federación
router.get('/', getFederations); // Obtener todas las federaciones
router.get('/:id', getFederationById); // Obtener federación por ID
router.put('/:id', updateFederation); // Actualizar federación
router.delete('/:id', deleteFederation); // Eliminar federación

module.exports = router;
