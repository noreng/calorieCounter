'use strict';

var inputFields, submitButton;
var request = new Request();

inputFields = document.getElementsByTagName('input');
submitButton = document.querySelector('#btn-submit');

submitButton.addEventListener('click', submitMeal);
resetInputValues();

function submitMeal(event) {
  event.preventDefault();
  var values = getInputValues();
  var meal = createMealItem(values);
  request.postItemToServer(meal);
  resetInputValues();
}

function getInputValues() {
  var values = {};
  for (var i = 0; i < inputFields.length; i++) {
    var input = inputFields[i];
    var attributes = input.getAttribute('data-meal');
    values[attributes] = input.value;
  }
  return values;
}

function resetInputValues() {
  for (var i = 0; i < inputFields.length; i++) {
    var input = inputFields[i];
    var attribute = input.getAttribute('data-meal');
    input.value = inputRules[attribute].defaultValue;
    if (i === 0) input.focus();
  }
}
