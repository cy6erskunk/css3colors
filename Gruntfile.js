/*global require:false, module:false*/
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
};

module.exports = function (grunt) {

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        connect: {
            livereload: {
                options: {
                    port: 9001,
                    middleware: function(connect) {
                        return [lrSnippet, folderMount(connect, 'dist/')];
                    }
                }
            }
        },
        // Configuration to be run (and then tested)
        regarde: {
            livereload: {
                files: ['*.html', 'css/*.css', 'js/*.js'],
                tasks: ['livereload']
            },
            stylus: {
                files: 'src/css/*.styl',
                tasks: ['css']
            },
            js_modules: {
                files: 'src/js/modules/*.js',
                tasks: ['concat:modules', 'uglify']
            },
            js_app: {
                files: 'src/js/app.js',
                tasks: ['concat:app', 'uglify']
            }
        },
        stylus: {
            compile: {
                options: {
                    compress: false,
                    import: [ 'import/common']
                },
                files: {
                    'dist/css/main.css': ['src/css/main.styl']
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
            all: {
                options : {
                    jshintrc: '.jshintrc'
                },
                src: ['Gruntfile.js', 'src/js/app.js', 'src/js/modules/*.js']
            }
        },
        concat: {
            modules: {
                options: {
                    separator: ''
                },
                src: ['src/js/modules-intro.js','src/js/modules/findColor.js', 'src/js/modules-outro.js'],
                dest: 'dist/js/modules.js'
            },
            app: {
                options: {
                    separator: ';'
                },
                src: ['src/js/app.js'],
                dest: 'dist/js/built.js'
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
                    'dist/js/built.min.js': ['dist/js/modules.js', 'dist/js/built.js']
                }
            }
        },
        open: {
            dist: {
                path: 'http://localhost:9001'
            }
        },
        // Move files not handled by other tasks
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '.',
                    dest: 'dist',
                    src: [
                        'index.html',
                        'vendor/**.js',
                        'docs/**'
                    ]
                }]
            }
        },
        clean: {
            dist: 'dist'
        },
        'gh-pages': {
            options: {
                base: 'dist',
                push: true
            },
            src: ['*.html', 'vendor/*.js', 'docs/**', 'css/**', 'js/**']
        }
    });

    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask('css', 'stylus');
    grunt.registerTask('js', ['concat', 'uglify']);
    grunt.registerTask('build', ['css', 'js', 'copy']);
    grunt.registerTask('default',  ['jshint', 'build', 'livereload-start', 'connect', 'open', 'regarde']);
    grunt.registerTask('publish', ['build', 'gh-pages']);

};
