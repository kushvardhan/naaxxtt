import { Document, Model, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  image: string;
  about: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
    default: "https://banner2.cleanpng.com/20180416/gbw/avfp7lvmb.webp",
  },
  about: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  portfolioWebsite: {
    type: String,
    required: false,
  },
  reputation: {
    type: Number,
    default: 0,
  },
  saved: {
    type: [Schema.Types.ObjectId],
    ref: "Question",
    default: [],
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = (models.User as Model<IUser>) || model<IUser>("User", UserSchema);

export default User;
