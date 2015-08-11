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

// converts stylus to css
gulp.task('styles:dev', function() {
    console.log("TASK - Stylus");
    return gulp.src(dirs.src.stylus + '*.styl')
        .pipe($.stylus())
        .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest(dirs.src.css.main));
});

// Update paths of index.html
gulp.task('paths', function() {
    console.log("TASK - Add paths");
    return gulp.src(dirs.src.index + 'index.html')
        .pipe($.inject(gulp.src(dirs.src.js.main + '*.js', {
            read: false
        }), {
            name: 'main',
            relative: true
        }))
        .pipe($.inject(gulp.src(dirs.src.js.vendor + '*.js', {
            read: false
        }), {
            name: 'vendor',
            relative: true
        }))
        .pipe($.inject(gulp.src(dirs.src.css.main + '*.css', {
            read: false
        }), {
            name: 'main',
            relative: true
        }))
        .pipe($.inject(gulp.src(dirs.src.css.vendor + '*.css', {
            read: false
        }), {
            name: 'vendor',
            relative: true
        }))
        .pipe(gulp.dest(dirs.src.index));
});

// Copy images into the dist folder
gulp.task('images', function() {
    console.log("TASK - Images");
    return gulp.src(dirs.src.images + '*.{png,jpg,jpeg,gif,svg}')
        .pipe(gulp.dest(dirs.dist.images));
});

// ***** Build tasks ****** //

// Concat
gulp.task('styles:build', function() {
    console.log("TASK - Analyze css");
    gulp.src(dirs.src.css.main + '*.css')
        .pipe($.concatCss('main.min.css'))
        .pipe($.shorthand())
        .pipe($.csscomb())
        .pipe($.minifyCss())
        .pipe($.header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest(dirs.dist.css));
    gulp.src(dirs.src.css.vendor + '*.css')
        .pipe($.concatCss('vendor.css'))
        .pipe($.minifyCss())
        .pipe($.rename({
            suffix: ".min"
        }))
        .pipe($.header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest(dirs.dist.css));
});

gulp.task('scripts:build', function() {
    console.log("TASK - Concat javascript");
    gulp.src(dirs.src.js.main + '*.js')
        .pipe($.concat('main.js'))
        .pipe($.uglify())
        .pipe($.rename({
            suffix: ".min"
        }))
        .pipe($.header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest(dirs.dist.js));
    gulp.src(dirs.src.js.vendor + '*.js')
        .pipe($.concat('vendor.min.js'))
        .pipe($.uglify())
        .pipe($.header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest(dirs.dist.js));
});

// Change paths in the HTML
gulp.task('replace', function() {
    console.log("TASK - Update paths");
    return gulp.src(dirs.src.index + 'index.html')
        .pipe($.htmlReplace({
            'css-vendor': 'css/vendor.min.css',
            'css-main': 'css/main.min.css',
            'js-vendor': 'js/vendor.min.js',
            'js-main': 'js/main.min.js',
        }))
        .pipe(gulp.dest(dirs.dist.index));
});

gulp.task('build', ['styles:build', 'scripts:build', 'images', 'replace']);

// ***** ************ ****** //

// Watch for changes in src files
gulp.task('watch', function() {
    gulp.watch(dirs.src.stylus + '*.styl', ['styles:dev']);
    gulp.watch([
        dirs.src.css.main + '*.css',
        dirs.src.js.main + '*.js',
        dirs.src.css.vendor + '*.css',
        dirs.src.js.vendor + '*.js'
    ], ['paths']);
    gulp.watch(dirs.src.images + '*.{png,jpg,jpeg,gif,svg}', ['images']);

});
