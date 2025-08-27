// backend_app/src/routes/authRoutes.js

const express = require('express');
const router = express.Router();

// Importa as funções do nosso controller de autenticação
const { register, login } = require('../controllers/authController');

// Define as rotas de autenticação
router.post('/register', register);
router.post('/login', login);


// Exporta o router para uso em outras partes da aplicação
module.exports = router;