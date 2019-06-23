const yargs = require('yargs');
const Server = require('./app');

const argv = yargs
  .usage('anywhere [option]')
  .option('p', {
    alias: 'port',
    describe: '端口号',
    default: 3000
  })
  .option('h', {
    alias: 'hostname',
    describe: 'host',
    default: '127.0.0.1'
  })
  .option('d', {
    alias: 'root',
    describe: 'root'
  })
  .version()
  .alias('v', 'version')
  .help()
  .argv;

new Server(argv).start();
