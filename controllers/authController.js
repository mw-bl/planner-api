import db from '../models/index.js'; 

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Tentativa de login com email:", email); // Log do email recebido
    console.log("Senha recebida:", password); // Log da senha recebida

    // Verifica se o usuário existe no banco de dados
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      console.log("Usuário não encontrado para o email:", email); // Log se o usuário não for encontrado
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    console.log("Usuário encontrado:", user); // Log do usuário encontrado
    console.log("Senha armazenada (hash):", user.password); // Log do hash armazenado

    // Verifica a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Senha válida:", isPasswordValid); // Log do resultado da comparação
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    // Gera o token JWT com o papel do usuário
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role, // Inclui o papel do usuário no payload
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Define o tempo de expiração do token
    );

    console.log("Login bem-sucedido para o email:", email); // Log de sucesso no login
    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role, // Agora você inclui o tipo de usuário
      },
    });
    
  } catch (error) {
    console.error("Erro ao fazer login:", error); // Log de erro
    res.status(500).json({ message: "Erro ao fazer login" });
  }
};

export const signUp = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    console.log("Tentativa de cadastro com email:", email);
    console.log("Dados recebidos para cadastro:", { name, email, role });

    // Verifica se o email já está cadastrado
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      console.log("Email já está em uso:", email);
      return res.status(400).json({ message: "Email já está em uso" });
    }

    // Verifica se o campo role foi fornecido
    if (!role || (role !== "organizador" && role !== "convidado")) {
      console.log("Papel do usuário inválido ou não fornecido:", role);
      return res.status(400).json({ message: "Papel do usuário (role) inválido ou não fornecido" });
    }

    // Cria o usuário no banco de dados (o hook `beforeCreate` cuidará da criptografia)
    const newUser = await db.User.create({
      name,
      email,
      password, // A senha será criptografada no hook
      role,
    });

    console.log("Usuário criado com sucesso:", newUser);
    res.status(201).json({ message: "Usuário criado com sucesso", user: newUser });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ message: "Erro ao criar usuário" });
  }
};
