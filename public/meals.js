'use strict';

var Meal = function (name, calories, date) {
  this.name = name;
  this.calories = calories;
  this.date = date;
}

function createMealItem(values) {
  var name = values.name;
  var calories = values.calories;
  var date = values.date + ':' + values.time;
  var meal = new Meal(name, calories, date);
  return meal;
}
