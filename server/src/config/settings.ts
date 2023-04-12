import dotenv from "dotenv";

dotenv.config();

export default {
    port: Number(process.env.PORT),
    mongoSettings: {
        mongoConnectionString: process.env.DB_CONNECTION_STRING,
    },
}
