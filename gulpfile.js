var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

const sass_dev = 'dev/**/*.scss';
const sass_build = 'build';
const html_dev = 'dev/**/*.html';
const html_build = 'build'
const images_dev = 'dev/**/*.+(png|jpg|gif|svg)';
const images_build = 'build';


gulp.task('hello', function () {
    console.log('Hello Zell');
});

gulp.task('sass', function () {
    return gulp.src(sass_dev) // Get source files with gulp.src
        // return gulp.src("HTML e CSS/HTML5 e CSS3 I/dev/assets/css/*.scss") // Get source files with gulp.src
        .pipe(sass()) // Sends it through a gulp plugin
        .pipe(gulp.dest(sass_build)) // Outputs the file in the destination folder
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch',['browserSync'], function() {
    gulp.watch(sass_dev, ['sass']);
    
});

gulp.task('useref', function(){
    return gulp.src(html_dev)
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest(html_build))
});

gulp.task('browserSync', function(){
    browserSync.init({
        server:{
            baseDir: 'dev'
        },
    })
});

gulp.task('images', function(){
    return gulp.src()
    .pipe(imagemin())
    .pipe(gulp.dest(images_build))
});