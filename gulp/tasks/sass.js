
// *    Sass Task
// * ---------------------

// * Dependencies

var gulp    = require("gulp"),
    sass    = require("gulp-ruby-sass"),
    cssmin  = require("gulp-minify-css"),
    plumber = require("gulp-plumber"),
    prefix  = require("gulp-autoprefixer"),
    rename  = require("gulp-rename"),
    config  = require("../config");

// * Paths

var sassSrc = config.sassSrc,
    sassDest = config.sassDest,
    sassName = config.fileName + ".css",
    sassMinName = config.fileName + ".min.css";

// * Function

module.exports = function(){
  gulp.src(sassSrc)
    .pipe(plumber({errorHandler: function(){console.log("Exiting")}}))
    .pipe(sass({noCache:true}))
    .pipe(rename(sassName))
    .pipe(prefix("last 1 version", "Explorer >=10"))
    .pipe(gulp.dest(sassDest))
    .pipe(cssmin())
    .pipe(rename(sassMinName))
    .pipe(gulp.dest(sassDest));
};