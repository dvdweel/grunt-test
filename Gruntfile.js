module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Voegt alle files die in js map zitten bij elkaar in main.js
        concat: {
            dist: {
                src: [
                    'js/libs/*.js', // All JS in the libs folder
                    'js/main.js'  // This specific file
                ],
                dest: 'js/build/total.js',
            }
        },
        cssmin: {
          options: {
            shorthandCompacting: false,
            roundingPrecision: -1
          },
          target: {
            files: {
              'css/total/total.css': ['css/*.css']
            }
          }
        },
        // Minimalize total.js - maakt total.min.js aan
        uglify: {
            build: {
                src: 'js/build/total.js',
                dest: 'js/build/total.min.js'
            }
        },
        compass: {
            dev: {
                options: {
                    sourcemap: false,
                    sassDir: 'scss/',
                    specify: ['scss/*.scss'],
                    cssDir: 'css/',
                    relativeAssets: false
                }
            }
        },
        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify','compass'],
                options: {
                    spawn: false,
                },
                compass: {
                    files: ['scss/{,*/}*.{scss,sass}'],
                    tasks: ['compass:dev']
                }

            }
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat','cssmin','uglify','compass','watch']);

};