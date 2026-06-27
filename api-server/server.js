const app = require('../api/index.js');
const port = process.env.PORT || 5001;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Port ${port} is already in use. Kill the other process first:\n   lsof -ti :${port} | xargs kill\n`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});
