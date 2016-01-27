'use strict';

function createOneItem(item) {
  var element =
    `<div id="${item.meal_id}" class="row meal-item">
      <div class="col-sm-5">
        <span class="visible-xs-inline">Name: </span>
        ${item.name}
      </div>
      <div class="col-sm-2">
        <span class="visible-xs-inline">Calories: </span>
        ${item.calories}
      </div>
      <div class="col-sm-5 meal-date">
        <span class="visible-xs-inline">Date: </span>
        ${formatDate(item.date)}
      </div>
    </div>`;
  return element;
}
