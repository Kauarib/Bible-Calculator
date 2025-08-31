// backend_app/src/routes/bibleRoutes.js

const express = require('express');
const router = express.Router();
const { getBibleVersions, getBooks, getChapterText, searchVerses}= require('../controllers/bibleController');




// Rota para listar as versões
router.get('/versions', getBibleVersions);

// Rota para listar os livros de uma versão
router.get('/:versionId/books', getBooks); 

// Rota para listar o texto de um capítulo específico
router.get('/:versionId/book/chapters/:chapterId', getChapterText);

// Rota para listar o texto de um versículo específico
router.get('/api/bible/:versionId/search', searchVerses);

module.exports = router;