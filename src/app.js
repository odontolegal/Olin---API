const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const createInitialAdmin = require('./startup/createAdmin');

// Rotas
const authRoutes = require('./routes/auth.routes');
const protectedRoutes = require('./routes/protected.routes');
const userRoutes = require('./routes/user.routes');
const caseRoutes = require('./routes/case.routes');
const evidenceRoutes = require('./routes/evidence.routes');
const laudoRoutes = require('./routes/laudo.routes');

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Conexão com o banco
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('[DB] Conectado ao MongoDB Atlas');
    createInitialAdmin(); // <-- Só cria o admin DEPOIS do banco estar conectado
  })
  .catch(err => console.error('[DB] Erro de conexão:', err));

// Rotas
app.use('/api', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api', userRoutes);
app.use('/api/casos', caseRoutes);
app.use('/api/evidencias', evidenceRoutes);
app.use('/api/laudos', laudoRoutes);

module.exports = app;
