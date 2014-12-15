module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js', 'server.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        },
      },
    },

    jasmine_node: {
      options: {
        forceExit: true,
      },
      all: ['spec/']
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false, // Optionally suppress output to standard out (defaults to false)
        },
        src: ['test/**/*.js']
      },
    },

    express: {
      options: {
        port: 3000,
      },
      test: {
        options: {
          script: 'server.js',
        },
      },
    },

    watch: {
      scripts: {
        files: ['server.js'],
        tasks: ['express:test'],
        options: {
          spawn: false,
        },
      },
    },
    
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-jasmine-node');


  grunt.registerTask('default', ['watch']);

};
