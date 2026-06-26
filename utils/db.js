const mongoose = require('mongoose');
const dns = require('node:dns');

// Force Node.js to use Cloudflare and Google DNS for resolving SRV records on Windows
dns.setServers(['1.1.1.1', '8.8.8.8']);


const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    return true;
  }

  if (!MONGODB_URI) {
    console.warn('[Database] MONGODB_URI environment variable is missing. Running in CACHE-ONLY mode.');
    return false;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });
    isConnected = true;
    console.log('[Database] MongoDB Connected Successfully.');
    return true;
  } catch (error) {
    console.error('[Database] Connection failed:', error.message);
    return false;
  }
}

module.exports = { connectDB, mongoose };
