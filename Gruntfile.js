'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadTasks('grunt');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      all: {
        src: 'dist'
      }
    },

    copy: {
      all: {
        expand: true,
        cwd: '',
        src: [
          '.jshintrc',
          '.jscsrc',
          '.bowerrc',
          '*.*',
          './node_modules/**/*',
          './src/**/*',
          './grunt/**/*',
          './logs/**/*'
        ],
        dest: 'dist'
      }
    },

    jscs: {
      options: {
        config: '.jscsrc',
        reporter: 'checkstyle'
      },
      src: [
        'Gruntfile.js',
        'grunt/**/*.js',
        'src/**/*.js',
        'test/**/*.js',
        '!src/public/bower_components/**'
      ]
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: 'checkstyle'
      },
      src: [
        'Gruntfile.js',
        'grunt/**/*.js',
        'src/**/*.js',
        'test/**/*.js',
        '!src/public/bower_components/**'
      ]
    },

    githooks: {
      all: {
        options: {
          endMarker: ''
        },
        'pre-commit': 'analyze',
        'pre-push': 'test',
        'post-checkout': 'shell:gitLog',
        'post-commit': 'shell:gitLog',
        'post-merge': 'shell:gitLog shell:npmInstall'
      }
    },

    shell: {
      gitLog: {
        command: 'git log -1 > git-info.txt'
      },
      npmInstall: {
        command: 'npm install'
      },
      pm2Logs: {
        command: 'pm2 logs'
      },
      pm2Status: {
        command: 'pm2 list'
      },
      pm2Stop: {
        command: 'pm2 kill'
      },
      pm2Delete: {
        command: 'pm2 delete pm2.json'
      },
      pm2Start: {
        command: 'pm2 start pm2.json'
      },
      pm2StartDist: {
        command: 'cd /dist && pm2 start pm2.json'
      }
    },

    less: {
      all: {
        options: {
          cleancss: true,
          compress: true
        },
        expand: true,
        cwd: 'dist/src/less',
        src: [
          '[^_]*.less',
          '[^_]*/*.less'
        ],
        dest: 'dist/src/public/css',
        ext: '.css'
      }
    },

    mochaTest: {
      all: {
        options: {
          reporter: 'spec'
        },
        src: [
          'test/**/*Test.js',
          '!test/public/js/**/*Test.js'
        ]
      }
    },

    karma: {
      client: {
        configFile: 'karma.conf.js'
      }
    }
  });

  grunt.registerTask('default', ['test']);
  grunt.registerTask('test', 'Run unit tests', ['mochaTest', 'karma:client']);
  grunt.registerTask('analyze', 'Validating code style', ['jshint', 'jscs']);
  grunt.registerTask('deploy', 'Deploys code', ['clean', 'copy', 'less']);
};
