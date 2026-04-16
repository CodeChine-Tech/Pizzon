const mongoose = require('mongoose');

const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smartpizza';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  try {
    const connection = await mongoose.connect(MONGO_URI);
    if (!global.mongoose) {
      global.mongoose = connection;
    }
    console.log(
      `MongoDB Connected ✅ (${MONGO_URI.startsWith('mongodb://127.0.0.1') ? 'local' : 'remote'})`
    );
    return connection;
  } catch (error) {
    console.log('MongoDB Connection Failed ❌', error.message);
    if (!process.env.MONGO_URI) {
      console.log('Tip: start a local MongoDB instance or set MONGO_URI in .env');
    } else {
      console.log(
        'Tip: verify your Atlas user/password, whitelist, and MONGO_URI value.'
      );
    }
    process.exit(1);
  }
};

module.exports = connectDB;