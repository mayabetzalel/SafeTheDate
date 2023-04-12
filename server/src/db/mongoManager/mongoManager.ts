import mongoose, {Connection} from "mongoose";
import settings from "../../config/settings";

class MongoManager {
    private db: Connection;

  constructor() {
      console.log("hello")
    const { mongoConnectionString } = settings.mongoSettings;
    try {
        mongoose.connect(mongoConnectionString);
        this.db = mongoose.connection;

        this.db.on("error", console.error.bind(console, "connection error: "));

        this.db.once("open", function () {
            console.log("Connected successfully to Mongo");
        });
    } catch (e) {
        console.error(e)
    }
  }
}

export default MongoManager;
