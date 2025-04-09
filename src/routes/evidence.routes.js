const express = require('express');
const router = express.Router();

const evidenceController = require('../controllers/evidence.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleCheck = require('../middlewares/roleCheck.middleware');

// Criar evidência
router.post('/', authMiddleware, evidenceController.createEvidence);

// Listar evidências por caso
router.get(
  '/',
  authMiddleware,
  roleCheck(['admin', 'perito, assistente']),
  evidenceController.getEvidencesByCase
);

// EDITAR evidência
router.put(
  '/:id',
  authMiddleware,
  roleCheck(['admin', 'perito', 'assistente']),
  evidenceController.updateEvidence
);

module.exports = router;
