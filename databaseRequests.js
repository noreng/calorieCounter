'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'test2',
  password : 'test2',
  database : 'calorie_counter'
});

connection.connect();

function addMeal(attributes, callback) {
  var sql = 'INSERT INTO `meals` SET ?';
  connection.query(sql, attributes, function(err, res) {
    if (err) throw err;
    callback(res);
  });
}

module.exports = {
  addMeal: addMeal
};
