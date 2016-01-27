'use strict';

var form, inputFields, submitButton, mealsContainer;
var request = new Request();

form = document.querySelector('.form');
inputFields = document.getElementsByTagName('input');
submitButton = document.querySelector('#btn-submit');
mealsContainer = document.querySelector('.meals-container');

form.addEventListener("blur", validateInputs, true);
submitButton.addEventListener('click', submitMeal);
mealsContainer.addEventListener('click', selectItem);

function selectItem(event) {
  var row = event.target.parentNode;
  row.classList.toggle('active');
}

function removeItemById(id) {
  request.removeItemFromServer(id, removeItemFromDom);
}

function removeItemFromDom(item) {
  var element = document.getElementById(item.meal_id);
  element.remove();
}

function getItemsFromServer() {
  request.getAllItems(insertItemsToDom);
}

function insertItemsToDom(items) {
  items.forEach(function(item) {
    addItemToDom(item);
  });
}

function addItemToDom(item) {
  var element = createOneItem(item);
  mealsContainer.innerHTML += element;
}

function createOneItem(item) {
  var element = `<tr id="${item.meal_id}">
                   <td>${item.name}</td>
                   <td>${item.calories}</td>
                   <td>${convertToDate(item.date)}</td>
                 </tr>`;
  return element;
}

function convertToDate(string) {
  var date = new Date(string);
  return [date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()]
          .join(' / ');
}

function resetForm() {
  resetInputValues();
  submitButton.disabled = true;
}

function validateInputs() {
  var isValid = false;
  for (var i = 0; i < inputFields.length; i++) {
    var input = inputFields[i];
    if (input.value === '') isValid = true;
  }
  submitButton.disabled = isValid;
}

function submitMeal(event) {
  event.preventDefault();
  var values = getInputValues();
  var meal = createMealItem(values);
  request.postItemToServer(meal, addItemToDom);
  resetForm();
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

getItemsFromServer();
resetForm();
