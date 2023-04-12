import { model, Schema } from "mongoose";

const TicketSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, required: true },
  seat: { type: Number, required: true },
  ownerName: { type: String, required: true },
});

const Ticket = model("Ticket", TicketSchema);

export default Ticket
