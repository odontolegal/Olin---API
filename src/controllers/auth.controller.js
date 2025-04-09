const User = require('../models/user.model'); // Importa o model do usuário. Consulta o banco de dados pra ver se o usuário existe
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Importa quem vai gerar o seu token JWT

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('[LOGIN] Tentando login com:', email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log('[LOGIN] Usuário não encontrado');
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('[LOGIN] Senha inválida');
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    console.log('[LOGIN] Token gerado com sucesso');
    res.status(200).json({ token });
  } catch (err) {
    console.error('[LOGIN] Erro durante o login:', err);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};
