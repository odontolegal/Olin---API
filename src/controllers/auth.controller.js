const User = require('../models/user.model'); // Importa como o usuário está definido
const bcrypt = require('bcryptjs'); // importa a cripitografia
const jwt = require('jsonwebtoken'); // importa o uso do token para autenticação

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('[LOGIN] Tentando login com:', email);

    // Busca o usuário pelo e-mail
    const user = await User.findOne({ email });
    if (!user) {
      console.log('[LOGIN] Usuário não encontrado');
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Compara a senha enviada com a armazenada (criptografada)
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('[LOGIN] Senha inválida');
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // ✅ Gera o token com os dados que vamos usar no sistema
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name, // Esse campo precisa existir no seu model
        perfil: user.role.toLowerCase() // ou user.perfil, dependendo do nome no schema
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    console.log('[LOGIN] Token gerado com sucesso');

    // Retorna o token para o frontend
    res.status(200).json({ token });
  } catch (err) {
    console.error('[LOGIN] Erro durante o login:', err);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};
