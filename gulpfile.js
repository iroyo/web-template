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

// ***** Development tasks ****** //

// minify new images
gulp.task('style:dev', function() {
    return gulp.src(dirs.src + '/stylus/*.styl')
        .pipe($.stylus())
        .pipe($.autoprefixer())
        .pipe(gulp.dest(dirs.src + '/css'));
});

// Update paths of index.html
gulp.task('paths', function() {
    return gulp.src(dirs.src + '/index.html')
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

// Copy images into the dist folder
gulp.task('images', function() {
    return gulp.src(dirs.src + '/images/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe(gulp.dest(dirs.dist + '/images'));
});

// ***** Build tasks ****** //

// Concat
gulp.task('style:build', function() {
    gulp.src(dirs.src + '/css/*.css')
        .pipe($.concatCss('main.min.css'))
        .pipe($.shorthand())
        .pipe($.csscomb())
        .pipe($.csso())
        .pipe($.header(banner, { pkg : pkg }))
        .pipe(gulp.dest(dirs.dist + '/css'));
    gulp.src(dirs.src + '/css/vendor/*.css')
        .pipe($.concatCss('vendor.min.css'))
        .pipe($.csso())
        .pipe($.header(banner, { pkg : pkg }))
        .pipe(gulp.dest(dirs.dist + '/css'));
});

gulp.task('scripts:build', function() {
    gulp.src(dirs.src + '/js/*.js')
        .pipe($.concat('main.min.js'))
        .pipe($.uglify())
        .pipe($.header(banner, { pkg : pkg }))
        .pipe(gulp.dest(dirs.dist + '/js'));
    gulp.src(dirs.src + '/js/vendor/*.js')
        .pipe($.concat('vendor.min.js'))
        .pipe($.uglify())
        .pipe($.header(banner, { pkg : pkg }))
        .pipe(gulp.dest(dirs.dist + '/js'));
});

// Change paths in the HTML
gulp.task('replace', function() {
    return gulp.src(dirs.src + '/index.html')
        .pipe($.htmlReplace({
            'css-vendor': 'css/vendor.min.css',
            'css-main': 'css/main.min.css',
            'js-vendor': 'js/vendor.min.js',
            'js-main': 'js/main.min.js',
        }))
        .pipe(gulp.dest(dirs.dist));
});

gulp.task('build',['style:build', 'scripts:build', 'images', 'replace']);

// ***** ************ ****** //

// Watch for changes in src files
gulp.task('watch', function() {
    gulp.watch(dirs.src + '/stylus/*.styl', ['style:dev']);
    gulp.watch([dirs.src + '/css/*.css', dirs.src + '/js/*.js'], ['paths']);
    gulp.watch(dirs.src + '/images/**/*.{png,jpg,jpeg,gif,svg}', ['images']);

});
