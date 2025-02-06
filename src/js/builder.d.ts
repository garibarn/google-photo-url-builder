class Bilder {
    constructor(url:string);

    getURL():string;
    getBaseURL():string;

    getWidth():number;
    setWidth(width:number);
    getHeight():number;
    setHeight(height:number);
    getSize():number;
    setSize(size:number);

    getUpscaling():boolean;
    setUpscaling(upscaling:boolean);
    getIgoringAspectRatio():boolean;
    setIgoringAspectRatio(ingoringAspectRatio:boolean);

    getCropping():boolean;
    setCropping(cropping:boolean);
    getCroppingToCircular():boolean;
    setCroppingToCircular(croppingToCircular:boolean, opt_backgroundColor?:number);
    getSmartCroppingEnabled():boolean;
    setSmartCroppingEnabled(smartCroppingEnabled:boolean);

    isFreeCropping():boolean;
    getFreeCropping():number[];
    setFreeCropping(left:number, top:number, right:number, bottom:number);

    getFlippingHorizontally():boolean;
    setFlippingHorizontally(flippingHorizontally:boolean);
    getFlippingVertically():boolean;
    setFlippingVertically(flippingVertically:boolean);
    getRotation():number;
    setRotation(rotation:number);

    getBadge():number;
    setBadge(badge:number);

    getBorderWidth():number;
    setBorderWidth(borderWidth:number, opt_borderColor?:number);
    getBorderColor():number;
    setBorderColor(borderColor:number);
    getBorderRadius():number;
    setBorderRadius(borderRadius:number, opt_backgroundColor?:number);
    getBackgroundColor():number;
    setBackgroundColor(backgroundColor:number);
    getPadding():number;
    setPadding(padding:number, opt_paddingColor?:number);
    getPaddingColor():number;
    setPaddingColor(paddingColor:number);

    getBlur():number;
    setBlur(blurringAmount:number, opt_mixRatio?:number);
    getMixRatio():number;
    setMixRatio(mixRatio:number);

    getFileFormat():number;
    setFileFormat(fileFormat:number, opt_backgroundColor?:number);
    getHTMLOutputEnabled():boolean;
    setHTMLOutputEnabled(htmlOutputEnabled:boolean);

    getLosslessCompressionEnabled():boolean;
    setLosslessCompressionEnabled(losslessCompressionEnabled:boolean);
    getForcingLosslessCompressionEnabled():boolean;
    setForcingLosslessCompressionEnabled(forcingLoselessCompressioEnabled:boolean);
    getCompressionLevel():number;
    setCompressionLevel(compressioLevel:number);

    getMaxAge():number;
    setMaxAge(maxAge:number);
    getMetadataEnabled():boolean;
    setMetadataEnabled(metadataEnabled:boolean);
}