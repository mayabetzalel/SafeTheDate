import { Schema, model, Types, Model } from "mongoose"

interface TicketMongoType {
  userId: Types.ObjectId
  eventId: Types.ObjectId
  isSecondHand: Boolean,
  onMarketTime: Date,
  price: Number,
  barcode: string
}

const ticketSchema = new Schema<TicketMongoType>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event",
    required: true,
    unique: true,
  },
  isSecondHand: {
    type: Boolean, 
    required: true
  }, 
  onMarketTime: {
    type: Date, 
    required: false
  },
  price: {
    type: Number, 
    required: true
  }, 
  barcode: {
    type: String, 
    required: true
  }
})

export const Ticket: Model<TicketMongoType> = model("Ticket", ticketSchema)
