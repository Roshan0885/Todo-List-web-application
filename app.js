const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let todos = [];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const filter = req.query.filter;
  const filteredTodos = filter ? todos.filter(t => t.priority === filter) : todos;
  res.render('index', { todos: filteredTodos });
});

app.post('/add', (req, res) => {
  const { task, priority } = req.body;
  if (task.trim()) {
    todos.push({ task, priority });
  }
  res.redirect('/');
});

app.post('/edit/:index', (req, res) => {
  const { task, priority } = req.body;
  const index = req.params.index;
  todos[index] = { task, priority };
  res.redirect('/');
});

app.post('/delete/:index', (req, res) => {
  todos.splice(req.params.index, 1);
  res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

