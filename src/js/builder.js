/**
 *  Google/Blogger Image URL Parameters
 *    Sauerstoffdioxid
 *    https://gist.github.com/Sauerstoffdioxid/2a0206da9f44dde1fdfce290f38d2703
 */
goog.provide( 'GooglePhotoURL' );
goog.provide( 'GooglePhotoURL.FileFormats' );
goog.provide( 'GooglePhotoURL.OriginalFileFormats' );
goog.provide( 'GooglePhotoURL.DEFINE.DEBUG' );
goog.provide( 'GooglePhotoURL.Builder' );
goog.provide( 'GooglePhotoURL.isGooglePhotoURL' );

/** @enum {number} */
GooglePhotoURL.FileFormats = {
    ORIGINAL      : 0,
    JPEG          : 1,
    PNG           : 2,
    WEBP          : 3,
    ANIMATED_WEBP : 4,
    GIF           : 5,
    MP4           : 6
};

/** @enum {number} */
GooglePhotoURL.OriginalFileFormats = {
    UNKNOWN       : 0,
    JPEG          : 1,
    PNG           : 2,
    WEBP          : 3,
    // ANIMATED_WEBP : 4,
    GIF           : 5,
    MP4           : 6
};

/**
 * @private
 * @enum {number} */
GooglePhotoURL.DataTypes = {
    BOOLEAN :  1,
    NUMBER  :  2,
    UINT    :  4,
    COLOR   :  8,
    PERCENT : 16,
    STRING  : 32
};

GooglePhotoURL.DEFINE = {};

/** @define {boolean} */
GooglePhotoURL.DEFINE.DEBUG = goog.define( 'GooglePhotoURL.DEFINE.DEBUG' , false );

