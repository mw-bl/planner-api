import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("Token não fornecido");
    return res.status(401).json({ message: "Token não fornecido" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Erro ao verificar token:", err);
      return res.status(403).json({ message: "Token inválido ou expirado" });
    }

    console.log("Payload do token JWT:", user); // Verifica o payload do token
    req.user = user; // Atribui o payload ao req.user
    next();
  });
};

export const authorizeRole = (role) => {
  return (req, res, next) => {
      console.log('Papel do usuário:', req.user.role);
      if (req.user.role !== role) {
          console.log('Acesso negado. Papel necessário:', role);
          return res.status(403).json({ message: 'Acesso negado' });
      }
      next();
  };
};
