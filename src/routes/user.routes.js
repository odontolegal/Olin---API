const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const adminOnly = require('../middlewares/adminOnly.middleware');
const userController = require('../controllers/user.controller');

// Apenas admins autenticados podem criar usuários
router.post('/usuarios', authMiddleware, adminOnly, userController.createUser);

// Apenas admins autenticados podem ver todos os usuários
router.get('/usuarios', authMiddleware, adminOnly, userController.getAllUsers);

// Apenas admins podem atualizar dados de usuário
router.put('/usuarios/:id', authMiddleware, adminOnly, userController.updateUser);

// Apenas admin podem deletar usuários :)
router.delete('/usuarios/:id', authMiddleware, adminOnly, userController.deleteUser);

module.exports = router;
