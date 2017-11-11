// var gulp = require('gulp');
// var sass = require('gulp-sass');

// gulp.task('complete',function(){
//     gulp.src('./src/sass/index1.scss')
//     .pipe(sass({outputStyle:'expanded'}))
//     .pipe(gulp.dest('./src/css/'))
// })

// gulp.task('jtsass',function(){
//     gulp.watch('./src/sass/index1.scss',['complete'])
// })
// 安装依赖
// var gulp = require('gulp');
// var browserSync = require('browser-sync');
// 设置任务---使用代理
// gulp.task('browser-sync', function () {
//     browserSync.init({
//         files:['**'],
//         // proxy:'localhost', // 设置本地服务器的地址
//         // port:1001  // 设置访问的端口号
//         server:{
//             baseDir:'./',
//             index:'src/index.html'
//         },
//         port:8050

//     });
// });
// baseDir:'./',
// index:'src/index.html'

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var reload      = browserSync.reload;

gulp.task('sass', function() {
    return gulp.src("src/sass/*.scss")
        .pipe(sass({outputStyle:'expanded'}))
        .pipe(gulp.dest("src/css"))
        .pipe(reload({stream: true}));
});

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src"
        // proxy:'localhost',
        // port:1001
    });

    gulp.watch("src/sass/*.scss", ['sass']);
    gulp.watch("src/*.html").on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新


gulp.task('default', ['serve']);