'use strict';

function Filter() {
  var _this = this;
  this.isOn = false;
  this.elements;
  this.conditions = [];
  this.config = {
    cells: '.meal-date',
    rows: '.meal-row',
    format: formatyyyymmdd
  }

  this.filterSelected = function () {
    _this.isOn = true;
    _this.elements = _this.getElements(_this.config.cells);
    _this.conditions = [];
    _this.setConditions();
    _this.filterView();
  }

  this.getElements = function (selector) {
    return document.querySelectorAll(selector);
  }

  this.setConditions = function () {
    [].forEach.call(_this.elements, function(e) {
      if (isSelected(e)) {
        var value = _this.getValue(e);
        if (!isInConditions(value)) {
          _this.conditions.push(value);
        }
      }
    });
  }

  this.filterView = function () {
    [].forEach.call(_this.elements, function(e) {
      var value = _this.getValue(e);
      var row = e.parentNode;
      row.style.display = (!isInConditions(value))
        ? 'none'
        : 'block';
    });
  }

  function isSelected(element) {
    return element.parentNode.classList.contains('active');
  }

  this.getValue = function (element) {
    if (_this.config.format) {
      return _this.config.format(element.innerText);
    }
    return element.innerText;
  }

  function isInConditions(value) {
    return _this.conditions.indexOf(value) !== -1;
  }

  this.removeFilter = function () {
    _this.isOn = false;
    _this.resetView();
  }

  this.resetView = function () {
    var rows = _this.getElements(_this.config.rows);
    [].forEach.call(rows, function(row) {
      row.style.display = 'block';
    });
  }
}
