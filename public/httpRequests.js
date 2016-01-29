'use strict';

function Request() {
  this.url = 'http://localhost:3000/';

  this.getAll = function (cb) {
    return sendRequest({
      method: 'GET',
      url: this.url + 'meals',
      cb: cb
    });
  }

  this.postItem = function (data, cb) {
    return sendRequest({
      method: 'POST',
      url: this.url + 'meals',
      data: data,
      cb: cb
    });
  }

  this.removeItem = function (id, cb) {
    return sendRequest({
      method: 'DELETE',
      url: this.url + 'meals/' + id,
      cb: cb
    });
  }
}

function sendRequest(options) {
  var req = new XMLHttpRequest();
  req.open(options.method, options.url);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(options.data && JSON.stringify(options.data));
  req.onload = function () {
    return options.cb(JSON.parse(req.response));
  }
}
