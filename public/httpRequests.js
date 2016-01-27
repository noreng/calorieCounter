'use strict';

function Request() {
  this.url = 'http://localhost:3000/';

  this.getAll = function (cb) {
    var url = this.url + 'meals';
    return sendRequest('GET', url, null, cb);
  }

  this.postItem = function (data, cb) {
    var url = this.url + 'meals';
    return sendRequest('POST', url, data, cb);
  }

  this.removeItem = function (id, callback) {
    var url = this.url + 'meals/' + id;
    return sendRequest('DELETE', url, null, callback);
  }
}

function sendRequest(method, url, data, cb) {
  var req = new XMLHttpRequest();
  req.open(method, url);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(data && JSON.stringify(data));
  req.onload = function () {
    return cb(JSON.parse(req.response));
  }
}
