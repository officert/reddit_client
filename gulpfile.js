/* ========================================================================
 * Dependencies
 * ========================================================================= */
var fs = require('fs')
var gulp = require('gulp');
var clean = require('gulp-clean');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var NODE_ENV = process.env.WERCKER_GIT_BRANCH || process.env.NODE_ENV || process.argv[3];
var ENV = setupEnv(NODE_ENV);
var ENV_PROD = (ENV == 'production');
var appConfig = require('./config/appConfig')[ENV];
var htmlReplace = require('gulp-html-replace');
var gulpIf = require('gulp-if');
var exec = require('gulp-exec');
var concat = require('gulp-concat');
var shell = require('gulp-shell');

console.log('\n\nENV: ' + ENV + '\n\n');

/* =========================================================================
 * Constants
 * ========================================================================= */
var BUILDDIR = 'www';
//js
var UGLIFYOPTIONS = {
  //http://davidwalsh.name/compress-uglify
  mangle: true,
  compress: {
    sequences: true,
    dead_code: true,
    conditionals: true,
    booleans: true,
    unused: true,
    if_return: true,
    join_vars: true,
    drop_console: true
  }
};
var MINIFIEDSCRIPT = 'redditApp.min.js';
//css
var LESSOPTIONS = {
  compress: ENV === 'production'
};

/* =========================================================================
 * Tasks
 * ========================================================================= */

/**
 * Clean the build directory
 */
gulp.task('clean', function(next) {
  return _init(gulp.src(BUILDDIR + '/*.*', {
      read: false
    }))
    .pipe(clean());
});

/**
 * Copy src folder to build directory
 */
gulp.task('copy', ['clean'], function(next) {
  return _init(gulp.src('src/**/*.*'))
    .pipe(gulp.dest(BUILDDIR));
});

/**
 * Replace vars in config
 */
gulp.task('replace', ['copy'], function() {
  return _replace(gulp.src([BUILDDIR + '/**/**/*', '!' + BUILDDIR + '/bower_components/**/*.js']))
    .pipe(gulp.dest(BUILDDIR));
});

/**
 * Compile .less files to .css
 */
gulp.task('css', ['replace'], function() {
  return _init(gulp.src(BUILDDIR + '/less/main.less'))
    .pipe(less(LESSOPTIONS))
    .pipe(gulp.dest(BUILDDIR + '/css'));
});

/**
 * Minify javascript files
 */
gulp.task('js', ['replace'], function() {
  return _init(gulp.src([BUILDDIR + '/app/**/*.js']))
    .pipe(gulpIf(ENV_PROD, concat(MINIFIEDSCRIPT)))
    .pipe(gulpIf(ENV_PROD, uglify(MINIFIEDSCRIPT, UGLIFYOPTIONS)))
    .pipe(gulp.dest(BUILDDIR + '/app'));
});

/**
 * Js Hint
 */
gulp.task('jshint', ['replace'], function() {
  return _init(gulp.src(['src/app/**/*.js']))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('server', ['default'], function() {

  // LESS
  (function processLess(paths) {
    paths.forEach(function(path) {
      watch(path, {
        emit: 'one',
        emitOnGlob: false
      }, function(files) {
        //copy the changes less files to the build dir
        files
          .pipe(gulp.dest(BUILDDIR + '/less'));

        //reprocess main.less in the build dir - regenerate css
        return gulp.src(BUILDDIR + '/less/main.less')
          .pipe(less(LESSOPTIONS))
          .pipe(gulp.dest(BUILDDIR + '/css'));
      });
    });
  })(['src/less/**/*.less']);

  (function processJs() {
    console.log('watching js files');

    watch('src/app/**/**/*.js', {
      emit: 'one',
      emitOnGlob: false
    }, function(files) {
      //copy the changed js files to the build dir
      return _replace(files)
        .pipe(gulp.dest(BUILDDIR + '/app'));
    });
  }());

  (function processHtml(paths) {
    console.log('watching html files');

    paths.forEach(function(path) {
      var dest = path.split('/').slice(0, -1).join('/').replace('src', BUILDDIR).replace(/\*/gi, '');
      watch(path, {
        emit: 'one',
        emitOnGlob: false
      }, function(files) {
        return _replace(files)
          .pipe(gulp.dest(dest));
      });

    });
  }(['src/**/**/*.html']));

  return require('./server');
});

/**
 * Run all steps in order
 */
gulp.task('default', ['clean', 'copy', 'replace', 'css', 'js']);

/**
 * Deploy steps
 */
gulp.task('deploy', ['default']);

/* =========================================================================
 *
 *   Helper Functions
 *
 * ========================================================================= */

function _init(stream) {
  stream.setMaxListeners(0);
  return stream;
}

function _replace(stream) {
  _init(stream);
  for (key in appConfig) {
    stream.pipe(replace('@@' + key, appConfig[key], {
      skipBinary: true
    }));
  }

  _htmlReplace(stream);

  return stream;
}

function _htmlReplace(stream) {

  if (ENV === 'production') {
    stream.pipe(gulpIf(_isHtmlFile, htmlReplace({
      devscripts: '<script src="/app/' + MINIFIEDSCRIPT + '"></script>'
    })));
  }

  return stream;
}

function _isJsFile(file) {
  return _endsWith(file.path, '.js');
}

function _isHtmlFile(file) {
  return _endsWith(file.path, '.html');
}

function _endsWith(s, suffix) {
  return s.indexOf(suffix, s.length - suffix.length) !== -1;
}

function setupEnv(env) {
  // allow passing name as an argument
  if (env && env.indexOf('-') === 0) env = env.substring(1);

  // production
  if (env === 'master' || env === 'prod' || env === 'production') return 'production';
  // development
  else if (env === 'dev' || env === 'development') return 'development';
  // local
  else if (env === 'local') return 'local';
  // default
  else return 'development';
}
