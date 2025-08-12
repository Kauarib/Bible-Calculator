
📖 Calculadora de Leitura da Bíblia
Uma aplicação web full-stack que ajuda os usuários a planejarem a leitura completa da Bíblia, calculando o ritmo necessário em capítulos por dia ou o tempo total para completar a leitura.

Este projeto foi desenvolvido como um exercício prático, cobrindo o ciclo completo de desenvolvimento de software: do backend ao frontend, passando pela containerização com Docker e versionamento com Git.

✨ Features
Dois Modos de Cálculo:

Meta de Tempo: Descubra quantos capítulos ler por dia para terminar a Bíblia em um período determinado (ex: 1 ano).

Ritmo de Leitura: Descubra em quantos dias você completará a leitura com base em uma quantidade fixa de capítulos por dia.

Interface Moderna: Frontend reativo e elegante construído com as tecnologias mais recentes.

Containerização Completa: A aplicação inteira (backend e frontend) roda em containers Docker isolados, garantindo um setup de desenvolvimento rápido e consistente em qualquer máquina.

🛠️ Tech Stack
A aplicação é dividida em dois serviços principais:

Serviço	Tecnologias Principais
🚀 Frontend	Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
⚙️ Backend	Node.js, Express
🐳 DevOps	Docker, Docker Compose

Exportar para as Planilhas
📸 Screenshots
(Adicione aqui screenshots da sua aplicação em funcionamento! É uma ótima forma de mostrar o resultado final de forma rápida e visual).

🏁 Como Rodar o Projeto Localmente
Para executar este projeto, você precisará ter o Git, Docker e o Docker Compose instalados em sua máquina.

Clone o repositório:

Bash

git clone https://github.com/seu-usuario/calculadora-leitura-biblia.git
Navegue até a pasta do projeto:

Bash

cd calculadora-leitura-biblia
Construa e suba os containers Docker:
O Docker Compose irá ler o arquivo docker-compose.yml e cuidará de todo o processo de build e de rede entre os containers.

Bash

docker-compose up --build -d
--build: Força a reconstrução das imagens a partir dos Dockerfiles.

-d: Roda os containers em segundo plano (detached mode).

Acesse a aplicação:
Após o build ser concluído, a aplicação estará disponível nos seguintes endereços:

Frontend: http://localhost:3000

Backend API: http://localhost:3001

Para parar a aplicação, rode o comando:

Bash

docker-compose down
📂 Estrutura do Projeto
A estrutura de pastas principal está organizada da seguinte forma para separar claramente as responsabilidades:

calculadora-leitura-biblia/
├── backend_app/
│   ├── src/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend_app/
│   ├── src/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .gitignore
│   ├── next.config.mjs
│   ├── package.json
│   └── tailwind.config.ts
├── docker-compose.yml
└── README.md
🗺️ Roadmap (Melhorias Futuras)
Este projeto tem uma base sólida que permite diversas melhorias futuras, como:

[ ] Adicionar suporte para diferentes versões da Bíblia (ex: Católica, com 73 livros).

[ ] Implementar um sistema de tracking de progresso usando localStorage.

[ ] Exibir o trecho de leitura do dia (ex: "Hoje: Gênesis 1-4").

[ ] Melhorar a UX com notificações do tipo "toast" para os resultados e erros.

[ ] Refinar a responsividade para dispositivos móveis.
