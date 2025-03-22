destinoController

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

export const getAllDestinos = async (req, res) => {
  try {
    const destinos = await db.Destino.findAll();
    res.status(200).json({ message: "Destinos recuperados com sucesso", destinos });
  } catch (error) {
    console.error("Erro ao listar destinos:", error);
    res.status(500).json({ message: "Erro ao listar destinos" });
  }
};

export const getDestinoById = async (req, res) => {
  const { id } = req.params;

  try {
    const destino = await db.Destino.findByPk(id);
    if (!destino) {
      return res.status(404).json({ message: "Destino não encontrado" });
    }
    res.status(200).json({ message: "Destino recuperado com sucesso", destino });
  } catch (error) {
    console.error("Erro ao buscar destino por ID:", error);
    res.status(500).json({ message: "Erro ao buscar destino por ID" });
  }
};

export const updateDestino = async (req, res) => {
  const { id } = req.params;
  const { pais, estado, cidade, viagemId } = req.body;

  try {
    const destino = await db.Destino.findByPk(id);
    if (!destino) {
      return res.status(404).json({ message: "Destino não encontrado" });
    }

    destino.pais = pais;
    destino.estado = estado;
    destino.cidade = cidade;
    destino.viagemId = viagemId;
    await destino.save();

    res.status(200).json({ message: "Destino atualizado com sucesso", destino });
  } catch (error) {
    console.error("Erro ao atualizar destino:", error);
    res.status(500).json({ message: "Erro ao atualizar destino" });
  }
};