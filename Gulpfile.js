require('babel/register')({
    stage: 0
});

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var eslint = require('gulp-eslint');

gulp.task('develop', function () {
    nodemon({
        script: 'src/server.js',
        ext: 'html js',
        ignore: ['ignored.js'],
        tasks: ['lint'],
        exec: 'babel-node'
    }).on('restart', function () {
        console.log('Server was restarted!');
    });
});

gulp.task('lint', function () {
    return gulp.src(['src/**/*.js'])
        // eslint() attaches the lint output to the eslint property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failOnError last.
        .pipe(eslint.failOnError());
});
