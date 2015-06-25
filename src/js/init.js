'use strict';

var $ = require('jquery');

$.ajax({
  url: 'data/bridges.data',
  method: 'GET'
})
.then(parseBridgesCsv)
.then(function (data) {
  console.log(data);
});

function parseBridgesCsv(bridgesCsv) {
  return bridgesCsv
    .split('\n')
    .map(function (record) {
      var cells = record.split(',');
      
      return {
        id: cells[0],
        erected: cells[3],
        lanes: cells[6],
        material: cells[9],
        type: cells[12]
      };
    });
}