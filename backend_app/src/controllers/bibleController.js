const axios = require('axios');

// Instância do axios pré-configurada para a API.Bible
const bibleApi = axios.create({
  baseURL: 'https://api.scripture.api.bible/v1',
  headers: {
    'api-key': process.env.BIBLE_API_KEY,
  },
});

const getBibleVersions = async (req, res) => {
  try {
    const response = await bibleApi.get('/bibles', {
      params: { language: 'por' },
    });
    const versions = response.data.data.map(version => ({
      id: version.id,
      name: version.name,
      abbreviation: version.abbreviation,
    }));
    res.status(200).json(versions);
  } catch (error) {
    console.error("Erro ao buscar versões da Bíblia:", error.response?.data || error.message);
    res.status(500).json({ error: 'Falha ao buscar as versões da Bíblia.' });
  }
};

const getBooks = async (req, res) => {
    try {
        const { versionId } = req.params;
        if (!versionId) {
            return res.status(400).json({ error: 'ID da versão é obrigatório.' });
        }
        const response = await bibleApi.get(`/bibles/${versionId}/books`, {
          params: { 'include-chapters': true }
        });
        const books = response.data.data.map(book => ({
            id: book.id,
            name: book.name,
            abbreviation: book.abbreviation.default,
            chapters: book.chapters.map(c => ({ id: c.id, number: c.number })),
        }));
        res.status(200).json(books);
    } catch (error) {
        console.error("Erro ao buscar livros da Bíblia:", error.response?.data || error.message);
        res.status(500).json({ error: 'Falha ao buscar os livros da Bíblia.' });
    }
};

const getChapterText = async (req, res) => {
  try {
    const { versionId, chapterId } = req.params;
    if (!versionId || !chapterId) {
      return res.status(400).json({ error: 'ID da versão e do capítulo são obrigatórios.' });
    }
    const response = await bibleApi.get(`/bibles/${versionId}/chapters/${chapterId}`, {
      params: {
        'content-type': 'html',
        'include-verse-numbers': true
      }
    });
    const chapterContent = response.data.data.content;
    res.status(200).send(chapterContent);
  } catch (error) {
    console.error("Erro ao buscar texto do capítulo:", error.response?.data || error.message);
    res.status(500).json({ error: 'Falha ao buscar o texto do capítulo.' });
  }
};

// --- NOVA FUNÇÃO PARA BUSCAR VERSÍCULOS ---
const searchVerses = async (req, res) => {
  try {
    const { versionId } = req.params;
    const { query } = req.query; // Pega o termo de busca da URL (ex: ?query=Jesus)

    if (!versionId || !query) {
      return res.status(400).json({ error: 'ID da versão e termo de busca são obrigatórios.' });
    }

    const response = await bibleApi.get(`/bibles/${versionId}/search`, {
      params: {
        query: query,
        'fuzziness': 'AUTO', // Permite pequenas variações na busca
      }
    });

    // Formata os resultados para serem mais fáceis de usar no frontend
    const results = {
      query: response.data.data.query,
      total: response.data.data.total,
      verses: response.data.data.verses.map(v => ({
        id: v.id,
        reference: v.reference,
        text: v.text,
      })),
    };
    
    res.status(200).json(results);

  } catch (error) {
    console.error("Erro na busca por versículos:", error.response?.data || error.message);
    res.status(500).json({ error: 'Falha ao realizar a busca.' });
  }
};

module.exports = { getBibleVersions, getBooks, getChapterText, searchVerses };