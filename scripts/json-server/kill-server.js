const os = process.platform;
const execute = require('child_process').exec;

if (os === 'darwin') {
  console.log('darwin not supported');
} else if (os === 'win32') {
  console.log('windows not supported');
} else {
  execute('pkill -f server.js', (error, stdout, stderr) => {
    console.log(`${stdout}`);
    console.log(`${stderr}`);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });
}
