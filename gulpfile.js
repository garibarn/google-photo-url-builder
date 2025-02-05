const gulp = require( 'gulp' );

let ClosureCompiler;

let isDebug = true;
let isPrettify = true;

gulp.task(
    'dist',
    gulp.series(
        function(){
            ClosureCompiler = ClosureCompiler || require( 'google-closure-compiler' ).gulp();

            return gulp.src(
                    [
                        // './node_modules/@externs/nodejs/**/*.js',
                        './src/closure-primitives/**/*.js',
                        './src/js/**/*.js'
                    ]
                ).pipe(
                    ClosureCompiler(
                        {
                            dependency_mode   : 'PRUNE',
                            entry_point       : 'goog:browser',
                            define            : [
                                'GooglePhotoURL.DEFINE.DEBUG=' + isDebug
                            ],
                            // env               : 'CUSTOM',
                            compilation_level : isDebug    ? 'SIMPLE_OPTIMIZATIONS' : 'ADVANCED', // 'WHITESPACE_ONLY'
                            formatting        : isPrettify ? 'PRETTY_PRINT'         : 'SINGLE_QUOTES',
                            warning_level     : 'VERBOSE',
                            language_in       : 'ECMASCRIPT3',
                            language_out      : 'ECMASCRIPT3',
                            js_output_file    : 'GooglePhotoURLBuilder.js'
                        }
                    )
                ).pipe(
                    gulp.dest( 'dist' )
                );
        }
    )
);
