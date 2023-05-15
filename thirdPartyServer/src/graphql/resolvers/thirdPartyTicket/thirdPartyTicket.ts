import { QueryResolvers, MutationResolvers } from "../../typeDefs";
import { ThirdPartyTickets } from "../../../../mongo/models/ThirdPartyTickets";
const LENGTH = 50;

function makeId() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < LENGTH) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const thirdPartyTicketsResolvers: {
  Query: Pick<QueryResolvers, "validateTicket">;
  Mutation: Pick<MutationResolvers, "generateTicketForCurrentEvent">;
} = {
  Query: {
    validateTicket: async (parent, args, context, info) => {
      try {
        console.log("validateTicket");
        const { id } = args;
        const ticket = await ThirdPartyTickets.findOne({
          qrCodeId: id,
        });
        if (ticket) {
          return ticket;
        }
        return {};
      } catch (error) {
        console.log(error);
        return {};
      }
    },
  },
  Mutation: {
    generateTicketForCurrentEvent: async (parent, args, context, info) => {
      try {
        console.log("generateTicketForCurrentEvent");
        const { id } = args;

        const newId = makeId(); // Generate a new qr id
        const filter = { qrCodeId: id };
        const update = { $set: { qrCodeId: newId } };
        const options = { returnOriginal: false };

        const result = await ThirdPartyTickets.findOneAndUpdate(
          filter,
          update,
          options
        );
        if (result) {
          console.log("Updated document:", result);
          return result;
        } else {
          console.log("Document not found");
        }
        return {};
      } catch (error) {
        console.log(error);
        return {};
      }
    },
  },
};

export default thirdPartyTicketsResolvers;
