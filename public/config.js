'use strict';

var date = new Date();

var inputRules = {
  name: {defaultValue: ''},
  calories: {defaultValue: '0'},
  year: {defaultValue: date.getFullYear()},
  month: {defaultValue: date.getMonth() + 1},
  day: {defaultValue: date.getDate()},
  hour: {defaultValue: date.getHours()},
  minutes: {defaultValue: date.getMinutes()},
};
