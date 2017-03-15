const express = require('express');
const app = express();
const port = 4567;

start();

function start() {
  app.use(express.static('public'));

  app.get('/', function(req, res) {
    res.sendFile('index.html');
  });

  app.listen(port, function() {
    console.log(`Listening of port ${port}`);
  });
}
