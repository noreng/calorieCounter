'use strict';

var Meal = function (name, calories, date) {
  this.name = name;
  this.calories = calories;
  this.date = date;
}

function createMealItem(values) {
  var name = values.mealName;
  var calories = values.mealCalorie;
  var date = values.mealDate + ':' + values.mealTime;
  var meal = new Meal(name, calories, date);
  return meal;
}
