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

gulp.task("default", function(){
	gulp.watch(rutas.rutaSCSS, ["prepararCSS"] );
    
});

gulp.task('watchChangesCSS',function(){
    browserSync.init({
        server:{
            baseDir: "./public"
        }
    })
    
    gulp.watch(rutas.rutaSCSS, ["sass-watch"] );
})

gulp.task('sass-watch',['prepararCSS'],function(){
    browserSync.reload();
})