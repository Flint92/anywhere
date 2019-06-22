const {createGzip, createDeflate} = require('zlib');

const match = acceptEncoding => {
  return acceptEncoding.match(/\b(gzip|deflate)\b/);
};

const support_gzip = acceptEncoding => {
  return acceptEncoding.match(/\bgzip\b/);
};

module.exports = (rs, req, res) => {
  const acceptEncoding = req.headers['accept-encoding'];
  if (!acceptEncoding || !match(acceptEncoding)) {
    return rs;
  }
  if (support_gzip(acceptEncoding)) {
    res.setHeader('Content-Encoding', 'gzip');
    return rs.pipe(createGzip());
  }
  res.setHeader('Content-Encoding', 'deflate');
  return rs.pipe(createDeflate());
};
