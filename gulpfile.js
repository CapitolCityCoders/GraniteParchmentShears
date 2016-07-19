var gulp  = require('gulp'),
    jshint = require('gulp-jshint');

gulp.task('default', ['watch']);

gulp.task('jshint', function() {
  return gulp.src('client/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch('client/**/*.js', ['jshint']);
});

