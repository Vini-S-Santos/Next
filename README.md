# 📸 Photo Opp

Aplicação web interativa que permite capturar uma foto com webcam, aplicar uma moldura e gerar um QR Code para download.

---

## 🧩 Estrutura do Projeto

```
/
├── backend/      # API Express que salva imagem com moldura no Firebase Storage
├── frontend/     # Aplicação React (Vite) que interage com a câmera e exibe as telas
├── .env          # Variáveis de ambiente (backend/frontend)
```

---

## 🚀 Requisitos

- Node.js (v18 ou superior)
- NPM
- Conta no Firebase com bucket configurado
- Webcam disponível no dispositivo

---

## 🔧 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone git@github.com:Vini-S-Santos/Next.git
cd Next
```

### 2. Configurar o Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` com:

```
STORAGE_BUCKET=seu-bucket.appspot.com
```

Adicione o arquivo `firebase-key.json` na pasta `backend` (não suba para o GitHub!).

Rode o backend localmente:

```bash
node index.js
```

> O backend estará em: `http://localhost:5000`

---

### 3. Configurar o Frontend

```bash
cd ../frontend
npm install
```

Crie um arquivo `.env` com:

```
VITE_BASE_URL=http://localhost:5000
```

Rode o frontend localmente:

```bash
npm run dev
```

> A aplicação estará disponível em: `http://localhost:5173`

---

## ✅ Funcionalidades

- Captura de foto via webcam
- Aplicação automática de moldura
- Upload para Firebase Storage
- Geração de QR Code com link da imagem
- Interface responsiva em tela cheia

---

## 🛠 Tecnologias

- React + Vite
- Node.js + Express
- Firebase Storage (Admin SDK)
- dom-to-image-more
- Tailwind CSS

---

## 📦 Build para produção

```bash
cd frontend
npm run build
```

> Os arquivos serão gerados na pasta `/frontend/dist`

---

## ⚠️ Observações

- Não envie o `firebase-key.json` para o GitHub.
- Recomenda-se usar Render para deploy do backend e Vercel para o frontend.

---

## ✍️ Autor

Desenvolvido por [@Vini-S-Santos](https://github.com/Vini-S-Santos)