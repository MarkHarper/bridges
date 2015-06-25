'use strict';

var show = require('../show');
var router = require('../router');
var loadBridges = require('../services/bridge-service');

router.route('', 'bridges', function () {
  loadBridges().then(function (bridgesArray) {
    show('bridges-template', { bridges: bridgesArray });
  });
});
