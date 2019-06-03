const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

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
    gulp.src('js/**/*.js', 'node_modules/**/*.js', 'plugins/**/*.js', 'styles/**/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

//Compile stylesheets
gulp.task('styles', async function() {
    gulp.src('styles/main_styles.css', 'styles/**/*.css', 'node_modules/**/*.css' , 'plugins/**/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/css'));
});

//All tasks in 1 command
gulp.task('default', gulp.series(['copyHtml', 'imageMin', 'scripts', 'styles']));
