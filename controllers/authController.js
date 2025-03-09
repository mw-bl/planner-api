import db from "../models/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já existe!" });
    }

    const newUser = await db.User.create({ name, email, password });

    const user = newUser.get({ plain: true });
    delete user.password;

    return res
      .status(201)
      .json({ message: "Usuário criado com sucesso!", user });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar usuário!" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await db.User.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const isPasswordValid = await bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciais inválidas!" });
    }

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ message: "Login realizado com sucesso!", token });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao realizar login!" });
  }
};
