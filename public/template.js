'use strict';

function createOneItem(item) {
  return `
    <div id="${item.meal_id}" class="row meal-row">
      <div class="col-sm-5 meal-data meal-name">
        ${item.name}
      </div>
      <div class="col-sm-2 meal-data middleColumn">
        ${item.calories}
        <span class="visible-xs-inline unit"> kCal</span>
      </div>
      <div class="col-sm-5 meal-data meal-date">
        ${formatDate(item.date)}
      </div>
    </div>
  `;
}
