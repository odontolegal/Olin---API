const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Nome completo
    email: { type: String, required: true, unique: true }, // E-mail institucional
    matricula: { type: String, required: true, unique: true }, // Matrícula de "funcionário"
    password: { type: String, required: true }, // Senha com hash
    role: {
      type: String,
      enum: ['admin', 'perito', 'assistente'],
      default: 'perito'
    },
    active: { type: Boolean, default: true } // Ativo/inativo
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
