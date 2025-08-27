const express = require('express');
const router = express.Router();

// Importa as funções do nosso controller de cálculos
const { calculateChaptersPerDay, calculateTotalDays } = require('../controllers/calculadoraController');

// Importa o middleware de autenticação
const { protect } = require('../middleware/authMiddleware');

// Define a rota para o cálculo de capítulos por dia
// Rota: POST /api/calculate-chapters-per-day
router.post('/calculate-chapters-per-day', calculateChaptersPerDay);

// Define a rota para o cálculo do total de dias
// Rota: POST /api/calculate-total-days
router.post('/calculate-total-days', calculateTotalDays);

// Exporta o router para uso em outras partes da aplicação
router.get('/me', protect, (req, res) => {
    res.status(200).json(req.user); // Retorna os dados do usuário autenticado
});

// Exporta o router para uso em outras partes da aplicação
module.exports = router;