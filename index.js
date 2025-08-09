const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
let todos = [];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Home route with optional filter and message
app.get('/', (req, res) => {
  const filter = req.query.filter;
  const message = req.query.message || '';
  const filteredTodos = filter ? todos.filter(t => t.priority === filter) : todos;
  res.render('index', { todos: filteredTodos, filter, message });
});

// Add task
app.post('/add', (req, res) => {
  const { task, priority } = req.body;
  if (task.trim()) {
    todos.push({ task, priority });
    return res.redirect('/?message=Task added successfully');
  }
  res.redirect('/?message=Task cannot be empty');
});

// Edit task
app.put('/edit/:index', (req, res) => {
  const { task, priority } = req.body;
  const index = req.params.index;
  todos[index] = { task, priority };
  res.redirect('/?message=Task updated successfully');
});

// Delete task
app.delete('/delete/:index', (req, res) => {
  todos.splice(req.params.index, 1);
  res.redirect('/?message=Task deleted successfully');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
