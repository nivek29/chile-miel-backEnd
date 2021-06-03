const mongoose = require("mongoose");

const config = require("./config");

class Database {
  db;

  url = config.mongo_url;

  constructor() {
    this.params = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      poolSize: 1,
      socketTimeoutMS: 2000000,
      keepAlive: true,
    };
  }

  async connect() {
    try {
      this.db = await mongoose.connect(this.url, this.params);

      console.info(
        `[Database]: MongoDB connected: ${await this.db.connection.host}`
      );

      return true;
    } catch (error) {
      console.error(`[Error]: connecting to database:`, error);
      return process.exit(1);
    }
  }
}

const db = new Database();

if (process.env.NODE_ENV !== "test") db.connect();

module.exports = db;
