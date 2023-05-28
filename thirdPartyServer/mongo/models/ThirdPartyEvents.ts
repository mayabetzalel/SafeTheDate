import { Schema, model, Document, Model } from "mongoose";

interface ThirdPartyEventsSchemaMongoType {
  name: string;
  location: string;
  timeAndDate: Date;
  type: string;
  ticketsAmount: number;
  image: string;
}

// Define Mongoose schema for Event
const thirdPartyEventsSchema = new Schema<ThirdPartyEventsSchemaMongoType>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  timeAndDate: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  ticketsAmount: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

// Create Mongoose model for Event
export const ThirdPartyEvents: Model<ThirdPartyEventsSchemaMongoType> = model(
  "thirdPartyEvents",
  thirdPartyEventsSchema
);
