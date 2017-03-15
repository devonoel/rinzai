const express = require('express');
const bp = require('body-parser');
const app = express();
const port = 4567;
let todos = ['Do the thing', 'Do the other thing'];

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
      todos.push(req.body.todo);
      res.json({ todos: todos });
    } else {
      res.status(400).json({ message: 'Missing required field: todo'});
    }

  });

  app.listen(port, function() {
    console.log(`Listening of port ${port}`);
  });
}
