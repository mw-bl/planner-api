import db from "../models/index.js";

export const createLink = async (req, res) => {
  const { url, titulo, viagemId } = req.body;

  try {
    const newLink = await db.Link.create({ url, titulo, viagemId });
    res.status(201).json({ message: "Link criado com sucesso", link: newLink });
  } catch (error) {
    console.error("Erro ao criar link:", error);
    res.status(500).json({ message: "Erro ao criar link" });
  }
};

export const getAllLinks = async (req, res) => {
  try {
    const links = await db.Link.findAll();
    res.status(200).json({ message: "Links recuperados com sucesso", links });
  } catch (error) {
    console.error("Erro ao listar links:", error);
    res.status(500).json({ message: "Erro ao listar links" });
  }
};

export const getLinkById = async (req, res) => {
  const { id } = req.params;

  try {
    const link = await db.Link.findByPk(id);
    if (!link) {
      return res.status(404).json({ message: "Link não encontrado" });
    }
    res.status(200).json({ message: "Link recuperado com sucesso", link });
  } catch (error) {
    console.error("Erro ao buscar link por ID:", error);
    res.status(500).json({ message: "Erro ao buscar link por ID" });
  }
};

export const deleteLink = async (req, res) => {
  const { id } = req.params;

  try {
    const link = await db.Link.findByPk(id);
    if (!link) {
      return res.status(404).json({ message: "Link não encontrado" });
    }

    await link.destroy();
    res.status(200).json({ message: "Link deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar link:", error);
    res.status(500).json({ message: "Erro ao deletar link" });
  }
};
