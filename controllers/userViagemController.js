import db from "../models/index.js";

export const associateUserToViagem = async (req, res) => {
<<<<<<< HEAD
  const { viagemId } = req.params; // ID da viagem
  const { email } = req.body; // E-mail do usuário a ser associado
  const userIdLogado = req.user.id; // ID do organizador logado

=======
  const { viagemId } = req.params; 
  const { userId } = req.body; 
  const userIdLogado = req.user.id; 
>>>>>>> 986c930a1d2f5e986a14f9d40e1701bcd5a3d137
  try {
    
    const viagem = await db.Viagem.findByPk(viagemId);


    if (!viagem) {
      return res.status(404).json({ message: "Viagem não encontrada" });
    }


    if (viagem.userId !== userIdLogado) {
      return res.status(403).json({ message: "Você não tem permissão para adicionar participantes a esta viagem." });
    }

    // Busca o usuário pelo e-mail
    const user = await db.User.findOne({ where: { email } });
    
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

<<<<<<< HEAD
    // Verifica se o usuário já está associado à viagem
    const existingAssociation = await db.UserViagem.findOne({ where: { viagemId, userId: user.id } });
=======
  
    const existingAssociation = await db.UserViagem.findOne({ where: { viagemId, userId } });
>>>>>>> 986c930a1d2f5e986a14f9d40e1701bcd5a3d137
    if (existingAssociation) {
      return res.status(400).json({ message: "Usuário já está associado a esta viagem." });
    }

<<<<<<< HEAD
    // Associa o usuário à viagem
    await db.UserViagem.create({ viagemId, userId: user.id, confirmada: false });
=======
   
    await db.UserViagem.create({ viagemId, userId, confirmada: false });
>>>>>>> 986c930a1d2f5e986a14f9d40e1701bcd5a3d137
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
    res.status(200).json({ user }); 
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ message: "Erro ao buscar usuário" });
  }
};

export const confirmarParticipacao = async (req, res) => {
  const { viagemId } = req.params;
  const userId = req.user.id;

  console.log("Confirmando participação para:");
  console.log("Viagem ID:", viagemId);
  console.log("Usuário ID:", userId);

  try {
    
    const userViagem = await db.UserViagem.findOne({
      where: { viagemId, userId },
    });

    console.log("Registro encontrado na tabela UserViagem:", userViagem);

    if (!userViagem) {
      return res.status(404).json({ message: "Participação não encontrada" });
    }

    userViagem.confirmada = true;
    await userViagem.save();

    
    const participantes = await db.UserViagem.findAll({
      where: { viagemId },
    });

    const todosConfirmados = participantes.every((p) => p.confirmada);

    
    if (todosConfirmados) {
      const viagem = await db.Viagem.findByPk(viagemId);
      viagem.confirmada = true;
      await viagem.save();
    }

    res.status(200).json({ message: "Participação confirmada com sucesso" });
  } catch (error) {
    console.error("Erro ao confirmar participação:", error);
    res.status(500).json({ message: "Erro ao confirmar participação" });
  }
};

export const removerParticipante = async (req, res) => {
  const { viagemId, userId } = req.params; 
  const userIdLogado = req.user.id; 

  try {
    const viagem = await db.Viagem.findByPk(viagemId);

    if (!viagem) {
      return res.status(404).json({ message: "Viagem não encontrada" });
    }

    if (viagem.userId !== userIdLogado) {
      return res.status(403).json({ message: "Você não tem permissão para remover participantes desta viagem." });
    }

    const userViagem = await db.UserViagem.findOne({ where: { viagemId, userId } });

    if (!userViagem) {
      return res.status(404).json({ message: "Participação não encontrada" });
    }

    await userViagem.destroy();

    res.status(200).json({ message: "Participante removido da viagem com sucesso." });
  } catch (error) {
    console.error("Erro ao remover participante da viagem:", error);
    res.status(500).json({ message: "Erro ao remover participante da viagem." });
  }
};
