'use strict';

var Meal = function (name, calories, date) {
  this.name = name;
  this.calories = calories;
  this.date = date;
}

function createMealItem(values) {
  var name = values.name;
  var calories = values.calories;
  var date = createDateFromInput(values);
  return new Meal(name, calories, date)
}

function createDateFromInput(values) {
  var date = values.year + '-' +
             values.month + '-' +
             values.day + ' ' +
             values.hour + ':' +
             values.minutes;
  return date;
}
