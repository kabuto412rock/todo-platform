const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    console.log(`env.MONGO_URI= ${process.env.MONGO_URI}`);
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error123: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

const dbs = {
  connectMongoDB,
};
module.exports = dbs;
