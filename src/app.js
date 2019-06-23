const http = require('http');
const chalk = require('chalk');

const conf = require('./config/default-config');
const route = require('./helper/route');

class Server {

  constructor(config) {
    this.conf = Object.assign({}, conf, config);
  }

  start() {
    const server = http.createServer((req, res) => {
      route(req, res, this.conf);
    });

    server.listen(this.conf.port, this.conf.hostname, err => {
      if (err) {
        throw err;
      }
      const addr = `http://${this.conf.hostname}:${this.conf.port}`;
      console.info(`Server is running on ${chalk.green(addr)}`);
    });
  }

}

module.exports = Server;

