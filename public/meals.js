'use strict';

var Meal = function (name, calories, date) {
  return {
    name: name,
    calories: calories,
    date: date,
  }
}

function createMealItem(values) {
  var name = values.name;
  var calories = values.calories;
  var date = values.datetime;
  return new Meal(name, calories, date);
}
