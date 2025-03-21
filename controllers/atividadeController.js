import db from "../models/index.js";

export const createAtividade = async (req, res) => {
  const { dataAtividade, titulo, viagemId } = req.body;

  try {
    const newAtividade = await db.Atividade.create({ dataAtividade, titulo, viagemId });
    res.status(201).json({ message: "Atividade criada com sucesso", atividade: newAtividade });
  } catch (error) {
    console.error("Erro ao criar atividade:", error);
    res.status(500).json({ message: "Erro ao criar atividade" });
  }
};

export const getAllAtividades = async (req, res) => {
  try {
    const atividades = await db.Atividade.findAll();
    res.status(200).json({ message: "Atividades recuperadas com sucesso", atividades });
  } catch (error) {
    console.error("Erro ao listar atividades:", error);
    res.status(500).json({ message: "Erro ao listar atividades" });
  }
};

export const getAtividadeById = async (req, res) => {
  const { id } = req.params;

  try {
    const atividade = await db.Atividade.findByPk(id);
    if (!atividade) {
      return res.status(404).json({ message: "Atividade não encontrada" });
    }
    res.status(200).json({ message: "Atividade recuperada com sucesso", atividade });
  } catch (error) {
    console.error("Erro ao buscar atividade por ID:", error);
    res.status(500).json({ message: "Erro ao buscar atividade por ID" });
  }
};

export const updateAtividade = async (req, res) => {
  const { id } = req.params;
  const { dataAtividade, titulo, viagemId } = req.body;

  try {
    const atividade = await db.Atividade.findByPk(id);
    if (!atividade) {
      return res.status(404).json({ message: "Atividade não encontrada" });
    }

    atividade.dataAtividade = dataAtividade;
    atividade.titulo = titulo;
    atividade.viagemId = viagemId;
    await atividade.save();

    res.status(200).json({ message: "Atividade atualizada com sucesso", atividade });
  } catch (error) {
    console.error("Erro ao atualizar atividade:", error);
    res.status(500).json({ message: "Erro ao atualizar atividade" });
  }
};

export const deleteAtividade = async (req, res) => {
  const { id } = req.params;

  try {
    const atividade = await db.Atividade.findByPk(id);
    if (!atividade) {
      return res.status(404).json({ message: "Atividade não encontrada" });
    }

    await atividade.destroy();
    res.status(200).json({ message: "Atividade deletada com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar atividade:", error);
    res.status(500).json({ message: "Erro ao deletar atividade" });
  }
};
