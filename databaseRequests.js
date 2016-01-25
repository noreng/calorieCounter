'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'test2',
  password : 'test2',
  database : 'calorie_counter'
});

connection.connect();

function getMeals(callback) {
  var sql = 'SELECT meal_id, name, calories, date FROM `meals`';
  connection.query(sql, function(err, res) {
    if (err) throw err;
    callback(res);
  });
}

function getMealById(id, callback) {
  var sql = 'SELECT meal_id, name, calories, date FROM `meals` WHERE meal_id=?';
  connection.query(sql, id, function(err, res) {
    if (err) throw err;
    callback(res);
  });
}

function addMeal(attributes, callback) {
  var sql = 'INSERT INTO `meals` SET ?';
  connection.query(sql, attributes, function(err, res) {
    if (err) throw err;
    callback(res);
  });
}

function removeMeal(id, callback) {
  var sql = 'DELETE FROM `meals` WHERE `meal_id`= ?';
  connection.query(sql, id, function(err, res) {
    if (err) throw err;
    callback(res);
  });
}

module.exports = {
  getMeals: getMeals,
  getMealById: getMealById,
  addMeal: addMeal,
  removeMeal: removeMeal
};
