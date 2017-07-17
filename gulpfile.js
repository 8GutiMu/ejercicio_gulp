var gulp = require('gulp')
var uglify = require('gulp-uglify')
var obfuscate = require('gulp-obfuscate');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var rutas = {
    rutaJs: 'assets/js/app.js',
    rutaSCSS: 'assets/scss/main.scss',
}

var rutasPublicas ={
    js: "public/js",
    css: 'public/css',
}

gulp.task('prueba', function () {
    gulp.src(rutas.rutaJs)
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest(rutasPublicas.js))
})

gulp.task('prepararCSS', function () {
    gulp.src(rutas.rutaSCSS)
        .pipe(sass({outputStyle: 'compressed'})
        .on('error', sass.logError))
        .pipe(gulp.dest(rutasPublicas.css));
})



gulp.task('watchChanges',function(){
    browserSync.init({
        server:{
            baseDir: "./public"
        }
    })
    
    gulp.watch(rutas.rutaSCSS, ["sass-watch"] );
    gulp.watch('assets/index.html',["html-watch"])
})

gulp.task('sass-watch',['prepararCSS'],function(){
    browserSync.reload();
})

gulp.task('html-watch',['act-html'],function(){
    browserSync.reload(); 
})

gulp.task("act-html",function(){
	gulp.src('assets/index.html')
		.pipe(gulp.dest('public'));
});