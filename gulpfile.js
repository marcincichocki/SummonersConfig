var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');


gulp.task('default', ['watch']);

gulp.task('watch', function() {
  gulp.watch('./src/**/*.scss', ['styles']);
});

gulp.task('styles', function() {
  return gulp.src('./src/assets/sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(rename('style.min.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./src/assets/css/'));
});
