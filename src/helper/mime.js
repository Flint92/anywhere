const path = require('path');

const mimetypes = {
  '.png':	'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.html': 'text/html',
  '.txt': 'text/plain',
  '.json': 'application/json'
};

module.exports = function (filepath) {
  const extname = path.extname(filepath).toLowerCase();
  const mimetype = mimetypes[extname];
  return mimetype || mimetypes['.txt'];
};
