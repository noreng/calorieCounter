'use strict';

var date = new Date();

// => yyyy-mm-ddThh:mm
function toLocalDateString(date) {
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes());
}

// => yyyy / mm / dd hh:mm
function formatDate(string) {
  var date = new Date(string);
  return date.getFullYear() +
    ' / ' + pad(date.getMonth() + 1) +
    ' / ' + pad(date.getDate()) +
    ' ' + pad(date.getHours()) +
    ':' + pad(date.getMinutes());
}

// 1 => 01
function pad(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}
