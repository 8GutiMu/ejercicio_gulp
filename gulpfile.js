var gulp = require('gulp')
var uglify = require('gulp-uglify')
var obfuscate = require('gulp-obfuscate');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var rutas = {
    rutaJs: 'assets/js/app.js'
}

gulp.task('prueba', function () {
    gulp.src(rutas.rutaJs)
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest("public/js"))
})

gulp.task('prepararCSS', function () {
    gulp.src('assets/scss/main.scss')
        .pipe(sass({outputStyle: 'compressed'})
        .on('error', sass.logError))
        .pipe(gulp.dest('public/css'));
})

gulp.task("default", function(){
	gulp.watch("assets/scss/main.scss", ["prepararCSS"] );
    
});

gulp.task('watchChangesCSS',function(){
    browserSync.init({
        server:{
            baseDir: "./public"
        }
    })
    
    gulp.watch("assets/scss/main.scss", ["sass-watch"] );
})

gulp.task('sass-watch',['prepararCSS'],function(){
    browserSync.reload();
})