// Importa o model de Evidence (baseado no Mongoose), que representa a coleção de evidências no banco
const Evidence = require('../models/evidence.model');

/*
|--------------------------------------------------------------------------
| Criar evidência
|--------------------------------------------------------------------------
*/
exports.createEvidence = async (req, res) => {
  try {
    // Extrai os campos necessários do corpo da requisição
    const { descricao, tipo, caso } = req.body;

    // Cria uma nova instância de Evidence com os dados recebidos + o usuário logado como autor
    const novaEvidencia = new Evidence({
      descricao,
      tipo,
      caso,
      autor: req.user.id // O ID vem do token JWT decodificado pelo middleware de autenticação
    });

    // Salva a nova evidência no banco de dados ( como a imagem vai ser salva?)
    await novaEvidencia.save();

    // Retorna resposta de sucesso com status 201 (Created)
    res
      .status(201)
      .json({ message: 'Evidência cadastrada com sucesso.', evidencia: novaEvidencia });
  } catch (error) {
    // Se algo deu errado, exibe no terminal e responde com erro 500 (Internal Server Error)
    console.error('[ERRO] Criação de evidência:', error);
    res.status(500).json({ message: 'Erro ao cadastrar evidência.' });
  }
};

/*
|--------------------------------------------------------------------------
| Listar evidências de um caso
|--------------------------------------------------------------------------
*/
exports.getEvidencesByCase = async (req, res) => {
  try {
    // Pega o ID do caso a partir da query string (?casoId=XYZ)
    const { casoId } = req.query;

    // Se nenhum ID foi passado, responde com erro 400 (requisição malformada)
    if (!casoId) {
      return res.status(400).json({ message: 'ID do caso não informado.' });
    }

    // Busca evidências associadas ao caso, e popula os dados do autor (sem senha, só informção que for útil)
    const evidencias = await Evidence.find({ caso: casoId }).populate('autor', 'name email role');

    // Retorna as evidências encontradas com status 200
    res.status(200).json(evidencias);
  } catch (error) {
    // Loga erro e responde com erro genérico
    console.error('[ERRO] Listar evidências por caso:', error);
    res.status(500).json({ message: 'Erro ao buscar evidências.' });
  }
};

/*
|--------------------------------------------------------------------------
| Atualizar evidência
|--------------------------------------------------------------------------
*/
exports.updateEvidence = async (req, res) => {
  try {
    // Extrai o ID da evidência da URL (ex: PUT /evidencias/:id)
    const { id } = req.params;

    // Extrai os campos a serem atualizados do corpo da requisição
    const updates = req.body;

    // Busca a evidência pelo ID e aplica as alterações. "new: true" faz retornar a versão atualizada
    const evidenciaAtualizada = await Evidence.findByIdAndUpdate(id, updates, {
      new: true
    });

    // Se não achou nenhuma evidência com esse ID, responde com erro 404
    if (!evidenciaAtualizada) {
      return res.status(404).json({ message: 'Evidência não encontrada.' });
    }

    // Tudo certo, responde com status 200 e os dados da evidência atualizada
    res
      .status(200)
      .json({ message: 'Evidência atualizada com sucesso.', evidencia: evidenciaAtualizada });
  } catch (error) {
    // Erro genérico em caso de falha
    console.error('[ERRO] Atualização de evidência:', error);
    res.status(500).json({ message: 'Erro ao atualizar evidência.' });
  }
};
