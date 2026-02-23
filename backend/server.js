const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;
const router = express.Router();

app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, text: 'Изучить React', done: false },
  { id: 2, text: 'Сделать backend на Node.js', done: true }
];
let nextId = 3;

router.get('/todos', (req, res) => {
  res.json(todos);
});

router.post('/todos', (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const todo = {
    id: nextId++,
    text: text.trim(),
    done: false
  };

  todos.push(todo);
  res.status(201).json(todo);
});

router.put('/todos/:id/toggle', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find((item) => item.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todo.done = !todo.done;
  res.json(todo);
});

router.delete('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos.splice(index, 1);
  res.status(204).send();
});

app.use('/api', router);
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Todo API running on http://localhost:${PORT}`);
});
