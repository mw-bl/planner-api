import db from '../models/index.js';

export const createViagem = async (req, res) => {
  const { dataCriacao, dataInicio, dataFinal, confirmada, confirmacao, organizador, pais, estado, cidade} = req.body;
  
  try {
    const userId = req.user.id;
    const newViagem = await db.Viagem.create({ dataCriacao, dataInicio, dataFinal, confirmada, userId, confirmacao, organizador, pais, estado, cidade });
    res.status(201).json({ message: 'Viagem criada com sucesso', viagem: newViagem });
  } catch (error) {
    console.error('Erro ao criar viagem:', error);
    res.status(500).json({ message: 'Erro ao criar viagem' });
  }
};

export const getAllViagens = async (req, res) => {
  try {
    const viagens = await db.Viagem.findAll({ include: [{ model: db.User, as: 'user' }] });
    res.status(200).json({ message: 'Viagens recuperadas com sucesso', viagens });
  } catch (error) {
    console.error('Erro ao listar viagens:', error);
    res.status(500).json({ message: 'Erro ao listar viagens' });
  }
};

export const getViagemById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const viagem = await db.Viagem.findByPk(id, { include: [{ model: db.User, as: 'user' }] });
    if (!viagem) return res.status(404).json({ message: 'Viagem não encontrada' });
    res.status(200).json({ message: 'Viagem recuperada com sucesso', viagem });
  } catch (error) {
    console.error('Erro ao buscar viagem por ID:', error);
    res.status(500).json({ message: 'Erro ao buscar viagem por ID' });
  }
};

export const updateViagem = async (req, res) => {
  const { id } = req.params;
  const { dataCriacao, dataInicio, dataFinal, confirmada, userId, confirmacao, organizador } = req.body;

  try {
    const viagem = await db.Viagem.findByPk(id);
    if (!viagem) return res.status(404).json({ message: 'Viagem não encontrada' });
    
    Object.assign(viagem, { dataCriacao, dataInicio, dataFinal, confirmada, userId, confirmacao, organizador });
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
  }
};
