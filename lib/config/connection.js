import { connect, connection } from "mongoose";

// Wrap Mongoose around local connection to MongoDB
connect(
  `mongodb://${process.env.DB_USERNAME}:${encodeURIComponent(
    process.env.DB_PASSWORD
  )}@${process.env.DB_HOST}:27017/${
    process.env.DB_NAME
  }?authMechanism=DEFAULT&authSource=${process.env.DB_NAME}`
);

// Export connection
export default connection;
