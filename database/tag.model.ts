import { Document, model, Model, models, Schema } from "mongoose";

export interface ITag extends Document {
  name: string;
  description: string;
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdOn: Date;
}

const TagSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  questions: {
    type: [Schema.Types.ObjectId],
    ref: "Question",
    default: [],
  },
  followers: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const Tag = (models.Tag as Model<ITag>) || model<ITag>("Tag", TagSchema);

export default Tag;
