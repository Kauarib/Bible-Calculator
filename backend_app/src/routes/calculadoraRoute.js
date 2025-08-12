const express = require('express');
const router = express.Router();

// Importa as funções do nosso controller de cálculos
const { calculateChaptersPerDay, calculateTotalDays } = require('../controllers/calculadoraController');

// Define a rota para o cálculo de capítulos por dia
// Rota: POST /api/calculate-chapters-per-day
router.post('/calculate-chapters-per-day', calculateChaptersPerDay);

// Define a rota para o cálculo do total de dias
// Rota: POST /api/calculate-total-days
router.post('/calculate-total-days', calculateTotalDays);

module.exports = router;