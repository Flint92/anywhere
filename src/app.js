const http = require('http');
const chalk = require('chalk');
const {hostname, port} = require('./config/default-config');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello, World!</h1>');
});

server.listen(port, hostname, err => {
  if (err) {
    throw err;
  }
  const addr = `http://${hostname}:${port}`;
  console.info(`Server is running on ${chalk.green(addr)}`)
});
