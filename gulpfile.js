const gulp = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");
const browserSync = require('browser-sync').create();
const svgInject = require('gulp-svg-inject');

function defaultTask(cb) {
	cb();
}

gulp.task("browserSync", function() {
	browserSync.init({
		server: {
            baseDir: "dist",
            index: 'index.html'
		}
	});
});

gulp.task("nunjucks", function() {
	return gulp
        .src("app/pages/**/*.+(html|njk)")
        .pipe(svgInject())
		.pipe(
			nunjucksRender({
				path: ["app/templates"]
			})
		)
		.pipe(gulp.dest("dist/"))
		.pipe(
			browserSync.reload({
				stream: true
			})
		);
});

gulp.task('svgInject', function() {
    return gulp
        .src('dist/*.+(html)')
        .pipe(svgInject())
        .pipe(gulp.dest("dist/"))
})

gulp.task("styles", function() {
	return gulp
		.src("app/css/main.scss")
		.pipe(sassGlob())
		.pipe(sass())
		.pipe(gulp.dest("dist/css"))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', gulp.parallel('browserSync', 'styles', 'nunjucks', 'svgInject', function() {
    gulp.watch('app/css/**/*.scss', gulp.series('styles'))
    gulp.watch('app/**/*.njk', gulp.series('nunjucks'))
}))

exports.default = defaultTask; 