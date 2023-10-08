const mongoose = require('mongoose');

const connectDB = async () => {
    const dbURI = process.env.DATABASE.replace(
      '<PASSWORD>',
      process.env.DATABASE_PASSWORD
    );

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    };
    await mongoose.connect(dbURI, options);
    console.log('Database connection successful');

};
module.exports = connectDB;
