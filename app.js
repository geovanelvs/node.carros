const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(express.json()); 

// Configuração do banco de dados SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './revenda_carros.db',
  logging: false
});

// Definição do modelo 'Carro'
const Carro = sequelize.define('Carro', {
  marca: {
    type: DataTypes.STRING,
    allowNull: false
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantidade: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'carros',
  timestamps: false 
});

// Sincroniza o modelo com o banco de dados
sequelize.sync();

// --- Rotas da API ---

// GET: Visualizar todos os carros no estoque
app.get('/carros', async (req, res) => {
  const carros = await Carro.findAll();
  res.json(carros);
});

// GET: Buscar um carro específico por ID
app.get('/carros/:id', async (req, res) => {
  const { id } = req.params;
  const carro = await Carro.findByPk(id);
  
  if (carro) {
    return res.json(carro);
  }
  
  res.status(404).json({ erro: "Carro não encontrado" });
});

// POST: Inserir um novo carro no estoque
app.post('/carros', async (req, res) => {
  try {
    const { marca, modelo, ano, quantidade, preco } = req.body;
    const novoCarro = await Carro.create({ marca, modelo, ano, quantidade, preco });
    res.status(201).json({ mensagem: "Carro adicionado ao estoque!", id: novoCarro.id });
  } catch (error) {
    res.status(400).json({ erro: "Erro ao adicionar carro", detalhes: error.message });
  }
});

// PUT: Atualizar os dados de um carro
app.put('/carros/:id', async (req, res) => {
  const carro = await Carro.findByPk(req.params.id);
  if (!carro) return res.status(404).json({ erro: "Carro não encontrado" });

  const { marca, modelo, ano, quantidade, preco } = req.body;
  await carro.update({ marca, modelo, ano, quantidade, preco });
  
  res.json({ mensagem: "Dados do carro atualizados com sucesso!" });
});

// DELETE: Remover um carro do estoque
app.delete('/carros/:id', async (req, res) => {
  const carro = await Carro.findByPk(req.params.id);
  if (!carro) return res.status(404).json({ erro: "Carro não encontrado" });

  const modeloRemovido = carro.modelo;
  await carro.destroy();
  
  res.json({ mensagem: `O veículo '${modeloRemovido}' foi removido do estoque!` });
});

// Inicialização do Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor da Revenda rodando em http://localhost:${PORT}`);
});