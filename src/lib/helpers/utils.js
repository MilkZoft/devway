'use strict';

module.exports = {
  isYear: function(year) {
    return (typeof(year) !== 'undefined' && year.length === 4 && !isNaN(year));
  },

  isMonth: function(month) {
    return (typeof(month) !== 'undefined' && month.length === 2 && !isNaN(month) && month <= 12);
  },

  isDay: function(day) {
    return (typeof(day) !== 'undefined' && day.length === 2 && !isNaN(day) && day <= 31);
  },

  isDesktop: function(ua) {
    return !(/mobile/i.test(ua));
  },

  isMobile: function(ua) {
    return (/mobile/i.test(ua));
  },

  getCurrentDevice: function(ua) {
    return (/mobile/i.test(ua)) ? 'mobile' : 'desktop';
  },

  isDefined: function(variable) {
    return (typeof(variable) !== 'undefined') ? true : false;
  },

  getParamsFromUrl: function(params) {
    params = params.split('/');
    params.shift();

    return params;
  },

  randomCode: function(max, charSet) {
    var randomCode = '';
    var randomPoz;

    max = max || 12;
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < max; i++) {
      randomPoz = Math.floor(Math.random() * charSet.length);
      randomCode += charSet.substring(randomPoz, randomPoz + 1);
    }

    return randomCode;
  },

  removeHTML: function(str) {
    return str.replace(/(<([^>]+)>)/ig, '');
  },

  escape: function(html) {
    return String(html)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
};
