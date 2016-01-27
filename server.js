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

app.get('/meals/:id', function (req, res) {
  findMeal(req, res, function (meal) { res.json(meal); });
});

app.post('/meals', function (req, res) {
  var attributes = req.body;
  database.addMeal(attributes, function (newItemArray) {
    res.status(200).json(newItemArray[0]);
  });
});

app.delete('/meals/:id', function (req, res) {
  findMeal(req, res, function (meal) {
    database.removeMeal(meal.meal_id, function (sqlres) {
      res.status(200).json(meal);
    });
  });
});

function findMeal(req, res, callback) {
  var id = parseInt(req.params.id);
  database.getMealById(id, function (mealsArray) {
    var meal = mealsArray[0];
    if (meal) {
      callback(meal);
    } else {
      res.status(401).json( {status: 'not exists'} );
    }
  });
}
