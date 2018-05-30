module.exports = {
  launch: {
    headless: process.env.CI === 'true',
  },
  server: {
    command: 'npm run server',
    port: 4444,
  },
};
