/**
 * clean.js
 * @name - 'clean'
 * @task - Remove build folder
 */

'use strict';

const del    = require('del');
const gulp   = require('gulp');
const gutil  = require('gulp-util');

const config = require('../config').server;

gulp.task('clean', function(cb) {

  del([config.dest]).then(function() {
    cb();
  });

});
