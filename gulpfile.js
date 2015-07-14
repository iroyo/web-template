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
    ''
].join('\n');


// minify new images
gulp.task('style', function() {
    gulp.src(dirs.src + '/stylus/*.styl')
        .pipe($.newer(dirs.src + '/css'))
        .pipe($.stylus())
        .pipe($.autoprefixer())
        .pipe(gulp.dest(dirs.src + '/css'));
});

// Update paths of index.html
gulp.task('paths', function() {
    gulp.src(dirs.src + '/index.html')
        .pipe($.inject(gulp.src(dirs.src + '/js/*.js', {
            read: false
        }), {
            name: 'main',
            relative: true
        }))
        .pipe($.inject(gulp.src(dirs.src + '/js/vendor/*.js', {
            read: false
        }), {
            name: 'vendor',
            relative: true
        }))
        .pipe($.inject(gulp.src(dirs.src + '/css/*.css', {
            read: false
        }), {
            name: 'main',
            relative: true
        }))
        .pipe($.inject(gulp.src(dirs.src + '/css/vendor/*.css', {
            read: false
        }), {
            name: 'vendor',
            relative: true
        }))
        .pipe(gulp.dest(dirs.src));
});

gulp.task('replace', function() {
    gulp.src(dirs.src + '/index.html')
        .pipe($.htmlReplace({
            'css-vendor': 'css/styles.min.css',
            'css-main': 'css/styles.min.css',
            'js-vendor': 'js/vendor.min.css',
            'js-main': 'js/main.min.css',
        }))
        .pipe(gulp.dest(dirs.dist));
});
