/*global require:false, module:false*/
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
};

module.exports = function (grunt) {
    grunt.initConfig({
        connect: {
            livereload: {
                options: {
                    port: 9001,
                    middleware: function(connect) {
                        return [lrSnippet, folderMount(connect, '.')];
                    }
                }
            }
        },
        // Configuration to be run (and then tested)
        regarde: {
            fred: {
                files: ['*.html', 'css/*.css', 'js/*.js'],
                tasks: ['livereload']
            },
            stylus: {
                files: 'src/css/*.styl',
                tasks: ['css']
            },
            bob: {
                files: 'src/js/modules/*.js',
                tasks: ['concat:modules', 'uglify']
            },
            mary: {
                files: 'src/js/app.js',
                tasks: ['concat:app', 'uglify']
            }
        },
        stylus: {
            compile: {
                options: {
                    compress: false,
                    import: [ 'src/css/import/common.styl']
                },
                files: {
                    'css/main.css': ['src/css/main.styl']
                }
            }
        },
        watch: {
            styles: {
                files: 'src/css/*.styl',
                tasks: ['css'],
                options: {
                    interrupt: true
                }
            }
        },
        jasmine: {
            findColor: {
                src: 'src/js/modules/findColor.js',
                options: {
                    specs: 'spec/*Spec.js',
                    helpers: 'spec/*Helper.js'
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
        },
        concat: {
            modules: {
                options: {
                    separator: ''
                },
                src: ['src/js/modules-intro.js','src/js/modules/findColor.js', 'src/js/modules-outro.js'],
                dest: 'js/modules.js'
            },
            app: {
                options: {
                    separator: ';'
                },
                src: ['src/js/app.js'],
                dest: 'js/built.js'
            }
        },
        uglify: {
            options: {
                mangle: {
                    except: ['jQuery', 'Backbone', 'findColor']
                }
            },
            my_target: {
                files: {
                    'js/built.min.js': ['js/modules.js', 'js/built.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('css', 'stylus');
    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('js', ['concat', 'uglify']);
    grunt.registerTask('default',  ['livereload-start', 'connect', 'regarde']);

};
