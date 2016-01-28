'use strict';

var filterIsOn = false;

function filterSelected(event) {
  filterIsOn = true;
  filter(gatDatesOfSelectedRows());
}

function removeFilter() {
  filter();
}

function filter(date) {
  var elements = document.querySelectorAll('.meal-date');
  [].forEach.call(elements, function(e) {
    var elementDate = formatyyyymmdd(e.innerText);
    var row = e.parentNode;
    row.style.display = (date && (date.indexOf(elementDate) === -1))
      ? 'none'
      : 'block';
  });
}

function gatDatesOfSelectedRows() {
  var dates = [];
  var elements = document.querySelectorAll('.meal-date');
  [].forEach.call(elements, function(e) {
    var date = getDateFromItem(e);
    if (date && dates.indexOf(date) === -1) dates.push(date);
  });
  return dates !== [] ? dates : '';
}

function getDateFromItem(element) {
  if (element.parentNode.classList.contains('active')) {
    return formatyyyymmdd(element.innerText);
  }
}
