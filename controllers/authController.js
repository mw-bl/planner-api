import db from '../models/index.js'; 

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha inválida' });
    }

    console.log('Papel do usuário no login:', user.role); // Verifique se o papel está correto

    // Gera o token JWT com o papel do usuário
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, // Inclua o papel do usuário
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
};

export const signUp = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
   
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

   
    const newUser = await db.User.create({ name, email, password, role });

   
    const user = newUser.get({ plain: true });
    delete user.password;

    res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};
