import { QueryResolvers, MutationResolvers, Ticket, TicketResponse, Event } from "../../typeDefs"
import { Ticket as TicketModel } from "../../../../mongo/models/Ticket"
import { Event as EventModel } from "../../../../mongo/models/Event"
import { User as UserModel } from "../../../../mongo/models/User"
import mongoose, { Types } from 'mongoose';
import { readAndConvertToBase64 } from "../../../../mongo/FileHandler";
var nodemailer = require("nodemailer");

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const LENGTH = 60;
const DEFAULT_LIMIT = 50
const FAILED_MUTATION_MESSAGE = "mutation createTicket failed"
const SECOND_HAND_SELL_TICKET_COMMISION = 2

const ticketResolvers: {
  Query: Pick<QueryResolvers, "ticket" | "ticketCount" | "isValid" | "getAllSecondHandTicketsByEventId">;
  Mutation: Pick<MutationResolvers, "createTicket" | "updateMarket" | "changeSecondHandToFirstHand">;
} = {
  Query: {
    isValid: async (parent, args, context, info) => {
      const { eventId, barcode } = args;

      const ticket = await TicketModel.findOne({ eventId: eventId, barcode: barcode })

      return !!ticket
    },
    ticket: async (parent, args, context, info) => {
      const { filterParams = {}, skip = 0, limit = DEFAULT_LIMIT, ids } = args;

      const userId = context.user._id;
      // Those are filters to query the mongo
      let { name, location, from, to } = filterParams;

      let filter = {
        ...(ids && { _id: { $in: ids } }),
        ...(name && { name: { $regex: name, $options: 'i' } }),
        ...(location && { location: { $regex: location, $options: 'i' } }),
        ...((from || to) && {
          timeAndDate: {
            ...(from && { $gte: new Date(from) }),
            ...(to && { $lt: new Date(to) }),
          },
        }),
      };

      const unprocessedTickets = await TicketModel.find({ ...filter, ...(userId && { ownerId: userId }) })
        .populate("eventId")
        .skip(skip)
        .limit(limit)
        .exec();

      const eventTickets = unprocessedTickets.filter(ticket => ticket.eventId);

      let tickets = await Promise.all(eventTickets.map(({ eventId, _id, onMarketTime, barcode, price }) => {
        let ticketResponse = {
          name: (eventId as any).name,
          location: (eventId as any).location,
          timeAndDate: new Date((eventId as any).timeAndDate).getTime(),
          type: (eventId as any).type,
          price: price as number,
          image: (eventId as any).image,
          barcode: barcode,
          ticketId: _id.toString(),
          onMarketTime: new Date(onMarketTime).getTime()
        }

        if ((eventId as any).image === "exists") {
          return readAndConvertToBase64((eventId as any)._id + ".jpg")
            .then((image) => ({
              ...ticketResponse,
              image
            }));
        }

        return ticketResponse;
      }));

      return tickets;
    },
    ticketCount: async (parent, args, context, info) => {
      const { filterParams = {}, ids } = args;

      const userId = context.user._id;

      let { name, location, from, to, } = filterParams;
      let filter = {
        ...(ids && { _id: { $in: ids } }),
        ...(name && { name: { $regex: name } }),
        ...(location && { location: { $regex: location } }),
        ...((from || to) && {
          timeAndDate: {
            ...(from && { $gte: new Date(from) }),
            ...(to && { $lt: new Date(to) }),
          },
        }),
      };

      return await TicketModel.find({ ...filter, ...(userId && { ownerId: userId }) })
        .count()
        .exec();

    },
    getAllSecondHandTicketsByEventId: async (parent, { eventId }) => {
      const tickets = await TicketModel.find({
        //isSecondHand: true,
        onMarketTime: { $exists: true },
        eventId: eventId
      }).count()

      return tickets
    }
  },

  Mutation: {
    updateMarket: async (parent, { ticketId }, context, info) => {
      try {
        let ticket = await TicketModel.findOne({ _id: new Types.ObjectId(ticketId) }).populate("eventId").exec();

        let eventDate = (ticket?.eventId as any)?.timeAndDate;
        let onMarket = ticket?.onMarketTime
        let now = new Date()

        if ((eventDate && now.getTime() < eventDate.getTime()) || !eventDate) {

          let updatetime = await TicketModel.updateOne({ _id: new Types.ObjectId(ticketId) },
            { $set: { onMarketTime: onMarket ? null : new Date().getTime() } }, { upsert: true });

          console.log("Ticket market time update: " + JSON.stringify(updatetime))

          await EventModel.updateOne({ _id: ticket.eventId },
            { $inc: { ticketsAmount: onMarket ? -1 : 1 } })

          return { message: "ticket updated succesfully", code: 200 }
        }
        throw new Error("The event has already happened.")
      } catch (error) {
        console.log("failed with " + error)
        return { message: FAILED_MUTATION_MESSAGE, code: 500 }
      }
    },

    changeSecondHandToFirstHand: async (parent, { createTicketParams }, context, info) => {
      const { barcode, eventId } = createTicketParams
      try {
        let oldTicket = await TicketModel.find({
          eventId: eventId,
          onMarketTime: { $exists: true }
        }).sort({ "_id": 1, "onMarketTime": 1 }).limit(1)

        const creditToAdd = +oldTicket[0]["price"] - SECOND_HAND_SELL_TICKET_COMMISION

        // Add to old ticket's user credit - ticket price  minus 2 shekels.
        const updatedUserCredit = await UserModel.findOneAndUpdate(
          { _id: oldTicket[0].ownerId },
          { $inc: { credit: creditToAdd } }
        )

        // Email massage to user that it's ticket was sold.
        await sendEmail(updatedUserCredit.email, creditToAdd)

        await TicketModel.deleteOne({
          _id: oldTicket[0]._id
        })

        console.log("second hand ticket updated to first hand");
        return { message: "second hand ticket updated succesfully", code: 200 };
      } catch (error) {
        console.log("failed with " + error);
        return { message: FAILED_MUTATION_MESSAGE, code: 500 };
      }
    },

    createTicket: async (parent, { inputTicket }, context, info) => {
      const {
        eventId,
        isSecondHand,
        price,
        isExternal } = inputTicket

      try {
        console.log("isExternal " + isExternal)
        const userId = context.user._id;
        let barcode
        if (isExternal) {
          //@Aviv
        } else {
          barcode = await makeBarcode()
          console.log(barcode)
        }

        const newTicket = await TicketModel.create({
          _id: new mongoose.Types.ObjectId(),
          ownerId: userId,
          eventId: eventId,
          isSecondHand: isSecondHand,
          price: price,
          barcode: barcode
        });
        console.log("Ticket created: " + newTicket);
        return { message: "ticket created succesfully", code: 200 };
      } catch (error) {
        console.log("failed with " + error);
        return { message: FAILED_MUTATION_MESSAGE, code: 500 };
      }
    },

  },
}

const makeBarcode = async function () {
  let result = "";
  const charactersLength = CHARACTERS.length;
  let counter = 0;
  while (counter < LENGTH) {
    result += CHARACTERS.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const sendEmail = async function (email, creditToAdd) {
  var transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    secure: true,
    logger: true,
    debug: true,
    secureConnection: false,
    auth: {
      user: process.env.SMTP_AUTH_USER,
      pass: process.env.SMTP_AUTH_PASSWORD,
    },
    tls: {
      rejectUnAuthorized: true
    }
  })

  transporter.sendMail({
    to: email,
    from: process.env.SMTP_AUTH_USER,
    subject: "safe the date - ticket sold",
    text: `We are glad to inform you that your published ticket was sold. You recived ${creditToAdd} shekels credit to your account`,
  }, function (error, response) {
    if (error) {
      console.log("error sending email", error)
    } else {
      console.log("Email send successfully to " + email)
    }
  })
}

export default ticketResolvers
