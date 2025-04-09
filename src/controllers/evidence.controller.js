const Evidence = require('../models/evidence.model');

// Criar evidências
exports.createEvidence = async (req, res) => {
  try {
    const { descricao, tipo, caso } = req.body;

    const novaEvidencia = new Evidence({
      descricao,
      tipo,
      caso,
      autor: req.user.id // quem está logado e criando a evidência
    });

    await novaEvidencia.save();

    res
      .status(201)
      .json({ message: 'Evidência cadastrada com sucesso.', evidencia: novaEvidencia });
  } catch (error) {
    console.error('[ERRO] Criação de evidência:', error);
    res.status(500).json({ message: 'Erro ao cadastrar evidência.' });
  }
};

// Listar evidências dentro de um caso
exports.getEvidencesByCase = async (req, res) => {
  try {
    const { casoId } = req.query;

    if (!casoId) {
      return res.status(400).json({ message: 'ID do caso não informado.' });
    }

    const evidencias = await Evidence.find({ caso: casoId }).populate('autor', 'name email role');

    res.status(200).json(evidencias);
  } catch (error) {
    console.error('[ERRO] Listar evidências por caso:', error);
    res.status(500).json({ message: 'Erro ao buscar evidências.' });
  }
};

exports.updateEvidence = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const evidenciaAtualizada = await Evidence.findByIdAndUpdate(id, updates, {
      new: true
    });

    if (!evidenciaAtualizada) {
      return res.status(404).json({ message: 'Evidência não encontrada.' });
    }

    res
      .status(200)
      .json({ message: 'Evidência atualizada com sucesso.', evidencia: evidenciaAtualizada });
  } catch (error) {
    console.error('[ERRO] Atualização de evidência:', error);
    res.status(500).json({ message: 'Erro ao atualizar evidência.' });
  }
};
