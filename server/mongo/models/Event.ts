import { Schema, model, Document, Model, Types } from "mongoose";

interface EventMongoType {
  name: string;
  location: string;
  timeAndDate: Date;
  ownerId: Types.ObjectId;
  type: string;
  ticketsAmount: number;
  image: string;
}

// Define Mongoose schema for Event
const eventSchema = new Schema<EventMongoType>({
  name: {
    type: String,
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
  ownerId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});

// Create Mongoose model for Event
export const Event: Model<EventMongoType> = model("Event", eventSchema);
