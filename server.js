const express = require('express');
const bp = require('body-parser');
const app = express();
const port = process.env.RINZAI_PORT || 4567;
let todos = [
  {id: 1, message: 'Do the thing', complete: false},
  {id: 2, message: 'Do the other thing', complete: false}
];
let idCounter = 3;

start();

function start() {
  app.use(express.static('public'));
  app.use(bp.urlencoded({ extended: false }));
  app.use(bp.json());

  app.get('/', function(req, res) {
    res.sendFile('index.html');
  });

  app.get('/todos', function(req, res) {
    res.json({ todos: todos });
  });

  app.post('/todos', function(req, res) {
    if (req.body.todo) {
      todos.push({id: idCounter, message: req.body.todo, complete: false});
      idCounter++;
      res.json({ todos: todos });
    } else {
      res.status(400).json({ message: 'Missing required field: todo'});
    }
  });

  app.put('/todos/:id', function(req, res) {
    let t = getTodo(req.params.id);

    if (t) {
      t.complete = req.body.complete;
      res.json({ todo: t });
    } else {
      res.status(404).json({ message: `Todo with id ${req.params.id} not found` });
    }
  });

  app.delete('/todos/:id', function(req, res) {
    let i = todos.indexOf(getTodo(req.params.id));

    if (i > -1) {
      todos.splice(i, 1);
      res.json({ todos: todos });
    } else {
      res.status(404).json({ message: `Todo with id ${req.params.id} not found` });
    }
  });

  app.listen(port, function() {
    console.log(`Listening of port ${port}`);
  });
}

function getTodo(id) {
  return todos.find(function(e) {
    return e.id === parseInt(id);
  });
}
