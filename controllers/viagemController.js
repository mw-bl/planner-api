import db from '../models/index.js';

export const createViagem = async (req, res) => {
  const { dataCriacao, dataInicio, dataFinal, confirmada, pais, estado, cidade, participantes } = req.body;
  const userId = req.user.id;

  try {
    if (req.user.role !== 'organizador') {
      return res.status(403).json({ message: 'Apenas organizadores podem criar viagens' });
    }

    const newViagem = await db.Viagem.create({ dataCriacao, dataInicio, dataFinal, confirmada, userId, pais, estado, cidade });

    if (participantes && participantes.length > 0) {
      const participantesData = participantes.map((p) => ({
        viagemId: newViagem.id,
        userId: p.id,
        confirmada: false,
      }));
      await db.UserViagem.bulkCreate(participantesData);
    }

    res.status(201).json({ message: 'Viagem criada com sucesso', viagem: newViagem });
  } catch (error) {
    console.error('Erro ao criar viagem:', error);
    res.status(500).json({ message: 'Erro ao criar viagem' });
  }
};

export const getAllViagens = async (req, res) => {
  try {
    let viagens;

    if (req.user.role === 'organizador') {
      // Organizadores podem ver as viagens que organizaram
      viagens = await db.Viagem.findAll({
        where: { userId: req.user.id },
        include: [
          {
            model: db.User,
            as: 'organizador',
            attributes: ['id', 'name', 'email'],
          },
          {
            model: db.User,
            as: 'convidados',
            attributes: ['id', 'name', 'email'],
            through: { attributes: ['confirmada'] },
          },
        ],
      });
    } else if (req.user.role === 'convidado') {
      // Convidados só podem ver as viagens em que participam
      viagens = await db.Viagem.findAll({
        include: [
          {
            model: db.User,
            as: 'organizador',
            attributes: ['id', 'name', 'email'],
          },
          {
            model: db.User,
            as: 'convidados',
            where: { id: req.user.id },
            attributes: ['id', 'name', 'email'],
            through: { attributes: ['confirmada'] },
          },
        ],
      });
    } else {
      return res.status(403).json({ message: 'Acesso negado' });
    }

    res.status(200).json({ message: 'Viagens recuperadas com sucesso', viagens });
  } catch (error) {
    console.error('Erro ao listar viagens:', error);
    res.status(500).json({ message: 'Erro ao listar viagens' });
  }
};

export const getViagemById = async (req, res) => {
  const { id } = req.params;

  try {
    const viagem = await db.Viagem.findByPk(id, {
      include: [
        {
          model: db.User,
          as: 'convidados', // Alias para os participantes
          attributes: ['id', 'name', 'email'], // Retorna apenas os campos necessários
          through: { attributes: ['confirmada'] }, // Inclui o status de confirmação
        },
        {
          model: db.Atividade,
          as: 'atividades', // Alias para as atividades
          attributes: ['id', 'dataAtividade', 'titulo'],
        },
      ],
    });

    if (!viagem) {
      return res.status(404).json({ message: 'Viagem não encontrada' });
    }

    res.status(200).json({ message: 'Viagem recuperada com sucesso', viagem });
  } catch (error) {
    console.error('Erro ao buscar viagem por ID:', error);
    res.status(500).json({ message: 'Erro ao buscar viagem por ID' });
  }
};

export const updateViagem = async (req, res) => {
  const { id } = req.params;
  const { dataInicio, dataFinal, confirmada, pais, estado, cidade } = req.body;

  try {
    const viagem = await db.Viagem.findByPk(id);
    if (!viagem) return res.status(404).json({ message: 'Viagem não encontrada' });

    // Atualiza apenas os campos permitidos
    viagem.dataInicio = dataInicio || viagem.dataInicio;
    viagem.dataFinal = dataFinal || viagem.dataFinal;
    viagem.confirmada = confirmada !== undefined ? confirmada : viagem.confirmada;
    viagem.pais = pais || viagem.pais;
    viagem.estado = estado || viagem.estado;
    viagem.cidade = cidade || viagem.cidade;

    await viagem.save();

    res.status(200).json({ message: 'Viagem atualizada com sucesso', viagem });
  } catch (error) {
    console.error('Erro ao atualizar viagem:', error);
    res.status(500).json({ message: 'Erro ao atualizar viagem' });
  }
};

export const deleteViagem = async (req, res) => {
  const { id } = req.params;

  try {
    const viagem = await db.Viagem.findByPk(id);
    if (!viagem) return res.status(404).json({ message: 'Viagem não encontrada' });
    
    await viagem.destroy();
    res.status(200).json({ message: 'Viagem deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar viagem:', error);
    res.status(500).json({ message: 'Erro ao deletar viagem' });
  }};



