import db from "../models/index.js";

export const associateUserToViagem = async (req, res) => {
    const { userId, viagemId } = req.body;
  
    try {
      // Busca o usuário e a viagem pelo ID
      const user = await db.User.findByPk(userId);
      const viagem = await db.Viagem.findByPk(viagemId);
  
      if (user && viagem) {
        // Associa a viagem ao usuário
        await user.addViagem(viagem);
        res.status(200).json({ message: "Usuário associado à viagem com sucesso" });
      } else {
        res.status(404).json({ message: "Usuário ou viagem não encontrados" });
      }
    } catch (error) {
      console.error("Erro ao associar usuário à viagem:", error);
      res.status(500).json({ message: "Erro ao associar usuário à viagem" });
    }
  };