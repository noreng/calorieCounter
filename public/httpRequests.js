'use strict';

function Request() {
  this.url = 'http://localhost:3000/';

  this.postItemToServer = function (item) {
    var data = JSON.stringify(item);
    var url = this.url + 'meals';
    var cb = function (response) {console.log(response)};
    return this.createRequest('POST', url, data, cb);
  }

  this.createRequest = function (method, url, data, cb) {
    var req = new XMLHttpRequest();
    req.open(method, url);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(data);
    req.onreadystatechange = function () {
      if (req.readyState === 4) {
        return cb(JSON.parse(req.response));
      }
    };
  }
}
