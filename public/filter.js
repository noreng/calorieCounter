'use strict';

function filter(date) {
  var elements = document.querySelectorAll('.meal-date');
  [].forEach.call(elements, function(e) {
    var elementDate = formatyyyymmdd(e.innerText);
    var row = e.parentNode;
    row.style.display = (date && !(elementDate === date))
      ? 'none'
      : 'table-row';
  });
}
