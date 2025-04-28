var goog = goog || {};
goog.provide = function(a) {
};
goog.require = function(a) {
};
goog.scope = function(a) {
};
goog.define = function(a, b) {
};
var GooglePhotoURL = {FileFormats:{ORIGINAL:0, JPEG:1, PNG:2, WEBP:3, ANIMATED_WEBP:4, GIF:5, MP4:6}, OriginalFileFormats:{UNKNOWN:0, JPEG:1, PNG:2, WEBP:3, GIF:5, MP4:6}, DataTypes:{BOOLEAN:1, UINT:2, COLOR:4, PERCENT:8, STRING:16}, DEFINE:{}};
GooglePhotoURL.DEFINE.DEBUG = !0;
var $jscomp$scope$m464985988$10$Builder = function(a) {
  function b(p, q) {
    for (var r = 0, g, l, f, d, h; g = [8, 4, 3, 2, 1][r]; ++r) {
      a: {
        l = p.substr(0, g);
        for (f = 0; f < $jscomp$scope$m464985988$4$COMMAND_DIFINITIONS.length; f += 4) {
          if ($jscomp$scope$m464985988$4$COMMAND_DIFINITIONS[f] === l) {
            l = [$jscomp$scope$m464985988$4$COMMAND_DIFINITIONS[f], $jscomp$scope$m464985988$4$COMMAND_DIFINITIONS[f + 1], $jscomp$scope$m464985988$4$COMMAND_DIFINITIONS[f + 2], $jscomp$scope$m464985988$4$COMMAND_DIFINITIONS[f + 3]];
            break a;
          }
        }
        l = void 0;
      }
      if (l) {
        g = p.substr(g);
        f = l[1];
        f & GooglePhotoURL.DataTypes.BOOLEAN && !g && (h = d = !0);
        f & GooglePhotoURL.DataTypes.UINT && !h && (d = parseInt(g, 10), 0 <= d && (h = !0));
        if (f & GooglePhotoURL.DataTypes.COLOR && !h) {
          var m = g;
          var n = m.length;
          m = "#" === m.charAt(0) ? 7 === n : "0x" === m.substr(0, 2) ? 8 === n || 10 === n : !1;
          m && (d = g, d = "#" === d.charAt(0) ? 65535 * $jscomp$scope$m464985988$8$hexToUINT(d.substr(1, 2)) + 255 * $jscomp$scope$m464985988$8$hexToUINT(d.substr(3, 2)) + $jscomp$scope$m464985988$8$hexToUINT(d.substr(5, 2)) : 8 === d.length ? 65535 * $jscomp$scope$m464985988$8$hexToUINT(d.substr(2, 2)) + 255 * $jscomp$scope$m464985988$8$hexToUINT(d.substr(4, 2)) + $jscomp$scope$m464985988$8$hexToUINT(d.substr(6, 2)) : 16777215 * $jscomp$scope$m464985988$8$hexToUINT(d.substr(2, 2)) + 65535 * $jscomp$scope$m464985988$8$hexToUINT(d.substr(4, 
          2)) + 255 * $jscomp$scope$m464985988$8$hexToUINT(d.substr(6, 2)) + $jscomp$scope$m464985988$8$hexToUINT(d.substr(8, 2)), h = !0);
        }
        f & GooglePhotoURL.DataTypes.PERCENT && !h && (d = parseInt(g, 10), 0 <= d && 100 >= d && (h = !0));
        f & GooglePhotoURL.DataTypes.STRING && !h && g && (d = g, h = !0);
        if (h) {
          if (q) {
            l[2](q, d);
          }
          return h;
        }
      }
    }
  }
  var c = a.split("?"), e = c[0], t = c[1];
  switch($jscomp$scope$m464985988$7$getGooglePhotoGeneration(e)) {
    case 2:
      c = e.split("=");
      e = c[0];
      var k = 1 < c.length ? c.pop() : "";
      break;
    case 3:
    case 1:
      c = e.split("/");
      if (k = c[c.length - 2]) {
        -1 !== k.indexOf("-") || b(k, null) ? (c.splice(c.length - 2, 1), e = c.join("/")) : k = "";
      }
      break;
    default:
      if (GooglePhotoURL.DEFINE.DEBUG) {
        throw "Not Google Photo URL:" + a;
      }
  }
  this._baseURL = e;
  this._searchParams = t;
  this._upscaling = !0;
  this._mixRatio = 0;
  if (k) {
    for ($jscomp$scope$m464985988$0$currentColor = $jscomp$scope$m464985988$1$currentBackgroundColor = $jscomp$scope$m464985988$2$currentPaddingColor = void 0, k = k.split("-"); k.length;) {
      b(k.shift(), this);
    }
  }
}, $jscomp$scope$m464985988$9$uintToColorString = function(a) {
  if (16777215 < a) {
    return a = "0" + a.toString(16).substr(2), "0x" + a.substr(a.length - 8);
  }
  a = "00000" + a.toString(16).substr(2);
  return "0x" + a.substr(a.length - 6);
}, $jscomp$scope$m464985988$8$hexToUINT = function(a) {
  return parseInt("0x" + a, 16);
}, $jscomp$scope$m464985988$7$getGooglePhotoGeneration = function(a) {
  return $jscomp$scope$m464985988$5$isGoogleUserContent(a) ? 0 < a.indexOf("/img/a/") ? 2 : 3 : $jscomp$scope$m464985988$6$isLegacyGoogleUserContent(a) ? 1 : 0;
}, $jscomp$scope$m464985988$6$isLegacyGoogleUserContent = function(a) {
  return 0 < a.indexOf(".bp.blogspot.com/");
}, $jscomp$scope$m464985988$5$isGoogleUserContent = function(a) {
  return 0 < a.indexOf("blogger.googleusercontent.com/img/");
};
GooglePhotoURL.Builder = $jscomp$scope$m464985988$10$Builder;
GooglePhotoURL.isGooglePhotoURL = function(a) {
  return !!$jscomp$scope$m464985988$7$getGooglePhotoGeneration(a);
};
var $jscomp$scope$m464985988$0$currentColor, $jscomp$scope$m464985988$1$currentBackgroundColor, $jscomp$scope$m464985988$2$currentPaddingColor, $jscomp$scope$m464985988$3$backgroundColorRequired, $jscomp$scope$m464985988$4$COMMAND_DIFINITIONS = ["w", GooglePhotoURL.DataTypes.UINT, function(a, b) {
  a.setWidth(b);
}, function(a) {
  if (0 <= a._width && a._width !== a._height) {
    return "w" + a._width;
  }
}, "h", GooglePhotoURL.DataTypes.BOOLEAN | GooglePhotoURL.DataTypes.UINT, function(a, b) {
  !0 === b ? a.setHTMLOutputEnabled(!0) : a.setHeight(b);
}, function(a) {
  var b = [];
  0 <= a._height && a._width !== a._height && b.push("h" + a._height);
  a._htmlOutputEnabled && b.push("h");
  return b.join("-");
}, "s", GooglePhotoURL.DataTypes.BOOLEAN | GooglePhotoURL.DataTypes.UINT, function(a, b) {
  !0 === b ? a.setIgoringAspectRatio(!0) : a.setSize(b);
}, function(a) {
  var b = [];
  0 <= a._width && a._width === a._height && b.push("s" + a._width);
  if (a._ingoringAspectRatio) {
    if (GooglePhotoURL.DEFINE.DEBUG && !(0 < a._width && 0 < a._height)) {
      throw "Ignoring the aspect ratio requires both w and h to be explicitly set.";
    }
    b.push("s");
  }
  return b.join("-");
}, "nu", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setUpscaling(!1);
}, function(a) {
  if (!a._upscaling) {
    return "nu";
  }
}, "c", GooglePhotoURL.DataTypes.BOOLEAN | GooglePhotoURL.DataTypes.COLOR, function(a, b) {
  !0 === b ? a.setCropping(!0) : $jscomp$scope$m464985988$0$currentColor = b;
}, function(a) {
  if (a._cropping && !a.isFreeCropping()) {
    return "c";
  }
}, "cc", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setCroppingToCircular(!0);
}, function(a) {
  if (a._croppingToCircular) {
    return "cc";
  }
}, "p", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setSmartCroppingEnabled(!0);
}, function(a) {
  if (a._smartCroppingEnabled && a._cropping) {
    return "p";
  }
}, "fcrop64=", GooglePhotoURL.DataTypes.STRING, function(a, b) {
  a.setFreeCropping($jscomp$scope$m464985988$8$hexToUINT(b.substr(2, 4)) / 65535 * 100, $jscomp$scope$m464985988$8$hexToUINT(b.substr(6, 4)) / 65535 * 100, $jscomp$scope$m464985988$8$hexToUINT(b.substr(10, 4)) / 65535 * 100, $jscomp$scope$m464985988$8$hexToUINT(b.substr(14, 4)) / 65535 * 100);
}, function(a) {
  function b(c) {
    c = "000" + (c / 1000 * 65535 | 0).toString(16).substr(2);
    return c.substr(c.length - 4);
  }
  if (a.isFreeCropping()) {
    return "fcrop64=1," + b(a._croppingLeft) + b(a._croppingTop) + b(a._croppingRight) + b(a._croppingBottom);
  }
}, "fh", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setFlippingHorizontally(!0);
}, function(a) {
  if (a._flippingHorizontally) {
    return "fh";
  }
}, "fv", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setFlippingVertically(!0);
}, function(a) {
  if (a._flippingVertically) {
    return "fv";
  }
}, "r", GooglePhotoURL.DataTypes.UINT, function(a, b) {
  a.setRotation(b);
}, function(a) {
  if (0 < a._rotation) {
    return "r" + a._rotation;
  }
}, "ba", GooglePhotoURL.DataTypes.UINT, function(a, b) {
  a.setBadge(b);
}, function(a) {
  if (0 <= a._badge) {
    return "ba" + a._badge;
  }
}, "b", GooglePhotoURL.DataTypes.UINT, function(a, b) {
  a.setBorderWidth(b, $jscomp$scope$m464985988$0$currentColor);
}, function(a) {
  if (0 < a._borderWidth) {
    return (0 <= a._borderColor ? "c" + $jscomp$scope$m464985988$9$uintToColorString(a._borderColor) + "-" : "") + "b" + a._borderWidth;
  }
}, "br", GooglePhotoURL.DataTypes.UINT, function(a, b) {
  a.setBorderRadius(b, $jscomp$scope$m464985988$1$currentBackgroundColor || $jscomp$scope$m464985988$0$currentColor);
}, function(a) {
  if (0 < a._borderRadius) {
    return $jscomp$scope$m464985988$3$backgroundColorRequired = !0, "br" + a._borderRadius;
  }
}, "bc", GooglePhotoURL.DataTypes.COLOR, function(a, b) {
  a._backgroundColor = $jscomp$scope$m464985988$1$currentBackgroundColor = b;
}, !1, "pd", GooglePhotoURL.DataTypes.UINT, function(a, b) {
  a.setPadding(b, $jscomp$scope$m464985988$2$currentPaddingColor || $jscomp$scope$m464985988$0$currentColor);
}, function(a) {
  if (0 < a._padding) {
    return (0 <= a._paddingColor ? "pc" + $jscomp$scope$m464985988$9$uintToColorString(a._paddingColor) + "-" : "") + "pd" + a._padding;
  }
}, "pc", GooglePhotoURL.DataTypes.COLOR, function(a, b) {
  $jscomp$scope$m464985988$2$currentPaddingColor = b;
}, !1, "fSoften=", GooglePhotoURL.DataTypes.STRING, function(a, b) {
  var c = b.split(",");
  a.setBlur(Number(c[1]), Number(c[2]));
}, function(a) {
  if (0 < a._blurringAmount) {
    return "fSoften=0," + a._blurringAmount + "," + a._mixRatio;
  }
}, "rj", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setFileFormat(GooglePhotoURL.FileFormats.JPEG);
}, function(a) {
  if (a._fileFormat === GooglePhotoURL.FileFormats.JPEG) {
    return $jscomp$scope$m464985988$3$backgroundColorRequired = !0, "rj";
  }
}, "rp", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setFileFormat(GooglePhotoURL.FileFormats.PNG);
}, function(a) {
  if (a._fileFormat === GooglePhotoURL.FileFormats.PNG) {
    return "rp";
  }
}, "rw", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setFileFormat(GooglePhotoURL.FileFormats.WEBP);
}, function(a) {
  if (a._fileFormat === GooglePhotoURL.FileFormats.WEBP) {
    return "rw";
  }
}, "rwa", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setFileFormat(GooglePhotoURL.FileFormats.ANIMATED_WEBP);
}, function(a) {
  if (a._fileFormat === GooglePhotoURL.FileFormats.ANIMATED_WEBP) {
    return "rwa";
  }
}, "rg", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setFileFormat(GooglePhotoURL.FileFormats.GIF);
}, function(a) {
  if (a._fileFormat === GooglePhotoURL.FileFormats.GIF) {
    return "rg";
  }
}, "rh", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setFileFormat(GooglePhotoURL.FileFormats.MP4);
}, function(a) {
  if (a._fileFormat === GooglePhotoURL.FileFormats.MP4) {
    return $jscomp$scope$m464985988$3$backgroundColorRequired = !0, "rh";
  }
}, "nw", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setFileFormat(GooglePhotoURL.FileFormats.ORIGINAL);
}, function(a) {
  if (a._fileFormat === GooglePhotoURL.FileFormats.ORIGINAL) {
    return "nw";
  }
}, "ft", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setLoselessCompressioEnabled(!0);
}, function(a) {
  if (a._losslessCompressioEnabled) {
    return "ft";
  }
}, "lo", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setForcingLosslessCompressionEnabled(!0);
}, function(a) {
  if (a._forcingLoselessCompressioEnabled) {
    return "lo";
  }
}, "l", GooglePhotoURL.DataTypes.UINT, function(a, b) {
  a.setCompressioLevel(b);
}, function(a) {
  if (0 <= a._compressioLevel) {
    return "l" + a._compressioLevel;
  }
}, "e", GooglePhotoURL.DataTypes.UINT, function(a, b) {
  a.setMaxAge(b);
}, function(a) {
  if (0 <= a._maxAge) {
    return "e" + a._maxAge;
  }
}, "ip", GooglePhotoURL.DataTypes.BOOLEAN, function(a, b) {
  a.setMetadataEnabled(!0);
}, function(a) {
  if (a._metadataEnabled) {
    return "ip";
  }
}];
$jscomp$scope$m464985988$10$Builder.prototype.getURL = function() {
  var a = this._baseURL, b = "", c = 3, e;
  for ($jscomp$scope$m464985988$3$backgroundColorRequired = !1; c < $jscomp$scope$m464985988$4$COMMAND_DIFINITIONS.length; c += 4) {
    (e = $jscomp$scope$m464985988$4$COMMAND_DIFINITIONS[c] && $jscomp$scope$m464985988$4$COMMAND_DIFINITIONS[c](this)) && (b += "-" + e);
  }
  b = b.substr(1);
  $jscomp$scope$m464985988$3$backgroundColorRequired && 0 <= this._backgroundColor && (b = "bc" + $jscomp$scope$m464985988$9$uintToColorString(this._backgroundColor) + "-" + b);
  b && (2 === $jscomp$scope$m464985988$7$getGooglePhotoGeneration(a) ? a += "=" + b : (a = a.split("/"), a.splice(a.length - 2, 0, b), a = a.join("/")));
  return a + (this._searchParams ? "?" + this._searchParams : "");
};
$jscomp$scope$m464985988$10$Builder.prototype.getBaseURL = function() {
  return this._baseURL + (this._searchParams ? "?" + this._searchParams : "");
};
$jscomp$scope$m464985988$10$Builder.prototype.getWidth = function() {
  return this._width;
};
$jscomp$scope$m464985988$10$Builder.prototype.setWidth = function(a) {
  this._width = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getHeight = function() {
  return this._height;
};
$jscomp$scope$m464985988$10$Builder.prototype.setHeight = function(a) {
  this._height = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getSize = function() {
  return this._width === this._height ? this._width : 0;
};
$jscomp$scope$m464985988$10$Builder.prototype.setSize = function(a) {
  this._width = this._height = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getUpscaling = function() {
  return this._upscaling;
};
$jscomp$scope$m464985988$10$Builder.prototype.setUpscaling = function(a) {
  this._upscaling = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getIgoringAspectRatio = function() {
  return this._ingoringAspectRatio;
};
$jscomp$scope$m464985988$10$Builder.prototype.setIgoringAspectRatio = function(a) {
  if (this._ingoringAspectRatio = a) {
    this._upscaling = !0;
  }
};
$jscomp$scope$m464985988$10$Builder.prototype.getCropping = function() {
  return this._cropping;
};
$jscomp$scope$m464985988$10$Builder.prototype.setCropping = function(a) {
  this._cropping = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getCroppingToCircular = function() {
  return this._croppingToCircular;
};
$jscomp$scope$m464985988$10$Builder.prototype.setCroppingToCircular = function(a, b) {
  (this._croppingToCircular = a) && 0 <= b && (this._backgroundColor = b);
};
$jscomp$scope$m464985988$10$Builder.prototype.getSmartCroppingEnabled = function() {
  return this._smartCroppingEnabled;
};
$jscomp$scope$m464985988$10$Builder.prototype.setSmartCroppingEnabled = function(a) {
  this._smartCroppingEnabled = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.isFreeCropping = function() {
  return 0 <= this._croppingLeft && this._croppingLeft < this._croppingRight && 100 >= this._croppingRight && 0 <= this._croppingTop && this._croppingTop < this._croppingBottom && 100 >= this._croppingBottom;
};
$jscomp$scope$m464985988$10$Builder.prototype.getFreeCropping = function() {
  return this.isFreeCropping() ? [this._croppingLeft, this._croppingTop, this._croppingRight, this._croppingBottom] : null;
};
$jscomp$scope$m464985988$10$Builder.prototype.setFreeCropping = function(a, b, c, e) {
  if (GooglePhotoURL.DEFINE.DEBUG && !(0 <= a && a <= c && 100 >= c && 0 <= b && b <= e && 100 >= e)) {
    throw "[setFreeCropping] Invalid value." + a + " " + b + " " + c + " " + e;
  }
  this._croppingLeft = a;
  this._croppingTop = b;
  this._croppingRight = c;
  this._croppingBottom = e;
  this.setCropping(0 < a + b || 200 > c + e);
};
$jscomp$scope$m464985988$10$Builder.prototype.getFlippingHorizontally = function() {
  return this._flippingHorizontally;
};
$jscomp$scope$m464985988$10$Builder.prototype.setFlippingHorizontally = function(a) {
  this._flippingHorizontally = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getFlippingVertically = function() {
  return this._flippingVertically;
};
$jscomp$scope$m464985988$10$Builder.prototype.setFlippingVertically = function(a) {
  this._flippingVertically = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getRotation = function() {
  return this._rotation;
};
$jscomp$scope$m464985988$10$Builder.prototype.setRotation = function(a) {
  if (GooglePhotoURL.DEFINE.DEBUG && (0 !== a % 90 || 0 > a || 270 < a)) {
    throw "[setRotation] Invalid value." + a;
  }
  this._rotation = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getBadge = function() {
  return this._badge;
};
$jscomp$scope$m464985988$10$Builder.prototype.setBadge = function(a) {
  if (GooglePhotoURL.DEFINE.DEBUG && !(0 <= a && 11 >= a)) {
    throw "[setBadge] Invalid value." + a;
  }
  this._badge = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getBorderWidth = function() {
  return this._borderWidth;
};
$jscomp$scope$m464985988$10$Builder.prototype.setBorderWidth = function(a, b) {
  this._borderWidth = a;
  0 <= b && (this._borderColor = b);
};
$jscomp$scope$m464985988$10$Builder.prototype.getBorderColor = function() {
  return this._borderColor;
};
$jscomp$scope$m464985988$10$Builder.prototype.setBorderColor = function(a) {
  this._borderColor = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getBorderRadius = function() {
  return this._borderRadius;
};
$jscomp$scope$m464985988$10$Builder.prototype.setBorderRadius = function(a, b) {
  this._borderRadius = a;
  0 <= b && (this._backgroundColor = b);
};
$jscomp$scope$m464985988$10$Builder.prototype.getBackgroundColor = function() {
  return this._backgroundColor;
};
$jscomp$scope$m464985988$10$Builder.prototype.setBackgroundColor = function(a) {
  this._backgroundColor = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getPadding = function() {
  return this._padding;
};
$jscomp$scope$m464985988$10$Builder.prototype.setPadding = function(a, b) {
  this._padding = a;
  0 <= b && (this._paddingColor = b);
};
$jscomp$scope$m464985988$10$Builder.prototype.getPaddingColor = function() {
  return this._paddingColor;
};
$jscomp$scope$m464985988$10$Builder.prototype.setPaddingColor = function(a) {
  this._paddingColor = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getBlur = function() {
  return this._blurringAmount;
};
$jscomp$scope$m464985988$10$Builder.prototype.setBlur = function(a, b) {
  this._blurringAmount = a;
  0 <= b && this.setMixRatio(b);
};
$jscomp$scope$m464985988$10$Builder.prototype.getMixRatio = function() {
  return this._mixRatio;
};
$jscomp$scope$m464985988$10$Builder.prototype.setMixRatio = function(a) {
  if (GooglePhotoURL.DEFINE.DEBUG && !(0 <= a && 100 >= a)) {
    throw "[setMixRatio] Invalid value. mixRatio=" + a;
  }
  this._mixRatio = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getFileFormat = function() {
  return this._fileFormat;
};
$jscomp$scope$m464985988$10$Builder.prototype.setFileFormat = function(a, b) {
  if (GooglePhotoURL.DEFINE.DEBUG && !(GooglePhotoURL.FileFormats.ORIGINAL <= a && a <= GooglePhotoURL.FileFormats.MP4 && void 0 !== a)) {
    throw "[setFileFormat] Invalid value. fileFormat=" + a;
  }
  this._fileFormat = a;
  0 <= b && (this._backgroundColor = b);
};
$jscomp$scope$m464985988$10$Builder.prototype.getHTMLOutputEnabled = function() {
  return this._htmlOutputEnabled;
};
$jscomp$scope$m464985988$10$Builder.prototype.setHTMLOutputEnabled = function(a) {
  this._htmlOutputEnabled = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getLosslessCompressionEnabled = function() {
  return this._losslessCompressioEnabled;
};
$jscomp$scope$m464985988$10$Builder.prototype.setLoselessCompressioEnabled = function(a) {
  this._losslessCompressioEnabled = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getForcingLosslessCompressionEnabled = function() {
  return this._forcingLoselessCompressioEnabled;
};
$jscomp$scope$m464985988$10$Builder.prototype.setForcingLosslessCompressionEnabled = function(a) {
  this._forcingLoselessCompressioEnabled = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getCompressionLevel = function() {
  return this._compressioLevel;
};
$jscomp$scope$m464985988$10$Builder.prototype.setCompressioLevel = function(a) {
  this._compressioLevel = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getMaxAge = function() {
  return this._maxAge;
};
$jscomp$scope$m464985988$10$Builder.prototype.setMaxAge = function(a) {
  this._maxAge = a;
};
$jscomp$scope$m464985988$10$Builder.prototype.getMetadataEnabled = function() {
  return this._metadataEnabled;
};
$jscomp$scope$m464985988$10$Builder.prototype.setMetadataEnabled = function(a) {
  this._metadataEnabled = a;
};
var browser = {};
window.GooglePhotoURLBuilder = GooglePhotoURL.Builder;

