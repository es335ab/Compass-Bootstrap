var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var browserify  = require('browserify');
var transform   = require('vinyl-transform');
var merge       = require('merge-stream');
var runSequence = require('run-sequence');
var saveLicense = require('uglify-save-license');
var spritesmith = require('gulp.spritesmith');
var browserSync = require('browser-sync');
var proxy       = require('proxy-middleware');
var reload      = browserSync.reload;

var path = {
  assets: 'assets',
  tmp: '.tmp',
  build: 'build'
};

gulp.task('compass', function () {
  gulp.src(path.assets + '/css/*.scss')
    .pipe($.plumber())
    .pipe($.compass({
      css: path.tmp + '/css',
      sass: path.assets + '/css',
      image: path.assets + '/img'
    }))
    .pipe($.minifyCss())
    .pipe(gulp.dest(path.tmp + '/css'));
});

gulp.task('sprite', function() {
  var spriteData = gulp.src(path.assets + '/img/sprites/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    imgPath: '/img/common/sprite.png',
    cssFormat: 'scss'
  }));
  return merge(
    spriteData.img.pipe(gulp.dest(path.tmp+'/img/common')),
    spriteData.css.pipe(gulp.dest(path.assets+'/css/production/var'))
  );
});

gulp.task('browserify', function() {
  return merge(
    gulp.src(path.assets+'/js/common.js')
      .pipe($.plumber({errorHandler: $.notify.onError('<%= error.message %>')}))
      .pipe(transform(function(filename){
        return browserify(filename)
          .require('backbone', {expose: 'backbone'})
          .require('underscore', {expose: 'underscore'})
          .require('jquery', {expose: 'jquery'})
          .bundle();
        })),

    gulp.src([
      path.assets+'/js/*.js',
      '!'+path.assets+'/js/common.js'
    ])
      .pipe($.plumber({errorHandler: $.notify.onError('<%= error.message %>')}))
      .pipe(transform(function(filename){
        return browserify(filename)
          .external('backbone')
          .external('underscore')
          .external('jquery')
          .bundle();
        }))
  )
  .pipe(gulp.dest(path.tmp+'/js'))
  .pipe(reload({stream:true}));
});

gulp.task('jshint', function() {
  return gulp.src(path.assets+'/js/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('uglify', function() {
  return gulp.src(path.tmp+'/js/*.js')
    .pipe($.uglify({
      preserveComments: saveLicense
    }))
    .pipe(gulp.dest(path.build+'/js'));
});

gulp.task('copy:tmp', function() {
  return gulp.src([
      path.assets+'/**/*.!(scss|js|md)',
      '!'+path.assets+'/img/sprites/**'
    ])
    .pipe(gulp.dest(path.tmp));
});

gulp.task('clean:tmp', function() {
  return gulp.src(path.tmp, {read: false})
    .pipe($.clean());
});

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch(path.assets+'/js/**/*.js', ['jshint', 'browserify']);
  gulp.watch(path.assets+'/css/**/*.scss', ['compass']);
  gulp.watch(path.assets+'/**/*.html', ['copy:tmp']);
  gulp.watch([
    path.tmp+'/**/*.html',
    path.tmp+'/**/*.css',
    path.tmp+'/**/*.js'
  ]).on('change', reload);
});

gulp.task('browser-sync', function() {
  var url = require('url');
  var proxyOptions = url.parse('http://localhost:8080/api');
  proxyOptions.route = '/api';

  browserSync({
    port: 3000,
    server: {
      baseDir: path.tmp,
      middleware: [proxy(proxyOptions)]
    }
  });
});

gulp.task('server', function() {
  runSequence(
    'clean:tmp',
    'sprite',
    'compass',
    ['copy:tmp', 'browserify'],
    'watch'
  );
});