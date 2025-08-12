// A constante com o número total de capítulos.
const TOTAL_BIBLE_CHAPTERS = 1189;

// Opção 1: Calcula quantos capítulos ler por dia.
const calculateChaptersPerDay = (req, res) => {
  const { totalDays } = req.body;

  // Validação básica da entrada
  if (!totalDays || typeof totalDays !== 'number' || totalDays <= 0) {
    return res.status(400).json({ error: 'Por favor, forneça um número de dias válido e positivo.' });
  }

  const chaptersPerDay = Math.ceil(TOTAL_BIBLE_CHAPTERS / totalDays);

  res.status(200).json({ chaptersPerDay });
};

// Opção 2: Calcula em quantos dias a Bíblia será lida.
const calculateTotalDays = (req, res) => {
  const { chaptersPerDay } = req.body;

  // Validação básica da entrada
  if (!chaptersPerDay || typeof chaptersPerDay !== 'number' || chaptersPerDay <= 0) {
    return res.status(400).json({ error: 'Por favor, forneça um número de capítulos por dia válido e positivo.' });
  }

  const totalDays = Math.ceil(TOTAL_BIBLE_CHAPTERS / chaptersPerDay);

  res.status(200).json({ totalDays });
};

// Exporta as funções para que possam ser usadas nas rotas
module.exports = {
  calculateChaptersPerDay,
  calculateTotalDays,
};