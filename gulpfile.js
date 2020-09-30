'use strict';

var gulp       = require('gulp'),
    brSync     = require('browser-sync').create(),
    rigger     = require('gulp-rigger'),
    clean      = require('gulp-clean'),
    sass       =require('gulp-sass'),
	uglify     =require('gulp-uglify-es').default,
    imagemin   = require('gulp-imagemin'),
    pngquant   = require('gulp-pngquant');

gulp.task('html', function(){
    return gulp.src('src/*.html')
                .pipe(rigger())
                .pipe(gulp.dest('build'))
                .pipe(brSync.stream());
});

gulp.task('clean', function(){
    return gulp.src('build/*')
            .pipe(clean({
                read: false,
                allowEmpty: true
            }));
});

gulp.task('css', function() {
    return gulp.src("src/scss/*.scss")
        // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("build/css"))
        .pipe(brSync.stream());
});

gulp.task('js', function() {
    return gulp.src("src/js/main.js")
                .pipe(rigger())
                //.pipe(uglify())
                .pipe(gulp.dest("build/js"))
                .pipe(brSync.stream());
});

gulp.task('fonts', function() {
   return gulp.src('src/fonts/*')
       .pipe(gulp.dest('build/fonts'))
       .pipe(brSync.stream());
});

gulp.task('favicon', function() {
   return gulp.src('src/favicon.*')
       .pipe(gulp.dest('build/'))
       .pipe(brSync.stream());
});

gulp.task('images', function () {
   return gulp.src('src/img/*')
       .pipe(imagemin({
           progressive: true,
           svgoPlugins: [{removeViewBox: false}],
           use: [pngquant()],
           interlaced: true
       }))
       .pipe(gulp.dest('build/img'))
       .pipe(brSync.stream());
});

gulp.task('runServer', function() {
    brSync.init({
       server: "./build"
   });
    gulp.watch('src/**/*.html', gulp.parallel(['html']));
    gulp.watch('src/scss/**/*.scss', gulp.parallel(['css']));
    gulp.watch('src/js/**/*.js', gulp.parallel(['js']));
    gulp.watch('src/fonts/*', gulp.parallel(['fonts']));
    gulp.watch('src/img/*', gulp.parallel(['images']));
});

gulp.task('build', gulp.parallel('html', 'css', 'js', 'fonts', 'images', 'favicon'));

gulp.task('init', gulp.series('clean', 'build', 'runServer'));
