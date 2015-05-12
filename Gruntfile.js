module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
	  pkg: grunt.file.readJSON('package.json'),
    properties: grunt.file.readJSON('properties.json'),

    /* install bower */
    bower: {
      install: {
        options: {
          targetDir: '<%= properties.app %>/lib',
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
          cwd: '<%= properties.app %>',
          src: '**/**',
          dest: '<%= properties.dist %>'
        }]
      }
    },

    /* js file minification */
    uglify: {
      options: {
        mangle: false, /* for angular js */
        preserveComments: false,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - '
          + '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      build: {
        files: [{
          expand: true,
          cwd: '<%= properties.dist %>',
          src: ['**/*.js', '!**/*.min.js'],
          dest: '<%= properties.dist %>'
        }]
      }
    },

    /* css minification */
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: '<%= properties.dist %>',
          src: ['**/*.css', '!**/*.min.css'],
          dest: '<%= properties.dist %>'
        }]
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
    'copy',
    'uglify',
    'cssmin'
  ]);

  grunt.registerTask('default', [
    'bower:install'
  ]);
};
