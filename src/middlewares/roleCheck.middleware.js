module.exports = (rolesPermitidos = []) => { // Aqui vamos verificar quais acessos cada usuário vai ter
  return (req, res, next) => {
    const role = req.user?.role;

    if (!rolesPermitidos.includes(role)) {
      return res.status(403).json({ message: 'Acesso não autorizado' });
    }

    next();
  };
};
