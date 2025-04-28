# 🦷 Odonto Legal - API
Odonto Legal é uma API RESTful desenvolvida em Node.js com Express, voltada para o gerenciamento de processos odontológicos como casos clínicos, laudos, relatórios e evidências. A aplicação também oferece controle de acesso baseado em funções (roles), autenticação segura e modularização por responsabilidades.

## ❗ Problema

Profissionais da odontologia e peritos enfrentam dificuldades no controle e centralização de informações clínicas, laudos, evidências e relatórios de forma segura e organizada.


## 💡 Solução

A API "Odonto Legal" automatiza esse processo com um sistema robusto e seguro de gerenciamento de dados odontológicos, controle de usuários por função e rotas protegidas com autenticação JWT.


## 📌 Funcionalidades
👤 Cadastro e autenticação de usuários

### 🔒 Controle de acesso por tipo de usuário (admin, comum, etc.)

### 📁 Gerenciamento de casos clínicos, laudos, relatórios e evidências

🧾 Geração e listagem de relatórios

📊 Avaliações e validações com middleware personalizado

✅ Rotas protegidas e organizadas

## ⚙️ Tecnologias Utilizadas
Node.js — Runtime JavaScript

Express — Framework para servidor HTTP

MongoDB / Mongoose — Banco de dados NoSQL

JWT (JSON Web Token) — Autenticação

Bcrypt — Criptografia de senhas

Swagger (opcional) — Documentação da API

VSCode — Editor utilizado

🛠️ Estrutura de Pastas
bash
Copiar
Editar
src/
├── controllers/           # Lógica das requisições
├── middlewares/           # Verificações de autenticação e roles
├── models/                # Schemas do MongoDB
├── routes/                # Definição das rotas
├── startup/               # Arquivos de inicialização e utilitários
└── app.js                 # Arquivo principal da aplicação
🧩 Controle de Acesso (Roles)
A verificação de acesso é feita por middleware personalizado:

javascript
Copiar
Editar
// Exemplo do roleCheck.middleware.js
if (!rolesPermitidos.includes(role)) {
  return res.status(403).json({ message: 'Acesso não autorizado' });
}
Usuários têm papéis definidos.

Apenas funções autorizadas acessam determinadas rotas.

Middleware dedicado garante segurança e organização.

## 🚀 Como Executar o Projeto
🔧 Pré-requisitos
Node.js v16+

MongoDB local ou Atlas

Docker (opcional)

## 📥 Instalação
bash
Copiar
Editar
# Clone o repositório
git clone (https://github.com/odontolegal/Olin---API.git)

# Acesse o diretório
cd odonto-legal-api

# Instale as dependências
npm install
▶️ Execução Local
bash
Copiar
Editar
## Para rodar localmente
npm start
🐳 Com Docker (opcional)
bash
Copiar
Editar
docker-compose up --build
🔐 Autenticação e Segurança
JWT para autenticação

Hash de senha com bcrypt

Middleware para rotas protegidas

Validação de permissões por papel (role)

## 📬 Rotas Principais

Método	Rota	Descrição
POST	/auth/login	Login de usuários
POST	/users/register	Registro de novos usuários
GET	/cases	Listagem de casos clínicos
POST	/laudos	Criação de laudos
GET	/relatorios	Acesso a relatórios
...	...	Outras rotas definidas por módulo
🧪 Testes
Testes manuais via Postman.

Testes automatizados ainda em desenvolvimento.
![image](https://github.com/user-attachments/assets/42c54317-357e-4e1f-845b-5e3d97b92cda)

https://sistemaolin.netlify.app/
