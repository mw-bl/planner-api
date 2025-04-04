import db from "../models/index.js";

export const associateUserToViagem = async (req, res) => {
  const { viagemId } = req.params; // ID da viagem
  const { userId } = req.body; // ID do usuário a ser associado
  const userIdLogado = req.user.id; // ID do organizador logado

  try {
    // Busca a viagem pelo ID
    const viagem = await db.Viagem.findByPk(viagemId);

    // Verifica se a viagem existe
    if (!viagem) {
      return res.status(404).json({ message: "Viagem não encontrada" });
    }

    // Verifica se a viagem pertence ao organizador logado
    if (viagem.userId !== userIdLogado) {
      return res.status(403).json({ message: "Você não tem permissão para adicionar participantes a esta viagem." });
    }

    // Busca o usuário pelo ID
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Verifica se o usuário já está associado à viagem
    const existingAssociation = await db.UserViagem.findOne({ where: { viagemId, userId } });
    if (existingAssociation) {
      return res.status(400).json({ message: "Usuário já está associado a esta viagem." });
    }

    // Associa o usuário à viagem
    await db.UserViagem.create({ viagemId, userId, confirmada: false });
    res.status(200).json({ message: "Usuário associado à viagem com sucesso." });
  } catch (error) {
    console.error("Erro ao associar usuário à viagem:", error);
    res.status(500).json({ message: "Erro ao associar usuário à viagem." });
  }
};



export const findUserByEmail = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "O e-mail é obrigatório." });
  }

  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json({ user }); // Certifique-se de retornar o objeto `user`
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ message: "Erro ao buscar usuário" });
  }
};

export const confirmarParticipacao = async (req, res) => {
  const { viagemId } = req.params;
  const userId = req.user.id;

  try {
    const userViagem = await db.UserViagem.findOne({
      where: { viagemId, userId },
    });

    if (!userViagem) {
      return res.status(404).json({ message: 'Participação não encontrada' });
    }

    userViagem.confirmada = true;
    await userViagem.save();

    res.status(200).json({ message: 'Participação confirmada com sucesso' });
  } catch (error) {
    console.error('Erro ao confirmar participação:', error);
    res.status(500).json({ message: 'Erro ao confirmar participação' });
  }
};