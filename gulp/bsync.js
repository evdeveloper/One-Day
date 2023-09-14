module.exports = function () {
	$.gulp.task('bsync', () => {
		$.browserSync.init({
			server: {
				baseDir: './dist'
			},
			notify: false
		})
	})
}
