# Scraper

Agregador inteligente de vagas remotas — filtra por localização e stack automaticamente e notifica via Telegram.

## O Problema

Abrir 8 plataformas por dia, ver a mesma vaga repetida, gastar 30 minutos lendo descrições que não combinam com o perfil. O Scraper resolve isso com automação.

## Como Funciona

```
API → Normalização → Filtro de Localização → Filtro de Stack → Deduplicação → Telegram
```

## Status

**MVP em construção.**

- [x] Fetch e normalização (Remotive API)
- [x] Filtro de localização por keywords
- [x] Filtro de stack via `.env`
- [x] Deduplicação via `seen.json`
- [x] Notificação via Telegram
- [ ] Scheduler (diário às 8h)

## Stack

- **Runtime:** Node.js
- **HTTP:** Fetch API nativa
- **Config:** dotenv
- **Bot:** Telegram Bot API
- **Scheduler:** node-cron

## Como Rodar

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas keywords e tokens

# Rodar
node scraper.js
```

## Configuração (.env)

```
KEYWORDS= Exemplo:,node.js,typescript,python
TELEGRAM_TOKEN=seu_token_aqui
TELEGRAM_CHAT_ID=seu_chat_id_aqui
```

## Estrutura

```
scraper/
├── sources/
│   └── remotive.js     # Adapter da Remotive API
├── scraper.js          # Ponto de entrada
├── deduplicar.js       # Gerenciamento do seen.json (em construção)
└── .env                # Variáveis de ambiente (não commitado)
```

## Roadmap

**Fase 1 — MVP (atual)**
Bot pessoal com uma fonte, filtros básicos e notificação no Telegram.

**Fase 2 — Produto**
Multi-usuário, múltiplas fontes, dashboard web, modelo freemium.

**Fase 3 — IA**
Score de compatibilidade: nota + justificativa honesta sobre gaps.
