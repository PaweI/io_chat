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

  grunt.registerTask('default', ['watch']);

};
