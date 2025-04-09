const Laudo = require('../models/laudo.model');

exports.createLaudo = async (req, res) => {
  try {
    const { caso, evidencias, texto } = req.body;

    if (!caso || !texto) {
      return res.status(400).json({ message: 'Campos obrigatórios não preenchidos.' });
    }

    const novoLaudo = new Laudo({
      caso,
      evidencias,
      texto,
      autor: req.user.id
    });

    await novoLaudo.save();

    res.status(201).json({
      message: 'Laudo criado com sucesso.',
      laudo: novoLaudo
    });
  } catch (error) {
    console.error('[ERRO] Criação de laudo:', error);
    res.status(500).json({ message: 'Erro ao criar laudo.' });
  }
};
