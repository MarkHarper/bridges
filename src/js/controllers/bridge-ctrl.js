'use strict';

var _ = require('underscore');
var show = require('../show');
var router = require('../router');
var c3 = require('c3');
var loadBridges = require('../services/bridge-service');

router.route('bridges/:id', function (bridgeId) {
  loadBridges().then(renderBridge);
  
  function renderBridge(bridgesArray) {
    var bridge = _.findWhere(bridgesArray, { id: bridgeId });
    show('bridge-template', bridge);    
    renderChart(bridge, bridgesArray);
  }
  
  function renderChart(bridge, bridgesArray) {
    var older = bridgesArray.filter(function (b) {
      return b.erected < bridge.erected;
    }).length;
    
    var newer = bridgesArray.filter(function (b) {
      return b.erected > bridge.erected;
    }).length;
    
    c3.generate({
      bindto: '.bridge-chart',
      data: {
        columns: [
          ['Older', older],
          ['Newer', newer],
          ['Same', bridgesArray.length - newer - older]
        ],
        type : 'pie'
      },
      color: {
        pattern: ['#3FBEBB', '#FF5843', '#39B54A']
      }
    });
  }
});
