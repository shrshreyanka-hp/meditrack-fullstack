const config = require('./config/environment');
const { connectDatabase } = require('./config/db');
const app = require('./app');

async function startServer() {
  try {
    await connectDatabase(config.mongoUri);
    console.log('MongoDB connected');

    const server = app.listen(config.port, () => {
      console.log(`MediTrack API listening on http://localhost:${config.port}`);
    });

    const shutdown = async (signal) => {
      console.log(`Received ${signal}; shutting down gracefully`);
      server.close(async () => {
        const mongoose = require('mongoose');
        await mongoose.disconnect();
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error('Unable to start MediTrack API:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = { startServer };
