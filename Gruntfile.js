/*global require:false, module:false*/
var port = 9001;

module.exports = function (grunt) {

    // reads file, strips out single line comments and tries to parse JSON
    // based on grunt.file.readJSON function
    var readJSONwithComments = function (filepath, options) {
        var src = grunt.file.read(filepath, options);
        src = src.replace(/^ *\/\/.*$/gm, '');
        var result;
        grunt.verbose.write('Parsing ' + filepath + '...');
        try {
            result = JSON.parse(src);
            grunt.verbose.ok();
            return result;
        } catch(e) {
            grunt.verbose.error();
            throw grunt.util.error('Unable to parse "' + filepath + '" file (' + e.message + ').', e);
        }
    };

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        connect: {
            app: {
                options: {
                    port: port,
                    livereload: true,
                    base: 'dist',
                    debug: true,
                    open: true
                }
            }
        },
        watch: {
            options: {
                livereload: true
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
                options : readJSONwithComments('.jshintrc'),
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
    grunt.registerTask('default',  ['jshint', 'build', 'connect', 'watch']);
    grunt.registerTask('publish', ['build', 'gh-pages']);

};
