const path = require('path');
const fs = require('fs');
const mimetype = require('./mime');
const compress = require('./compress');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const {root, compressRules} = require('../config/default-config');

const buildUl = (url, files) => {
  let content = '<ul>';
  files.forEach(file => {
    const href = path.join(url, file);
    content += '<li><a href=' + href + ' />' + file + '</li>';
  });
  content += '</ul>';

  return content;
};

module.exports = async (req, res) => {
  const url = req.url;
  const filePath = path.join(root, url);

  try {
    const stats = await stat(filePath);

    if (stats.isFile()) {
      res.statusCode = 200;
      res.setHeader('Content-Type', mimetype(filePath));
      let rs = fs.createReadStream(filePath);
      if (filePath.match(compressRules)) {
        rs = compress(rs, req, res);
      }
      rs.pipe(res);

    }
    else if (stats.isDirectory()) {
      const files = await readdir(filePath);
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
