import { Schema, model, Document, Model } from "mongoose";

interface ThirdPartyTicketsMongoType {
  qrCodeId: string;
  price: number;
  eventName: string;
  seat: string;
  ownerEmail: string;
}

// Define Mongoose schema for Event
const thirdPartyTicketsSchema = new Schema<ThirdPartyTicketsMongoType>({
  qrCodeId: { type: String, unique: true, required: true },
  price: {
    type: Number,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  seat: {
    type: String,
    required: true,
  },
  ownerEmail: {
    type: String,
    required: true,
  },
});

// Create Mongoose model for Event
export const ThirdPartyTickets: Model<ThirdPartyTicketsMongoType> = model(
  "thirdPartyTickets",
  thirdPartyTicketsSchema
);
