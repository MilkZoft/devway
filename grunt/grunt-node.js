'use strict';

module.exports = function(grunt) {
  grunt.registerTask('status', 'Shows status of node processes on Vagrant VM', ['shell:vagrantStatus']);
  grunt.registerTask('stop', 'Stop node processes on Vagrant VM', ['shell:vagrantStop']);
  grunt.registerTask('start', 'Start node processes on Vagrant VM', ['shell:vagrantStart']);
  grunt.registerTask('restart', 'Restart node processes on Vagrant VM', ['stop', 'start']);
  grunt.registerTask('logs', 'Tail logs for all pm2 processes', ['shell:vagrantLogs']);

  grunt.registerTask('build-start-dist', 'Build to dist directory and start', [
    'stop',
    'deploy',
    'shell:vagrantSetDistPermissions',
    'shell:buildDistNpmModules',
    'shell:vagrantStartDist'
  ]);

  grunt.registerTask('restart-dist', 'Restart dist servers', [
    'stop',
    'shell:vagrantStartDist'
  ]);
};
