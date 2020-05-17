var gulp        = require('gulp'),
    less        = require('gulp-less'),
    browserSync = require('browser-sync'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglifyjs'),
    cssnano     = require('gulp-cssnano'),
    rename      = require('gulp-rename');

//Компилятор less
gulp.task('less', function(){
    return gulp.src('app/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('minifyCss', function() {
    return gulp.src(['app/css/libs.min.css',
                     'app/fonts/fontawesome/fontawesome.css',
                     'app/css/responsive.css',
                     'app/css/style.css'
        ])  
        .pipe(cssnano())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});
 
//Собираем скрипты, объединяем.
gulp.task('scripts', function(){
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/fancybox/dist/jquery.fancybox.min.js',
        'app/libs/owl.carousel/dist/owl.carousel.min.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
})

//Лив превью
gulp.task('browser-sync', function() {
    browserSync.init({
		server:{
			baseDir:'app'
		},
		notify: false
	});
});

gulp.task('HTMLcode', function(){
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('JScode', function(){
    return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({stream: true}))
})

//Следим за изменениями файлов и запускаем таски


gulp.task('watch', function() {
    gulp.watch('app/less/*.less', gulp.parallel('less'));
    gulp.watch(['app/css/style.css', 'app/css/responsive.css'], gulp.parallel('minifyCss'));
//    gulp.watch('app/js/**/*.js', browserSync.reload);
    gulp.watch('app/js/*.js', gulp.parallel('JScode'));
    gulp.watch('app/*.html', gulp.parallel('HTMLcode'));
}); 


gulp.task('def', gulp.parallel('watch','browser-sync', 'less', 'minifyCss'));






