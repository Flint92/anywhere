const path = require('path');
const fs = require('fs');
const mimetype = require('./mime');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const {root} = require('../config/default-config');

const buildUl = function (url, files) {
  let content = '<ul>';
  files.forEach(file => {
    const href = path.join(url, file);
    content += '<li><a href=' + href + ' />' + file + '</li>';
  });
  content += '</ul>';

  return content;
};

module.exports = async function(req, res) {
  const url = req.url;
  const file_path = path.join(root, url);

  try {
    const stats = await stat(file_path);

    if (stats.isFile()) {
      res.statusCode = 200;
      res.setHeader('Content-Type', mimetype(file_path));
      fs.createReadStream(file_path).pipe(res);
    }
    else if (stats.isDirectory()) {
      const files = await readdir(file_path);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(buildUl(url, files));
    }

  }
  catch (error) {
    console.error(error);

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`${url} is not found!`);
  }
};
