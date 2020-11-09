const gulp = require('gulp');
const sass = require('gulp-sass');
const connect = require('gulp-connect');
const sourcemaps = require("gulp-sourcemaps");

gulp.task('sass', done => {
    gulp.src('index/sass/*.scss')
        .pipe(sourcemaps.init()).pipe(sass({
            outputStyle: "compressed"
        })).pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/index/css'))
        .pipe(connect.reload());
    done();
})

//拷贝html文件
gulp.task('html', done => {
    gulp.src('index/html/*.html').pipe(gulp.dest('dist/index/html')).pipe(connect.reload());
    done();
})

//拷贝css文件
gulp.task('css', done => {
    gulp.src('index/css/*.css').pipe(gulp.dest('dist/index/css')).pipe(connect.reload());
    done();
})

//拷贝js文件
gulp.task('js', done => {
    gulp.src('index/js/*.js').pipe(gulp.dest('dist/index/js')).pipe(connect.reload());
    done();
})

//拷贝img文件
gulp.task('img', done => {
    gulp.src('index/img/*').pipe(gulp.dest('dist/index/img')).pipe(connect.reload());
    done();
})

//拷贝公共文件
gulp.task('common', done => {
    gulp.src('common/*').pipe(gulp.dest('dist/common')).pipe(connect.reload());
    gulp.src('fonticon/*').pipe(gulp.dest('dist/fonticon')).pipe(connect.reload());
    done();
})


//监听文件变化
gulp.task('watch', done => {
    gulp.watch('index/sass/*.scss', gulp.series('sass'));
    gulp.watch('index/html/*.html', gulp.series('html'));
    gulp.watch('index/css/*.css', gulp.series('css'));
    gulp.watch('index/js/*.js', gulp.series('js'));
    gulp.watch('index/img/*', gulp.series('img'));
    gulp.watch('common/*', gulp.series('common'));
    done();
})

gulp.task('bulid', gulp.parallel('sass', 'html', 'css', 'js', 'img', 'common'))


//创建服务器
gulp.task('server', done => {
    connect.server({
        root: 'dist',
        livereload: true
    })
    done();
})

gulp.task('default', gulp.series('bulid', 'server', 'watch'))