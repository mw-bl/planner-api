import db from "../models/index.js";

export const createDestino = async (req, res) => {
  const { pais, estado, cidade, viagemId } = req.body;

  try {
    const newDestino = await db.Destino.create({ pais, estado, cidade, viagemId });
    res.status(201).json({ message: "Destino criado com sucesso", destino: newDestino });
  } catch (error) {
    console.error("Erro ao criar destino:", error);
    res.status(500).json({ message: "Erro ao criar destino" });
  }
};
