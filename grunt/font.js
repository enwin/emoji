/*global module:false*/
module.exports = {
  icons: {
    // SVG files to reed in
    src: ['_sources/icons/*.svg'],

    // Location to output CSS variables
    destCss: '_sources/font.json',

    cssFormat: 'json',

    // Location to output fonts (expanded via brace expansion)
    destFonts: 'medias/fonts/icons.woff',

    // Optional: Custom naming of font families for multi-task support
    fontFamily: 'icons'
  }
};
