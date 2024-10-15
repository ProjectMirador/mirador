module.exports = {
  launch: {
    // See https://chromium.googlesource.com/chromium/src/+/main/docs/security/apparmor-userns-restrictions.md
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: process.env.CHROME_BIN || 'chromium',
    headless: process.env.HEADLESS !== 'false' ? 'new' : false,
  },
  server: [{
    command: 'npm run server -- -p 4488',
    host: '127.0.0.1',
    launchTimeout: 5000,
    port: 4488,
  }],
};
