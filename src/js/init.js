'use strict';

var $ = require('jquery');

$.ajax({
  url: 'data/bridges.data',
  method: 'GET'
})
.done(function (data) {
  console.log(data);
});