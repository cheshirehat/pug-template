'use strict'

import gulp from 'gulp'
import webserver from 'gulp-webserver'
import notify from 'gulp-notify'
import plumber from 'gulp-plumber'
import sass from 'gulp-sass'
import pug from 'gulp-pug'
import browserSync from 'browser-sync'

const config = {
  src: 'src',
  dist: 'public',
}

// webserver
gulp.task('webserver', () => {
  return gulp.src(config.dist)
    .pipe(webserver({
      livereload: true,
      port: 8000
    }))
})

// sass
gulp.task('scss', () => {
  return gulp.src(`${config.src}/scss/**/*.scss`)
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(sass({ outputStyle: 'compressed'}))
    .pipe(gulp.dest(`${config.dist}/assets/css/`))
})

// pug
gulp.task('pug', () => {
  return gulp.src([`${config.src}/pug/**/*.pug`, `!./${config.src}/pug/**/_*.pug`])
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(config.dist))
})

//broweserSync
gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: config.dist
    }
  })
  gulp.watch(`${config.dist}/assets/js/**/*.js`, ['reload'])
  gulp.watch(`${config.dist}/**/*.html`, ['reload'])
  gulp.watch(`${config.dist}/assets/css/**/*.css`, ['reload'])
})

gulp.task('reload', () => {
  browserSync.reload()
})

//watch
gulp.task('watch', () => {
  gulp.watch(`${config.src}/scss/**/*.scss`, ['scss'])
  gulp.watch([`${config.src}/pug/**/*.pug`, `!./${config.src}/pug/**/_*.pug`], ['pug'])
})

// task
gulp.task('develop', ['webserver', 'browserSync', 'watch'])
gulp.task('default', ['develop'])