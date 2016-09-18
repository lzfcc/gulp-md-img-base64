var gulp = require('gulp'),
	rename = require('gulp-rename'),
	imageisux = require('gulp-imageisux'),
	gulpBase64 = require('gulp-to-base64'),
	del = require('del'),
//var imagemin = require('gulp-imagemin');
	pngmin = require('gulp-pngmin'),
	cache = require('gulp-cached');

gulp.task('clean', function(){
	del(['dest/*', 'src/*']);
});

gulp.task('image_compress', function(){
	gulp.src('src/*.png')  //'src/*.{jpg,png,gif,ico}'
	    //.pipe(imageisux('../dest', false));
	    .pipe(cache('compress'))
	    .pipe(pngmin([16]))
	    .pipe(gulp.dest('dest'))
});

gulp.task('convert', function(){
	gulp.src('dest/*.png')
		.pipe(cache('convert'))
		.pipe(gulpBase64({outPath: "new.base64"}));
});

gulp.task('default', []); //is equivalent to gulp.parallel()

gulp.watch('src/*.png', ['image_compress'])
	// .on('change', function (event) {
	// 	console.log('Event type1: ' + event.type);
	// 	console.log('Event path1: ' + event.path);
	// });

gulp.watch('dest/*.png', ['convert'])
	// .on('change', function(event){
	// 	console.log('Event type2: ' + event.type);
	// 	console.log('Event path2: ' + event.path);
	// });