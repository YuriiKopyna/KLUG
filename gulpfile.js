const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

//Copying html file
gulp.task('copyHtml', async function() {
   gulp.src('src/*.html')
   .pipe(gulp.dest('dist'));
});

//Optimize Images
gulp.task('imageMin', async function() {
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
});

//Optimize JavaScript
gulp.task('minify', async function() {
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

//Compile sass
gulp.task('sass', async function() { 
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
});

//Compile scripts
gulp.task('scripts', async function() {
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

//All tasks in 1 command
gulp.task('default', gulp.series(['copyHtml', 'imageMin', 'sass', 'scripts']));

gulp.task('watch', async function(){
    gulp.watch('src/js/*.js', gulp.series('scripts'));
    gulp.watch('src/images/*', gulp.serie('imageMin'));
    gulp.watch('src/sass/*.scss', gulp.series('sass'));
    gulp.watch('src/*.html', gulp.series('copyHtml'));
});