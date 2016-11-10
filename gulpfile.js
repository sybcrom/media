//Déclaration des variables
var gulp = 			require('gulp');					//permet de declarer les autres outils (plugins)
var sass = 			require('gulp-sass');
var autoprefixer = 	require('gulp-autoprefixer');
var htmlmin = 		require('gulp-htmlmin');
var cleanCSS = 		require('gulp-clean-css');
var plumber=		require('gulp-plumber');
var notify=			require('gulp-notify'); //plumber et notify servent à ne pas planter la console lorsqu'on fait une erreur de syntaxe en sass
var browserSync=	require('browser-sync');
var uglify =        require('gulp-uglify');
var rename =        require('gulp-rename');
var jshint =        require('gulp-jshint');




//Fonctionnalités -->voir dans site de gulp, plugin
gulp.task('transformcss', function () { 				//sassification =donner un nom à la tâche
  return gulp.src('src/css/scss/**/*.scss')				//tous les dossiers scss sans _ de n'importe quel fichier de scss
  .pipe(plumber({errorHandler:notify.onError("Erreur: <%= error.message %>")}))
    .pipe(sass())			//fais un sass et transforme les fichiers scss en css, si une erreur dis le dans le log
    .pipe(autoprefixer({								//rajoute un prefixe css , concerne les fichier css
    	browsers: ['last 2 versions'],
    	cascade: false
    }))													
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'));						//on renvoie le résultat, on indique le dossier de destination
});





gulp.task('htmlmin', function() {
	return gulp.src('src/*.html')

	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('dist'));
});




gulp.task('uglification', function () {
	return gulp.src('src/js/*.js')

	.pipe(plumber({errorHandler: notify.onError("Erreur: <%= error.message %>")}))

	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'))

	.pipe(rename(function(path){
		path.basename += ".min";
	}))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});





gulp.task('synchro' , function() {
	browserSync.init({
		server: {
			baseDir: "dist"
		}
	})
});



//Watch & Launch = surveille et lance
gulp.task('watch', ['synchro', 'htmlmin', 'transformcss'] , function(){
	gulp.watch("src/css/scss/**/*.scss" , ['transformcss']);	//je surveille tous les fichier scss qui sont ds un chemin scss et j'applique la tâche sassification
	gulp.watch('src/js/*.js', ['uglification']);
	gulp.watch('src/*.html' , ['htmlmin']);
	gulp.watch('dist/*.html').on('change', browserSync.reload) ;
	gulp.watch('dist/css/*.css').on('change', browserSync.reload);
	gulp.watch('dist/js/*.js').on('change', browserSync.reload);
});



gulp.task('default' , ['watch']); 						//je dis ce qu'il se passe qd je tappe gulp dans la console
