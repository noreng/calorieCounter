'use strict';

var nameField, inputFields, submitButton;
var request = new Request();

nameField = document.querySelector('#mealName');
inputFields = document.getElementsByTagName('input');
submitButton = document.querySelector('#btn-submit');

submitButton.addEventListener('click', submitMeal);

function submitMeal(event) {
  var meal = createMealItem();
  request.postItemToServer(meal);
  deleteInputValues();
  nameField.focus();
  event.preventDefault();
}

function createMealItem() {
  var values = getInputValues();
  var item = {
    'name': values.mealName,
    'calories': values.mealCalorie,
    'date': values.mealDate + ':' + values.mealTime
  };
  return item;
}

function getInputValues() {
  var values = {};
  for (var i = 0; i < inputFields.length; i++) {
    var input = inputFields[i];
    values[input.id] = input.value;
  }
  return values;
}

function deleteInputValues() {
  for (var i = 0; i < inputFields.length; i++) {
    var input = inputFields[i];
    input.value = '';
  }
}
