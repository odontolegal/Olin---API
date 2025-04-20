const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const perfilFormatado =
      decoded.perfil.charAt(0).toUpperCase() + decoded.perfil.slice(1).toLowerCase();

    // Garante que os dados estejam completos em req.user
    req.user = {
      id: decoded.id,
      nome: decoded.name,
      perfil: perfilFormatado
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
};
