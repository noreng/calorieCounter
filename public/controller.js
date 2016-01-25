'use strict';

var nameField, inputFields, submitButton;
var request = new Request();

nameField = document.querySelector('#meal-name');
inputFields = document.getElementsByTagName('input');
submitButton = document.querySelector('#btn-submit');

submitButton.addEventListener('click', submitMeal);

function submitMeal(event) {
  event.preventDefault();
  var values = getInputValues();
  var meal = createMealItem(values);
  request.postItemToServer(meal);
  deleteInputValues();
  nameField.focus();
}

function getInputValues() {
  var values = {};
  for (var i = 0; i < inputFields.length; i++) {
    var input = inputFields[i];
    var attributes = input.getAttribute('data-meal-id');
    values[attributes] = input.value;
  }
  return values;
}

function deleteInputValues() {
  for (var i = 0; i < inputFields.length; i++) {
    var input = inputFields[i];
    input.value = '';
  }
}
