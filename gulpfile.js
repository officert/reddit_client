var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var async = require('async');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['install-platforms'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('install-platforms', function(next) {
  async.series([
    function installIos_step(done) {
      sh.exec('phonegap platform add ios', {
        async: true
      }, function(code, output) {
        console.log('Exit code:', code);
        console.log('Program output:', output);
      });
    },
    function installBrowser_step(done) {
      sh.exec('phonegap platform add browser', {
        async: true
      }, function(code, output) {
        console.log('Exit code:', code);
        console.log('Program output:', output);
      });
    }
  ], next);
});

gulp.task('run-ios', function() {
  console.log('emulating ios');

  sh.exec('phonegap run ios', function(code, output) {
    console.log('Exit code:', code);
    console.log('Program output:', output);
  });
});

gulp.task('run-browser', function() {
  console.log('emulating browser');

  sh.exec('phonegap run browser', function(code, output) {
    console.log('Exit code:', code);
    console.log('Program output:', output);
  });
});

gulp.task('serve', function() {
  console.log('starting phonegap server - connect using your device');

  sh.exec('phonegap serve', function(code, output) {
    console.log('Exit code:', code);
    console.log('Program output:', output);
  });
});
