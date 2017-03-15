const express = require('express');
const bp = require('body-parser');
const app = express();
const port = process.env.RINZAI_PORT || 4567;
let todos = [
  {id: 1, message: 'Do the thing', complete: false},
  {id: 2, message: 'Do the other thing', complete: false}
];

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
      todos.push({id: todos.length + 1, message: req.body.todo, complete: false});
      console.log(todos);
      res.json({ todos: todos });
    } else {
      res.status(400).json({ message: 'Missing required field: todo'});
    }
  });

  app.listen(port, function() {
    console.log(`Listening of port ${port}`);
  });
}
