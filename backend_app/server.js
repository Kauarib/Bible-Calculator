const express = require('express');
const cors = require('cors');
const apiRoutes = require('./src/routes/calculadoraRoute');
const authRoutes = require('./src/routes/authRoute'); 
const planRoutes = require('./src/routes/planRoute');
const bibleRoutes = require('./src/routes/bibleRoute');

// Inicializa o aplicativo Express
const app = express();
const PORT = process.env.PORT || 3001; // Usa a porta do ambiente ou 3001 como padrão

// Middlewares
app.use(cors()); // Habilita o CORS para todas as requisições
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// Rota principal da API
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
app.use('/api/plans', planRoutes);
apiRoutes.use('/bible', bibleRoutes);


// Rota de "saúde" para verificar se o servidor está no ar
app.get('/', (req, res) => {
  res.send('Servidor da Calculadora de Leitura da Bíblia está funcionando!');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});