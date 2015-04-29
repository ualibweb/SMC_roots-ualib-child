'use strict';
module.exports = function(grunt) {
    // Load all tasks
    require('load-grunt-tasks')(grunt);
    // Show elapsed time
    require('time-grunt')(grunt);

    var jsFileList = [
        'assets/js/plugins/*.js',
        'assets/js/_*.js'
    ];


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: grunt.file.readJSON('.bowerrc'),
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'assets/js/*.js',
                '!assets/js/scripts.js',
                '!assets/**/*.min.*'
            ]
        },
        sass: {
            dev: {
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {
                    'assets/css/main.css': 'assets/sass/**/*.scss'
                }
            },
            build: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'assets/css/main.min.css': 'assets/sass/**/*.scss'
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [jsFileList],
                dest: 'assets/js/scripts.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'assets/js/scripts.min.js': [jsFileList]
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
            },
            dev: {
                options: {
                    map: {
                        prev: 'assets/css/'
                    }
                },
                src: 'assets/css/main.css'
            },
            build: {
                src: 'assets/css/main.min.css'
            }
        },
        modernizr: {
            build: {
                devFile: '<%= bower.directory %>/modernizr/modernizr.js',
                outputFile: 'assets/js/vendor/modernizr.min.js',
                files: {
                    'src': [
                        ['assets/js/scripts.min.js'],
                        ['assets/css/main.min.css']
                    ]
                },
                extra: {
                    shiv: false
                },
                uglify: true,
                parseFiles: true
            }
        },
        version: {
            default: {
                options: {
                    format: true,
                    length: 32,
                    manifest: 'assets/manifest.json',
                    querystring: {
                        style: 'roots_css',
                        script: 'roots_js'
                    }
                },
                files: {
                    'lib/scripts.php': 'assets/{css,js}/{main,scripts}.min.{css,js}'
                }
            }
        },
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: ['pkg'],
                commit: false,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json', 'bower.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                regExp: false
            }
        },
        watch: {
            sass: {
                files: [
                    'assets/sass/**/*.scss'
                ],
                tasks: ['sass:dev']
            },
            js: {
                files: [
                    jsFileList,
                    '<%= jshint.all %>'
                ],
                tasks: ['jshint', 'concat']
            },
            livereload: {
                // Browser live reloading
                // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
                options: {
                    livereload: false
                },
                files: [
                    'assets/css/main.css',
                    'assets/js/scripts.js',
                    'templates/*.php',
                    '*.php'
                ]
            }
        }
    });

    // Register tasks
    grunt.registerTask('default', [
        'dev'
    ]);
    grunt.registerTask('dev', [
        'jshint',
        'sass:dev',
        'autoprefixer:dev',
        'concat'
    ]);
    grunt.registerTask('build', [
        'jshint',
        'sass:build',
        'autoprefixer:build',
        'uglify',
        'modernizr',
        'version'
    ]);
};