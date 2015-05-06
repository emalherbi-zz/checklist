module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
	  pkg: grunt.file.readJSON('package.json'),
    properties: grunt.file.readJSON('properties.json'),

    bower: {
      install: {
        options: {
          targetDir: './app/lib',
          layout: 'byComponent',
          install: true,
          verbose: false,
          cleanTargetDir: true,
          cleanBowerDir: true,
          bowerOptions: {}
        }
      }
    },

    /* clean directories */
    clean: ['<%= properties.dist %>'],

    /* put files not handled in other tasks here */
    copy: {
      app: {
        files: [{
          expand: true,
          dot: true,
          src: ['<%= properties.app %>/**'],
          dest: '<%= properties.dist %>'
        }]
      }
    },

    /* js file minification */
    uglify: {
      options: {
        preserveComments: false
      },
      build: {
        files: {
          '<%= properties.dist %>': ['<%= properties.dist %>/*.js'],
        }
      }
    }

	});

	// Loading dependencies
  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    if (key !== 'grunt' && key.indexOf('grunt') === 0) {
      grunt.loadNpmTasks(key);
    }
  }

	// tasks
  grunt.registerTask('deploy', [
    'clean',
    'copy'//,
    //'uglify'
  ]);

  grunt.registerTask('default', [
    'bower:install'
  ]);
};
