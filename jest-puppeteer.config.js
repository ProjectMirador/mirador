module.exports = {
  launch: {
    headless: process.env.HEADLESS !== 'false',
  },
  server: [{
    command: 'npm run server -- -p 4488',
    launchTimeout: 180000,
    port: 4488,
  }],
};
