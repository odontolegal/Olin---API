module.exports = (rolesPermitidos = []) => {
  return (req, res, next) => {
    const userRole = req.user.perfil.toLowerCase(); // 🔥 força lowercase
    const roles = rolesPermitidos.map(r => r.toLowerCase()); // 🔥 compara certo

    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'Acesso negado. Permissão insuficiente.' });
    }

    next();
  };
};
