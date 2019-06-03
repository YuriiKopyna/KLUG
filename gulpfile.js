const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');


//Copying html file
gulp.task('copyHtml', async function() {
    gulp.src('*.html')
    .pipe(gulp.dest('dist'));
 });

//Optimize Images
gulp.task('imageMin', async function() {
	gulp.src('images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
});

//Compile scripts
gulp.task('scripts', async function() {
    gulp.src('js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

//All tasks in 1 command
gulp.task('default', gulp.series(['copyHtml', 'imageMin', 'scripts']));

gulp.task('watch', async function(){
    gulp.watch('src/js/*.js', gulp.series('scripts'));
    gulp.watch('src/images/*', gulp.serie('imageMin'));
});