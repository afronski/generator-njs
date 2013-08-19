(function() {
  "use strict";

  module.exports = function(grunt) {
    grunt.initConfig({
      jshint: {
        options: grunt.file.readJSON(".jshintrc"),

        gruntfile: {
          files: {
            src: "Gruntfile.js"
          }
        },

        src: {
          files: {
            src: "src/**/*.js"
          }
        },

        test: {
          files: {
            src: "test/**/*.js"
          },

          options: {
            globals: {
              describe: true
            }
          }
        }
      },

      watch: {
        gruntfile: {
          files: "<%= jshint.gruntfile.files.src %>",
          tasks: [
            "jshint:gruntfile"
          ]
        },

        src: {
          files: "<%= jshint.src.files.src %>",
          tasks: [
            "jshint:src",
            "mochaTest"
          ]
        },

        test: {
          files: "<%= jshint.test.files.src %>",
          tasks: [
            "jshint:test",
            "mochaTest"
          ]
        }
      },

      mochaTest: {
        test: {
          options: {
            reporter: "spec"
          },

          src: [
            "test/**/*.js"
          ]
        }
      }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-mocha-test");

    grunt.registerTask("default", [ "jshint", "mochaTest" ]);
  };

} ());