'use strict';

var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');

router.route('bridges/:id', function (bridgeId) {
  $.ajax({
    url: 'data/bridges.data',
    method: 'GET'
  })
  .then(parseBridgesCsv)
  .then(renderBridge);

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
  
  function renderBridge(bridgesArray) {
    var bridge = _.findWhere(bridgesArray, { id: bridgeId });
    var bridgeTemplate = views['bridge-template'];
    var templateFn = _.template(bridgeTemplate, { variable: 'm' });
    var bridgeHTML = templateFn(bridge);
    
    $('.main-content').html(bridgeHTML);
  }
});
