const express = require('express');
const app = express();
const port = 4567;

start();

function start() {
  app.use(express.static('public'));

  app.get('/', function(req, res) {
    res.sendFile('index.html');
  });

  app.get('/todos', function(req, res) {
    res.json({ todos: ['Do the thing', 'Do the other thing'] });
  });

  app.listen(port, function() {
    console.log(`Listening of port ${port}`);
  });
}
