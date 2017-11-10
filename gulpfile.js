var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('complete',function(){
    gulp.src('./src/sass/index1.scss')
    .pipe(sass({outputStyle:'expanded'}))
    .pipe(gulp.dest('./src/css/'))
})

gulp.task('jtsass',function(){
    gulp.watch('./src/sass/index1.scss',['complete'])
})