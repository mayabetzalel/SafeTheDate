import { ConfigType } from "./settings";

export const configProd: ConfigType = {
  port: Number(process.env.PORT),
  mongoSettings: {
    mongoConnectionString: process.env.DB_CONNECTION_STRING,
  },
};
