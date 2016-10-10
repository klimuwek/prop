'use strict';

const $ = require('gulp-load-plugins')();
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const debug = require('gulp-debug');
const del = require('del');
const disCom = require('postcss-discard-comments');
const doiuse = require('doiuse');
const gulp = require('gulp');
const nested = require('postcss-nested');
const path = require('path');
const precss = require('precss');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('clean', function() {
	return del('public');
});

gulp.task('copy', function() {
	return gulp.src('src/fonts/*.*', {base: 'src'})
        .pipe(gulp.dest('public'));
});

gulp.task('styles', function() {
	var processors = [
		doiuse({
			browsers: ['last 2 versions'],
			onFeatureUsage: function (usageInfo) {
				console.log(usageInfo.message)
			}
		}),
		nested(),
		precss(),
		disCom({
			removeAll: true
		}),
		autoprefixer({
			browsers: ['last 2 versions']
		})
	];
	return gulp.src('src/styles/user.css', {base: 'src'})
		.pipe($.plumber(function(error) {
                console.log(error.message);
                this.emit('end');
            }))
		.pipe($.if(isDevelopment, $.sourcemaps.init()))
		.pipe($.postcss(processors))
		.pipe($.if(isDevelopment, $.sourcemaps.write()))
		.pipe(gulp.dest('public'));
});

gulp.task('scripts', function() {
	return gulp.src('src/scripts/user.js', {base: 'src'})
		.pipe($.plumber(function(error) {
                console.log(error.message);
                this.emit('end');
            }))
		.pipe(gulp.dest('public'));
});

gulp.task('images', function() {
	return gulp.src('src/**/*.{png,jpg,jpeg,ico,gif}', {since: gulp.lastRun('images')})
		.pipe($.plumber(function(error) {
                console.log(error.message);
                this.emit('end');
            }))
		.pipe($.imagemin())
		.pipe(gulp.dest('public'));
});

gulp.task('html', function() {
	return gulp.src('src/html/*.pug')
		.pipe($.plumber(function(error) {
                console.log(error.message);
                this.emit('end');
            }))
		.pipe($.pug({
			pretty: true
		}))
		.pipe(gulp.dest('public'));
});

gulp.task('serve', function() {
	browserSync.init({
		server: 'public'
	});
	browserSync.watch('public/**/*.*').on('change', browserSync.reload)
});

gulp.task('watch', function() {
	gulp.watch('src/styles/**/*.*', gulp.series('styles'));
	gulp.watch('src/scripts/**/*.*', gulp.series('scripts'));
	gulp.watch('src/**/*.{png,jpg,jpeg,ico,gif}', gulp.series('images'));
    gulp.watch('src/html/**/*.*', gulp.series('html'));
	gulp.watch('src/fonts/*.*', gulp.series('copy'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('copy', 'styles', 'scripts', 'images', 'html')));

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));

gulp.task('default', gulp.series('build'));
