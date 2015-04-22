require.config({
  paths: {
    // General libraries
    'jquery': '/bower_components/jquery/dist/jquery.min',
    'lodash': '/bower_components/lodash/dist/lodash.min',

    // Local libraries
    'device': '/js/app/device'
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'lodash': {
      exports: '_'
    }
  }
});
