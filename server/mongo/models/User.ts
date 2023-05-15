import mongoose, { Schema, Types } from "mongoose"


const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  refreshToken: {
    type: Schema.Types.ObjectId,
    ref: "RefreshToken",
  },
  isConfirmed: { type: Boolean, default: false },
  userConfirmation: {
    type: Schema.Types.ObjectId,
    ref: "UserConfirmation",
  },
})

const User = mongoose.model("User", UserSchema)
export interface IUser {
  _id: Types.ObjectId
  username: string
  password: string
  email: string
  firstName: string
  lastName: string
  refreshToken: Types.ObjectId
  isConfirmed: boolean
  userConfirmation: Types.ObjectId
}

export default User
