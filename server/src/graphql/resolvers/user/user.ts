import { MutationResolvers } from "../../typeDefs"
import { User as UserModel } from "../../../../mongo/models/User"
import mongoose, { Types } from 'mongoose';


const FAILED_MUTATION_MESSAGE = "mutation upadteCredit failed"

const userResolvers: {
    Mutation: Pick<MutationResolvers, "updateCredit">;
  } = {
    Mutation: {
        updateCredit: async (userId: any, newCredit) => {
            try {
                await UserModel.updateOne(
                    { _id: new Types.ObjectId(userId) },
                    { $set: { credit: newCredit } }
                )
                return { message: "user credit updated succesfully", code: 200 }
            } catch (error) {
                console.log("failed with " + error)
                return { message: FAILED_MUTATION_MESSAGE, code: 500 }
            }
        }
    }
}

export default userResolvers
