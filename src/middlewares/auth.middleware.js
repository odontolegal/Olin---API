// verifica o token JWT ...Se for válido → permite continuar...Se não → bloqueia com erro 401.
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica se o header existe e começa com "Bearer"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifica e decodifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Anexa os dados do usuário na requisição
    next(); // Continua pro próximo middleware ou rota
  } catch (err) {
    console.error('[AUTH] Token inválido:', err);
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};
