# SaaS Demo – Next.js (AI Score + Humanizar Texto)

Demo pronta para publicar (Vercel/Netlify). Front Next.js com endpoints **mock**:
- `POST /api/score` → retorna um score simulado (0–1)
- `POST /api/rewrite` → retorna texto reescrito de forma simples

> **Observação:** É apenas uma demo. Substitua os endpoints por integrações reais com IA quando desejar.

## Rodar localmente
```bash
npm install
npm run dev
# abra http://localhost:3000
```

## Build
```bash
npm run build
npm start
```

## Deploy (Vercel)
1. Faça login em https://vercel.com
2. "New Project" → importe este repositório
3. Deploy com as configurações padrão (Next.js)

## Estrutura
- `/pages/index.js` → UI
- `/pages/api/score.js` → score mock
- `/pages/api/rewrite.js` → reescrita mock
- `/styles/globals.css` → estilos

## Próximos passos (trocar mock por IA real)
- Em `/pages/api/*`, chamar o provedor de IA (OpenAI/Anthropic/Google), aplicar guardrails e retornar o resultado real.
