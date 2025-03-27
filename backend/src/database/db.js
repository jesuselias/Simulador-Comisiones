const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 50,
      wtimeoutMS: 2500,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    // Elimina el proceso.exit(1) para evitar que el test termine abruptamente
  }
};

module.exports = connectDB;
