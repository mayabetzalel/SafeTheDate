import { MutationResolvers, QueryResolvers } from "../../typeDefs";
import { User as UserModel } from "../../../../mongo/models/User";
import mongoose, { Types } from "mongoose";

const FAILED_MUTATION_MESSAGE = "mutation upadteCredit failed";

const userResolvers: {
  Query: Pick<QueryResolvers, "user">;
  Mutation: Pick<MutationResolvers, "updateCredit" | "updateImage">;
} = {
  Query: {
    user: async (parent, args, context, info) => {
      const { userId } = args;

      const userData = await UserModel.findOne({
        _id: new Types.ObjectId(userId),
      })
        .exec()
        .then(
          ({ _id, username, email, firstName, lastName, credit, image }) => {
            return {
              _id: _id?.toString(),
              username,
              email,
              firstName,
              lastName,
              credit,
              image,
            };
          }
        );
      return userData;
    },
  },
  Mutation: {
    updateCredit: async (userId: any, newCredit) => {
      try {
        await UserModel.updateOne(
          { _id: new Types.ObjectId(userId) },
          { $set: { credit: newCredit } }
        );
        return { message: "user credit updated succesfully", code: 200 };
      } catch (error) {
        console.log("failed with " + error);
        return { message: FAILED_MUTATION_MESSAGE, code: 500 };
      }
    },
    updateImage: async (parent, args, context, info) => {
      try {
        const { userId, image } = args;

        await UserModel.updateOne(
          { _id: new Types.ObjectId(userId) },
          { $set: { image: image } }
        );
        return { message: "user credit updated succesfully", code: 200 };
      } catch (error) {
        console.log("failed with to save image" + error);
        return { message: FAILED_MUTATION_MESSAGE, code: 500 };
      }
    },
  },
};

export default userResolvers;
