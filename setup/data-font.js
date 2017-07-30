
var webfont = require('webfont').default;

webfont({
  files: 'src/assets/raw/*.svg',
  cssTemplateFontPath: '../src/assets/fonts',
  fontName: 'itemicons'
}).then(result => {
  console.log(result);
});
