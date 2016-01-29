'use strict';

function Filter() {
  var _this = this;
  this.isOn = false;

  this.filterSelectedRows = function () {
    _this.isOn = true;
    _this.filterView();
  }

  this.filterView = function () {
    var elements = _this.getElements('.meal-date');
    var date = _this.getDatesOfSelectedRows(elements);
    [].forEach.call(elements, function(e) {
      var elementDate = formatyyyymmdd(e.innerText);
      var row = e.parentNode;
      row.style.display = (date.indexOf(elementDate) === -1)
        ? 'none'
        : 'block';
    });
  }

  this.getElements = function (selector) {
    return document.querySelectorAll(selector);
  }

  this.getDatesOfSelectedRows = function (elements) {
    var dates = [];
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
    _this.resetView();
  }

  this.resetView = function () {
    var rows = _this.getElements('.meal-row');
    [].forEach.call(rows, function(r) {
      r.style.display = 'block';
    });
  }
}
