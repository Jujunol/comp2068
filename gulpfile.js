/// <reference path="typings/tsd.d.ts" />

// Load modules
var gulp = require('gulp');
var gutil = require('gulp-util');
var debug = require('gulp-debug');
var inject = require('gulp-inject');
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var tscProject = tsc.createProject('tsconfig.json');
var connect = require('gulp-connect');
var open = require('gulp-open');
var nodemon = require("gulp-nodemon");
// var livereload = require("gulp-livereload");

var tsSources = [
    "./app.ts",
    "./server/**/*.ts"
//    "./server/objects/**/*.ts"
];

// This task Transpiles TypeScript to JavaScript
gulp.task('transpile', function () {
    gutil.log("transpiling...");

    var tsResult = gulp.src(tsSources)
        .pipe(sourcemaps.init())
        .pipe(tsc(tscProject))
        .on('error', gutil.log);

    tsResult.dts.pipe(gulp.dest('./server/'));
    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./server/'))
        .on('error', gutil.log)
        .pipe(connect.reload());

});

gulp.task('watch', function() {
    gulp.watch(tsSources, ['transpile']);
});

gulp.task('develop', function() {
    // livereload.listen();
    nodemon({
        script: 'server.js',
        ext: 'ts',
        tasks: ['transpile'] })
    .on('restart', function() {
        // livereload();
        gutil.log('Server has restarted!');
    });
});

gulp.task('open', function() {
    gulp.src(__filename)
    .pipe(open({
        uri: 'http://localhost',
        app: 'Google Chrome'
    }))
})

gulp.task('default', ['transpile', 'develop', 'open']);