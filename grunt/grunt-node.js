'use strict';

module.exports = function(grunt) {
  grunt.registerTask('status', 'Shows status of node processes', ['shell:pm2Status']);
  grunt.registerTask('stop', 'Stop node processes', ['shell:pm2Stop']);
  grunt.registerTask('start', 'Start node processes', ['shell:pm2Start']);
  grunt.registerTask('restart', 'Restart node processes', ['stop', 'start']);
  grunt.registerTask('logs', 'Tail logs for all pm2 processes', ['shell:pm2Logs']);

  grunt.registerTask('build-start-dist', 'Build to dist directory and start', [
    'stop',
    'deploy',
    'shell:setDistPermissions',
    'shell:buildDistNpmModules',
    'shell:startDist'
  ]);

  grunt.registerTask('restart-dist', 'Restart dist servers', [
    'stop',
    'shell:startDist'
  ]);
};
