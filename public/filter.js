'use strict';

function Filter() {
  var _this = this;
  this.isOn = false;

  this.filterSelected = function () {
    _this.isOn = true;
    _this.filter(_this.getDatesOfSelectedRows());
  }

  this.filter = function (date) {
    var elements = document.querySelectorAll('.meal-date');
    [].forEach.call(elements, function(e) {
      var elementDate = formatyyyymmdd(e.innerText);
      var row = e.parentNode;
      row.style.display = (date && (date.indexOf(elementDate) === -1))
        ? 'none'
        : 'block';
    });
  }

  this.getDatesOfSelectedRows = function () {
    var dates = [];
    var elements = document.querySelectorAll('.meal-date');
    [].forEach.call(elements, function(e) {
      var date = _this.getDateFromItem(e);
      if (date && dates.indexOf(date) === -1) dates.push(date);
    });
    return dates !== [] ? dates : '';
  }

  this.getDateFromItem = function (element) {
    if (element.parentNode.classList.contains('active')) {
      return formatyyyymmdd(element.innerText);
    }
  }

  this.remove = function () {
    _this.isOn = false;
    this.filter();
  }
}
