'use strict';

var form, inputFields, submitButton, deleteButton, mealsContainer;
var deleteAndFilter;
var request = new Request();

init();

function init() {
  initDomElements();
  initEvents();
  getItemsFromServer();
  resetForm();
  handleButtonsBasedOnSelection();
}

function initDomElements() {
  form = document.querySelector('#form');
  inputFields = document.getElementsByTagName('input');
  submitButton = document.querySelector('#btn-submit');
  mealsContainer = document.querySelector('#meals-container');
  deleteButton = document.querySelector('#btn-delete');
  deleteAndFilter = document.querySelector('#deleteAndFilter');
}

function initEvents() {
  form.addEventListener('input', handleSubmitButtonBasedOnInputValidation, true);
  submitButton.addEventListener('click', submitMeal);
  mealsContainer.addEventListener('click', selectItem);
  deleteButton.addEventListener('click', removeSelectedItems);
}

function selectItem(event) {
  var row = event.target.parentNode;
  if (row.classList.contains('meal-row')) {
   row.classList.toggle('active');
  }
  handleButtonsBasedOnSelection();
}

function removeSelectedItems(event) {
  var rows = document.querySelectorAll('.meal-row');
  [].forEach.call(rows, function(row) {
    if (row.classList.contains('active')) {
      removeItemById(row.id);
    }
  });
}

function removeItemById(id) {
  request.removeItem(id, removeItemFromDom);
}

function removeItemFromDom(item) {
  var element = document.getElementById(item.meal_id);
  element.remove();
  handleButtonsBasedOnSelection();
}

function getItemsFromServer() {
  request.getAll(insertItemsToDom);
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

function handleSubmitButtonBasedOnInputValidation() {
  submitButton.style.display = areValidInputs()
    ? 'inline'
    : 'none';
}

function handleButtonsBasedOnSelection() {
  deleteAndFilter.style.display = areSelectedRows()
    ? 'inline-block'
    : 'none';
}

function areValidInputs() {
  return [].every.call(inputFields, function(input) {
    return input.value.length !== 0;
  });
}

function areSelectedRows() {
  var rows = document.querySelectorAll('.meal-row');
  return [].some.call(rows, function(row) {
    return row.classList.contains('active');
  });
}

function submitMeal(event) {
  event.preventDefault();
  var values = getInputValues();
  var meal = createMealItem(values);
  request.postItem(meal, addItemToDom);
  resetForm();
}

function getInputValues() {
  var values = {};
  [].forEach.call(inputFields, function(e) {
    var attributes = e.getAttribute('data-meal');
    values[attributes] = e.value;
  });
  return values;
}

function resetForm() {
  resetInputValues();
  submitButton.style.display = 'none';
}

function resetInputValues() {
  [].forEach.call(inputFields, function(e, i) {
    var attribute = e.getAttribute('data-meal');
    e.value = inputRules[attribute].defaultValue;
    if (i === 0) e.focus();
  });
}
