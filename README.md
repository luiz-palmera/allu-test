# Allu Fullstack Test

[![CI](https://github.com/luiz-palmera/allu-test/actions/workflows/ci.yml/badge.svg)](https://github.com/luiz-palmera/allu-test/actions/workflows/ci.yml)
![Node](https://img.shields.io/badge/node-20-green)
![Docker](https://img.shields.io/badge/docker-ready-blue)
![Postgres](https://img.shields.io/badge/database-postgresql-blue)

Implementação do desafio técnico fullstack proposto pela Allu.

O projeto consiste em um **catálogo de produtos com busca inteligente, página de detalhes e carrinho persistente**, utilizando **NestJS no backend** e **Next.js no frontend**.

Repositório:

```
https://github.com/luiz-palmera/allu-test
```

---

# Como executar o projeto

## 1. Clonar o repositório

```bash
git clone https://github.com/luiz-palmera/allu-test.git
cd allu-test
```

## 2. Subir a aplicação com Docker

```bash
cd infra
docker compose up --build
```

Isso iniciará automaticamente:

- PostgreSQL
- API (NestJS)
- Frontend (Next.js)

---

# Acessos da aplicação

Frontend

```
http://localhost:3001
```

API

```
http://localhost:3000
```

Documentação da API (Swagger)

```
http://localhost:3000/docs
```

---

# Requisitos atendidos

✔ Listagem de produtos  
✔ Página de detalhes do produto  
✔ Carrossel de imagens  
✔ Busca por nome, categoria e descrição  
✔ Autocomplete de busca  
✔ Busca tolerante a erro (fuzzy search)  
✔ Carrinho persistente  
✔ Cálculo de valores mensal e anual  
✔ Documentação da API com Swagger  
✔ Logs da aplicação  
✔ Testes unitários no backend  
✔ Execução via Docker  
✔ Pipeline de CI com GitHub Actions

---

# Funcionalidades implementadas

## Catálogo de produtos

- listagem paginada
- infinite scroll
- navegação para página de produto
- página de detalhes com carrossel de imagens

---

## Busca de produtos

A busca permite encontrar produtos por:

- nome
- categoria
- descrição técnica

### Autocomplete

Durante a digitação, o sistema exibe sugestões com base em:

- nomes de produtos
- categorias

---

## Busca tolerante a erro (fuzzy search)

Quando não há resultados diretos, o sistema utiliza **fuzzy search no PostgreSQL** com:

- `pg_trgm`
- `similarity`
- `unaccent`

Exemplo:

```
iphoni → iphone
notbok → notebook
smrt → smartwatch
```

---

## Carrinho persistente

O carrinho funciona de forma **anônima**, utilizando um token persistido no cliente.

Características:

- persistência via `x-cart-token`
- adição de produtos
- remoção de produtos
- incremento automático de quantidade
- cálculo automático de valores

---

## Modelagem de preços

O banco persiste apenas:

```
annualValue
```

O valor mensal é calculado dinamicamente no backend:

```
monthlyValue = annualValue / 12
```

Essa abordagem evita inconsistência entre valores armazenados.

---

# Stack utilizada

## Backend

- Node.js
- NestJS
- Prisma ORM
- PostgreSQL
- Swagger / OpenAPI
- Jest
- Class Validator
- Class Transformer

## Frontend

- Next.js (App Router)
- React
- TypeScript
- Zustand
- TailwindCSS
- shadcn/ui
- Radix UI
- Lucide React
- Sonner
- Axios

## Infraestrutura

- Docker
- Docker Compose
- GitHub Actions (CI)

---

# Testes

Testes unitários implementados no backend com **Jest**.

Cobertura atual:

- utilitário de cálculo de preço
- service de produtos
- controller de produtos

Rodar testes:

```bash
cd backend/api
npm run test
```

---

# Logs

Logs foram adicionados nos serviços principais da aplicação para facilitar debugging e observabilidade.

Exemplos de eventos registrados:

- listagem de produtos
- buscas
- fallback para fuzzy search
- autocomplete
- carregamento do carrinho

---

# Estrutura do projeto

```
backend/
  api/
    src/
      cart/
      products/
      prisma/
      common/

frontend/
  web/
    src/
      app/
      components/
      services/
      stores/

infra/
  docker-compose.yml
```

---

# Integração contínua

O projeto possui pipeline de **CI com GitHub Actions**.

O workflow executa automaticamente:

- instalação de dependências
- build do backend
- execução de testes
- build do frontend

---

# Decisões técnicas

### Backend modular

A API foi organizada por módulos principais:

- `products`
- `cart`
- `prisma`
- `common`

Isso facilita manutenção e evolução do sistema.

---

### Estado global no frontend

Foi utilizado **Zustand** para gerenciar:

- estado do carrinho
- estado da busca
- sugestões de autocomplete

---

### Docker como forma principal de execução

O projeto foi preparado para ser executado via Docker, garantindo **reprodutibilidade do ambiente de avaliação**.

---

# Melhorias futuras

Possíveis evoluções:

- autenticação de usuários
- testes E2E
- observabilidade mais avançada
- arquitetura baseada em microserviços

---

# Autor

Luiz Gustavo Ribeiro da Mata
