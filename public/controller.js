'use strict';

var form, inputFields, submitButton, deleteButton, mealsContainer;
var nameField, caloriesField, dateNowField, customDateField, deleteAndFilter, filterButton;
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
  nameField = document.querySelector('#input-name');
  caloriesField = document.querySelector('#input-calories');
  dateNowField = document.querySelector('#input-datenow');
  customDateField = document.querySelector('#input-datetime');
  submitButton = document.querySelector('#btn-submit');
  mealsContainer = document.querySelector('#meals-container');
  deleteButton = document.querySelector('#btn-delete');
  deleteAndFilter = document.querySelector('#deleteAndFilter');
  filterButton = document.querySelector('#btn-filter');
}

function initEvents() {
  form.addEventListener('input', handleSubmitButtonBasedOnInputValidation, true);
  caloriesField.addEventListener('input', showDateNowField);
  dateNowField.addEventListener('input', addCustomDate, true);
  submitButton.addEventListener('click', submitMeal);
  mealsContainer.addEventListener('click', selectItem);
  deleteButton.addEventListener('click', removeSelectedItems);
  filterButton.addEventListener('click', filterSelected);
}

function showDateNowField(event) {
  if (areValidInputs()) {
    dateNowField.style.display = 'block';
  }
}

function addCustomDate(event) {
  var dateNowField = event.target;
  dateNowField.style.display = 'none';
  customDateField.style.display = 'inline-block';
  customDateField.focus();
}

function selectItem(event) {
  var row = event.target.parentNode;
  if (row.classList.contains('meal-row')) {
   row.classList.toggle('active');
  }
  handleButtonsBasedOnSelection();
  handleFilterView();
}

function handleFilterView() {
  if (!areSelectedRows() && filterIsOn) {
    removeFilter();
  }
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
  mealsContainer.innerHTML = element + mealsContainer.innerHTML;
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
    if (input.hasAttribute('required')) {
      return input.value.length !== 0;
    }
    return true
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
  dateNowField.style.display = 'none';
  customDateField.style.display = 'none';
  submitButton.style.display = 'none';
}

function resetInputValues() {
  [].forEach.call(inputFields, function(e, i) {
    var attribute = e.getAttribute('data-meal');
    e.value = inputRules[attribute].defaultValue;
    if (i === 0) e.focus();
  });
}
