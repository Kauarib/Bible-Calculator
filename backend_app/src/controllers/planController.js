// backend_app/src/controllers/planController.js

const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');

const prisma = new PrismaClient();

// Esquema de validação para criar um novo plano
const createPlanSchema = z.object({
  planName: z.string().min(1, "O nome do plano é obrigatório."),
  chaptersPerDay: z.number().int().positive(),
  totalDays: z.number().int().positive(),
});

// --- Função para CRIAR um plano de leitura ---
const createPlan = async (req, res) => {
  try {
    // Valida os dados recebidos do frontend
    const planData = createPlanSchema.parse(req.body);

    // Pega o ID do usuário que foi anexado à requisição pelo middleware 'protect'
    const userId = req.user.id;

    // Salva o novo plano no banco de dados, associando-o ao usuário logado
    const newPlan = await prisma.readingPlan.create({
      data: {
        ...planData,
        userId: userId, // Conecta o plano ao usuário
      },
    });

    res.status(201).json(newPlan);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error(error);
    res.status(500).json({ error: "Erro interno ao criar o plano." });
  }
};

// --- Função para BUSCAR os planos do usuário logado ---
const getPlans = async (req, res) => {
  try {
    const userId = req.user.id;

    const plans = await prisma.readingPlan.findMany({
      where: {
        userId: userId, // Filtra para buscar apenas os planos deste usuário
      },
      orderBy: {
        createdAt: 'desc', // Mostra os mais recentes primeiro
      },
    });

    res.status(200).json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno ao buscar os planos." });
  }
};

module.exports = { createPlan, getPlans };