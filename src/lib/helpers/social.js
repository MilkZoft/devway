'use strict';

var config = require('../config');
var _ = require('lodash');

module.exports = {
  createButtons: function(networks) {
    var buttons  = '<ul class="rrssb-buttons">';
    var extraClass = 'right';

    _.forEach(networks, function(n) {
      buttons += '<li class="rrssb-' + n.name + '"> \
                    <a href="' + n.link + '" class="social-btn ' + n.name + ' ' + extraClass + '"> \
                          <span class="rrssb-icon"> \
                            <i class="fa fa-' + n.name + '"></i> \
                          </span> \
                          <span class="rrssb-text">' + n.text + '</span> \
                        </a> \
                      </li>';
    });

    buttons += '</ul>';

    return buttons;
  }
};
