'use strict';

var cp = require('child_process');
var buildConfig = require('./build.config.js');

module.exports = function(grunt) {

  grunt.initConfig({

    clean: {
      lib: [
        'dist'
      ]
    },

    concat: {
      options: {
        separator: ';\n'
      },
      dist: {
        src: buildConfig.mdkHtml5CoreSources,
        dest: 'dist/js/mdk-html5-core.js'
      },
      bundle: {
        options: {
          banner:
            '/*!\n' +
            ' * mdk-html5-core.bundle.js is a concatenation of:\n' +
            ' * mdk-html5-core.js, angular.js\n'+
            ' */\n\n'
        },
        src: [
          'dist/js/mdk-html5-core.js'
        ],
        dest: 'dist/js/mdk-html5-core.bundle.js'
      },
      bundlemin: {
        options: {
          banner: '<%= concat.bundle.options.banner %>'
        },
        src: [
          'dist/js/mdk-html5-core.min.js'
        ],
        dest: 'dist/js/mdk-html5-core.bundle.min.js'
      }
    },

    version: {
      dist: {
        dest: 'dist/version.json'
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/assets/',
          src: buildConfig.mdkHtml5CoreAssets,
          dest: './dist/assets/'
        }]
      }
    },

    //Used by CI to check for temporary test code
    //xit, iit, ddescribe, xdescribe
    'ddescribe-iit': ['src/lib/**/*.js'],
    'merge-conflict': ['src/lib/**/*.js'],

    jshint: {
      files: ['Gruntfile.js', 'src/lib/**/*.js', 'src/test/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/js/mdk-html5-core.min.js': 'dist/js/mdk-html5-core.js'
        }
      },
      options: {
        preserveComments: 'some'
      }
    },

    // =======================================================
    // ========  REMOVE COMMENTS FROM JSON ===================
    // =======================================================

    removeComments: {
        files: {
            src: ['dist/assets/**/*.json']
        }
    },

    'string-replace': {
      version: {
        files: {
          'dist/js/mdk-html5-core.js': 'dist/js/mdk-html5-core.js'
        },
        options: {
          replacements: [{
            pattern: /{{ VERSION }}/g,
            replacement: '<%= pkg.version %>'
          }]
        }
      }
    },

    bump: {
     options: {
        files: ['package.json'],
        commit: false,
        createTag: false,
        push: false
      }
    },

    watch: {
      scripts: {
        files: ['src/lib/**/*.js'],
        tasks: ['concat:dist', 'concat:bundle'],
        options: {
          spawn: false
        }
      }
    },

    pkg: grunt.file.readJSON('package.json')
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', [
    'jshint',
    'build'
  ]);

  //NOTE(ajoslin): the order of these tasks is very important.
  grunt.registerTask('build', [
    'clean:lib',
    'concat:dist',
    'copy',
    'string-replace',
    'version',
    'removeComments',
    'concat:bundle',
    //'uglify',
    'concat:bundlemin'
  ]);

  grunt.registerMultiTask('version', 'Generate version JSON', function() {
    var pkg = grunt.config('pkg');
    this.files.forEach(function(file) {
      var dest = file.dest;
      var d = new Date();
      var version = {
        version: pkg.version,
        codename: pkg.codename,
        date: grunt.template.today('yyyy-mm-dd'),
        time: d.getUTCHours() + ':' + d.getUTCMinutes() + ':' + d.getUTCSeconds()
      };
      grunt.file.write(dest, JSON.stringify(version, null, 2));
    });
  });

      // =======================================================
    // ========  CUSTOM TASK: remove JSON comments  ==========
    // =======================================================


  grunt.registerMultiTask('removeComments', 'Remove comments from JSON files', function() {
        var removeComments = function(json) {

            var tokenizer = /"|(\/\*)|(\*\/)|(\/\/)|\n|\r/g,
            in_string = false,
            in_multiline_comment = false,
            in_singleline_comment = false,
            tmp, tmp2, new_str = [], ns = 0, from = 0, lc, rc
            ;

            tokenizer.lastIndex = 0;

            while ((tmp = tokenizer.exec(json)) !== null) {
                lc = RegExp.leftContext;
                rc = RegExp.rightContext;
                if (!in_multiline_comment && !in_singleline_comment) {
                    tmp2 = lc.substring(from);
                    if (!in_string) {
                        tmp2 = tmp2.replace(/(\n|\r|\s)*/g,'');
                    }
                    new_str[ns++] = tmp2;
                }
                from = tokenizer.lastIndex;

                if (tmp[0] === '\"' && !in_multiline_comment && !in_singleline_comment) {
                    tmp2 = lc.match(/(\\)*$/);
                    if (!in_string || !tmp2 || (tmp2[0].length % 2) === 0) { // start of string with ", or unescaped " character found to end string
                        in_string = !in_string;
                    }
                    from--; // include " character in next catch
                    rc = json.substring(from);
                }
                else if (tmp[0] === '/*' && !in_string && !in_multiline_comment && !in_singleline_comment) {
                    in_multiline_comment = true;
                }
                else if (tmp[0] === '*/' && !in_string && in_multiline_comment && !in_singleline_comment) {
                    in_multiline_comment = false;
                }
                else if (tmp[0] === '//' && !in_string && !in_multiline_comment && !in_singleline_comment) {
                    in_singleline_comment = true;
                }
                else if ((tmp[0] === '\n' || tmp[0] === '\r') && !in_string && !in_multiline_comment && in_singleline_comment) {
                    in_singleline_comment = false;
                }
                else if (!in_multiline_comment && !in_singleline_comment && !(/\n|\r|\s/.test(tmp[0]))) {
                    new_str[ns++] = tmp[0];
                }
            }
            new_str[ns++] = rc;
            return new_str.join('');
        };

        var i = 0;
        this.files.forEach(function(file) {
            file.src.filter(function(filepath) {
                // Remove nonexistent files (it's up to you to filter or warn here).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).forEach(function(filepath) {
                // Read and return the file's source.
                grunt.log.writeln('File ' + filepath);
                var jsonContent = grunt.file.read(filepath);
                grunt.file.write(filepath, removeComments(jsonContent));
            });
        });
    });
};
