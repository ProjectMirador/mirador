module.exports = {
  launch: {
    headless: process.env.CI === 'true',
  },
  server: {
    command: 'npm run server -- -p 4488',
    port: 4488,
  },
};
