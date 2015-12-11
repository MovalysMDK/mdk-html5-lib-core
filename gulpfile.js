"use strict";

var gulp = require('gulp'),
    fs = require('fs'),
    through = require('through2'),
    jsonfile = require('jsonfile'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint');


gulp.task('jshint', function () {

    return gulp.src('lib/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

/**
 * Default task, if no parameter given
 */
gulp.task('default', ['jshint', 'updateBower']);

/**
 * update the bower.json adding all the js files present in the project.
 */
gulp.task('updateBower', function () {
    var bowerFile = 'bower.json';

    try {
        var bowerObj = JSON.parse(fs.readFileSync(bowerFile).toString());
    } catch(e){
        gutil.log(gutil.colors.red('bower.json Parsing error : ', e));
    }
    bowerObj.main = [];
    bowerObj.main.push('lib/mfcoreModule.js');

    return gulp.src('lib/**/*.js')
        .pipe(feedBowerObj(bowerObj))
        .on('end', function(){
            jsonfile.spaces = 2
            jsonfile.writeFile(bowerFile, bowerObj)
        });

});

/**
 *
 * @param bowerObj
 *
 * feed bowerObj with all the js files present in the project
 */
function feedBowerObj(bowerObj) {
    return through.obj(function (file, enc, cb) {

        var x;
        var filePath = file.path;

        x = filePath.lastIndexOf('lib');
        if (x >= 0) { // Windows-based path
            filePath = filePath.substr(x);
            filePath = filePath.replace(/\\/g, '/');
        }
        if (filePath !== 'lib/mfcoreModule.js') {
            bowerObj.main.push(filePath);
        }
        cb();

    });
}

