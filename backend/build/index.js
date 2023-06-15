const Module = require('module');
const path = require('path');
const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const glob = require('glob');
// eslint-disable-next-line import/no-extraneous-dependencies
const JavaScriptObfuscator = require('javascript-obfuscator');
// eslint-disable-next-line import/no-extraneous-dependencies
const bytenode = require('bytenode');

const srcPath = path.resolve(__dirname, './../src');
const distPath = path.resolve(__dirname, './../dist');

glob.sync('**/*.js', { cwd: srcPath }).forEach((filePath) => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  const code = fs.readFileSync(path.join(srcPath, filePath), { encoding: 'utf8' });
  const obfuscatorCode = JavaScriptObfuscator.obfuscate(code).getObfuscatedCode();
  const byteCode = bytenode.compileCode(Module.wrap(obfuscatorCode));
  const newFileName = path.join(distPath, filePath).replace(/\.js$/, '.jsc');
  const newFileDirname = path.dirname(newFileName);
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  if (!fs.existsSync(newFileDirname)) {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.mkdirSync(newFileDirname, { recursive: true });
  }
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.writeFileSync(newFileName, byteCode, { encoding: 'utf8' });
});
// eslint-disable-next-line security/detect-non-literal-fs-filename
fs.writeFileSync(path.join(distPath, 'server.js'), "require('bytenode');require('./index.jsc');", { encoding: 'utf8' });
fs.writeFileSync(path.join(distPath, 'scheduler.js'), "require('bytenode');require('./scheduler.jsc');", {
  encoding: 'utf8'
});