goog.scope(
    function(){
    /**************************************************************************
     *
     *  Public
     *
     *************************************************************************/
        GooglePhotoURL.Builder = Builder;

        /**
         * @param {string} normalizedURL
         * @return {boolean}
         */
        GooglePhotoURL.isGooglePhotoURL = function( normalizedURL ){
            return !!getGooglePhotoGeneration( normalizedURL );
        };

    /**************************************************************************
     *
     *  Implementation
     *
     *************************************************************************/
        var currentColor, currentBackgroundColor, currentPaddingColor, backgroundColorRequired;

        var COMMAND_DIFINITIONS = [
            'w', GooglePhotoURL.DataTypes.UINT,
                function( /** @type {!Builder} */ instance, /** @type {number} */ value ){
                    instance.setWidth( value );
                },
                function( /** @type {!Builder} */ instance ){
                    if( 0 <= instance._width && instance._width !== instance._height ){
                        return 'w' + instance._width;
                    };
                },
            'h', GooglePhotoURL.DataTypes.BOOLEAN | GooglePhotoURL.DataTypes.UINT,
                function( /** @type {!Builder} */ instance, /** @type {number | boolean} */ value ){
                    if( value === true ){
                        instance.setHTMLOutputEnabled( true );
                    } else {
                        instance.setHeight( /** @type {number} */ (value) );
                    };
                },
                function( /** @type {!Builder} */ instance ){
                    var params = [];

                    if( 0 <= instance._height && instance._width !== instance._height ){
                        params.push( 'h' + instance._height );
                    };
                    if( instance._htmlOutputEnabled ){
                        params.push( 'h' );
                    };
                    return params.join( '-' );
                },
            's', GooglePhotoURL.DataTypes.BOOLEAN | GooglePhotoURL.DataTypes.UINT,
                function( /** @type {!Builder} */ instance, /** @type {number | boolean} */ value ){
                    if( value === true ){
                        instance.setIgoringAspectRatio( true );
                    } else {
                        instance.setSize( /** @type {number} */ (value) );
                    };
                },
                function( /** @type {!Builder} */ instance ){
                    var params = [];

                    if( 0 <= instance._width && instance._width === instance._height ){
                        params.push( 's' + instance._width );
                    };
                    if( instance._ingoringAspectRatio ){
                        if( GooglePhotoURL.DEFINE.DEBUG ){
                            if( !( 0 < instance._width && 0 < instance._height ) ){
                                throw 'Ignoring the aspect ratio requires both w and h to be explicitly set.';
                            };
                        };
                        params.push( 's' );
                    };
                    return params.join( '-' );
                },
            'nu', GooglePhotoURL.DataTypes.BOOLEAN,
                function( /** @type {!Builder} */ instance, /** @type {boolean} */ value ){
                    instance.setUpscaling( false );
                },
                function( /** @type {!Builder} */ instance ){
                    if( !instance._upscaling ){
                        return 'nu';
                    };
                },
            'c', GooglePhotoURL.DataTypes.BOOLEAN | GooglePhotoURL.DataTypes.COLOR,
                function( /** @type {!Builder} */ instance, /** @type {number | boolean} */ value ){
                    if( value === true ){
                        instance.setCropping( true );
                    } else {
                        currentColor = /** @type {number} */ (value);
                    };
                },
                function( /** @type {!Builder} */ instance ){
                    if( instance._cropping && !instance._croppingToCircular && !instance.isFreeCropping() ){
                        return 'c';
                    };
                },
            'cc', GooglePhotoURL.DataTypes.BOOLEAN,
                function( /** @type {!Builder} */ instance, /** @type {boolean} */ value ){
                    instance.setCroppingToCircular( true );
                },
                function( /** @type {!Builder} */ instance ){
                    if( instance._croppingToCircular ){
                        return 'cc';
                    };
                },
            'p', GooglePhotoURL.DataTypes.BOOLEAN,
                function( /** @type {!Builder} */ instance, /** @type {boolean} */ value ){
                    instance.setCroppingDifferentFocus( true );
                },
                function( /** @type {!Builder} */ instance ){
                    if( instance._croppingDifferentFocus ){
                        return 'p';
                    };
                },
            'fcrop64=', GooglePhotoURL.DataTypes.STRING,
                function( /** @type {!Builder} */ instance, /** @type {string} */ value ){
                    instance.setFreeCropping(
                        hexToUINT( value.substr(  2, 4 ) ) / 0xffff * 100,
                        hexToUINT( value.substr(  6, 4 ) ) / 0xffff * 100,
                        hexToUINT( value.substr( 10, 4 ) ) / 0xffff * 100,
                        hexToUINT( value.substr( 14, 4 ) ) / 0xffff * 100
                    );
                },
                function( /** @type {!Builder} */ instance ){
                    /**
                     * @param {number} percent
                     * @return {string} */
                    function uintToHex( percent ){
                        var hex = '000' + ( percent / 1000 * 0xffff | 0 ).toString( 16 ).substr( 2 );
                        return hex.substr( hex.length - 4 );
                    };
                    if( instance.isFreeCropping() ){
                        return 'fcrop64=1,' + uintToHex( instance._croppingLeft   ) +
                                              uintToHex( instance._croppingTop    ) +
                                              uintToHex( instance._croppingRight  ) +
                                              uintToHex( instance._croppingBottom );
                    };
                },
            'fh', GooglePhotoURL.DataTypes.BOOLEAN,
                function( /** @type {!Builder} */ instance, /** @type {boolean} */ value ){
                    instance.setFlippingHorizontally( true );
                },
                function( /** @type {!Builder} */ instance ){
                    if( instance._flippingHorizontally ){
                        return 'fh';
                    };
                },
            'fv', GooglePhotoURL.DataTypes.BOOLEAN,
                function( /** @type {!Builder} */ instance, /** @type {boolean} */ value ){
                    instance.setFlippingVertically( true );
                },
                function( /** @type {!Builder} */ instance ){
                    if( instance._flippingVertically ){
                        return 'fv';
                    };
                },
            'r', GooglePhotoURL.DataTypes.UINT,
                function( /** @type {!Builder} */ instance, /** @type {number} */ value ){
                    instance.setRotation( value );
                },
                function( /** @type {!Builder} */ instance ){
                    if( 0 < instance._rotation ){
                        return 'r' + instance._rotation;
                    };
                },
            'ba', GooglePhotoURL.DataTypes.UINT,
                function( /** @type {!Builder} */ instance, /** @type {number} */ value ){
                    instance.setBadge( value );
                },
                function( /** @type {!Builder} */ instance ){
                    if( 0 <= instance._badge ){
                        return 'ba' + instance._badge;
                    };
                },
            'b', GooglePhotoURL.DataTypes.UINT,
                function( /** @type {!Builder} */ instance, /** @type {number} */ value ){
                    instance.setBorderWidth( value, currentColor );
                },
                function( /** @type {!Builder} */ instance ){
                    if( 0 < instance._borderWidth ){
                        return ( 0 <= instance._borderColor ? 'c' + uintToColorString( instance._borderColor ) + '-' : '' ) +
                               'b' + instance._borderWidth;
                    };
                },
            'br', GooglePhotoURL.DataTypes.UINT,
                function( /** @type {!Builder} */ instance, /** @type {number} */ value ){
                    instance.setBorderRadius( value, currentBackgroundColor || currentColor );
                },
                function( /** @type {!Builder} */ instance ){
                    if( 0 < instance._borderRadius ){
                        backgroundColorRequired = true;
                        return 'br' + instance._borderRadius;
                    };
                },
            'bc', GooglePhotoURL.DataTypes.COLOR,
                function( /** @type {!Builder} */ instance, /** @type {number} */ value ){
                    instance._backgroundColor = currentBackgroundColor = value;
                },
                false,
            'pd', GooglePhotoURL.DataTypes.UINT,
                function( /** @type {!Builder} */ instance, /** @type {number} */ value ){
                    instance.setPadding( value, currentPaddingColor || currentColor );
                },
                function( /** @type {!Builder} */ instance ){
                    if( 0 < instance._padding ){
                        return ( 0 <= instance._paddingColor ? 'pc' + uintToColorString( instance._paddingColor ) + '-' : '' ) +
                               'pd' + instance._padding;
                    };
                },
            'pc', GooglePhotoURL.DataTypes.COLOR,
                function( /** @type {!Builder} */ instance, /** @type {number} */ value ){
                    currentPaddingColor = value;
                },
                false,
            'fSoften=', GooglePhotoURL.DataTypes.STRING,
                function( /** @type {!Builder} */ instance, /** @type {string} */ value ){
                    var blurringArgs = value.split( ',' );

                    instance.setBlur( Number( blurringArgs[ 1 ] ), Number( blurringArgs[ 2 ] ) );
                },
                function( /** @type {!Builder} */ instance ){
                    if( 0 < instance._blurringAmount ){
                        return 'fSoften=0,' + instance._blurringAmount + ',' + instance._mixRatio;
                    };
                },
            'rj', GooglePhotoURL.DataTypes.BOOLEAN,
                function( /** @type {!Builder} */ instance, /** @type {boolean} */ value ){
                    instance.setFileFormat( GooglePhotoURL.FileFormats.JPEG );
                },
                function( /** @type {!Builder} */ instance ){
                    if( instance._fileFormat === GooglePhotoURL.FileFormats.JPEG ){
                        backgroundColorRequired = true;
                        return 'rj';
                    };
                },
            'rp', GooglePhotoURL.DataTypes.BOOLEAN,
                function( /** @type {!Builder} */ instance, /** @type {boolean} */ value ){
                    instance.setFileFormat( GooglePhotoURL.FileFormats.PNG );
                },
                function( /** @type {!Builder} */ instance ){
                    if( instance._fileFormat === GooglePhotoURL.FileFormats.PNG ){
                        return 'rp';
                    };
                },
            'rw', GooglePhotoURL.DataTypes.BOOLEAN,
                function( /** @type {!Builder} */ instance, /** @type {boolean} */ value ){
                    instance.setFileFormat( GooglePhotoURL.FileFormats.WEBP );
                },
                function( /** @type {!Builder} */ instance ){
                    if( instance._fileFormat === GooglePhotoURL.FileFormats.WEBP ){
                        return 'rw';
                    };
                },
            'rwa', GooglePhotoURL.DataTypes.BOOLEAN,
                function( /** @type {!Builder} */ instance, /** @type {boolean} */ value ){
                    instance.setFileFormat( GooglePhotoURL.FileFormats.ANIMATED_WEBP );
                },
                function( /** @type {!Builder} */ instance ){
                    if( instance._fileFormat === GooglePhotoURL.FileFormats.ANIMATED_WEBP ){
                        return 'rwa';
                    };
                },
            'rg', GooglePhotoURL.DataTypes.BOOLEAN,
                function( /** @type {!Builder} */ instance, /** @type {boolean} */ value ){
                    instance.setFileFormat( GooglePhotoURL.FileFormats.GIF );
                },
                function( /** @type {!Builder} */ instance ){
                    if( instance._fileFormat === GooglePhotoURL.FileFormats.GIF ){
                        return 'rg';
                    };
                },
            'rh', GooglePhotoURL.DataTypes.BOOLEAN,
                function( /** @type {!Builder} */ instance, /** @type {boolean} */ value ){
                    instance.setFileFormat( GooglePhotoURL.FileFormats.MP4 );
                },
                function( /** @type {!Builder} */ instance ){
                    if( instance._fileFormat === GooglePhotoURL.FileFormats.MP4 ){
                        backgroundColorRequired = true;
                        return 'rh';
                    };
                },
            'nw', GooglePhotoURL.DataTypes.BOOLEAN,
                function( /** @type {!Builder} */ instance, /** @type {boolean} */ value ){
                    instance.setFileFormat( GooglePhotoURL.FileFormats.ORIGINAL );
                },
                function( /** @type {!Builder} */ instance ){
                    if( instance._fileFormat === GooglePhotoURL.FileFormats.ORIGINAL ){
                        return 'nw';
                    };
                },
            'ft', GooglePhotoURL.DataTypes.BOOLEAN,
                function( /** @type {!Builder} */ instance, /** @type {boolean} */ value ){
                    instance.setLoselessCompressioEnabled( true );
                },
                function( /** @type {!Builder} */ instance ){
                    if( instance._losslessCompressioEnabled ){
                        return 'ft';
                    };
                },
            'lo', GooglePhotoURL.DataTypes.BOOLEAN,
                function( /** @type {!Builder} */ instance, /** @type {boolean} */ value ){
                    instance.setForcingLosslessCompressionEnabled( true );
                },
                function( /** @type {!Builder} */ instance ){
                    if( instance._forcingLoselessCompressioEnabled ){
                        return 'lo';
                    };
                },
            'l', GooglePhotoURL.DataTypes.UINT,
                function( /** @type {!Builder} */ instance, /** @type {number} */ value ){
                    instance.setCompressioLevel( value );
                },
                function( /** @type {!Builder} */ instance ){
                    if( 0 <= instance._compressioLevel ){
                        return 'l' + instance._compressioLevel;
                    };
                },
            'e', GooglePhotoURL.DataTypes.UINT,
                function( /** @type {!Builder} */ instance, /** @type {number} */ value ){
                    instance.setMaxAge( value );
                },
                function( /** @type {!Builder} */ instance ){
                    if( 0 <= instance._maxAge ){
                        return 'e' + instance._maxAge;
                    };
                },
            'ip', GooglePhotoURL.DataTypes.BOOLEAN,
                function( /** @type {!Builder} */ instance, /** @type {boolean} */ value ){
                    instance.setMetadataEnabled( true );
                },
                function( /** @type {!Builder} */ instance ){
                    if( instance._metadataEnabled ){
                        return 'ip';
                    };
                }
        ];

        function isGoogleUserContent( normalizedURL ){
            return 0 < normalizedURL.indexOf( 'blogger.googleusercontent.com/img/' );
        };

        function isLegacyGoogleUserContent( normalizedURL ){
            return 0 < normalizedURL.indexOf( '.bp.blogspot.com/' );
        };

        /**
         * 1: ?.bp.blogspot.com/.../.../.../s1600/005.png
         * 2: //lh?.googleusercontent.com/img/a/......=w176-h176-n-o
         * 3: //lh?.googleusercontent.com/.../.../.../s1600/005.png */
        function getGooglePhotoGeneration( normalizedURL ){
            return isGoogleUserContent( normalizedURL )
                    ? ( 0 < normalizedURL.indexOf( '/img/a/' ) ? 2 : 3 )
                    : ( isLegacyGoogleUserContent( normalizedURL ) ? 1 : 0 );
        };

        /**
         * @param {string} hexString 
         * @return {number} */
        function hexToUINT( hexString ){
            return parseInt( '0x' + hexString, 16 );
        };

        /**
         * @param {number} uint
         * @return {string} */
        function uintToColorString( uint ){
            if( 0xffffff < uint ){
                var color = '0' + uint.toString( 16 ).substr( 2 );
                return '0x' + color.substr( color.length - 8 );
            };
            color = '00000' + uint.toString( 16 ).substr( 2 );
            return '#' + color.substr( color.length - 6 );
        };

        /**
         * @constructor
         * @param {string} url
         */
        function Builder( url ){
            /**
             * @param {string} command
             * @return {Array | void} */
            function getCommandDifinition( command ){
                for( var j = 0; j < COMMAND_DIFINITIONS.length; j += 4 ){
                    if( COMMAND_DIFINITIONS[ j ] === command ){
                        return [ COMMAND_DIFINITIONS[ j ], COMMAND_DIFINITIONS[ j + 1 ], COMMAND_DIFINITIONS[ j + 2 ], COMMAND_DIFINITIONS[ j + 3 ] ];
                    };
                };
            };

            /**
             * #rgb
             * 0xrrggbb
             * 0xaarrggbb
             * @param {string} str
             * @return {boolean} */
            function isColorString( str ){
                var len = str.length;

                if( str.charAt( 0 ) === '#' ){
                    return len === 7;
                } else if( str.substr( 0, 2 ) === '0x' ){
                    return len === 8 || len === 10;
                };
                return false;
            };

            /**
             * @param {string} str 
             * @return {number} */
            function colorStringToUINT( str ){
                if( str.charAt( 0 ) === '#' ){
                    return hexToUINT( str.substr( 1, 2 ) ) * 0xffff +
                           hexToUINT( str.substr( 3, 2 ) ) * 0xff +
                           hexToUINT( str.substr( 5, 2 ) );
                } else if( str.length === 8 ){
                    return hexToUINT( str.substr( 2, 2 ) ) * 0xffff +
                           hexToUINT( str.substr( 4, 2 ) ) * 0xff +
                           hexToUINT( str.substr( 6, 2 ) );
                };
                return hexToUINT( str.substr( 2, 2 ) ) * 0xffffff +
                       hexToUINT( str.substr( 4, 2 ) ) * 0xffff +
                       hexToUINT( str.substr( 6, 2 ) ) * 0xff +
                       hexToUINT( str.substr( 8, 2 ) );
            };

            /**
             * @param {string} param 
             * @param {Builder | null} instance 
             * @return {boolean | void} */
            function initializeParam( param, instance ){
                var i = 0, valid, commandLength, commandDifinition,
                    originalValue, dataType, value;

                for( ; commandLength = [ 8, 4, 3, 2, 1 ][ i ]; ++i ){
                    commandDifinition = getCommandDifinition( param.substr( 0, commandLength ) );
                    if( commandDifinition ){
                        originalValue = param.substr( commandLength );
                        dataType = commandDifinition[ 1 ];
                        if( dataType & GooglePhotoURL.DataTypes.BOOLEAN ){
                            if( !originalValue ){
                                value = true;
                                valid = true;
                            };
                        };
                        if( dataType & GooglePhotoURL.DataTypes.NUMBER && !valid ){
                            value = parseFloat( originalValue );
                            if( 0 <= value ){
                                valid = true;
                            };
                        };
                        if( dataType & GooglePhotoURL.DataTypes.UINT && !valid ){
                            value = parseInt( originalValue, 10 );
                            if( 0 <= value ){
                                valid = true;
                            };
                        };
                        if( dataType & GooglePhotoURL.DataTypes.COLOR && !valid ){
                            if( isColorString( originalValue ) ){
                                value = colorStringToUINT( originalValue );
                                valid = true;
                            };
                        };
                        if( dataType & GooglePhotoURL.DataTypes.PERCENT && !valid ){
                            value = parseFloat( originalValue );
                            if( 0 <= value && value <= 100 ){
                                valid = true;
                            };
                        };
                        if( dataType & GooglePhotoURL.DataTypes.STRING && !valid ){
                            if( originalValue ){
                                value = originalValue;
                                valid = true;
                            };
                        };
                        if( valid ){
                            if( instance ){
                                commandDifinition[ 2 ]( this, value );
                            };
                            return valid;
                        };
                    };
                };
            };

            function validateParam( param ){
                return initializeParam( param, null );
            };

            var urlElems      = url.split( '?' );
            var normalizedURL = urlElems[ 0 ];
            var searchParams  = urlElems[ 1 ];
            var params;

            switch( getGooglePhotoGeneration( normalizedURL ) ){
                case 2 :
                    urlElems      = normalizedURL.split( '=' );
                    normalizedURL = urlElems[ 0 ];
                    params        = 1 < urlElems.length ? urlElems.pop() : '';
                    break;
                case 3 :
                case 1 :
                    urlElems = normalizedURL.split( '/' );
                    if( params = urlElems[ urlElems.length - 2 ] ){
                        if( params.indexOf( '-' ) === -1 && !validateParam( params ) ){
                            params = '';
                        } else {
                            urlElems.splice( urlElems.length - 2, 1 );
                            normalizedURL = urlElems.join( '/' );
                        };
                    };
                    break;
                default :
                    if( GooglePhotoURL.DEFINE.DEBUG ){
                        throw 'Not Google Photo URL:' + url;
                    };
            };

            this._normalizedURL = normalizedURL;
            this._searchParams  = searchParams;
            this._upscaling     = true;
            this._mixRatio      = 0;
            this._maxAge        = 30;

            if( params ){
                currentColor = currentBackgroundColor = currentPaddingColor = undefined;

                params = params.split( '-' );
                while( params.length ){
                    initializeParam( params.shift(), this );
                };
            };
        };

        /** @return {string} */
        Builder.prototype.getURL = function(){
            var normalizedURL = this._normalizedURL,
                params = '', j = 3, param, urlElems;

            backgroundColorRequired = false;

            for( ; j < COMMAND_DIFINITIONS.length; j += 4 ){
                param = COMMAND_DIFINITIONS[ j ]( this );
                if( param ){
                    params += '-' + param;
                };
            };
            params = params.substr( 1 );

            if( backgroundColorRequired && 0 <= this._backgroundColor ){
                params = 'bc' + uintToColorString( this._backgroundColor ) + '-' + params;
            };

            if( params ){
                if( getGooglePhotoGeneration( normalizedURL ) === 2 ){
                    normalizedURL += '=' + params;
                } else {
                    urlElems = normalizedURL.split( '/' );
                    urlElems.splice( urlElems.length - 2, 0, params );
                    normalizedURL = urlElems.join( '/' );
                };
            };
            return normalizedURL + ( this._searchParams ? '?' + this._searchParams : '' );
        };

        /** @return {string} */
        Builder.prototype.getURLWithoutParams = function(){
            return this._normalizedURL + ( this._searchParams ? '?' + this._searchParams : '' );
        };

    /**------------------------------------------------------------------------
     *
     *  1. Resizing
     */
        /** @return {number} */
        Builder.prototype.getWidth = function(){
            return this._width;
        };

        /** @param {number} width */
        Builder.prototype.setWidth = function( width ){
            this._width = width;
        };

        /** @return {number} */
        Builder.prototype.getHeight = function(){
            return this._height;
        };

        /** @param {number} height */
        Builder.prototype.setHeight = function( height ){
            this._height = height;
        };

        /** @return {number} size */
        Builder.prototype.getSize = function(){
            return this._width === this._height ? this._width : 0;
        };

        /** @param {number} size */
        Builder.prototype.setSize = function( size ){
            this._width = this._height = size;
        };

        /**
         * nu: No Upscaling of files smaller than requested.
         * @return {boolean} */
        Builder.prototype.getUpscaling = function(){
            return this._upscaling;
        };

        /** @param {boolean} upscaling */
        Builder.prototype.setUpscaling = function( upscaling ){
            this._upscaling = upscaling;
        };

        /**
         * s: Force the scaling, ignoring the aspect ratio. Requires both w and h to be explicitly set. ignores nu.
         * @return {boolean} */
        Builder.prototype.getIgoringAspectRatio = function(){
            return this._ingoringAspectRatio;
        };

        /** @param {boolean} ingoringAspectRatio */
        Builder.prototype.setIgoringAspectRatio = function( ingoringAspectRatio ){
            this._ingoringAspectRatio = ingoringAspectRatio;
            if( ingoringAspectRatio ){
                this._upscaling = true;
            };
        };

    /**------------------------------------------------------------------------
     *
     *  2. Cropping
     */
        /**
         * c: crop the image
         * @return {boolean} */
        Builder.prototype.getCropping = function(){
            return this._cropping;
        };

        /** @param {boolean} cropping */
        Builder.prototype.setCropping = function( cropping ){
            this._cropping = cropping;
            if( !cropping ){
                this._croppingToCircular = false;
            };
        };

        /**
         * cc: circular mask applied over the crop. see also bc# background color option below.
         * @return {boolean} */
        Builder.prototype.getCroppingToCircular = function(){
            return this._croppingToCircular;
        };

        /** @param {boolean} croppingToCircular */
        Builder.prototype.setCroppingToCircular = function( croppingToCircular ){
            this._cropping = this._croppingToCircular = croppingToCircular;
        };

        /**
         * p: crop with a different focus
         * pf:
         * pp:
         * n:
         * @return {boolean} */
        Builder.prototype.getCroppingDifferentFocus = function(){
            return this._croppingDifferentFocus;
        };

        /** @param {boolean} croppingDifferentFocus */
        Builder.prototype.setCroppingDifferentFocus = function( croppingDifferentFocus ){
            this._croppingDifferentFocus = croppingDifferentFocus;
        };

        /** @return {boolean} */
        Builder.prototype.isFreeCropping = function(){
            return !( 0 <= this._croppingLeft && this._croppingLeft < this._croppingRight  && this._croppingRight  <= 100 &&
                      0 <= this._croppingTop  && this._croppingTop  < this._croppingBottom && this._croppingBottom <= 100 )
        };

        /**
         * fcrop64=1,aaaabbbbccccdddd
         *   free crop. Each block specifies the position of one border (a = left, b = top, c = right, d = bottom).
         *   Each hexadecimal value is calculated according to this formula pos = 0xYYYY / 0xFFFF or 0xYYYY = pos * 0xFFFF
         *   where 0xYYYY is the hexadecimal value we're looking for and pos is the distance from the top left corner in
         *   percent. For instance, fcrop64=1,00008000ffffffff would give you the bottom half of the picture.
         * @return {Array.<number>}
         */
        Builder.prototype.getFreeCropping = function(){
            return this.isFreeCropping() ? [ this._croppingLeft, this._croppingTop, this._croppingRight, this._croppingBottom ] : null;
        };

        /**
         * @param {number} left %
         * @param {number} top %
         * @param {number} right %
         * @param {number} bottom %
         */
        Builder.prototype.setFreeCropping = function( left, top, right, bottom ){
            if( GooglePhotoURL.DEFINE.DEBUG ){
                if( !( 0 <= left && left <= right  && right  <= 100 &&
                       0 <= top  && top  <= bottom && bottom <= 100 )
                ){
                    throw '[setFreeCropping] Invalid value.' + left + ' ' + top + ' ' + right + ' ' + bottom;
                };
            };
            this._croppingLeft   = left;
            this._croppingTop    = top;
            this._croppingRight  = right;
            this._croppingBottom = bottom;

            this.setCropping( 0 < left + top || right + bottom < 200 );
        };

    /**------------------------------------------------------------------------
     *
     *  3. Editing
     */
        /**
         * fh: flip horizontally
         * @return {boolean} */
        Builder.prototype.getFlippingHorizontally = function(){
            return this._flippingHorizontally;
        };

        /** @param {boolean} flippingHorizontally */
        Builder.prototype.setFlippingHorizontally = function( flippingHorizontally ){
            this._flippingHorizontally = flippingHorizontally;
        };

        /**
         * fv: flip vertically
         * @return {boolean} */
        Builder.prototype.getFlippingVertically = function(){
            return this._flippingVertically;
        };

        /** @param {boolean} flippingVertically */
        Builder.prototype.setFlippingVertically = function( flippingVertically ){
            this._flippingVertically = flippingVertically;
        };

        /**
         * r#: rotate by # degrees (must be one of the following: 90, 180, 270)
         * @return {number} */
        Builder.prototype.getRotation = function(){
            return this._rotation;
        };

        /** @param {number} rotation */
        Builder.prototype.setRotation = function( rotation ){
            if( GooglePhotoURL.DEFINE.DEBUG ){
                if( rotation % 90 !== 0 || rotation < 0 || 270 < rotation ){
                    throw '[setRotation] Invalid value.' + rotation;
                };
            };
            this._rotation = rotation;
        };

        /**
         * ba#: adds a little symbol to the bottom right corner (stars, a checkmark, etc). valid range: 0 to 11
         * @return {number} */
        Builder.prototype.getBadge = function(){
            return this._badge;
        };

        /** @param {number} badge 0 to 11 */
        Builder.prototype.setBadge = function( badge ){
            if( GooglePhotoURL.DEFINE.DEBUG ){
                if( !( 0 <= badge && badge <= 11 ) ){
                    throw '[setBadge] Invalid value.' + badge;
                };
            };
            this._badge = badge;
        };

        /**
         * b#: adds a border of #px width in c# color. Does not play well together with other editing parameters.
         * 
         * @return {number} */
        Builder.prototype.getBorderWidth = function(){
            return this._borderWidth;
        };

        /**
         * @param {number} borderWidth 
         * @param {number=} opt_borderColor */
        Builder.prototype.setBorderWidth = function( borderWidth, opt_borderColor ){
            this._borderWidth = borderWidth;
            if( 0 <= opt_borderColor ){
                this._borderColor = opt_borderColor;
            };
        };

        /** @return {number} */
        Builder.prototype.getBorderColor = function(){
            return this._borderColor;
        };

        /**
         * @param {number} borderColor */
        Builder.prototype.setBorderColor = function( borderColor ){
            this._borderColor = borderColor;
        };

        /**
         * br#: border radius of #px. (can be used without specifying a border.) see also bc# background color option below.
         * 
         * @return {number} */
        Builder.prototype.getBorderRadius = function(){
            return this._borderRadius;
        };

        /**
         * @param {number} borderRadius 
         * @param {number=} opt_backgroundColor */
        Builder.prototype.setBorderRadius = function( borderRadius, opt_backgroundColor ){
            this._borderRadius = borderRadius;
            if( 0 <= opt_backgroundColor ){
                this._backgroundColor = opt_backgroundColor;
            };
        };

        /** @return {number} */
        Builder.prototype.getBackgroundColor = function(){
            return this._backgroundColor;
        };

        /**
         * @param {number} backgroundColor */
        Builder.prototype.setBackgroundColor = function( backgroundColor ){
            this._backgroundColor = backgroundColor;
        };

        /**
         * pd(#): pads the image to the given size using pc# color
         * @return {number} */
        Builder.prototype.getPadding = function(){
            return this._padding;
        };

        /**
         * @param {number} padding 
         * @param {number=} opt_paddingColor */
        Builder.prototype.setPadding = function( padding, opt_paddingColor ){
            this._padding = padding;
            if( 0 <= opt_paddingColor ){
                this._paddingColor = opt_paddingColor;
            };
        };

        /**
         * pc(#): set the background color for padded images. If not set, falls back to c#, or black.
         *        Accepts hex input: bc0xrrggbb or bc0xaarrggbb (defaults to transparent)
         * @return {number} */
        Builder.prototype.getPaddingColor = function(){
            return this._paddingColor;
        };

        /**
         * @param {number} paddingColor */
        Builder.prototype.setPaddingColor = function( paddingColor ){
            this._paddingColor = paddingColor;
        };

        /**
         * fSoften=a,b,c: blurs the image, mixed with the non-blurred image. Parameter a doesn't seem to make any difference,
         *                b specifies the blurring amount and c the mix with 0 being all blurred and 100 being the original image
         * @return {number} */
        Builder.prototype.getBlur = function(){
            return this._blurringAmount;
        };

        /**
         * @param {number} blurringAmount
         * @param {number=} opt_mixRatio */
        Builder.prototype.setBlur = function( blurringAmount, opt_mixRatio ){
            this._blurringAmount = blurringAmount;
            if( 0 <= opt_mixRatio ){
                this.setMixRatio( opt_mixRatio );
            };
        };

        /** @return {number} */
        Builder.prototype.getMixRatio = function(){
            return this._mixRatio;
        };

        /**
         * @param {number} mixRatio */
        Builder.prototype.setMixRatio = function( mixRatio ){
            if( GooglePhotoURL.DEFINE.DEBUG ){
                if( !( 0 <= mixRatio && mixRatio <= 100 ) ){
                    throw '[setMixRatio] Invalid value. opt_mixRatio=' + mixRatio;
                };
            };
            this._mixRatio = mixRatio;
        };

    /**------------------------------------------------------------------------
     *
     *  4. Output Formats
     */
        /**
         * rj:  forces JPEG output. Does not support transparency. Also see bc# background color above.
         * rp:  forces PNG output. (Animated PNG not supported.)
         * rw:  forces WebP output. Does support transparency and animation.
         * rwa: forces animated WebP output on animated input.
         * rg:  forces GIF output.
         * rh:  forces MP4 output. (Intented for GIF conversion.) Does not support transparency. Also see bc# background color above.
         * nw:  No WebP. Disables WebP output even if requested with rw. Falls back to the original format.
         * 
         * @return {number} GooglePhotoURL.FileFormats */
        Builder.prototype.getFileFormat = function(){
            return this._fileFormat;
        };

        /**
         * @param {number} fileFormat GooglePhotoURL.FileFormats
         * @param {number=} opt_backgroundColor */
        Builder.prototype.setFileFormat = function( fileFormat, opt_backgroundColor ){
            if( GooglePhotoURL.DEFINE.DEBUG ){
                if( !( GooglePhotoURL.FileFormats.ORIGINAL <= fileFormat && fileFormat <= GooglePhotoURL.FileFormats.MP4 && fileFormat !== undefined ) ){
                    throw '[setFileFormat] Invalid value. fileFormat=' + fileFormat;
                };
            };
            this._fileFormat = fileFormat;
            if( 0 <= opt_backgroundColor ){
                this._backgroundColor = opt_backgroundColor;
            };
        };

        /**
         * h: HTML output. A simple html file with a single image element the image as specified (adds ft parameter).
         * @return {boolean} */
        Builder.prototype.getHTMLOutputEnabled = function(){
            return this._htmlOutputEnabled;
        };

        /** @param {boolean} htmlOutputEnabled */
        Builder.prototype.setHTMLOutputEnabled = function( htmlOutputEnabled ){
            this._htmlOutputEnabled = htmlOutputEnabled;
        };

        /**
         * ft: Apply lossless compression. Doesn't matter for most cases, as it's automatically applied when the image is processed.
         * ng: probably like ft above, just not quite as efficient.
         *
         * @return {boolean} */
        Builder.prototype.getLosslessCompressionEnabled = function(){
            return this._losslessCompressioEnabled;
        };

        /** @param {boolean} losslessCompressioEnabled */
        Builder.prototype.setLoselessCompressioEnabled = function( losslessCompressioEnabled ){
            this._losslessCompressioEnabled = losslessCompressioEnabled;
        };

        /**
         * lo: force lossy conversion. Only really useful for webp output, because webp supports both, lossy and lossless modes,
         *     and will default to the lossless one for PNG input, ignoring l#.
         *
         * @return {boolean} */
        Builder.prototype.getForcingLosslessCompressionEnabled = function(){
            return this._forcingLoselessCompressioEnabled;
        };

        /** @param {boolean} forcingLoselessCompressioEnabled */
        Builder.prototype.setForcingLosslessCompressionEnabled = function( forcingLoselessCompressioEnabled ){
            this._forcingLoselessCompressioEnabled = forcingLoselessCompressioEnabled;
        };

        /**
         * l#: force lossy conversion. Only really useful for webp output, because webp supports both, lossy and lossless modes,
         *     and will default to the lossless one for PNG input, ignoring l#.
         * v#: also sets the compressions level. # is much more limited, but it seems to automatically apply lo aswell.
         *     v0 is the original image quality. v1 equals l60. v2 equals l40. v3 and above equal l20. Only works
         *     if an output format is explicitly set.
         *
         * @return {number} */
        Builder.prototype.getCompressionLevel = function(){
            return this._compressioLevel;
        };

        /** @param {number} compressioLevel */
        Builder.prototype.setCompressioLevel = function( compressioLevel ){
            this._compressioLevel = compressioLevel;
        };

    /**------------------------------------------------------------------------
     *
     *  5. Video Specific
     */

    /**------------------------------------------------------------------------
     *
     *  6. Various
     */
        /**
         * e#: How long the file may be cached by the browser. Number is max-age in days.
         *
         * @return {number} */
        Builder.prototype.getMaxAge = function(){
            return this._maxAge;
        };

        /** @param {number} maxAge */
        Builder.prototype.setMaxAge = function( maxAge ){
            this._maxAge = maxAge;
        };

        /**
         * ip: Do not strip meta data
         *
         * @return {boolean} */
        Builder.prototype.getMetadataEnabled = function(){
            return this._metadataEnabled;
        };

        /** @param {boolean} metadataEnabled */
        Builder.prototype.setMetadataEnabled = function( metadataEnabled ){
            this._metadataEnabled = metadataEnabled;
        };

    /**------------------------------------------------------------------------
     *
     *  7. Unsorted
     */
    }
);
