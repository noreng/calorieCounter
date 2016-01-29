'use strict';

var form, inputFields, nameField, caloriesField, dateNowField, customDateField,
submitButton, deleteButton, filterButton,
mealsContainer, deleteAndFilter;

var request = new Request();
var filter = new Filter();

init();

function init() {
  initDomElements();
  initEvents();
  getItemsFromServer();
  resetForm();
  handleDeleteAndFilterButtonStatus();
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
  form.addEventListener('input', handleSubmitButtonStatus, true);
  nameField.addEventListener('input', showInputFields);
  dateNowField.addEventListener('input', showCustomDateField, true);
  dateNowField.addEventListener('keydown', submitWithEnter, false);
  customDateField.addEventListener('keydown', submitWithEnter, false);
  submitButton.addEventListener('click', submitMeal);
  mealsContainer.addEventListener('click', selectItem);
  deleteButton.addEventListener('click', removeSelectedItems);
  filterButton.addEventListener('click', filter.filterSelected);
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

function selectItem(event) {
  var row = event.target.parentNode;
  if (row.classList.contains('meal-row')) {
   row.classList.toggle('active');
  }
  handleDeleteAndFilterButtonStatus();
  handleFilterView();
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
  handleDeleteAndFilterButtonStatus();
}

function showInputFields(event) {
  caloriesField.style.display = 'block';
  if (customDateField.style.display === 'none') {
    dateNowField.style.display = 'block';
  }
}

function showCustomDateField(event) {
  dateNowField.style.display = 'none';
  customDateField.style.display = 'inline-block';
  customDateField.focus();
}

function handleSubmitButtonStatus() {
  submitButton.style.display = areValidInputs()
    ? 'inline'
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

function handleDeleteAndFilterButtonStatus() {
  deleteAndFilter.style.display = areSelectedRows()
    ? 'inline-block'
    : 'none';
}

function areSelectedRows() {
  var rows = document.querySelectorAll('.meal-row');
  return [].some.call(rows, function(row) {
    return row.classList.contains('active');
  });
}

function handleFilterView() {
  if (!areSelectedRows() && filter.isOn) {
    filter.removeFilter();
  }
}

function submitWithEnter(event) {
  var ENTER = 13;
  if (event.keyCode === ENTER && areValidInputs()) {
    submitMeal(event);
  }
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
  caloriesField.style.display = 'none';
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
