const test = require('ava');


const Compiler = require('google-closure-compiler').compiler;

// Compiler.prototype.javaPath = '/node_modules/MODULE_NAME/jre/jre1.8.0_131.jre/Contents/Home/bin/java';

const compiler = new Compiler({
    dependency_mode : 'PRUNE',
    entry_point     : 'goog:GooglePhotoURL',
    js              : ['./src/closure-primitives/base.js', './src/js/builder.js' ],
    formatting      : 'PRETTY_PRINT'
    // compilation_level: 'ADVANCED'
});

compiler.run((exitCode, stdOut, stdErr) => {
    // console.log( exitCode, stdOut, 'cc' );

    const GooglePhotoURL = new Function( stdOut + ';; return GooglePhotoURL;' )();

    const gen2URL = 'https://blogger.googleusercontent.com/img/a/AVvXsEj3aGIthzBwZM2_cEfZGCXwXylmrtbzzc8g3n2EZvi5_Zz6hHORs1DhlDXBX34pOq-563vEBw1-uQzT5_gTWMqqGvyHNjGJr5dLR7Sk72P96OikoC6IXHGnhUx9s0kIdTBy8JM2w3aZd10Ib7dHHy8tBgZuW9__fCFgSn_OpFC7XuIBpBngaaUukuM6';

    const builder = new GooglePhotoURL.Builder( gen2URL + '=s200' );

    test('GooglePhotoURL.isGooglePhotoURL',
        (t) => {
            t.deepEqual(
                GooglePhotoURL.isGooglePhotoURL( gen2URL ), true
            );
            t.deepEqual(
                GooglePhotoURL.isGooglePhotoURL( 'https://example.com/' ), false
            );
        }
    );

    test('initialize',
        (t) => {
            t.deepEqual(
                builder.getSize(), 200
            );
            t.deepEqual(
                builder.getBaseURL(), gen2URL
            );
        }
    );


    test('getURL',
        (t) => {
            t.deepEqual(
                builder.getURL(), gen2URL + '=s200'
            );
        }
    );
});
