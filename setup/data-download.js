var download = require('download-github-repo');

const promise = new Promise(resolve => {
  download('IdleLands/Custom-Assets', '.tmp/content', () => { resolve(); });
});

promise.then(() => console.log('Done getting assets.'));
