'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var database = require('./databaseRequests.js');

var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.listen(3000, function () {
  console.log('Listening on port 3000...');
});

app.get('/meals', function (req, res) {
  database.getMeals(function (allMeals) {
    res.status(200).json(allMeals);
  });
});

app.post('/meals', function (req, res) {
  var attributes = req.body;
  database.addMeal(attributes, function (sqlres) {
    res.status(200).json({'status': 'ok'});
  });
});
