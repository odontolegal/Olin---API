const mongoose = require('mongoose');

const evidenceSchema = new mongoose.Schema({
  descricao: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ['imagem', 'documento', 'objeto', 'outro'],
    default: 'outro'
  },
  criadoEm: {
    type: Date,
    default: Date.now
  },
  caso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case',
    required: true
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Evidence', evidenceSchema);
