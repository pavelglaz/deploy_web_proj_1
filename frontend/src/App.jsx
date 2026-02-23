import { useEffect, useState } from 'react';

const API_URL = '/api/todos';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadTodos() {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
      alert('Не удалось загрузить todo');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTodos();
  }, []);

  async function addTodo(e) {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const created = await res.json();
      setTodos((prev) => [...prev, created]);
      setText('');
    } catch (error) {
      console.error(error);
      alert('Не удалось добавить todo');
    }
  }

  async function toggleTodo(id) {
    try {
      const res = await fetch(`${API_URL}/${id}/toggle`, { method: 'PUT' });
      const updated = await res.json();
      setTodos((prev) => prev.map((todo) => (todo.id === id ? updated : todo)));
    } catch (error) {
      console.error(error);
      alert('Не удалось обновить todo');
    }
  }

  async function deleteTodo(id) {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
      alert('Не удалось удалить todo');
    }
  }

  return (
    <main className="container">
      <h1>Todo App</h1>

      <form className="todo-form" onSubmit={addTodo}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Новая задача"
        />
        <button type="submit">Добавить</button>
      </form>

      {loading ? (
        <p>Загрузка...</p>
      ) : todos.length === 0 ? (
        <p>Список задач пуст</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.done ? 'done' : ''}>
              <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
              <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
