const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/drift_cafe';
  await mongoose.connect(uri);

  console.log('Connected to MongoDB');
};

module.exports = connectDB;
