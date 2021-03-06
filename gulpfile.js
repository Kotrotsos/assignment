'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const sassOpts = {
  outputStyle: 'compressed',
  errLogToConsole: true
};
const babel = require('gulp-babel');

gulp.task('browser-sync', () => {
  const config = {
    server: {
      baseDir: './'
    },
    injectChanges: true
  };

  return browserSync(config);
});

gulp.task('sass', () => {
  return gulp.src('./src/sass/base.scss').pipe(sourcemaps.init()).pipe(sass(sassOpts).on('error', sass.logError)).pipe(sourcemaps.write()).pipe(gulp.dest('./dist/css')).pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function() {

  gulp.watch('./src/sass/**/*.scss', ['sass'], () => {
    return gulp.src('').pipe(browserSync.reload({stream: true}))
  });

  gulp.watch('./src/**/**/*.js', ['babel', 'copy']);
});

gulp.task('copy', () => {
  gulp.src('src/js/vendor/*').pipe(gulp.dest('./dist/vendor'));
});

gulp.task('babel', () => gulp.src('src/*.js').pipe(babel({presets: ['env']})).pipe(gulp.dest('dist')));


gulp.task('default', ['sass', 'babel', 'copy', 'watch', 'browser-sync']);
