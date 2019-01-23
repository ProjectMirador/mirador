module.exports = {
  launch: {
    headless: process.env.HEADLESS !== 'false',
  },
  server: {
    command: 'npm run server -- -p 4488',
    port: 4488,
  },
};
