const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const ejs = require('ejs');
const fs = require('fs');
const app = express();
const port = 3000;

let statuses = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', { statuses: statuses });
});

app.post('/', function(req, res) {
  const status = req.body.status;
  console.log('Creating status:', status);
  statuses.push(status);
  fs.appendFile('status.txt', status + '\n', function(err) {
	if (err) {
		console.error(err);
	} 
  });
  res.redirect('/');
});

app.get('/:id/edit', function(req, res) {
  const id = req.params.id;
  const status = statuses[id];
  console.log('Editing status:', status);
  res.render('edit', { id: id, status: status });
});

app.put('/:id', function(req, res) {
  const id = req.params.id;
  const status = req.body.status;
  console.log('Updating status:', statuses[id], 'to', status);
  statuses[id] = status;
  res.redirect('/');
});

app.delete('/:id', function(req, res) {
  const id = req.params.id;
  console.log('Deleting status:', statuses[id]);
  statuses.splice(id, 1);
  res.redirect('/');
});

app.listen(port, function() {
  console.log(`Server is listening on port ${port}`);
});
