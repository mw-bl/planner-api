import db from "../models/index.js";

export const associateUserToViagem = async (req, res) => {
    const { viagemId } = req.params;
    const { userId } = req.body;

    const userIdLogado = req.user.id;
  
    try {
      // Busca o usuário e a viagem pelo ID
      const user = await db.User.findByPk(userId);
      const viagem = await db.Viagem.findByPk(viagemId);

      if(viagem.userId != userIdLogado){
        res.status(500).json({ message: "A viagem não pertence ao usuário logado." });
      }
  
      if (user && viagem) {
        // Associa a viagem ao usuário
        const newParticipante = await db.UserViagem.create({ userId, viagemId });
        res.status(200).json({ message: "Usuário associado à viagem com sucesso" });
      } else {
        res.status(404).json({ message: "Usuário ou viagem não encontrados" });
      }
    } catch (error) {
      console.error("Erro ao associar usuário à viagem:", error);
      res.status(500).json({ message: "Erro ao associar usuário à viagem" });
    }
  };