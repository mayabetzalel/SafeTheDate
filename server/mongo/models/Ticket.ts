import { Schema, model, Types, Model } from "mongoose"

interface TicketMongoType {
  _id: Types.ObjectId
  userId: Types.ObjectId
  eventId: Types.ObjectId
  isFirstHand: Boolean,
  price: Number,
  barcode: string
}

const ticketSchema = new Schema<TicketMongoType>({
  _id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  eventId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  isFirstHand: {
    type: Boolean, 
    required: true
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
