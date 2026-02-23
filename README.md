# deploy_web_proj_1

Простое todo web-приложение:
- `backend` — Node.js + Express API
- `frotend` — React (Vite) клиент

## Запуск

### 1) Backend
```bash
cd backend
npm install
npm run start
```
API будет доступно на `http://localhost:4000`.

### 2) Frontend
```bash
cd frotend
npm install
npm run dev
```
Приложение откроется на адресе, который покажет Vite (обычно `http://localhost:5173`).

## API
- `GET /api/todos` — получить список
- `POST /api/todos` — создать задачу (`{ "text": "..." }`)
- `PUT /api/todos/:id/toggle` — переключить статус выполнения
- `DELETE /api/todos/:id` — удалить задачу
