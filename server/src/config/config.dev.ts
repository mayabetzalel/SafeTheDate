import { ConfigType } from "./settings";

export const configDev: ConfigType = {
  port: Number(process.env.PORT) || 4000,
  mongoSettings: {
    mongoConnectionString:
      process.env.DB_CONNECTION_STRING ||
      "mongodb+srv://safethedate:safethedate2023@safethedate.ylhxzwn.mongodb.net/?retryWrites=true&w=majority",
  },
};
