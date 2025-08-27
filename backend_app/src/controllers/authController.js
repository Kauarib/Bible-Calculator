// backend_app/src/controllers/authController.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const e = require('express');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const prisma = new PrismaClient();

// Esquema de validação com Zod
const registerSchema = z.object({
  name: z.string().min(4, {message: "O nome deve ter no mínimo 4 caracteres"}).max(100, {message: "O nome deve ter no máximo 100 caracteres"}),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  // É uma boa prática validar o formato da senha também no login
  password: z.string().min(1, { message: "A senha é obrigatória" }),
});

const register = async (req, res) => {
  try {
    // 1. Validar a entrada
    const {  name, email, password } = registerSchema.parse(req.body);

    // 2. Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: "Este email já está em uso." });
    }

    // 3. Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Salvar o novo usuário no banco de dados
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Não retorne a senha!
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json(userWithoutPassword);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};
// LOGIN
const login = async (req, res) => {
    try { 
        // 1. Validar a entrada
        const {email, password}= loginSchema.parse(req.body);
        // 2. Verificar se o usuário existe
        const user = await prisma.user.findUnique({ where: { email}});

        // 2,1. mensagem de erro se o usuário não existir
        if (!user){
            return res.status(401).json({ error: "Usuario inválido." });
        }
        // 3. Verificar a senha
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // 3.1. mensagem de erro se a senha for inválida
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Senha inválida." });
        }
        // 4. Gerar token JWT
        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_KEY,
            {
                expiresIn: '1d'
            }
        );
        // 5. Retornar o usuário e o token
        res.status(200).json({ token})


    }catch (error){
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors})
        }
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
}
module.exports = { register, login };