const express = require('express');
const bp = require('body-parser');
const app = express();
const port = process.env.RINZAI_PORT || 4567;
const Sequelize = require('sequelize');
const seq = new Sequelize(process.env.RINZAI_DSN);
const Todo = seq.define('Todo', {
  message: Sequelize.STRING,
  complete: Sequelize.BOOLEAN
});

start();

function start() {
  app.use(express.static('public'));
  app.use(bp.urlencoded({ extended: false }));
  app.use(bp.json());

  app.get('/', function(req, res) {
    res.sendFile('index.html');
  });

  app.get('/todos', function(req, res) {
    respondTodos(res);
  });

  app.post('/todos', function(req, res) {
    if (req.body.todo) {
      Todo.create({
        message: req.body.todo,
        complete: false
      }).then(function(todo) {
        res.json({ todo: todo });
      }).catch(function(err) {
        res.status(500).json({ message: 'Server error' });
      });
    } else {
      res.status(400).json({ message: 'Missing required field: todo'});
    }
  });

  app.put('/todos/:id', function(req, res) {
    Todo.update({ complete: req.body.complete },
      { where: { id: req.params.id } })
    .then(function(result) {
      if (result[0] > 0) {
        respondTodos(res);
      } else {
        res.status(404).json({ message: `Todo with id ${req.params.id} not found` });
      }
    }).catch(function(err) {
      res.status(500).json({ message: 'Server error' });
    });
  });

  app.delete('/todos/:id', function(req, res) {
    Todo.destroy({ where: { id: req.params.id } })
    .then(function(result) {
      if (result > 0) {
        respondTodos(res);
      } else {
        res.status(404).json({ message: `Todo with id ${req.params.id} not found` });
      }
    }).catch(function(err) {
      res.status(500).json({ message: 'Server error' });
    });
  });

  app.listen(port, function() {
    console.log(`Listening of port ${port}`);
  });
}

function respondTodos(res) {
  Todo.findAll().then(function(todos) {
    res.json({ todos: todos.map(function(e) { return e.dataValues }) });
  }).catch(function(err) {
    res.status(500).json({ message: 'Server error' });
  });
}

