/*global module:false*/
module.exports = {
  icons: {
      src: '_sources/icons/*.svg',
      dest: 'media/fonts/',
      destCss: 'styles/',
      options: {
        engine: 'node',
        autoHint: false,
        cssFile: '_icons',
        font: 'icons',
        hashes: false,
        htmlDemo: false,
        skip: require('os').platform() === 'win32',
        stylesheet: 'styl',
        template: '_sources/templates/icons.css',
        templateOptions: {
          "baseClass": "",
          "classPrefix": "",
          "prefix": "icon-",
          "mixinPrefix": ""
        },
        types: 'woff'
      }
    }
};
