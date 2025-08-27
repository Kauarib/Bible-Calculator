const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware para proteger rotas

const protect = async (req, resizeBy, next) => {
    let token; // Verifica se o token está presente no cabeçalho de autorização

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) try {
        token = req.headers.authorization.split(' ')[1]; // Extrai o token do cabeçalho
        // Verifica se o token é válido
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        // Busca o usuário no banco de dados usando o ID do token decodificado
        req.user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {id: true, email: true, name: true} // Seleciona apenas os campos necessários   
        });

        // Se o usuário não for encontrado, retorna um erro
        if (!req.user) {
            return res.status(401).json({ error: "Usuário não encontrado."});
        }

        next(); // Chama o próximo middleware ou rota se o token for válido

    } catch (error) { // Se ocorrer um erro ao verificar o token
        console.error(error);
        return res.status(401).json({ error: "Token inválido ou expirado." });

    }
    if (!token) { // Se o token não estiver presente
        return res.status(401).json({ error: "Token não fornecido." });
    }
}
// Exporta o middleware para uso em outras partes da aplicação
module.exports = { protect };