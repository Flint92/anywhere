const http = require('http');
const chalk = require('chalk');

const {
  hostname,
  port
} = require('./config/default-config');
const route = require('./helper/route');

const server = http.createServer((req, res) => {
  route(req, res);
});

server.listen(port, hostname, err => {
  if (err) {
    throw err;
  }
  const addr = `http://${hostname}:${port}`;
  console.info(`Server is running on ${chalk.green(addr)}`);
});
