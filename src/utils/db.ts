import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect(process.env.DB_URL!, { dbName: process.env.DB_NAME! });
    console.debug('Connected to Database');

  } catch (error) {
    throw new Error(`Error when starting the database: ${error}`);
  }
}

mongoose.connection.on('error', (err) => {
  console.error(err);
});