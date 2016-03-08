/**
 * Copyright (C) 2016 Sopra Steria Group (movalys.support@soprasteria.com)
 *
 * This file is part of Movalys MDK.
 * Movalys MDK is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Movalys MDK is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 * You should have received a copy of the GNU Lesser General Public License
 * along with Movalys MDK. If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";

var gulp = require('gulp'),
    fs = require('fs'),
    through = require('through2'),
    jsonfile = require('jsonfile'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    Server = require('karma').Server;

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
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  }, done).start();
});

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

