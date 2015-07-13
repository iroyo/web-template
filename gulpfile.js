var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var pkg = require('./package.json');
var dirs = pkg['directories'];

var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

  //  .pipe(header(banner, { pkg : pkg } ))


// minify new images
gulp.task('style', function() {
  gulp.src(dirs.src + '/stylus/*.styl')
  	.pipe($.newer(dirs.src + '/css'))
    .pipe($.stylus())
    .pipe($.autoprefixer())
    .pipe(gulp.dest(dirs.src + '/css'));
});