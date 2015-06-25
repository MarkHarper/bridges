'use strict';

var $ = require('jquery');

var promise = $.ajax({
  url: 'data/bridges.data',
  method: 'GET'
})
.then(parseBridgesCsv);
  
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

function loadBridges() {
  return promise;
}

module.exports = loadBridges;
