const mongoose = require('mongoose');

const connectDB = async () => {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER === 'true';
  const uri = process.env.MONGO_URI || (!isProduction ? 'mongodb://localhost:27017/drift_cafe' : null);

  if (!uri) {
    console.warn('No MONGO_URI configured. Starting without a database connection. Set MONGO_URI in Render to enable login/signup features.');
    return false;
  }

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
    return true;
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    return false;
  }
};

module.exports = connectDB;
