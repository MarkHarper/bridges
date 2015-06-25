'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');

router.route('', 'bridges', function () {
  $.ajax({
    url: 'data/bridges.data',
    method: 'GET'
  })
  .then(parseBridgesCsv)
  .then(renderBridges);

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
  
  function renderBridges(bridgesArray) {
    var bridgesTemplate = views['bridges-template'];
    var templateFn = _.template(bridgesTemplate, { variable: 'm' });
    var bridgesHTML = templateFn({ bridges: bridgesArray });
    
    $('.main-content').html(bridgesHTML);
  }
});
